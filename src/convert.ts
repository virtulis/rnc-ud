import * as xmldom from 'xmldom';
import * as XRegExp from 'xregexp';
import { OutputHandlers } from './util';
import { punctuation, Rule, rules } from './rules';

export interface ConvertOptions {
	language?: string | null;
	both?: boolean;
	ambigs?: boolean;
	debug?: boolean;
	output: OutputHandlers;
}

export async function convert(xmls: string, out: NodeJS.WritableStream, options: ConvertOptions) {

	const { notice, warn, err } = options.output;

	const parser = new xmldom.DOMParser();
	const xml = parser.parseFromString(xmls);
	const doc = xml.documentElement;

	const xtag = (el: Element, tag: string) => Array.from(el.childNodes)
		.filter(cn => (cn as Element).tagName == tag) as Element[];
	const isWord = XRegExp('^(\\pL+)$', 'u');
	const notWord = XRegExp('(\\PL+)', 'u');

	const langSeen: Record<string, boolean> = {};

	let ses: [Element, Element][] = [];
	for (let para of xtag(xtag(doc, 'body')[0], 'para')) {
		for (let se of Array.from(para.childNodes) as Element[]) {
			if (se.tagName != 'se') continue;
			const lang = se.getAttribute('lang') || 'null';
			if (options.language && lang != options.language) continue;
			langSeen[lang] = true;
			ses.push([para, se]);
		}
	}

	const langs = Object.keys(langSeen);
	if (!options.both && langs.length != 1) {
		err('--lang or --both not specified. (' + langs.join(', ') + ')');
		return false;
	}

	for (let [para, se] of ses) {

		let wid = 1;

		const pid = para.getAttribute('id');
		const lang = se.getAttribute('lang');

		out.write(`# sent_id = ${options.both ? lang + '_' : ''}${pid}\n`);
		out.write(`# text = ${se.textContent}\n`);

		const line = (
			id: number | string,
			form: string,
			lemma: string | null = null,
			upos: string | null = null,
			xpos: string | null = null,
			feats: Record<string, string> | null = null,
			orig: string | null = null,
			debug: any = null,
		) => out.write([
			id,
			form,
			lemma,
			upos || '_',
			xpos || '_',
			feats && Object.entries(feats).map(pair => pair.join('=')).join('|') || '_',
			'_', // head
			'_', // deprel
			'_', // deps
			(orig || '_') + (debug ? '\t' + JSON.stringify(debug) : ''),
		].join('\t') + '\n');

		for (let node of Array.from(se.childNodes)) {

			const el = node as Element;

			if (node.nodeType == node.ELEMENT_NODE && el.tagName == 'w') {

				const form = (node.textContent || '').trim();

				for (let ana of xtag(el, 'ana')) {

					const lemma = ana.getAttribute('lex')!;
					const gr = ana.getAttribute('gr')!;

					const tags = gr.split('=').flatMap(s => s.split(',').map(s => s.trim())).filter(s => !!s);

					const feats: Record<string, string> = {};
					const seen: Record<string, boolean> = {};
					const matched: Rule[] = [];
					const partial: string[][] = [];
					const ignored: string[] = [];

					for (let rule of rules) {

						const [match, apply] = rule;
						const marr = Array.isArray(match) ? match : [match];
						const farr = marr.filter(mt => tags.includes(mt));

						if (farr.length != marr.length) {
							if (farr.length) partial.push(farr);
							continue;
						}

						matched.push(rule);
						for (let [key, val] of Object.entries(apply)) {
							if (!feats[key]) feats[key] = val;
							else ignored.push(val);
						}

						for (let key of farr) seen[key] = true;

					}

					const unseen = tags.filter(t => !seen[t]);
					if (unseen.length) {
						notice('in', [wid, form, lemma, gr], ': unused tags', unseen);
					}

					const upos = feats.UPOS || null;
					const xpos = feats.XPOS || null;
					delete feats.UPOS;
					delete feats.XPOS;

					line(
						wid,
						form,
						lemma,
						upos,
						xpos,
						feats,
						gr,
						options.debug && { matched, partial, ignored, unseen }
					);

					if (!options.ambigs) break;

				}

				wid++;

			}
			else if (node.nodeType == node.TEXT_NODE) {
				const t = node.textContent && node.textContent.trim() || '';
				if (!t.length) {
					continue;
				}
				const split = t.split(notWord).flatMap(s => s.split(/\s+/)).filter(s => !!s.trim());
				for (let part of split) {
					if (part.match(isWord)) line(wid, part);
					else if (part.match(punctuation)) line(wid, part, part, 'PUNCT');
					else line(wid, part, part, 'SYM');
					wid++;
				}
			}
			else {
				warn('unknown node', node.toString());
			}

		}

		out.write(`\n`);

	}

	return true;

}

/*

    ID: Word index, integer starting at 1 for each new sentence; may be a range for multiword tokens; may be a decimal number for empty nodes (decimal numbers can be lower than 1 but must be greater than 0).
    FORM: Word form or punctuation symbol.
    LEMMA: Lemma or stem of word form.
    UPOS: Universal part-of-speech tag.
    XPOS: Language-specific part-of-speech tag; underscore if not available.
    FEATS: List of morphological features from the universal feature inventory or from a defined language-specific extension; underscore if not available.
    HEAD: Head of the current word, which is either a value of ID or zero (0).
    DEPREL: Universal dependency relation to the HEAD (root iff HEAD = 0) or a defined language-specific subtype of one.
    DEPS: Enhanced dependency graph in the form of a list of head-deprel pairs.
    MISC: Any other annotation.


 */

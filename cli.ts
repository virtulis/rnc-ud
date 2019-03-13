import * as sms from 'source-map-support';
sms.install();

import * as fs from 'fs';
import * as path from 'path';
import * as minimist from 'minimist';
import chalk from 'chalk';

import { existsSync } from 'fs';
import { convert } from './src/convert';

function cuteWords(bold: string, under: string | null = null) {
	return bold.split(/\s+/g).map(s => chalk.bold(s))
		.concat(under && under.split(/\s+/g).map(s => chalk.underline(s)) || [])
		.join(' ');
}

const usage = `${chalk.bold('Usage:')}

	${cuteWords('node cli convert', '[opts] in.xml outdir|out.conllu')}
		--lang=(ru|lv|...)  # extract this language
		--both              # extract all languages
		--ambigs            # extract all possible tag variants for same word
		--debug             # append debugging info to each row
		
`;

export interface UserInterface {
	cancel: boolean;
}

function getEffectiveFilenames([ifn, ofn]: string[], salvage = false) {
	const eofn = (fs.existsSync(ofn) && fs.statSync(ofn).isDirectory())
		? ofn + '/'  + path.parse(ifn).name +'.conllu'
		: ofn;
	const eifn = salvage && existsSync(eofn) ? eofn : ifn;
	return [eifn, eofn];
}

(async function cli() {

	const output = {
		echo: (...args: any[]) => console.log(...args),
		notice: (...args: any[]) => console.error('NOTICE', ...args),
		warn: (...args: any[]) => console.error(chalk.bold('WARNING'), ...args),
		err: (...args: any[]) => console.error(chalk.bold.red('ERROR'), ...args),
	};
	
	const mm = minimist(process.argv.slice(2), {
		boolean: true,
	});

	if (!mm._.length || mm.help || mm.h || mm['?']) {
		console.log(usage);
		return;
	}

	const cmd = mm._[0];

	if (cmd == 'convert') {

		if (mm._.length != 3) {
			output.err('Expected 2 args to convert');
			console.error('\n' + usage);
			return;
		}

		const [eifn, eofn] = getEffectiveFilenames(mm._.slice(1));

		const ixml = fs.readFileSync(eifn, { encoding: 'utf-8' });
		const os = fs.createWriteStream(eofn);
		await convert(ixml, os, {
			language: mm.lang || null,
			both: mm.both,
			ambigs: mm.ambigs,
			debug: mm.debug,
			output,
		});
		os.close();

		return;

	}

	output.err(chalk.bold('Unknown command'), cmd);
	console.error('\n' + usage);

	process.exit(1);

})();

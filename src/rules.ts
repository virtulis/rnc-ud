export type TagSelector = string | string[];
export type Rule = [TagSelector, Record<string, string>]

// Any non-word characters not included here are considered SYM
export const punctuation = /^[.,?!"'()\[\]{}“„«»]+$/u;

/*

Tested in order.
First matched value of each key is kept.
Special keys NOUN, PROPN.
Use --debug for rule match info in output.

 */
export const rules: Rule[] = [

	[
		['S', 'propn'],
		{ UPOS: 'PROPN' }
	],
	[
		'S',
		{ UPOS: 'NOUN' }
	],

	['m', { Gender: 'Masc' }],
	['f', { Gender: 'Fem' }],
	['n', { Gender: 'Neut' }],

	['anim', { Animacy: 'Anim' }],
	['inan', { Animacy: 'Inan' }],

];

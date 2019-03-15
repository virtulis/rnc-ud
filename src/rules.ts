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

	['sg', { Number: 'Sing' }],
	['pl', { Number: 'Plur' }],
	
	['anim', { Animacy: 'Anim' }],
	['inan', { Animacy: 'Inan' }],
	
	
	['nom', { Case: 'Nom' }],
	['gen', { Case: 'Gen' }],
	['dat', { Case: 'Dat' }],
	['acc', { Case: 'Acc' }],
	['ins', { Case: 'Ins' }],
	['loc', { Case: 'Loc' }],
	['voc', { Case: 'Voc' }],
	['gen2', { Case: 'Par' }],
	['dat2', { Case: 'Dat' }],
	['acc2', { Case: 'Nom' }],
	['loc2', { Case: 'Loc' }],
	['adnum', { Case: 'Gen' }],
	
	
	[
		'A',
		{ UPOS: 'ADJ' }
	],

	['m', { Gender: 'Masc' }],
	['f', { Gender: 'Fem' }],
	['n', { Gender: 'Neut' }],

	['sg', { Number: 'Sing' }],
	['pl', { Number: 'Plur' }],
	
	['nom', { Case: 'Nom' }],
	['gen', { Case: 'Gen' }],
	['dat', { Case: 'Dat' }],
	['acc', { Case: 'Acc' }],
	['ins', { Case: 'Ins' }],
	['loc', { Case: 'Loc' }],
	['voc', { Case: 'Voc' }],
	
	
	['brev', { Variant: 'Short' }],
	
	['comp', { Degree: 'Comp' }],
	['comp2', { Degree: 'Comp' }],
	['supr', { Degree: 'Sup' }],

	
	
	[
		'NUM',
		{ UPOS: 'NUM' }
	],

	[
		'ANUM',
		{ UPOS: 'ADJ' }
	],

	[
		'V',
		{ UPOS: 'VERB' }
	],
	
	[
		'SPRO',
		{ UPOS: 'PRON' }
	],

	
	[
		'APRO',
		{ UPOS: 'DET' }
	],


	[
		'ADV',
		{ UPOS: 'ADV' }
	],

	[
		'ADVPRO',
		{ UPOS: 'ADV' }
	],

	
	[
		'PARENTH',
		{ UPOS: 'ADV' }
	],

	[
		'PART',
		{ UPOS: 'PART' }
	],

	[
		'INTJ',
		{ UPOS: 'INTJ' }
	],

	[
		'NONLEX',
		{ UPOS: 'X' }
	],

	
];

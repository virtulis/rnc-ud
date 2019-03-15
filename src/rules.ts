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
	['ill', { Case: 'Ill' }],
	
	
	[
		'A',
		{ UPOS: 'ADJ' }
	],

	['indef', { Definite: 'Ind' }],
	['def', { Definite: 'Def' }],
	
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
	['super', { Degree: 'Sup' }],

	
	
	[
		'NUM',
		{ UPOS: 'NUM' }
	],

	['card', { NumType: 'Card' }],
	['ord', { NumType: 'Ord' }],
	['coll', { Gender: 'Sets' }],	
	
	['indef', { Definite: 'Ind' }],
	['def', { Definite: 'Def' }],
	
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
	
	[
		'ANUM',
		{ UPOS: 'ADJ' }
	],

	[
		'V',
		{ UPOS: 'VERB' }
	],

	['neg', { Polarity: 'Neg' }],
	
	['refl', { Reflex: 'Yes' }],
	
	['pf', { Aspect: 'Perf' }],
	['ipf', { Aspect: 'Imp' }],
	
	['act', { Voice: 'Act' }],
	['pass', { Voice: 'Pass' }],
	['med', { Voice: 'Med' }],
	['debit', { Voice: 'Necess' }],

	['inf', { VerbForm: 'Inf' }],
	['partcp', { VerbForm: 'part' }],
	['pf', { Aspect: 'Perf' }],
	['ger', { Aspect: 'Conv' }],
	
	['indic', { Mood: 'Ind' }],
	['imper', { Mood: 'Imp' }],
	['imper2', { Mood: 'Imp' }],
	['cond', { Mood: 'Cnd' }],
	['deb', { Mood: 'Nec' }],
	['quot', { Mood: 'Qot' }],
	
	['praet', { Tense: 'Past' }],
	['praes', { Tense: 'Pres' }],
	['fut', { Tense: 'Fut' }],
	['hab', { Tense: 'PastIter' }],
	
	['1p', { Person: '1' }],
	['2p', { Person: '2' }],
	['3p', { Person: '3' }],
	
	['indef', { Definite: 'Ind' }],
	['def', { Definite: 'Def' }],
	
	['sg', { Number: 'Sing' }],
	['pl', { Number: 'Plur' }],
	['du', { Number: 'Dual' }],
	
	['nom', { Case: 'Nom' }],
	['gen', { Case: 'Gen' }],
	['dat', { Case: 'Dat' }],
	['acc', { Case: 'Acc' }],
	['ins', { Case: 'Ins' }],
	['loc', { Case: 'Loc' }],
	['voc', { Case: 'Voc' }],
	
	['m', { Gender: 'Masc' }],
	['f', { Gender: 'Fem' }],
	['n', { Gender: 'Neut' }],
	
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
		'PRO',
		{ UPOS: 'PRON' }
	],
	
	['indef', { Definite: 'Ind' }],
	['def', { Definite: 'Def' }],
	
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
	
	[
		'PR',
		{ UPOS: 'ADP' }
	],

	[
		'CONJ',
		{ UPOS: 'SCONJ' }
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

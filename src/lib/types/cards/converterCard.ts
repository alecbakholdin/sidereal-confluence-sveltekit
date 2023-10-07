import type { RaceType } from '../race';
import type { Converter } from './converter';
import type { TechnologyType } from './researchTeam';

export type ConverterCard = {
	id: string;
	race: RaceType;
	frontTitle: string;
	backTitle?: string;
	era: 1 | 2 | 3;

	isStartingCard?: boolean;
	technology?: TechnologyType;

	acquisitionConverter?: Converter[];
	frontConverters?: Converter[];
	backConverters?: Converter[];
	upgradeOptions?: ConverterCardUpgradeOptions[];
};

export type ConverterCardUpgradeOptions = {
	technology?: TechnologyType;
	converter?: Converter;
};

export const converterCards: readonly ConverterCard[] = [
	{
		id: 'converterCard_Caylion_1',
		race: 'Caylion',
		frontTitle: 'Nanotechnology',
		backTitle: 'Nanofabricators',
		era: 1,
		isStartingCard: false,
		technology: 'Nanotechnology',
		frontConverters: [
			{ input: { resource: { brown: 3 } }, output: { resource: { hexagon: 1, green: 1 } } }
		],
		backConverters: [
			{
				input: { resource: { brown: 3 } },
				output: { resource: { hexagon: 1, yellow: 1, green: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Genetic Engineering' }, { technology: 'Atomic Transmutation' }]
	},
	{
		id: 'converterCard_Caylion_2',
		race: 'Caylion',
		frontTitle: 'Genetic Engineering',
		backTitle: 'Genetic Resynthesis',
		era: 1,
		isStartingCard: false,
		technology: 'Genetic Engineering',
		frontConverters: [
			{ input: { resource: { green: 3 } }, output: { resource: { yellow: 1, black: 1, brown: 1 } } }
		],
		backConverters: [
			{ input: { resource: { green: 3 } }, output: { resource: { yellow: 2, black: 1, brown: 1 } } }
		],
		upgradeOptions: [{ technology: 'Nanotechnology' }, { technology: 'Clinical Immortality' }]
	},
	{
		id: 'converterCard_Caylion_3',
		race: 'Caylion',
		frontTitle: 'Universal Translator',
		backTitle: 'Universal Empathetic Communication',
		era: 1,
		isStartingCard: false,
		technology: 'Universal Translator',
		frontConverters: [
			{
				input: { resource: { white: 3 } },
				output: { resource: { point: 1 }, donation: { black: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { white: 3 } },
				output: { resource: { point: 1 }, donation: { black: 1, white: 1, brown: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Ubiquitous Cultural Repository' },
			{ technology: 'Quantum Computers' }
		]
	},
	{
		id: 'converterCard_Caylion_4',
		race: 'Caylion',
		frontTitle: 'Antimatter Power',
		backTitle: 'Antimatter Compounds',
		era: 2,
		isStartingCard: false,
		technology: 'Antimatter Power',
		frontConverters: [
			{ input: { resource: { brown: 4 } }, output: { resource: { yellow: 2, black: 1, white: 1 } } }
		],
		backConverters: [
			{
				input: { resource: { brown: 4 } },
				output: { resource: { yellow: 2, black: 1, green: 1, white: 2 } }
			}
		],
		upgradeOptions: [{ technology: 'Hyperspace Mining' }, { technology: 'Organic Construction' }]
	},
	{
		id: 'converterCard_Caylion_5',
		race: 'Caylion',
		frontTitle: 'Interspecies Medical Exchange',
		backTitle: 'Panbiologic Medicine',
		era: 2,
		isStartingCard: false,
		technology: 'Interspecies Medical Exchange',
		frontConverters: [
			{
				input: { resource: { green: 4 } },
				output: { resource: { point: 1, white: 1 }, donation: { green: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { green: 4 } },
				output: {
					resource: { point: 1, yellow: 1, white: 1, brown: 1 },
					donation: { brown: 1, green: 1 }
				}
			}
		],
		upgradeOptions: [
			{ technology: 'Cross Species Ethical Equality' },
			{ technology: 'Organic Construction' }
		]
	},
	{
		id: 'converterCard_Caylion_6',
		race: 'Caylion',
		frontTitle: 'Cross Species Ethical Equality',
		backTitle: 'Concrete Universal Metaethics',
		era: 2,
		isStartingCard: false,
		technology: 'Cross Species Ethical Equality',
		frontConverters: [
			{
				input: { resource: { white: 4 } },
				output: { resource: { point: 1 }, donation: { point: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { white: 4 } },
				output: { resource: { hexagon: 1, point: 1 }, donation: { point: 1, brown: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Interspecies Medical Exchange' },
			{ technology: 'Achronal Analysis' }
		]
	},
	{
		id: 'converterCard_Caylion_7',
		race: 'Caylion',
		frontTitle: 'Xeno Cultural Exchange',
		backTitle: 'Multispecies Hybrid Cultures',
		era: 3,
		isStartingCard: false,
		technology: 'Xeno Cultural Exchange',
		frontConverters: [
			{
				input: { resource: { brown: 5 } },
				output: { resource: { black: 1, white: 3, green: 1, point: 1 }, donation: { point: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { brown: 5 } },
				output: {
					resource: { black: 1, white: 3, green: 1, point: 2 },
					donation: { point: 1, white: 1, black: 1 }
				}
			}
		],
		upgradeOptions: [{ technology: 'Megastructures' }, { technology: 'Social Exodus' }]
	},
	{
		id: 'converterCard_Caylion_8',
		race: 'Caylion',
		frontTitle: 'Poly Species Corporations',
		backTitle: 'Full Interspecies Integration',
		era: 3,
		isStartingCard: false,
		technology: 'Poly Species Corporations',
		frontConverters: [
			{
				input: { resource: { green: 5 } },
				output: { resource: { ship: 2, point: 1, yellow: 2 }, donation: { brown: 3, green: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { green: 5 } },
				output: {
					resource: { ship: 2, point: 2, yellow: 2 },
					donation: { brown: 3, white: 1, green: 1 }
				}
			}
		],
		upgradeOptions: [
			{ technology: 'Galactic Telecomm Control' },
			{ technology: 'Xeno Cultural Exchange' }
		]
	},
	{
		id: 'converterCard_Caylion_9',
		race: 'Caylion',
		frontTitle: 'Social Exodus',
		backTitle: 'Galactic Colonization',
		era: 3,
		isStartingCard: false,
		technology: 'Social Exodus',
		frontConverters: [
			{
				input: { resource: { white: 5 } },
				output: {
					resource: { ship: 2, point: 1, black: 1 },
					donation: { ship: 2, point: 1, yellow: 1, blue: 1 }
				}
			}
		],
		backConverters: [
			{
				input: { resource: { white: 5 } },
				output: {
					resource: { ship: 2, point: 2, black: 1 },
					donation: { ship: 2, point: 1, yellow: 1, blue: 1, brown: 1 }
				}
			}
		],
		upgradeOptions: [
			{ technology: 'Galactic Telecomm Control' },
			{ technology: 'Xeno Cultural Exchange' }
		]
	},
	{
		id: 'converterCard_Caylion_10',
		race: 'Caylion',
		frontTitle: 'Quantum Computers',
		backTitle: 'Nondeterministic Polynomial Collapse',
		era: 1,
		isStartingCard: false,
		technology: 'Quantum Computers',
		frontConverters: [
			{ input: { resource: { black: 2 } }, output: { resource: { blue: 1, yellow: 1, green: 1 } } }
		],
		backConverters: [
			{ input: { resource: { black: 2 } }, output: { resource: { blue: 1, yellow: 2, green: 1 } } }
		],
		upgradeOptions: [{ technology: 'Universal Translator' }, { technology: 'Clinical Immortality' }]
	},
	{
		id: 'converterCard_Caylion_11',
		race: 'Caylion',
		frontTitle: 'Clinical Immortality',
		backTitle: 'Practical Immortality',
		era: 1,
		isStartingCard: false,
		technology: 'Clinical Immortality',
		frontConverters: [
			{ input: { resource: { blue: 2 } }, output: { resource: { point: 1, white: 1 } } }
		],
		backConverters: [
			{ input: { resource: { blue: 2 } }, output: { resource: { point: 1, yellow: 1, white: 1 } } }
		],
		upgradeOptions: [{ technology: 'Genetic Engineering' }, { technology: 'Atomic Transmutation' }]
	},
	{
		id: 'converterCard_Caylion_12',
		race: 'Caylion',
		frontTitle: 'Ubiquitous Cultural Repository',
		backTitle: 'Memetic Lifeforms',
		era: 1,
		isStartingCard: false,
		technology: 'Ubiquitous Cultural Repository',
		frontConverters: [
			{ input: { resource: { yellow: 2 } }, output: { resource: { point: 1, green: 1 } } }
		],
		backConverters: [
			{ input: { resource: { yellow: 2 } }, output: { resource: { point: 1, black: 1, green: 1 } } }
		],
		upgradeOptions: [{ technology: 'Universal Translator' }, { technology: 'Quantum Computers' }]
	},
	{
		id: 'converterCard_Caylion_13',
		race: 'Caylion',
		frontTitle: 'Achronal Analysis',
		backTitle: 'Time Viewers',
		era: 2,
		isStartingCard: false,
		technology: 'Achronal Analysis',
		frontConverters: [
			{
				input: { resource: { black: 3 } },
				output: { resource: { hexagon: 1, yellow: 1, white: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { black: 3 } },
				output: { resource: { hexagon: 1, yellow: 1, blue: 1, white: 2, brown: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Antimatter Power' }, { technology: 'Singularity Control' }]
	},
	{
		id: 'converterCard_Caylion_14',
		race: 'Caylion',
		frontTitle: 'Organic Construction',
		backTitle: 'Living Infrastructure',
		era: 2,
		isStartingCard: false,
		technology: 'Organic Construction',
		frontConverters: [
			{
				input: { resource: { blue: 3 } },
				output: { resource: { ship: 2, white: 1, brown: 2, green: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { blue: 3 } },
				output: { resource: { ship: 2, white: 1, brown: 2, green: 1, yellow: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Interspecies Medical Exchange' },
			{ technology: 'Cross Species Ethical Equality' }
		]
	},
	{
		id: 'converterCard_Caylion_15',
		race: 'Caylion',
		frontTitle: 'Hyperspace Mining',
		backTitle: 'Hyperspace Settlements',
		era: 2,
		isStartingCard: false,
		technology: 'Hyperspace Mining',
		frontConverters: [
			{
				input: { resource: { yellow: 3 } },
				output: { resource: { hexagon: 1, black: 1 }, donation: { yellow: 2 } }
			}
		],
		backConverters: [
			{
				input: { resource: { yellow: 3 } },
				output: { resource: { hexagon: 1, black: 2, white: 1, brown: 1 }, donation: { yellow: 2 } }
			}
		],
		upgradeOptions: [{ technology: 'Antimatter Power' }, { technology: 'Singularity Control' }]
	},
	{
		id: 'converterCard_Caylion_16',
		race: 'Caylion',
		frontTitle: 'Galactic Telecomm Control',
		backTitle: 'Galactic Domination',
		era: 3,
		isStartingCard: false,
		technology: 'Galactic Telecomm Control',
		frontConverters: [
			{ input: { resource: { black: 4 } }, output: { resource: { point: 3, brown: 2, white: 1 } } }
		],
		backConverters: [
			{
				input: { resource: { black: 4 } },
				output: { resource: { point: 4, yellow: 1, brown: 2, white: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Poly Species Corporations' }, { technology: 'Social Exodus' }]
	},
	{
		id: 'converterCard_Caylion_17',
		race: 'Caylion',
		frontTitle: 'Temporal Dilation',
		backTitle: 'Stasis Field',
		era: 3,
		isStartingCard: false,
		technology: 'Temporal Dilation',
		frontConverters: [
			{
				input: { resource: { blue: 4 } },
				output: { resource: { point: 2, hexagon: 1, white: 1, green: 2 } }
			}
		],
		backConverters: [
			{
				input: { resource: { blue: 4 } },
				output: { resource: { point: 3, hexagon: 1, white: 1, green: 2 }, donation: { hexagon: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Megastructures' }, { technology: 'Matter Generation' }]
	},
	{
		id: 'converterCard_Caylion_18',
		race: 'Caylion',
		frontTitle: 'Matter Generation',
		backTitle: 'Macroscale Teleportation',
		era: 3,
		isStartingCard: false,
		technology: 'Matter Generation',
		frontConverters: [
			{
				input: { resource: { yellow: 4 } },
				output: { resource: { point: 2, hexagon: 1, blue: 1, white: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { yellow: 2 } },
				output: { resource: { point: 3, hexagon: 1, blue: 1, white: 1, brown: 2 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Poly Species Corporations' },
			{ technology: 'Temporal Dilation' }
		]
	},
	{
		id: 'converterCard_Caylion_19',
		race: 'Caylion',
		frontTitle: 'Lunar Mining Consortium',
		backTitle: 'Auxonic Outersystem Harvesting',
		era: 2,
		isStartingCard: true,
		frontConverters: [
			{ input: { resource: { blue: 2 } }, output: { resource: { ship: 2, black: 1, white: 1 } } }
		],
		backConverters: [
			{
				input: { resource: { blue: 2 } },
				output: { resource: { ship: 2, black: 1, yellow: 1, white: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Organic Construction' }]
	},
	{
		id: 'converterCard_Caylion_20',
		race: 'Caylion',
		frontTitle: 'Planetary Ecological Dominance',
		backTitle: 'Systemwide Gravitic Dominance',
		era: 1,
		isStartingCard: true,
		frontConverters: [{ output: { resource: { ship: 1, green: 3, white: 1 } } }],
		backConverters: [{ output: { resource: { ship: 1, blue: 1, green: 3, white: 1 } } }],
		upgradeOptions: [{ technology: 'Genetic Engineering' }]
	},
	{
		id: 'converterCard_Caylion_21',
		race: 'Caylion',
		frontTitle: 'Atomic Transmutation',
		backTitle: 'Pseudomaterials',
		era: 1,
		isStartingCard: false,
		technology: 'Atomic Transmutation',
		frontConverters: [
			{
				input: { resource: { hexagon: 1 } },
				output: { resource: { yellow: 1, blue: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { hexagon: 1 } },
				output: { resource: { yellow: 1, blue: 2, brown: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Ubiquitous Cultural Repository' },
			{ technology: 'Nanotechnology' }
		]
	},
	{
		id: 'converterCard_Caylion_22',
		race: 'Caylion',
		frontTitle: 'Oceanic Processing',
		backTitle: 'Planetwide Industrial Mariculture',
		era: 2,
		isStartingCard: true,
		frontConverters: [
			{ input: { resource: { green: 2 } }, output: { resource: { blue: 1, brown: 1 } } }
		],
		backConverters: [
			{ input: { resource: { green: 2 } }, output: { resource: { black: 1, blue: 1, green: 1 } } }
		],
		upgradeOptions: [{ technology: 'Antimatter Power' }]
	},
	{
		id: 'converterCard_Caylion_23',
		race: 'Caylion',
		frontTitle: 'Distributed Telenet',
		backTitle: 'Ansible Driven Intersystem Society',
		era: 1,
		isStartingCard: true,
		frontConverters: [
			{ input: { resource: { black: 1 } }, output: { resource: { brown: 1, white: 1 } } }
		],
		backConverters: [
			{ input: { resource: { black: 1 } }, output: { resource: { blue: 1, brown: 1, white: 1 } } }
		],
		upgradeOptions: [{ technology: 'Ubiquitous Cultural Repository' }]
	},
	{
		id: 'converterCard_Caylion_24',
		race: 'Caylion',
		frontTitle: 'Singularity Control',
		backTitle: 'Wormhole Grid',
		era: 2,
		isStartingCard: false,
		technology: 'Singularity Control',
		frontConverters: [
			{
				input: { resource: { hexagon: 2 } },
				output: { resource: { ship: 1, yellow: 1, blue: 2, white: 1, green: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { hexagon: 2 } },
				output: { resource: { ship: 1, yellow: 1, blue: 2, white: 1, green: 1, brown: 3 } }
			}
		],
		upgradeOptions: [{ technology: 'Hyperspace Mining' }, { technology: 'Achronal Analysis' }]
	},
	{
		id: 'converterCard_Caylion_26',
		race: 'Caylion',
		frontTitle: 'Megastructures',
		backTitle: 'Dyson Swarms',
		era: 3,
		isStartingCard: false,
		technology: 'Megastructures',
		frontConverters: [
			{
				input: { resource: { hexagon: 3 } },
				output: { resource: { point: 5, white: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { hexagon: 3 } },
				output: { resource: { point: 6, blue: 1, white: 1, brown: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Temporal Dilation' }, { technology: 'Matter Generation' }]
	},
	{
		id: 'converterCard_Faderan_71',
		race: 'Faderan',
		frontTitle: 'Nanotechnology',
		backTitle: 'Nanofabricators',
		era: 1,
		isStartingCard: false,
		technology: 'Nanotechnology',
		frontConverters: [
			{ input: { resource: { brown: 3 } }, output: { resource: { hexagon: 1, green: 1 } } }
		],
		backConverters: [
			{
				input: { resource: { brown: 3 } },
				output: { resource: { hexagon: 1, yellow: 1, green: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Genetic Engineering' }, { technology: 'Atomic Transmutation' }]
	},
	{
		id: 'converterCard_Faderan_72',
		race: 'Faderan',
		frontTitle: 'Genetic Engineering',
		backTitle: 'Genetic Resynthesis',
		era: 1,
		isStartingCard: false,
		technology: 'Genetic Engineering',
		frontConverters: [
			{ input: { resource: { green: 3 } }, output: { resource: { blue: 1, white: 1, black: 1 } } }
		],
		backConverters: [
			{ input: { resource: { green: 3 } }, output: { resource: { blue: 2, black: 1, white: 1 } } }
		],
		upgradeOptions: [{ technology: 'Nanotechnology' }, { technology: 'Clinical Immortality' }]
	},
	{
		id: 'converterCard_Faderan_73',
		race: 'Faderan',
		frontTitle: 'Universal Translator',
		backTitle: 'Universal Empathetic Communication',
		era: 1,
		isStartingCard: false,
		technology: 'Universal Translator',
		frontConverters: [
			{
				input: { resource: { white: 3 } },
				output: { resource: { point: 1 }, donation: { black: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { white: 3 } },
				output: { resource: { point: 1 }, donation: { black: 1, white: 1, brown: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Ubiquitous Cultural Repository' },
			{ technology: 'Quantum Computers' }
		]
	},
	{
		id: 'converterCard_Faderan_74',
		race: 'Faderan',
		frontTitle: 'Antimatter Power',
		backTitle: 'Antimatter Compounds',
		era: 2,
		isStartingCard: false,
		technology: 'Antimatter Power',
		frontConverters: [
			{ input: { resource: { brown: 4 } }, output: { resource: { yellow: 2, blue: 1, green: 1 } } }
		],
		backConverters: [
			{
				input: { resource: { brown: 4 } },
				output: { resource: { yellow: 2, blue: 1, green: 2, white: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Hyperspace Mining' }, { technology: 'Organic Construction' }]
	},
	{
		id: 'converterCard_Faderan_75',
		race: 'Faderan',
		frontTitle: 'Interspecies Medical Exchange',
		backTitle: 'Panbiologic Medicine',
		era: 2,
		isStartingCard: false,
		technology: 'Interspecies Medical Exchange',
		frontConverters: [
			{
				input: { resource: { green: 4 } },
				output: { resource: { point: 1, brown: 1 }, donation: { green: 2 } }
			}
		],
		backConverters: [
			{
				input: { resource: { green: 4 } },
				output: { resource: { point: 1, blue: 1, white: 1, brown: 1 }, donation: { green: 2 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Cross Species Ethical Equality' },
			{ technology: 'Organic Construction' }
		]
	},
	{
		id: 'converterCard_Faderan_76',
		race: 'Faderan',
		frontTitle: 'Cross Species Ethical Equality',
		backTitle: 'Concrete Universal Metaethics',
		era: 2,
		isStartingCard: false,
		technology: 'Cross Species Ethical Equality',
		frontConverters: [
			{
				input: { resource: { white: 4 } },
				output: { resource: { point: 1 }, donation: { point: 1, white: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { white: 4 } },
				output: { resource: { hexagon: 1, point: 1 }, donation: { point: 1, white: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Interspecies Medical Exchange' },
			{ technology: 'Achronal Analysis' }
		]
	},
	{
		id: 'converterCard_Faderan_77',
		race: 'Faderan',
		frontTitle: 'Xeno Cultural Exchange',
		backTitle: 'Multispecies Hybrid Cultures',
		era: 3,
		isStartingCard: false,
		technology: 'Xeno Cultural Exchange',
		frontConverters: [
			{
				input: { resource: { brown: 5 } },
				output: { resource: { point: 1, black: 1, white: 2, green: 2 }, donation: { point: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { brown: 5 } },
				output: {
					resource: { point: 2, black: 1, white: 2, green: 2 },
					donation: { point: 1, blue: 1, white: 1 }
				}
			}
		],
		upgradeOptions: [{ technology: 'Megastructures' }, { technology: 'Social Exodus' }]
	},
	{
		id: 'converterCard_Faderan_78',
		race: 'Faderan',
		frontTitle: 'Poly Species Corporations',
		backTitle: 'Full Interspecies Integration',
		era: 3,
		isStartingCard: false,
		technology: 'Poly Species Corporations',
		frontConverters: [
			{
				input: { resource: { green: 5 } },
				output: {
					resource: { ship: 2, point: 1, yellow: 1, black: 1 },
					donation: { brown: 2, green: 1, white: 1 }
				}
			}
		],
		backConverters: [
			{
				input: { resource: { green: 5 } },
				output: {
					resource: { ship: 2, point: 2, yellow: 1, black: 1 },
					donation: { brown: 2, green: 1, white: 2 }
				}
			}
		],
		upgradeOptions: [
			{ technology: 'Galactic Telecomm Control' },
			{ technology: 'Xeno Cultural Exchange' }
		]
	},
	{
		id: 'converterCard_Faderan_79',
		race: 'Faderan',
		frontTitle: 'Social Exodus',
		backTitle: 'Galactic Colonization',
		era: 3,
		isStartingCard: false,
		technology: 'Social Exodus',
		frontConverters: [
			{
				input: { resource: { white: 5 } },
				output: {
					resource: { ship: 2, point: 1, yellow: 1 },
					donation: { ship: 2, point: 1, yellow: 1, blue: 1 }
				}
			}
		],
		backConverters: [
			{
				input: { resource: { white: 5 } },
				output: {
					resource: { ship: 2, point: 2, yellow: 1 },
					donation: { ship: 2, point: 1, yellow: 1, blue: 1, green: 1 }
				}
			}
		],
		upgradeOptions: [
			{ technology: 'Galactic Telecomm Control' },
			{ technology: 'Xeno Cultural Exchange' }
		]
	},
	{
		id: 'converterCard_Faderan_80',
		race: 'Faderan',
		frontTitle: 'Quantum Computers',
		backTitle: 'Nondeterministic Polynomial Collapse',
		era: 1,
		isStartingCard: false,
		technology: 'Quantum Computers',
		frontConverters: [
			{ input: { resource: { black: 2 } }, output: { resource: { blue: 1, yellow: 1, brown: 1 } } }
		],
		backConverters: [
			{ input: { resource: { black: 2 } }, output: { resource: { blue: 1, yellow: 2, brown: 1 } } }
		],
		upgradeOptions: [{ technology: 'Universal Translator' }, { technology: 'Clinical Immortality' }]
	},
	{
		id: 'converterCard_Faderan_81',
		race: 'Faderan',
		frontTitle: 'Clinical Immortality',
		backTitle: 'Practical Immortality',
		era: 1,
		isStartingCard: false,
		technology: 'Clinical Immortality',
		frontConverters: [
			{ input: { resource: { blue: 2 } }, output: { resource: { point: 1, green: 1 } } }
		],
		backConverters: [
			{ input: { resource: { blue: 2 } }, output: { resource: { point: 1, black: 1, green: 1 } } }
		],
		upgradeOptions: [{ technology: 'Genetic Engineering' }, { technology: 'Atomic Transmutation' }]
	},
	{
		id: 'converterCard_Faderan_82',
		race: 'Faderan',
		frontTitle: 'Ubiquitous Cultural Repository',
		backTitle: 'Memetic Lifeforms',
		era: 1,
		isStartingCard: false,
		technology: 'Ubiquitous Cultural Repository',
		frontConverters: [
			{ input: { resource: { yellow: 2 } }, output: { resource: { point: 1, white: 1 } } }
		],
		backConverters: [
			{ input: { resource: { yellow: 2 } }, output: { resource: { point: 1, black: 1, white: 1 } } }
		],
		upgradeOptions: [{ technology: 'Universal Translator' }, { technology: 'Quantum Computers' }]
	},
	{
		id: 'converterCard_Faderan_83',
		race: 'Faderan',
		frontTitle: 'Achronal Analysis',
		backTitle: 'Time Viewers',
		era: 2,
		isStartingCard: false,
		technology: 'Achronal Analysis',
		frontConverters: [
			{
				input: { resource: { black: 3 } },
				output: { resource: { hexagon: 1, blue: 1, white: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { black: 3 } },
				output: { resource: { hexagon: 1, blue: 1, yellow: 1, brown: 1, white: 2 } }
			}
		],
		upgradeOptions: [{ technology: 'Antimatter Power' }, { technology: 'Singularity Control' }]
	},
	{
		id: 'converterCard_Faderan_84',
		race: 'Faderan',
		frontTitle: 'Organic Construction',
		backTitle: 'Living Infrastructure',
		era: 2,
		isStartingCard: false,
		technology: 'Organic Construction',
		frontConverters: [
			{
				input: { resource: { blue: 3 } },
				output: { resource: { ship: 2, white: 1, brown: 2, green: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { blue: 3 } },
				output: { resource: { ship: 2, yellow: 1, white: 1, brown: 2, green: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Interspecies Medical Exchange' },
			{ technology: 'Cross Species Ethical Equality' }
		]
	},
	{
		id: 'converterCard_Faderan_85',
		race: 'Faderan',
		frontTitle: 'Hyperspace Mining',
		backTitle: 'Hyperspace Settlements',
		era: 2,
		isStartingCard: false,
		technology: 'Hyperspace Mining',
		frontConverters: [
			{
				input: { resource: { yellow: 3 } },
				output: { resource: { hexagon: 1, black: 1 }, donation: { yellow: 1, black: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { yellow: 3 } },
				output: { resource: { hexagon: 1, black: 2, brown: 2 }, donation: { yellow: 1, black: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Antimatter Power' }, { technology: 'Singularity Control' }]
	},
	{
		id: 'converterCard_Faderan_86',
		race: 'Faderan',
		frontTitle: 'Galactic Telecom Control',
		backTitle: 'Galactic Domination',
		era: 3,
		isStartingCard: false,
		technology: 'Galactic Telecomm Control',
		frontConverters: [
			{ input: { resource: { black: 4 } }, output: { resource: { point: 3, white: 2, green: 1 } } }
		],
		backConverters: [
			{
				input: { resource: { black: 4 } },
				output: { resource: { point: 4, yellow: 1, white: 2, green: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Poly Species Corporations' }, { technology: 'Social Exodus' }]
	},
	{
		id: 'converterCard_Faderan_87',
		race: 'Faderan',
		frontTitle: 'Temporal Dilation',
		backTitle: 'Stasis Field',
		era: 3,
		isStartingCard: false,
		technology: 'Temporal Dilation',
		frontConverters: [
			{
				input: { resource: { blue: 4 } },
				output: { resource: { point: 2, hexagon: 1, green: 1, brown: 2 } }
			}
		],
		backConverters: [
			{
				input: { resource: { blue: 4 } },
				output: { resource: { point: 3, hexagon: 1, green: 1, brown: 2 }, donation: { hexagon: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Megastructures' }, { technology: 'Matter Generation' }]
	},
	{
		id: 'converterCard_Faderan_88',
		race: 'Faderan',
		frontTitle: 'Matter Generation',
		backTitle: 'Macroscale Teleportation',
		era: 3,
		isStartingCard: false,
		technology: 'Matter Generation',
		frontConverters: [
			{
				input: { resource: { yellow: 4 } },
				output: { resource: { point: 2, hexagon: 1, blue: 1, green: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { yellow: 4 } },
				output: { resource: { point: 3, hexagon: 1, blue: 1, green: 1, brown: 2 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Poly Species Corporations' },
			{ technology: 'Temporal Dilation' }
		]
	},
	{
		id: 'converterCard_Faderan_89',
		race: 'Faderan',
		frontTitle: 'Relic Repurposing',
		backTitle: 'Relic Manufacturing',
		era: 2,
		isStartingCard: true,
		frontConverters: [
			{ input: { resource: { brown: 2 } }, output: { resource: { ship: 2, white: 1 } } }
		],
		backConverters: [
			{ input: { resource: { brown: 2 } }, output: { resource: { ship: 2, white: 2, green: 1 } } }
		],
		upgradeOptions: [{ technology: 'Achronal Analysis' }, { technology: 'Antimatter Power' }]
	},
	{
		id: 'converterCard_Faderan_90',
		race: 'Faderan',
		frontTitle: 'Archaic Automated Support Network',
		backTitle: 'Domesticated Automated Support Network',
		era: 2,
		isStartingCard: true,
		frontConverters: [{ output: { resource: { ship: 1, white: 1, green: 1, brown: 1 } } }],
		backConverters: [
			{
				output: {
					resource: { ship: 1, white: 1, green: 1, brown: 1 },
					donation: { black: 1, yellow: 1 }
				}
			}
		],
		upgradeOptions: [{ technology: 'Singularity Control' }, { technology: 'Hyperspace Mining' }]
	},
	{
		id: 'converterCard_Faderan_91',
		race: 'Faderan',
		frontTitle: 'Atomic Transmutation',
		backTitle: 'Pseudomaterials',
		era: 1,
		isStartingCard: false,
		technology: 'Atomic Transmutation',
		frontConverters: [
			{
				input: { resource: { hexagon: 1 } },
				output: { resource: { blue: 1, yellow: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { hexagon: 1 } },
				output: { resource: { blue: 2, yellow: 1, brown: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Ubiquitous Cultural Repository' },
			{ technology: 'Nanotechnology' }
		]
	},
	{
		id: 'converterCard_Faderan_92',
		race: 'Faderan',
		frontTitle: 'Ritual Government',
		backTitle: 'Interspecies Capital',
		era: 2,
		isStartingCard: true,
		frontConverters: [
			{
				input: { resource: { white: 4 } },
				output: { resource: { hexagon: 1, black: 1, green: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { white: 4 } },
				output: { resource: { hexagon: 1, black: 1, green: 1 }, donation: { point: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Cross Species Ethical Equality' },
			{ technology: 'Interspecies Medical Exchange' }
		]
	},
	{
		id: 'converterCard_Faderan_93',
		race: 'Faderan',
		frontTitle: 'Non-Indigenous Fauna',
		backTitle: 'Genetically Pliable Fauna',
		era: 1,
		isStartingCard: true,
		frontConverters: [
			{ input: { resource: { green: 3 } }, output: { resource: { blue: 1, yellow: 1, brown: 1 } } }
		],
		backConverters: [
			{ input: { resource: { green: 3 } }, output: { resource: { blue: 2, yellow: 1, brown: 1 } } }
		],
		upgradeOptions: [{ technology: 'Genetic Engineering' }, { technology: 'Clinical Immortality' }]
	},
	{
		id: 'converterCard_Faderan_94',
		race: 'Faderan',
		frontTitle: 'Singularity Control',
		backTitle: 'Wormhole Grid',
		era: 2,
		isStartingCard: false,
		technology: 'Singularity Control',
		frontConverters: [
			{
				input: { resource: { hexagon: 2 } },
				output: { resource: { ship: 1, black: 2, blue: 1, brown: 1, green: 1, white: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { hexagon: 2 } },
				output: { resource: { ship: 1, blue: 1, black: 2, green: 3, white: 1, brown: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Hyperspace Mining' }, { technology: 'Achronal Analysis' }]
	},
	{
		id: 'converterCard_Faderan_96',
		race: 'Faderan',
		frontTitle: 'Megastructures',
		backTitle: 'Dyson Swarms',
		era: 3,
		isStartingCard: false,
		technology: 'Megastructures',
		frontConverters: [
			{
				input: { resource: { hexagon: 3 } },
				output: { resource: { point: 5, white: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { hexagon: 3 } },
				output: { resource: { point: 6, black: 1, white: 1, brown: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Temporal Dilation' }, { technology: 'Matter Generation' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_130',
		race: 'Kjasjavikalimm',
		frontTitle: 'Nanotechnology',
		backTitle: 'Nanofabricators',
		era: 1,
		isStartingCard: false,
		technology: 'Nanotechnology',
		frontConverters: [
			{ input: { resource: { brown: 3 } }, output: { resource: { hexagon: 1, green: 1 } } }
		],
		backConverters: [
			{
				input: { resource: { brown: 3 } },
				output: { resource: { hexagon: 1, black: 1, green: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Genetic Engineering' }, { technology: 'Atomic Transmutation' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_131',
		race: 'Kjasjavikalimm',
		frontTitle: 'Genetic Engineering',
		backTitle: 'Genetic Resynthesis',
		era: 1,
		isStartingCard: false,
		technology: 'Genetic Engineering',
		frontConverters: [
			{ input: { resource: { green: 3 } }, output: { resource: { blue: 1, black: 1, white: 1 } } }
		],
		backConverters: [
			{ input: { resource: { green: 3 } }, output: { resource: { blue: 1, black: 2, white: 1 } } }
		],
		upgradeOptions: [{ technology: 'Nanotechnology' }, { technology: 'Clinical Immortality' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_132',
		race: 'Kjasjavikalimm',
		frontTitle: 'Universal Translator',
		backTitle: 'Universal Empathetic Communication',
		era: 1,
		isStartingCard: false,
		technology: 'Universal Translator',
		frontConverters: [
			{
				input: { resource: { white: 3 } },
				output: { resource: { point: 1 }, donation: { black: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { white: 3 } },
				output: { resource: { point: 1 }, donation: { black: 1, white: 1, green: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Ubiquitous Cultural Repository' },
			{ technology: 'Quantum Computers' }
		]
	},
	{
		id: 'converterCard_Kjasjavikalimm_133',
		race: 'Kjasjavikalimm',
		frontTitle: 'Antimatter Power',
		backTitle: 'Antimatter Compounds',
		era: 2,
		isStartingCard: false,
		technology: 'Antimatter Power',
		frontConverters: [
			{ input: { resource: { brown: 4 } }, output: { resource: { black: 2, yellow: 1, white: 1 } } }
		],
		backConverters: [
			{
				input: { resource: { brown: 4 } },
				output: { resource: { yellow: 1, black: 2, green: 1, white: 2 } }
			}
		],
		upgradeOptions: [{ technology: 'Hyperspace Mining' }, { technology: 'Organic Construction' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_134',
		race: 'Kjasjavikalimm',
		frontTitle: 'Interspecies Medical Exchange',
		backTitle: 'Panbiologic Medicine',
		era: 2,
		isStartingCard: false,
		technology: 'Interspecies Medical Exchange',
		frontConverters: [
			{
				input: { resource: { green: 4 } },
				output: { resource: { point: 1, white: 1 }, donation: { green: 2 } }
			}
		],
		backConverters: [
			{
				input: { resource: { green: 4 } },
				output: { resource: { point: 1, black: 1, white: 2 }, donation: { green: 2 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Cross Species Ethical Equality' },
			{ technology: 'Organic Construction' }
		]
	},
	{
		id: 'converterCard_Kjasjavikalimm_135',
		race: 'Kjasjavikalimm',
		frontTitle: 'Cross Species Ethical Equality',
		backTitle: 'Concrete Universal Metaethics',
		era: 2,
		isStartingCard: false,
		technology: 'Cross Species Ethical Equality',
		frontConverters: [
			{
				input: { resource: { white: 4 } },
				output: { resource: { point: 1 }, donation: { point: 1, white: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { white: 4 } },
				output: { resource: { hexagon: 1, point: 1 }, donation: { point: 1, white: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Interspecies Medical Exchange' },
			{ technology: 'Achronal Analysis' }
		]
	},
	{
		id: 'converterCard_Kjasjavikalimm_136',
		race: 'Kjasjavikalimm',
		frontTitle: 'Xeno Cultural Exchange',
		backTitle: 'Multispecies Hybrid Cultures',
		era: 3,
		isStartingCard: false,
		technology: 'Xeno Cultural Exchange',
		frontConverters: [
			{
				input: { resource: { brown: 5 } },
				output: { resource: { point: 1, black: 1, white: 1, green: 3 }, donation: { point: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { brown: 5 } },
				output: {
					resource: { point: 2, black: 1, white: 1, green: 3 },
					donation: { point: 1, black: 1, brown: 1 }
				}
			}
		],
		upgradeOptions: [{ technology: 'Megastructures' }, { technology: 'Social Exodus' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_137',
		race: 'Kjasjavikalimm',
		frontTitle: 'Poly Species Corporations',
		backTitle: 'Full Interspecies Integration',
		era: 3,
		isStartingCard: false,
		technology: 'Poly Species Corporations',
		frontConverters: [
			{
				input: { resource: { green: 5 } },
				output: {
					resource: { ship: 2, point: 1, yellow: 2 },
					donation: { brown: 1, green: 1, white: 2 }
				}
			}
		],
		backConverters: [
			{
				input: { resource: { green: 5 } },
				output: {
					resource: { ship: 2, point: 2, yellow: 2 },
					donation: { brown: 2, green: 1, white: 2 }
				}
			}
		],
		upgradeOptions: [
			{ technology: 'Galactic Telecomm Control' },
			{ technology: 'Xeno Cultural Exchange' }
		]
	},
	{
		id: 'converterCard_Kjasjavikalimm_138',
		race: 'Kjasjavikalimm',
		frontTitle: 'Social Exodus',
		backTitle: 'Galactic Colonization',
		era: 3,
		isStartingCard: false,
		technology: 'Social Exodus',
		frontConverters: [
			{
				input: { resource: { white: 5 } },
				output: {
					resource: { ship: 2, point: 1, blue: 1 },
					donation: { ship: 2, point: 1, black: 1, blue: 1 }
				}
			}
		],
		backConverters: [
			{
				input: { resource: { white: 5 } },
				output: {
					resource: { ship: 2, point: 2, blue: 1 },
					donation: { ship: 2, point: 1, black: 1, blue: 1, green: 1 }
				}
			}
		],
		upgradeOptions: [
			{ technology: 'Galactic Telecomm Control' },
			{ technology: 'Xeno Cultural Exchange' }
		]
	},
	{
		id: 'converterCard_Kjasjavikalimm_139',
		race: 'Kjasjavikalimm',
		frontTitle: 'Quantum Computers',
		backTitle: 'Nondeterministic Polynomial Collapse',
		era: 1,
		isStartingCard: false,
		technology: 'Quantum Computers',
		frontConverters: [
			{ input: { resource: { black: 2 } }, output: { resource: { blue: 1, yellow: 1, white: 1 } } }
		],
		backConverters: [
			{ input: { resource: { black: 2 } }, output: { resource: { blue: 1, yellow: 2, white: 1 } } }
		],
		upgradeOptions: [{ technology: 'Universal Translator' }, { technology: 'Clinical Immortality' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_140',
		race: 'Kjasjavikalimm',
		frontTitle: 'Clinical Immortality',
		backTitle: 'Practical Immortality',
		era: 1,
		isStartingCard: false,
		technology: 'Clinical Immortality',
		frontConverters: [
			{ input: { resource: { blue: 2 } }, output: { resource: { point: 1, green: 1 } } }
		],
		backConverters: [
			{ input: { resource: { blue: 2 } }, output: { resource: { point: 1, black: 1, green: 1 } } }
		],
		upgradeOptions: [{ technology: 'Genetic Engineering' }, { technology: 'Atomic Transmutation' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_141',
		race: 'Kjasjavikalimm',
		frontTitle: 'Ubiquitous Cultural Repository',
		backTitle: 'Memetic Lifeforms',
		era: 1,
		isStartingCard: false,
		technology: 'Ubiquitous Cultural Repository',
		frontConverters: [
			{ input: { resource: { yellow: 2 } }, output: { resource: { point: 1, green: 1 } } }
		],
		backConverters: [
			{ input: { resource: { yellow: 2 } }, output: { resource: { point: 1, black: 1, green: 1 } } }
		],
		upgradeOptions: [{ technology: 'Universal Translator' }, { technology: 'Quantum Computers' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_142',
		race: 'Kjasjavikalimm',
		frontTitle: 'Achronal Analysis',
		backTitle: 'Time Viewers',
		era: 2,
		isStartingCard: false,
		technology: 'Achronal Analysis',
		frontConverters: [
			{
				input: { resource: { black: 3 } },
				output: { resource: { hexagon: 1, blue: 1, white: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { black: 3 } },
				output: { resource: { hexagon: 1, blue: 1, yellow: 1, green: 1, brown: 1, white: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Antimatter Power' }, { technology: 'Singularity Control' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_143',
		race: 'Kjasjavikalimm',
		frontTitle: 'Organic Construction',
		backTitle: 'Living Infrastructure',
		era: 2,
		isStartingCard: false,
		technology: 'Organic Construction',
		frontConverters: [
			{
				input: { resource: { blue: 3 } },
				output: { resource: { ship: 2, white: 1, brown: 1, green: 2 } }
			}
		],
		backConverters: [
			{
				input: { resource: { blue: 3 } },
				output: { resource: { ship: 2, black: 1, white: 1, brown: 1, green: 2 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Interspecies Medical Exchange' },
			{ technology: 'Cross Species Ethical Equality' }
		]
	},
	{
		id: 'converterCard_Kjasjavikalimm_144',
		race: 'Kjasjavikalimm',
		frontTitle: 'Hyperspace Mining',
		backTitle: 'Hyperspace Settlements',
		era: 2,
		isStartingCard: false,
		technology: 'Hyperspace Mining',
		frontConverters: [
			{
				input: { resource: { yellow: 3 } },
				output: { resource: { hexagon: 1, black: 1 }, donation: { black: 2 } }
			}
		],
		backConverters: [
			{
				input: { resource: { yellow: 3 } },
				output: {
					resource: { hexagon: 1, blue: 1, black: 1, white: 1, green: 1 },
					donation: { black: 2 }
				}
			}
		],
		upgradeOptions: [{ technology: 'Antimatter Power' }, { technology: 'Singularity Control' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_145',
		race: 'Kjasjavikalimm',
		frontTitle: 'Galactic Telecomm Control',
		backTitle: 'Galactic Domination',
		era: 3,
		isStartingCard: false,
		technology: 'Galactic Telecomm Control',
		frontConverters: [
			{ input: { resource: { black: 4 } }, output: { resource: { point: 3, brown: 2, white: 1 } } }
		],
		backConverters: [
			{
				input: { resource: { black: 4 } },
				output: { resource: { point: 4, blue: 1, brown: 2, white: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Poly Species Corporations' }, { technology: 'Social Exodus' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_146',
		race: 'Kjasjavikalimm',
		frontTitle: 'Temporal Dilation',
		backTitle: 'Stasis Field',
		era: 3,
		isStartingCard: false,
		technology: 'Temporal Dilation',
		frontConverters: [
			{
				input: { resource: { blue: 4 } },
				output: { resource: { point: 2, hexagon: 1, white: 1, green: 2 } }
			}
		],
		backConverters: [
			{
				input: { resource: { blue: 4 } },
				output: { resource: { point: 3, hexagon: 1, white: 1, green: 2 }, donation: { hexagon: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Megastructures' }, { technology: 'Matter Generation' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_147',
		race: 'Kjasjavikalimm',
		frontTitle: 'Matter Generation',
		backTitle: 'Macroscale Teleportation',
		era: 3,
		isStartingCard: false,
		technology: 'Matter Generation',
		frontConverters: [
			{
				input: { resource: { yellow: 4 } },
				output: { resource: { point: 2, hexagon: 1, blue: 1, white: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { yellow: 4 } },
				output: { resource: { point: 3, hexagon: 1, blue: 1, white: 1, brown: 2 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Poly Species Corporations' },
			{ technology: 'Temporal Dilation' }
		]
	},
	{
		id: 'converterCard_Kjasjavikalimm_148',
		race: 'Kjasjavikalimm',
		frontTitle: 'Starstrider Jumpcores',
		backTitle: 'Fastjump Network',
		era: 2,
		isStartingCard: true,
		frontConverters: [
			{ input: { resource: { blue: 2 } }, output: { resource: { ship: 4, green: 1 } } }
		],
		backConverters: [
			{ input: { resource: { blue: 2 } }, output: { resource: { ship: 5, point: 1 } } }
		],
		upgradeOptions: [{ technology: 'Hyperspace Mining' }, { technology: 'Singularity Control' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_149',
		race: 'Kjasjavikalimm',
		frontTitle: 'Underground Cities',
		backTitle: 'Asteroid Mine Network',
		era: 2,
		isStartingCard: true,
		frontConverters: [{ output: { resource: { ship: 3, brown: 2 } } }],
		backConverters: [{ output: { resource: { ship: 3, blue: 1, brown: 2 } } }],
		upgradeOptions: [{ technology: 'Organic Construction' }, { technology: 'Antimatter Power' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_150',
		race: 'Kjasjavikalimm',
		frontTitle: 'Atomic Transmutation',
		backTitle: 'Pseudomaterials',
		era: 1,
		isStartingCard: false,
		technology: 'Atomic Transmutation',
		frontConverters: [
			{
				input: { resource: { hexagon: 1 } },
				output: { resource: { yellow: 1, black: 1, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { hexagon: 1 } },
				output: { resource: { blue: 1, black: 1, yellow: 1, brown: 1 } }
			}
		],
		upgradeOptions: [
			{ technology: 'Ubiquitous Cultural Repository' },
			{ technology: 'Nanotechnology' }
		]
	},
	{
		id: 'converterCard_Kjasjavikalimm_151',
		race: 'Kjasjavikalimm',
		frontTitle: 'Perfume Pheromone Loyalty',
		backTitle: 'Multiconformal Pheromonics',
		era: 1,
		isStartingCard: true,
		frontConverters: [
			{
				input: { resource: { brown: 4 } },
				output: { resource: { yellow: 1, blue: 1, black: 1, white: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { brown: 4 } },
				output: {
					resource: { yellow: 1, black: 1, blue: 1, white: 1 },
					donation: { brown: 1, green: 1 }
				}
			}
		],
		upgradeOptions: [{ technology: 'Genetic Engineering' }, { technology: 'Nanotechnology' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_152',
		race: 'Kjasjavikalimm',
		frontTitle: 'Singularity Control',
		backTitle: 'Wormhole Grid',
		era: 2,
		isStartingCard: false,
		technology: 'Singularity Control',
		frontConverters: [
			{
				input: { resource: { hexagon: 2 } },
				output: { resource: { ship: 1, black: 1, yellow: 1, blue: 1, white: 2, brown: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { hexagon: 2 } },
				output: { resource: { ship: 1, black: 1, yellow: 1, blue: 1, white: 3, brown: 2 } }
			}
		],
		upgradeOptions: [{ technology: 'Hyperspace Mining' }, { technology: 'Achronal Analysis' }]
	},
	{
		id: 'converterCard_Kjasjavikalimm_154',
		race: 'Kjasjavikalimm',
		frontTitle: 'Megastructures',
		backTitle: 'Dyson Swarms',
		era: 3,
		isStartingCard: false,
		technology: 'Megastructures',
		frontConverters: [
			{
				input: { resource: { hexagon: 3 } },
				output: { resource: { point: 5, white: 1, green: 1 } }
			}
		],
		backConverters: [
			{
				input: { resource: { hexagon: 3 } },
				output: { resource: { point: 6, yellow: 1, white: 1, green: 1 } }
			}
		],
		upgradeOptions: [{ technology: 'Temporal Dilation' }, { technology: 'Matter Generation' }]
	}
] as const;

export const converterCardMap: Record<string, ConverterCard> = Object.fromEntries(
	converterCards.map((x) => [x.id, x])
);

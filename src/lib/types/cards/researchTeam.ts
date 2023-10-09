import type { Converter, SingleConverter } from './converter';

export type ResearchTeam = {
	id: string;
	title: string;
	era?: number;
	acquisitionConverters?: SingleConverter[];
	researchConverters?: Converter[];
	result: {
		technology?: string;
	};
};

export const technologies = [
	'Nanotechnology',
	'Quantum Computers',
	'Universal Translator',
	'Genetic Engineering',
	'Clinical Immortality',
	'Ubiquitous Cultural Repository',
	'Atomic Transmutation',
	'Interspecies Medical Exchange',
	'Hyperspace Mining',
	'Singularity Control',
	'Cross Species Ethical Equality',
	'Antimatter Power',
	'Achronal Analysis',
	'Organic Construction',
	'Megastructures',
	'Social Exodus',
	'Matter Generation',
	'Galactic Telecomm Control',
	'Poly Species Corporations',
	'Xeno Cultural Exchange',
	'Temporal Dilation'
] as const;
export type TechnologyType = (typeof technologies)[number];

export const researchTeams: readonly ResearchTeam[] = [
	{
		id: 'researchTeam_319',
		title: 'Mechanical Engineers',
		era: 1,
		researchConverters: [
			{
				input: [{ resource: { yellow: 4 } }, { resource: { hexagon: 2 } }],
				output: { resource: { point: 1 }, sharingBonus: true }
			}
		],
		result: { technology: 'Nanotechnology' }
	},
	{
		id: 'researchTeam_320',
		title: 'Computational Theoreticians',
		era: 1,
		researchConverters: [
			{
				input: [{ resource: { white: 6 } }, { resource: { blue: 4 } }],
				output: { resource: { point: 1 }, sharingBonus: true }
			}
		],
		result: { technology: 'Quantum Computers' }
	},
	{
		id: 'researchTeam_321',
		title: 'Linguistic Analysts',
		era: 1,
		researchConverters: [
			{
				input: [{ resource: { green: 6 } }, { resource: { black: 4 } }],
				output: { resource: { point: 1 }, sharingBonus: true }
			}
		],
		result: { technology: 'Universal Translator' }
	},
	{
		id: 'researchTeam_322',
		title: 'Organic Chemists',
		era: 1,
		researchConverters: [
			{
				input: [{ resource: { brown: 6 } }, { resource: { blue: 4 } }],
				output: { resource: { point: 1 }, sharingBonus: true }
			}
		],
		result: { technology: 'Genetic Engineering' }
	},
	{
		id: 'researchTeam_323',
		title: 'Pharmaceutical Scientists',
		era: 1,
		researchConverters: [
			{
				input: [{ resource: { green: 6 } }, { resource: { hexagon: 2 } }],
				output: { resource: { point: 1 }, sharingBonus: true }
			}
		],
		result: { technology: 'Clinical Immortality' }
	},
	{
		id: 'researchTeam_324',
		title: 'Sociologists',
		era: 1,
		researchConverters: [
			{
				input: [{ resource: { white: 6 } }, { resource: { black: 4 } }],
				output: { resource: { point: 1 }, sharingBonus: true }
			}
		],
		result: { technology: 'Ubiquitous Cultural Repository' }
	},
	{
		id: 'researchTeam_325',
		title: 'Nuclear Physicists',
		era: 1,
		researchConverters: [
			{
				input: [{ resource: { brown: 6 } }, { resource: { yellow: 4 } }],
				output: { resource: { point: 1 }, sharingBonus: true }
			}
		],
		result: { technology: 'Atomic Transmutation' }
	},
	{
		id: 'researchTeam_326',
		title: 'Comparative Physiologists',
		era: 2,
		researchConverters: [
			{
				input: [{ resource: { brown: 9 } }, { resource: { black: 6 } }],
				output: { resource: { point: 3 }, sharingBonus: true }
			}
		],
		result: { technology: 'Interspecies Medical Exchange' }
	},
	{
		id: 'researchTeam_327',
		title: 'N-Space Mathematicians',
		era: 2,
		researchConverters: [
			{
				input: [{ resource: { blue: 8 } }, { resource: { hexagon: 4 } }],
				output: { resource: { point: 4 }, sharingBonus: true }
			}
		],
		result: { technology: 'Hyperspace Mining' }
	},
	{
		id: 'researchTeam_328',
		title: 'Gravitic Topologists',
		era: 2,
		researchConverters: [
			{
				input: [{ resource: { brown: 12 } }, { resource: { green: 12 } }],
				output: { resource: { point: 4 }, sharingBonus: true }
			}
		],
		result: { technology: 'Singularity Control' }
	},
	{
		id: 'researchTeam_329',
		title: 'Metaethicists',
		era: 2,
		researchConverters: [
			{
				input: [{ resource: { yellow: 7 } }, { resource: { black: 7 } }],
				output: { resource: { point: 4 }, sharingBonus: true }
			}
		],
		result: { technology: 'Cross Species Ethical Equality' }
	},
	{
		id: 'researchTeam_330',
		title: 'Quantum Theoreticians',
		era: 2,
		researchConverters: [
			{
				input: [{ resource: { green: 9 } }, { resource: { blue: 6 } }],
				output: { resource: { point: 3 }, sharingBonus: true }
			}
		],
		result: { technology: 'Antimatter Power' }
	},
	{
		id: 'researchTeam_331',
		title: 'Quantum Statisticians',
		era: 2,
		researchConverters: [
			{
				input: [{ resource: { white: 12 } }, { resource: { hexagon: 4 } }],
				output: { resource: { point: 4 }, sharingBonus: true }
			}
		],
		result: { technology: 'Achronal Analysis' }
	},
	{
		id: 'researchTeam_332',
		title: 'Organic Architects',
		era: 2,
		researchConverters: [
			{
				input: [{ resource: { white: 9 } }, { resource: { yellow: 6 } }],
				output: { resource: { point: 3 }, sharingBonus: true }
			}
		],
		result: { technology: 'Organic Construction' }
	},
	{
		id: 'researchTeam_333',
		title: 'Stellar Architectural Planners',
		era: 3,
		researchConverters: [
			{
				input: [{ resource: { blue: 14 } }, { resource: { yellow: 14 } }],
				output: { resource: { point: 11 }, sharingBonus: true }
			}
		],
		result: { technology: 'Megastructures' }
	},
	{
		id: 'researchTeam_334',
		title: 'Psychohistorians',
		era: 3,
		researchConverters: [
			{
				input: [{ resource: { black: 12 } }, { resource: { hexagon: 6 } }],
				output: { resource: { point: 9 }, sharingBonus: true }
			}
		],
		result: { technology: 'Social Exodus' }
	},
	{
		id: 'researchTeam_335',
		title: 'Subquantum Manipulators',
		era: 3,
		researchConverters: [
			{
				input: [{ resource: { green: 18 } }, { resource: { white: 18 } }],
				output: { resource: { point: 9 }, sharingBonus: true }
			}
		],
		result: { technology: 'Matter Generation' }
	},
	{
		id: 'researchTeam_336',
		title: 'Memetic Artists',
		era: 3,
		researchConverters: [
			{
				input: [{ resource: { brown: 18 } }, { resource: { white: 18 } }],
				output: { resource: { point: 9 }, sharingBonus: true }
			}
		],
		result: { technology: 'Galactic Telecomm Control' }
	},
	{
		id: 'researchTeam_337',
		title: 'Interspecies Managers',
		era: 3,
		researchConverters: [
			{
				input: [{ resource: { blue: 11 } }, { resource: { black: 11 } }],
				output: { resource: { point: 8 }, sharingBonus: true }
			}
		],
		result: { technology: 'Poly Species Corporations' }
	},
	{
		id: 'researchTeam_338',
		title: 'Cultural Diffusionologists',
		era: 3,
		researchConverters: [
			{
				input: [{ resource: { green: 15 } }, { resource: { yellow: 10 } }],
				output: { resource: { point: 7 }, sharingBonus: true }
			}
		],
		result: { technology: 'Xeno Cultural Exchange' }
	},
	{
		id: 'researchTeam_339',
		title: 'Chronophysicists',
		era: 3,
		researchConverters: [
			{
				input: [{ resource: { brown: 18 } }, { resource: { hexagon: 6 } }],
				output: { resource: { point: 9 }, sharingBonus: true }
			}
		],
		result: { technology: 'Temporal Dilation' }
	},
	{
		id: 'researchTeam_340',
		title: 'Cultural Polymorphologists',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { white: 18 } },
					{ resource: { brown: 18 } },
					{ resource: { hexagon: 6 } }
				],
				output: { resource: { point: 8 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_341',
		title: 'Reconstructive Paleobotanists',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { white: 21 } },
					{ resource: { green: 21 } },
					{ resource: { hexagon: 7 } }
				],
				output: { resource: { point: 10 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_342',
		title: 'Abiotic Pathologists',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { white: 24 } },
					{ resource: { yellow: 16 } },
					{ resource: { hexagon: 8 } }
				],
				output: { resource: { point: 12 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_343',
		title: 'Interphasal Theoreticians',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { brown: 24 } },
					{ resource: { green: 24 } },
					{ resource: { hexagon: 8 } }
				],
				output: { resource: { point: 12 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_344',
		title: 'Mesoscale Geoengineers',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { brown: 27 } },
					{ resource: { yellow: 18 } },
					{ resource: { hexagon: 9 } }
				],
				output: { resource: { point: 14 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_345',
		title: 'Sapience Developers',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { white: 21 } },
					{ resource: { yellow: 14 } },
					{ resource: { black: 14 } }
				],
				output: { resource: { point: 10 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_346',
		title: 'Autonomic Teleoperators',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { blue: 12 } },
					{ resource: { yellow: 12 } },
					{ resource: { black: 12 } }
				],
				output: { resource: { point: 8 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_347',
		title: 'Fractal Microbiologists',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { white: 21 } },
					{ resource: { green: 21 } },
					{ resource: { blue: 14 } }
				],
				output: { resource: { point: 10 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_348',
		title: 'Stellar Plasma Flow Engineers',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { white: 21 } },
					{ resource: { blue: 14 } },
					{ resource: { black: 14 } }
				],
				output: { resource: { point: 10 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_349',
		title: 'Chaos Theoreticians',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { green: 18 } },
					{ resource: { yellow: 12 } },
					{ resource: { black: 12 } }
				],
				output: { resource: { point: 8 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_350',
		title: 'Oceanographic Biotechnicians',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { brown: 18 } },
					{ resource: { blue: 12 } },
					{ resource: { hexagon: 6 } }
				],
				output: { resource: { point: 8 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_351',
		title: 'Recursive Metatheoreticians',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { white: 30 } },
					{ resource: { brown: 30 } },
					{ resource: { black: 20 } }
				],
				output: { resource: { point: 16 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_352',
		title: 'Singularity Control Technicians',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { black: 20 } },
					{ resource: { blue: 20 } },
					{ resource: { hexagon: 10 } }
				],
				output: { resource: { point: 16 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_353',
		title: 'Applied Topologists',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { white: 30 } },
					{ resource: { brown: 30 } },
					{ resource: { yellow: 20 } }
				],
				output: { resource: { point: 16 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_354',
		title: 'Metacognitive Ecologists',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { green: 30 } },
					{ resource: { blue: 20 } },
					{ resource: { hexagon: 10 } }
				],
				output: { resource: { point: 16 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_355',
		title: 'Plasma Auxonologists',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { green: 24 } },
					{ resource: { brown: 24 } },
					{ resource: { yellow: 16 } }
				],
				output: { resource: { point: 12 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_356',
		title: 'Psychohistorial Ethicists',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { green: 27 } },
					{ resource: { white: 27 } },
					{ resource: { black: 18 } }
				],
				output: { resource: { point: 14 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_357',
		title: 'Tachyon Astrotechnicians',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { green: 30 } },
					{ resource: { yellow: 20 } },
					{ resource: { blue: 20 } }
				],
				output: { resource: { point: 16 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_358',
		title: 'In Situ Genetic Editors',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { green: 24 } },
					{ resource: { brown: 24 } },
					{ resource: { black: 16 } }
				],
				output: { resource: { point: 12 }, sharingBonus: true }
			}
		],
		result: {}
	},
	{
		id: 'researchTeam_359',
		title: 'Macroscale Biophysicists',
		era: 4,
		researchConverters: [
			{
				input: [
					{ resource: { brown: 27 } },
					{ resource: { black: 18 } },
					{ resource: { blue: 18 } }
				],
				output: { resource: { point: 14 }, sharingBonus: true }
			}
		],
		result: {}
	}
];

export const researchTeamIds = researchTeams.map((x) => x.id);
export const researchTeamMap: Record<string, ResearchTeam> = Object.fromEntries(
	researchTeams.map((x) => [x.id, x])
);

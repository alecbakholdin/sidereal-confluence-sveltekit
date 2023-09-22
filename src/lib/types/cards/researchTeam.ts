import type { Converter } from './converter';

export type ResearchTeam = {
	id: string;
	title: string;
	acquisitionConverters?: Converter[];
	researchConverters?: Converter[];
	result: {
		technology?: string;
	};
};

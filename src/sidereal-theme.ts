import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const siderealTheme: CustomThemeConfig = {
	name: 'sidereal-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base':
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		'--theme-font-family-heading':
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #0FBA81
		'--color-primary-50': '219 245 236', // #dbf5ec
		'--color-primary-100': '207 241 230', // #cff1e6
		'--color-primary-200': '195 238 224', // #c3eee0
		'--color-primary-300': '159 227 205', // #9fe3cd
		'--color-primary-400': '87 207 167', // #57cfa7
		'--color-primary-500': '15 186 129', // #0FBA81
		'--color-primary-600': '14 167 116', // #0ea774
		'--color-primary-700': '11 140 97', // #0b8c61
		'--color-primary-800': '9 112 77', // #09704d
		'--color-primary-900': '7 91 63', // #075b3f
		// secondary | #A621E9
		'--color-secondary-50': '242 222 252', // #f2defc
		'--color-secondary-100': '237 211 251', // #edd3fb
		'--color-secondary-200': '233 200 250', // #e9c8fa
		'--color-secondary-300': '219 166 246', // #dba6f6
		'--color-secondary-400': '193 100 240', // #c164f0
		'--color-secondary-500': '166 33 233', // #A621E9
		'--color-secondary-600': '149 30 210', // #951ed2
		'--color-secondary-700': '125 25 175', // #7d19af
		'--color-secondary-800': '100 20 140', // #64148c
		'--color-secondary-900': '81 16 114', // #511072
		// tertiary | #0EA5E9
		'--color-tertiary-50': '219 242 252', // #dbf2fc
		'--color-tertiary-100': '207 237 251', // #cfedfb
		'--color-tertiary-200': '195 233 250', // #c3e9fa
		'--color-tertiary-300': '159 219 246', // #9fdbf6
		'--color-tertiary-400': '86 192 240', // #56c0f0
		'--color-tertiary-500': '14 165 233', // #0EA5E9
		'--color-tertiary-600': '13 149 210', // #0d95d2
		'--color-tertiary-700': '11 124 175', // #0b7caf
		'--color-tertiary-800': '8 99 140', // #08638c
		'--color-tertiary-900': '7 81 114', // #075172
		// success | #84cc16
		'--color-success-50': '237 247 220', // #edf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '206 235 162', // #ceeba2
		'--color-success-400': '169 219 92', // #a9db5c
		'--color-success-500': '132 204 22', // #84cc16
		'--color-success-600': '119 184 20', // #77b814
		'--color-success-700': '99 153 17', // #639911
		'--color-success-800': '79 122 13', // #4f7a0d
		'--color-success-900': '65 100 11', // #41640b
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #ba0d1e
		'--color-error-50': '245 219 221', // #f5dbdd
		'--color-error-100': '241 207 210', // #f1cfd2
		'--color-error-200': '238 195 199', // #eec3c7
		'--color-error-300': '227 158 165', // #e39ea5
		'--color-error-400': '207 86 98', // #cf5662
		'--color-error-500': '186 13 30', // #ba0d1e
		'--color-error-600': '167 12 27', // #a70c1b
		'--color-error-700': '140 10 23', // #8c0a17
		'--color-error-800': '112 8 18', // #700812
		'--color-error-900': '91 6 15', // #5b060f
		// surface | #0d0c27
		'--color-surface-50': '221 221 226', // #dddde2
		'--color-surface-100': '210 210 216', // #d2d2d8
		'--color-surface-200': '199 199 207', // #c7c7cf
		'--color-surface-300': '165 165 178', // #a5a5b2
		'--color-surface-400': '98 97 120', // #626178
		'--color-surface-500': '30 29 62', // #1e1d3e
		'--color-surface-600': '27 26 56', // #1b1a38
		'--color-surface-700': '23 22 47', // #17162f
		'--color-surface-800': '18 17 37', // #121125
		'--color-surface-900': '15 14 30' // #0f0e1e
	}
};


import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const siderealTheme: CustomThemeConfig = {
    name: 'sidereal-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
		"--theme-font-family-heading": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "2px",
		"--theme-rounded-container": "4px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #ae7afe 
		"--color-primary-50": "243 235 255", // #f3ebff
		"--color-primary-100": "239 228 255", // #efe4ff
		"--color-primary-200": "235 222 255", // #ebdeff
		"--color-primary-300": "223 202 255", // #dfcaff
		"--color-primary-400": "198 162 254", // #c6a2fe
		"--color-primary-500": "174 122 254", // #ae7afe
		"--color-primary-600": "157 110 229", // #9d6ee5
		"--color-primary-700": "131 92 191", // #835cbf
		"--color-primary-800": "104 73 152", // #684998
		"--color-primary-900": "85 60 124", // #553c7c
		// secondary | #a76e41 
		"--color-secondary-50": "242 233 227", // #f2e9e3
		"--color-secondary-100": "237 226 217", // #ede2d9
		"--color-secondary-200": "233 219 208", // #e9dbd0
		"--color-secondary-300": "220 197 179", // #dcc5b3
		"--color-secondary-400": "193 154 122", // #c19a7a
		"--color-secondary-500": "167 110 65", // #a76e41
		"--color-secondary-600": "150 99 59", // #96633b
		"--color-secondary-700": "125 83 49", // #7d5331
		"--color-secondary-800": "100 66 39", // #644227
		"--color-secondary-900": "82 54 32", // #523620
		// tertiary | #2aa4f0 
		"--color-tertiary-50": "223 241 253", // #dff1fd
		"--color-tertiary-100": "212 237 252", // #d4edfc
		"--color-tertiary-200": "202 232 251", // #cae8fb
		"--color-tertiary-300": "170 219 249", // #aadbf9
		"--color-tertiary-400": "106 191 245", // #6abff5
		"--color-tertiary-500": "42 164 240", // #2aa4f0
		"--color-tertiary-600": "38 148 216", // #2694d8
		"--color-tertiary-700": "32 123 180", // #207bb4
		"--color-tertiary-800": "25 98 144", // #196290
		"--color-tertiary-900": "21 80 118", // #155076
		// success | #84f940 
		"--color-success-50": "237 254 226", // #edfee2
		"--color-success-100": "230 254 217", // #e6fed9
		"--color-success-200": "224 254 207", // #e0fecf
		"--color-success-300": "206 253 179", // #cefdb3
		"--color-success-400": "169 251 121", // #a9fb79
		"--color-success-500": "132 249 64", // #84f940
		"--color-success-600": "119 224 58", // #77e03a
		"--color-success-700": "99 187 48", // #63bb30
		"--color-success-800": "79 149 38", // #4f9526
		"--color-success-900": "65 122 31", // #417a1f
		// warning | #f8e277 
		"--color-warning-50": "254 251 235", // #fefbeb
		"--color-warning-100": "254 249 228", // #fef9e4
		"--color-warning-200": "253 248 221", // #fdf8dd
		"--color-warning-300": "252 243 201", // #fcf3c9
		"--color-warning-400": "250 235 160", // #faeba0
		"--color-warning-500": "248 226 119", // #f8e277
		"--color-warning-600": "223 203 107", // #dfcb6b
		"--color-warning-700": "186 170 89", // #baaa59
		"--color-warning-800": "149 136 71", // #958847
		"--color-warning-900": "122 111 58", // #7a6f3a
		// error | #fb5b73 
		"--color-error-50": "254 230 234", // #fee6ea
		"--color-error-100": "254 222 227", // #fedee3
		"--color-error-200": "254 214 220", // #fed6dc
		"--color-error-300": "253 189 199", // #fdbdc7
		"--color-error-400": "252 140 157", // #fc8c9d
		"--color-error-500": "251 91 115", // #fb5b73
		"--color-error-600": "226 82 104", // #e25268
		"--color-error-700": "188 68 86", // #bc4456
		"--color-error-800": "151 55 69", // #973745
		"--color-error-900": "123 45 56", // #7b2d38
		// surface | #3d486c 
		"--color-surface-50": "226 228 233", // #e2e4e9
		"--color-surface-100": "216 218 226", // #d8dae2
		"--color-surface-200": "207 209 218", // #cfd1da
		"--color-surface-300": "177 182 196", // #b1b6c4
		"--color-surface-400": "119 127 152", // #777f98
		"--color-surface-500": "61 72 108", // #3d486c
		"--color-surface-600": "55 65 97", // #374161
		"--color-surface-700": "46 54 81", // #2e3651
		"--color-surface-800": "37 43 65", // #252b41
		"--color-surface-900": "30 35 53", // #1e2335
		
	}
}
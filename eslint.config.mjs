import stylistic from "@stylistic/eslint-plugin"
import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"
import prettier from "eslint-config-prettier/flat"

const eslintConfig = [
	{
		ignores: [".next"],
	},
	...nextCoreWebVitals,
	...nextTypescript,
	prettier,
	{
		plugins: { "@stylistic": stylistic },
		rules: {
			// Typescript
			"@typescript-eslint/explicit-function-return-type": "error",

			// React
			"react/jsx-curly-brace-presence": "error",
			"react/jsx-no-useless-fragment": "error",
			"react/jsx-pascal-case": "error",
			"react/jsx-sort-props": "error",
			"react/no-array-index-key": "error",
			"react/prefer-stateless-function": "error",
			"react/self-closing-comp": "error",

			// ESLint

			"arrow-body-style": ["error", "as-needed"],

			"padding-line-between-statements": [
				"error",

				// Between blocks

				{ blankLine: "always", prev: "*", next: "block" },
				{ blankLine: "always", prev: "block", next: "*" },
				{ blankLine: "always", prev: "*", next: "block-like" },
				{ blankLine: "always", prev: "block-like", next: "*" },

				// Before and after every sequence of variable declarations
				{
					blankLine: "always",
					prev: "*",
					next: ["const", "let", "var"],
				},
				{
					blankLine: "always",
					prev: ["const", "let", "var"],
					next: "*",
				},
				{
					blankLine: "any",
					prev: ["const", "let", "var"],
					next: ["const", "let", "var"],
				},

				// Before and after class declaration, if, while, switch, try
				{
					blankLine: "always",
					prev: "*",
					next: ["class", "if", "while", "switch", "try"],
				},
				{
					blankLine: "always",
					prev: ["class", "if", "while", "switch", "try"],
					next: "*",
				},

				// Before return statements
				{ blankLine: "always", prev: "*", next: "return" },
			],
		},
	},
]

export default eslintConfig

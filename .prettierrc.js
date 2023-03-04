// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */

module.exports = {
	trailingComma: "all",
	useTabs: true,
	semi: false,
	singleQuote: false,
	tabWidth: 4,
	printWidth: 80,
	arrowParens: "always",
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrderMergeDuplicateImports: true,
	importOrder: [
		".*scss$",
		"<THIRD_PARTY_MODULES>",
		"^@mui/.*",
		"^@hooks$",
		"^(@lib)|(@utils)|(@server)$",
		"^(@|\\./)components/*",
		"^\\.?\\./.*",
		"^@client/.*",
		"^@endpoints/.*",
		"<TYPES>",
		"^@typings/.*",
		"^@seo-default$",
	],
}

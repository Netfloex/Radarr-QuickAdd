// @ts-check
const { join } = require("path")
const nextPwa = require("next-pwa")

/**
 * @type {import('next').NextConfig}
 **/

const config = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	sassOptions: {
		includePaths: [join(__dirname, "src", "styles")],
	},

	output: "standalone",
	experimental: {
		appDir: true,
	},
	modularizeImports: {
		"@mui/joy": {
			transform: "@mui/joy/{{member}}",
			preventFullImport: true,
		},
	},
}

module.exports = nextPwa({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
})(config)

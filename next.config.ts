import { NextConfig } from "next"
import { join } from "path"

const config: NextConfig = {
	sassOptions: {
		includePaths: [join(__dirname, "src", "styles")],
	},

	output: "standalone",

	modularizeImports: {
		"@mui/joy": {
			transform: "@mui/joy/{{member}}",
			preventFullImport: true,
		},
	},
}

export default config

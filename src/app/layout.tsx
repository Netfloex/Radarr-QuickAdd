import "@styles/global.scss"

import { SWRGlobalConfig } from "src/components/SWRGlobalConfig"

import { InitColorSchemeScript } from "@components/InitColorSchemeScript"
import { CssBaseline, CssVarsProvider } from "@components/joy"

import { FCC } from "@typings/FCC"

const RootLayout: FCC = ({ children }) => (
	<html lang="en" data-joy-color-scheme="dark">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width" />
		</head>
		<body>
			<CssVarsProvider defaultMode="system">
				<InitColorSchemeScript />
				<CssBaseline />
				<SWRGlobalConfig>{children}</SWRGlobalConfig>
			</CssVarsProvider>
		</body>
	</html>
)

export default RootLayout

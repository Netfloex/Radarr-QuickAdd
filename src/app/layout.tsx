import "@styles/global.scss"

import { SWRGlobalConfig } from "src/components/SWRGlobalConfig"

import { InitColorSchemeScript } from "@components/InitColorSchemeScript"
import { TrpcProvider } from "@components/TrpcProvider"
import { CssBaseline, CssVarsProvider } from "@components/joy"

import { FCC } from "@typings/FCC"

const RootLayout: FCC = ({ children }) => (
	<html lang="en" data-joy-color-scheme="dark">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width" />
		</head>
		<body>
			<TrpcProvider>
				<CssVarsProvider defaultMode="system">
					<InitColorSchemeScript />
					<CssBaseline />
					<SWRGlobalConfig>{children}</SWRGlobalConfig>
				</CssVarsProvider>
			</TrpcProvider>
		</body>
	</html>
)

export default RootLayout

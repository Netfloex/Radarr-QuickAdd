import "@styles/global.scss"

import { InitColorSchemeScript } from "@components/InitColorSchemeScript"
import { TrpcProvider } from "@components/TrpcProvider"
import { CssBaseline, CssVarsProvider } from "@components/joy"

import type { FCC } from "@typings/FCC"

const RootLayout: FCC = ({ children }) => (
	<html data-joy-color-scheme="dark" lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta content="width=device-width" name="viewport" />
			<link href="/manifest.json" rel="manifest" />
		</head>
		<body>
			<TrpcProvider>
				<CssVarsProvider defaultMode="system">
					<InitColorSchemeScript />
					<CssBaseline />
					{children}
				</CssVarsProvider>
			</TrpcProvider>
		</body>
	</html>
)

export default RootLayout

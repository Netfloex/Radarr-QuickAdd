import "@styles/global.scss"

import { SWRGlobalConfig } from "src/components/SWRGlobalConfig"

import { FCC } from "@typings/FCC"

const RootLayout: FCC = ({ children }) => (
	<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width" />
		</head>
		<body>
			<SWRGlobalConfig>{children}</SWRGlobalConfig>
		</body>
	</html>
)

export default RootLayout

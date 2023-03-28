import { Metadata } from "next"

import { Settings } from "./Settings"

import type { FC } from "react"

export const metadata: Metadata = {
	title: "Settings | Radarr Quickadd",
	description: "Quickly download movies via Radarr",
}

const Page: FC = () => {
	return <Settings />
}

export default Page

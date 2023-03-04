import type { Metadata } from "next"
import { FC } from "react"

import { Dashboard } from "./Dashboard"

export const metadata: Metadata = {
	title: "Radarr Quickadd",
	description: "Quickly download movies via Radarr",
}

const Page: FC = () => {
	return <Dashboard />
}

export default Page

import { Dashboard } from "./Dashboard"

import type { Metadata } from "next"
import type { FC } from "react"

export const metadata: Metadata = {
	title: "Radarr Quickadd",
	description: "Quickly download movies via Radarr",
}

const Page: FC = () => <Dashboard />

export default Page

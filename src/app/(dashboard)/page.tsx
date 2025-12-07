import { Dashboard } from "./Dashboard"

import type { Metadata } from "next"
import { Suspense, type FC } from "react"

export const metadata: Metadata = {
	title: "Radarr Quickadd",
	description: "Quickly download movies via Radarr",
}

const Page: FC = () => (
	<Suspense fallback={<h1>Loading...</h1>}>
		<Dashboard />
	</Suspense>
)

export default Page

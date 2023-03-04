import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
	title: "Radarr Quickadd",
	description: "Quickly download movies via Radarr"
};

const Page: FC = () => (
	<>
		<span>Hello World</span>
	</>
);

export default Page;

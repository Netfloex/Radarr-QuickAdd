import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
	title: "Template",
	description: "Welcome to Next.js"
};

const Page: FC = () => (
	<>
		<span>Hello World</span>
	</>
);

export default Page;

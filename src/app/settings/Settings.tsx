"use client"

import { QualityProfileSetting } from "src/app/settings/QualityProfileSetting"

import { RootPathSetting } from "./RootPathSetting"

import type { FC } from "react"

export const Settings: FC = () => {
	return (
		<>
			Settings
			<RootPathSetting />
			<QualityProfileSetting />
		</>
	)
}

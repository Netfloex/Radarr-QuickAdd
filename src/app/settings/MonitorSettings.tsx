import { FormControl, FormHelperText, FormLabel, Switch } from "@mui/joy"

import { SettingsInput } from "@schemas/Settings"

import type { Dispatch, FC, SetStateAction } from "react"

export const MonitorSetting: FC<{
	settings: Partial<SettingsInput>
	setSettings: Dispatch<SetStateAction<Partial<SettingsInput>>>
}> = ({ settings, setSettings }) => {
	return (
		<FormControl
			orientation="horizontal"
			sx={{ justifyContent: "space-between" }}
		>
			<div>
				<FormLabel>Monitor</FormLabel>
				<FormHelperText>
					Should the movie be monitored when it is added?
				</FormHelperText>
			</div>
			<Switch
				checked={settings.monitor ?? false}
				onChange={(ev): void =>
					setSettings((settings) => ({
						...settings,
						monitor: ev.target.checked,
					}))
				}
			/>
		</FormControl>
	)
}

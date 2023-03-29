"use client"

import { getInitColorSchemeScript } from "@mui/joy/styles/CssVarsProvider"

import type { FC } from "react"

export const InitColorSchemeScript: FC = () => <>{getInitColorSchemeScript()}</>

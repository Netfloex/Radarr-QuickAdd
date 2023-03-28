import { procedure } from "@server/trpc"

import { qualityProfiles } from "@api/qualityProfiles"

export const qualityProfilesRoute = procedure.query(qualityProfiles)

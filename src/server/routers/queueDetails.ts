import { procedure } from "@server/trpc"

import { queueDetails } from "@api/queueDetails"

export const queueDetailsRoute = procedure.query(queueDetails)

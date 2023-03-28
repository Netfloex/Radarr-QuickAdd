import { procedure } from "@server/trpc"

import { rootFolder } from "@api/rootFolder"

export const rootFolderRoute = procedure.query(rootFolder)

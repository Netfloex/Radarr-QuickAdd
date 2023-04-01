import { procedure } from "@server/trpc"
import { downloadMovie } from "@server/utils/downloadMovie"

import { DownloadMovieBody } from "@schemas/DownloadMovieBody"

export const downloadMovieRoute = procedure
	.input(DownloadMovieBody)
	.mutation(async ({ input }) => {
		return await downloadMovie(input)
	})

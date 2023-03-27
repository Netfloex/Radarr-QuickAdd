import { procedure } from "@server/trpc"
import { downloadMovie } from "@utils/downloadMovie"

import { DownloadMovieBody } from "@schemas/DownloadMovieBody"

export const downloadMovieRoute = procedure
	.input(DownloadMovieBody)
	.query(async ({ input }) => {
		return await downloadMovie(input)
	})

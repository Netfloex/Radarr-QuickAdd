import { addMovie } from "@api/addMovie"
import { downloadRelease } from "@api/downloadRelease"
import { getReleases } from "@api/getReleases"
import { DownloadMovieBody } from "@schemas/DownloadMovieBody"
import chk from "chalk-template"
import { filesize } from "filesize"

export const downloadMovie = async (
	movie: DownloadMovieBody,
): Promise<boolean> => {
	if (!movie.id) {
		console.log(chk`{yellow Adding movie {dim ${movie.title}}...}`)

		movie.id = await addMovie({
			title: movie.title,
			tmdbId: movie.tmdbId,
		})
	}

	console.log(chk`Searching releases for {dim ${movie.title}} ...`)
	const releases = await getReleases(movie.id)

	const unrejected = releases.filter((release) => !release.rejected)

	if (!unrejected.length) {
		console.log(chk`Movie: {dim ${movie.title}} only has rejected releases`)

		return false
	}
	const best = unrejected.reduce((prev, cur) =>
		prev.seeders > cur.seeders ? prev : cur,
	)

	console.log(
		chk`${filesize(best.size)} {cyan ${best.title}} {magenta ${
			best.seeders
		}} {yellow ${best.quality.quality.name}}`,
	)

	await downloadRelease(best)

	return true
}

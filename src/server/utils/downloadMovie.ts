import chk from "chalk-template"
import { filesize } from "filesize"

import { addMovie } from "@api/addMovie"
import { downloadRelease } from "@api/downloadRelease"
import { getReleases } from "@api/getReleases"

import { DownloadMovieBody } from "@schemas/DownloadMovieBody"
import { Release } from "@schemas/Release"

import { DownloadMovieError } from "@typings/DownloadMovieError"

export const downloadMovie = async (
	movie: DownloadMovieBody,
): Promise<Release | DownloadMovieError> => {
	if (!movie.id) {
		console.log(chk`{yellow Adding movie {dim ${movie.title}}...}`)

		const id = await addMovie({
			title: movie.title,
			tmdbId: movie.tmdbId,
		})

		if (id == false) {
			console.log(chk`{red Failed to add, incorrect settings}`)

			return DownloadMovieError.invalidSettings
		}

		movie.id = id
	}

	console.log(chk`Searching releases for {dim ${movie.title}} ...`)
	const releases = await getReleases(movie.id)

	const unrejected = releases.filter((release) => !release.rejected)

	if (!unrejected.length) {
		console.log(chk`Movie: {dim ${movie.title}} only has rejected releases`)

		return DownloadMovieError.rejectedOnly
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

	return best
}

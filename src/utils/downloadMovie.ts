import { addMovie } from "@api/addMovie"
import { downloadRelease } from "@api/downloadRelease"
import { getReleases } from "@api/getReleases"
import chalk from "chalk"
import chk from "chalk-template"
import { filesize } from "filesize"

import { DownloadMovieOptions } from "@typings/DownloadMovieOptions"

export const downloadMovie = async (
	movie: DownloadMovieOptions,
): Promise<void> => {
	if (!movie.id) {
		console.log(chalk.yellow("Adding movie..."))

		movie.id = await addMovie({
			title: movie.title,
			tmdbId: movie.tmdbId,
		})
	}

	console.log(chalk.yellow("Searching releases..."))
	const releases = await getReleases(movie.id)

	const unrejected = releases.filter((release) => !release.rejected)

	if (!unrejected.length) {
		return console.log(
			"There only exist rejected releases, is the movie already downloaded?",
		)
	}
	const best = unrejected.reduce((prev, cur) => {
		return prev.seeders > cur.seeders ? prev : cur
	})

	console.log(
		chk`${filesize(best.size)} {cyan ${best.title}} {magenta ${
			best.seeders
		}} {yellow ${best.quality.quality.name}}`,
	)

	console.log(chalk.yellow("Downloading..."))

	await downloadRelease(best)
}

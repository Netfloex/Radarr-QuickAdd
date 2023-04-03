import chk from "chalk-template"
import { filesize } from "filesize"
import { ZodError } from "zod"

import { getSettings } from "@server/utils/getSettings"

import { addMovie } from "@api/addMovie"
import { downloadRelease } from "@api/downloadRelease"
import { editMovie } from "@api/editMovie"
import { getReleases } from "@api/getReleases"

import type { DownloadMovieBody } from "@schemas/DownloadMovieBody"
import type { Release } from "@schemas/Release"

import { DownloadMovieError } from "@typings/DownloadMovieError"

export const downloadMovie = async (
	movie: DownloadMovieBody,
): Promise<Release | DownloadMovieError> => {
	const settings = await getSettings()

	if (settings instanceof ZodError) {
		return DownloadMovieError.invalidSettings
	}

	let movieId = "id" in movie ? movie.id : false

	if (!("id" in movie)) {
		console.log(chk`{yellow Adding movie {dim ${movie.title}}...}`)

		movieId = await addMovie({
			title: movie.title,
			tmdbId: movie.tmdbId,
			qualityProfileId: settings.qualityProfileId,
			rootFolderPath: settings.rootFolder,
			monitored: settings.monitor,
		})
	} else {
		console.log(chk`Movie {dim ${movie.title}} is already added`)

		if (
			movie.qualityProfileId !== settings.qualityProfileId ||
			movie.monitored !== settings.monitor
		) {
			console.log(
				chk`{yellow Editing ${movie.title}, incorrect quality or is monitored}`,
			)
			await editMovie({
				id: movie.id,
				path: movie.path,
				monitored: settings.monitor,
				qualityProfileId: settings.qualityProfileId,
			})
		}
	}

	if (movieId === false) {
		throw new Error("Movie Id should not be false")
	}

	console.log(chk`Searching releases for {dim ${movie.title}} ...`)
	const releases = await getReleases(movieId)

	const unRejected = releases.filter((release) => !release.rejected)

	if (!unRejected.length) {
		console.log(chk`Movie: {dim ${movie.title}} only has rejected releases`)

		return DownloadMovieError.rejectedOnly
	}

	const best = unRejected.reduce((prev, cur) =>
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

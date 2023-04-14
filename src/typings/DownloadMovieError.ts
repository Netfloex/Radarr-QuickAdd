export enum DownloadMovieErrorType {
	rejectedOnly,
	invalidSettings,
}

interface BasicDownloadMovieError {
	type: DownloadMovieErrorType
	error: true
}

interface InvalidSettingsError extends BasicDownloadMovieError {
	type: DownloadMovieErrorType.invalidSettings
}

interface RejectedOnlyError extends BasicDownloadMovieError {
	type: DownloadMovieErrorType.rejectedOnly
	releaseCount: number
}

export type DownloadMovieError = RejectedOnlyError | InvalidSettingsError

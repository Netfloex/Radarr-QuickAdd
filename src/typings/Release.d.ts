export interface Release {
	rejected: boolean
	seeders: number
	title: string
	size: number
	guid: string
	indexerId: number
	quality: {
		quality: {
			name: string
		}
	}
}

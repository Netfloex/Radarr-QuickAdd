import { Store } from "@server/lib/Store"
import { getOptions } from "@server/utils/getOptions"

import { Settings } from "@schemas/Settings"

type StoreType = Store<Partial<Settings>>

let savedStore: StoreType | false = false

export const getStore = async (): Promise<StoreType> => {
	if (savedStore) return savedStore

	const { storePath } = getOptions()

	const store = new Store<Partial<Settings>>(storePath, {})

	await store.init()

	savedStore = store
	return store
}

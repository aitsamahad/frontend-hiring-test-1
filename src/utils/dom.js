export function windowIsAvailable() {
	return typeof window !== "undefined"
}

export function getLocalStorageItem(key) {
	return windowIsAvailable() && window.localStorage.getItem(key)
}

export function setLocalStorageItem(key, value) {
	return windowIsAvailable() && window.localStorage.setItem(key, value)
}

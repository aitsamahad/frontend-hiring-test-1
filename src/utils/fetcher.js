import { getLocalStorageItem, setLocalStorageItem } from "./dom"
import Pusher from "pusher-js"
import axios from "axios"

export const apiUrl = process.env.NEXT_PUBLIC_API_URI || "https://frontend-test-api.aircall.io"

// Axios
axios.defaults.baseURL = apiUrl
axios.defaults.headers.common["Authorization"] = `Bearer ${getLocalStorageItem("token")}`
// const axiosApiInstance = axios.create({
// 	baseURL: apiUrl,
// 	headers: {
// 		"Access-Control-Allow-Origin": "*",
// 		"Content-Type": "application/json",
// 		Authorization: `Bearer ${getLocalStorageItem("token")}`,
// 	},
// })

// // Request interceptor for API calls
// axios.interceptors.request.use(
// 	async (config) => {
// 		let token = JSON.parse(localStorage.getItem("token"))
// 		let created_at = JSON.parse(localStorage.getItem("created_at"))
// 		if (token && created_at) {
// 			const now = new Date()
// 			const elapsed = (now - new Date(created_at)) / 1000

// 			if (elapsed > 5) {
// 				// axios.interceptors.response.eject(interceptor)
// 				let access = await refreshJWTToken(axiosApiInstance)
// 				token = access
// 				created_at = new Date()
// 				localStorage.setItem("token", JSON.stringify(token))
// 				localStorage.setItem("created_at", JSON.stringify(created_at))
// 			}
// 		}
// 		return config
// 	},
// 	(error) => {
// 		return Promise.reject(error)
// 	}
// )

// export async function refreshJWTToken(axios) {
// 	try {
// 		const { data, status } = await axios.post(`/auth/refresh-token`)

// 		if (status === 201) return data.access_token
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

export const swrfetcher = (url) => axios.get(url).then((res) => res.data)

export const fetcher = axios

export const pusherClient = new Pusher(`${process.env.NEXT_PUBLIC_PUSHER_KEY || "d44e3d910d38a928e0be"}`, {
	cluster: `${process.env.NEXT_PUBLIC_APP_CLUSTER || "eu"}`,
	authEndpoint: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT || "https://frontend-test-api.aircall.io/pusher/auth"}`,
	auth: {
		headers: {
			Authorization: `Bearer ${getLocalStorageItem("token")}`,
		},
	},
})

import { fetcher } from "@utils/fetcher"
import { formatErrorResponse, responseMsg, ResponseType } from "@utils/responseMsg"

export const login = async (username: string, password: string): Promise<ResponseType | undefined> => {
	try {
		const { data, status } = await fetcher.post(`/auth/login?username=${username}&password=${password}`)

		if (status === 201) {
			return responseMsg({ error: false, msg: "Login success", data })
		}
	} catch (err) {
		return formatErrorResponse(err)
	}
}

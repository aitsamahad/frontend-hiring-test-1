export interface ResponseType {
	error: boolean
	msg?: string
	data?: any
}

export function responseMsg(Props: ResponseType): ResponseType {
	return { ...Props }
}

export function formatErrorResponse(err: any) {
	if (err?.response?.data && ![500, 403, 404].includes(err?.response?.status)) {
		for (const el in err.response.data) {
			let e = el !== "non_field_errors" ? el + ":" : undefined
			return responseMsg({ error: true, msg: `${e ?? " "} ${err.response.data[el]}` })
		}
	} else {
		if (err?.response?.status === 500)
			return responseMsg({ error: true, msg: `Server not responding, Please try again later!` })
		if (err?.response?.status === 403)
			return responseMsg({ error: true, msg: `Action is forbidden, Please contact support.` })
		if (err?.response?.status === 404)
			return responseMsg({ error: true, msg: `Action doesn't exist, Please contact support.` })
	}
}

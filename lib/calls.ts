import { fetcher } from "@utils/fetcher"
import { formatErrorResponse, responseMsg, ResponseType } from "@utils/responseMsg"

export type Note = {
	id: string | number
	content: string
}

export type Call = {
	id: number // "unique ID of call"
	direction: string // "inbound" or "outbound" call
	from: string // Caller's number
	to: string // Callee's number
	duration: number // Duration of a call (in seconds)
	is_archived: boolean // Boolean that indicates if the call is archived or not
	call_type: string // The type of the call, it can be a missed, answered or voicemail.
	via: string // Aircall number used for the call.
	created_at: string // When the call has been made.
	notes: Note[] // Notes related to a given call
}

export interface Calls {
	nodes: [Call]
	totalCount: number
	hasNextPage: boolean
}

export const getCalls = async (offset: number, limit: number = 10): Promise<ResponseType | undefined> => {
	try {
		const { data, status } = await fetcher.get(`/calls?offset=${offset || 0}&limit=${limit}`)

		if (status === 200) {
			return responseMsg({ error: false, msg: "List fetched successfully", data })
		}
	} catch (err) {
		return formatErrorResponse(err)
	}
}

export const addNote = async (uid: string | number, content: string): Promise<ResponseType | undefined> => {
	try {
		const { data, status } = await fetcher.post(`/calls/${uid}/note`, {
			content,
		})

		if (status === 201) {
			return responseMsg({ error: false, msg: "Note added!", data })
		}
	} catch (err) {
		return formatErrorResponse(err)
	}
}

export const archiveCall = async (uid: string | number): Promise<ResponseType | undefined> => {
	try {
		const { data, status } = await fetcher.put(`/calls/${uid}/archive`)

		if (status === 200) {
			return responseMsg({ error: false, msg: "Call Archived!", data })
		}
	} catch (err) {
		return formatErrorResponse(err)
	}
}

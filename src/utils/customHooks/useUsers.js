import { swrfetcher } from "@utils/fetcher"
import useSWR from "swr"

function useUser() {
	const { data, error } = useSWR("/me", swrfetcher)
	return { data, error }
}

export default useUser

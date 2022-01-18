/* eslint-disable react/display-name */
import { useRouter } from "next/router"
import LazyLoadComponentLoader from "@common/Loaders/LazyLoadComponentLoader"
import useUser from "./useUsers"
import { setLocalStorageItem } from "@utils/dom"
import { fetcher } from "@utils/fetcher"
import { useEffect } from "react"

const withAuth = (WrappedComponent) => {
	return (props) => {
		const Router = useRouter()
		const { data, error } = useUser()

		useEffect(() => {
			setInterval(() => {
				fetcher
					?.post("/auth/refresh-token")
					.then(({ data }) => setLocalStorageItem("token", data?.access_token))
					.catch((err) => console.log(err))
			}, 120000)
		}, [])

		if (!data && !error) {
			return <LazyLoadComponentLoader />
		} else if (error) {
			if (Router.pathname !== "/") {
				Router.replace("/")
				return null
			}
		} else {
			if (["/login", "/"].includes(Router.pathname)) {
				Router.replace("/dashboard")
				return null
			}
		}

		return <WrappedComponent {...props} />
	}
}

export default withAuth

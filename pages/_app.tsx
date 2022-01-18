import "../styles/globals.css"
import type { AppProps } from "next/app"
import Wrapper from "src/components/common/Wrapper"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import theme from "styles/theme"
import { useEffect } from "react"
import { useStore } from "@redux/store"
import { Provider } from "react-redux"

function MyApp({ Component, pageProps }: AppProps) {
	const store = useStore(pageProps.initialReduxState)

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side")
		if (jssStyles) {
			jssStyles?.parentElement?.removeChild(jssStyles)
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Wrapper>
					<Component {...pageProps} />
				</Wrapper>
			</Provider>
		</ThemeProvider>
	)
}

export default MyApp

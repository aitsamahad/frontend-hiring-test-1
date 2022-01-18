import { createTheme } from "@mui/material/styles"

// Create a theme instance.
const theme = createTheme({
	palette: {
		common: {
			black: "#19192B",
			white: "#ffffff",
		},
		primary: {
			main: "#2A2A2A",
		},
		secondary: {
			main: "#8E8E8C", // omitting light and dark will calculate from main
			contrastText: "#757575",
		},
		grey: {
			"500": "#bcbcbc",
			"700": "#79797a",
		},
		info: {
			main: "#1bb2f1",
		},
		success: {
			main: "#00d589",
		},
		error: {
			main: "#832838",
		},
		background: {
			default: "#fff",
		},
	},
	typography: {
		fontFamily: "Roboto",
	},
})

export default theme

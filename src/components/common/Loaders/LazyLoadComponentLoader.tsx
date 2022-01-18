import React from "react"
import makeStyles from "@mui/styles/makeStyles"
import CircularProgress from "@mui/material/CircularProgress"
import { Theme } from "@mui/material"

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: "flex",
		"& > * + *": {
			marginLeft: theme?.spacing(),
		},
		textAlign: "center",
		margin: "0 auto",
		width: "100%",
		paddingLeft: "45%",
		paddingTop: "25%",
		paddingBottom: "25%",
	},
}))

export default function LazyLoadComponentLoader() {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	)
}

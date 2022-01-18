import React from "react"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import makeStyles from "@mui/styles/makeStyles"
import { useDispatch } from "react-redux"
import { showAlert } from "@redux/features/toast/toastSlice"

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
		zIndex: 1305,
	},
}))

export default function SnackbarAlert(props) {
	const classes = useStyles()
	const dispatch = useDispatch()

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return
		}

		dispatch(showAlert(false))
	}

	return (
		<div className={classes.root}>
			<Snackbar
				open={props.status}
				autoHideDuration={3000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert onClose={handleClose} severity={props.msgType} sx={{ width: "100%" }}>
					{props.msg}
				</Alert>
			</Snackbar>
		</div>
	)
}

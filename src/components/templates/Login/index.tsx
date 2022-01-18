import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useDispatch } from "react-redux"
import { showAlert } from "@redux/features/toast/toastSlice"
import { ResponseType } from "@utils/responseMsg"
import { login } from "lib/user"
import { setLocalStorageItem } from "@utils/dom"

function Copyright(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<Link color="inherit" href="#">
				React Frontend Task
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

const theme = createTheme()

export default function SignIn() {
	const dispatch = useDispatch()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)

		const username = String(data.get("username"))
		const password = String(data.get("password"))

		if (username && password) {
			const res: ResponseType | undefined = await login(username, password)

			if (res && !res?.error) {
				setLocalStorageItem("token", res?.data?.access_token)
				setLocalStorageItem("created_at", new Date())

				dispatch(showAlert({ alertStatus: true, alertType: "success", alertMsg: "User logged in!" }))
				window.location.reload()
			} else {
				dispatch(showAlert({ alertStatus: true, alertType: "error", alertMsg: res?.msg }))
			}
		} else {
			dispatch(showAlert({ alertStatus: true, alertType: "error", alertMsg: "Please provide username and password!" }))
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	)
}

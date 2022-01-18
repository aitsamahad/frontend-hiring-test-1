/* eslint-disable */
import * as React from "react"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { addNote, archiveCall, Call, getCalls, Note } from "lib/calls"
import Pagination from "@mui/material/Pagination"
import { Grid, InputAdornment, TextField } from "@mui/material"
import { useDispatch } from "react-redux"
import { showAlert } from "@redux/features/toast/toastSlice"
import { pusherClient } from "@utils/fetcher"

function Row(props: { row: Call }) {
	const { row } = props
	const [open, setOpen] = React.useState(false)
	const [note, setNote] = React.useState("")
	const dispatch = useDispatch()

	async function addNoteRequest() {
		if (note) {
			const res = await addNote(row?.id, note)
			if (!res?.error) {
				dispatch(showAlert({ alertStatus: true, alertStatusType: "success", alertMsg: "New note added!" }))
			} else {
				dispatch(showAlert({ alertStatus: true, alertType: "error", alertMsg: res?.msg }))
			}
		} else {
			dispatch(
				showAlert({ alertStatus: true, alertType: "error", alertMsg: "Please type something in note field first!" })
			)
		}
	}

	const archiveUnarchive = async () => {
		const res = await archiveCall(row?.id)
		if (!res?.error) {
			dispatch(showAlert({ alertStatus: true, alertType: "success", alertMsg: "Call archive status changed!" }))
			window.location.reload()
		} else {
			dispatch(showAlert({ alertStatus: true, alertType: "error", alertMsg: res?.msg }))
		}
	}

	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }} hover>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.id}
				</TableCell>
				<TableCell align="right">{row.direction}</TableCell>
				<TableCell align="right">{row.from}</TableCell>
				<TableCell align="right">{row.to}</TableCell>
				<TableCell align="right">{row.duration}</TableCell>
				<TableCell align="right">{row.is_archived ? "Yes" : "No"}</TableCell>
				<TableCell align="right">{row.call_type}</TableCell>
				<TableCell align="right">{row.via}</TableCell>
				<TableCell align="right">{row.created_at}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Details (
								<span
									style={{ color: row?.is_archived ? "red" : "green", fontSize: 15, cursor: "pointer" }}
									onClick={archiveUnarchive}
								>
									<u>{row?.is_archived ? "UnArchive" : "Archive"} it!</u>
								</span>
								)
							</Typography>
							<h4>Notes</h4>
							<ul>
								{row?.notes?.map((item: Note) => (
									<li key={item?.id}>{item?.content}</li>
								))}
							</ul>
							<TextField
								variant="outlined"
								label="New Note"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={addNoteRequest}>Add</IconButton>
										</InputAdornment>
									),
								}}
								value={note}
								onChange={(e) => setNote(e.target.value)}
							/>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

export default function DashboardTemplate() {
	const [calls, setCalls] = React.useState<any>([])
	const [page, setPage] = React.useState(1)
	const [count, setCount] = React.useState(0)
	const handleChange = (event: any, value: any) => setPage(value)

	React.useEffect(() => {
		let offset = 0
		if (page > 1) {
			offset = page * 10 - 10
		}
		;(async () => {
			const res = await getCalls(offset)
			if (!res?.error) {
				setCalls(res?.data?.nodes)
				setCount(res?.data?.totalCount)
			}
		})()
	}, [page])

	console.log("CALLS: ", calls)

	React.useEffect(() => {
		const privateChannel = pusherClient.subscribe(`private-aircall`)

		privateChannel.bind("update-call", function (data: any) {
			// Perform some action here based on the even that is received
			console.log("PUSHER: ", data)
		})
	}, [])

	return (
		<div style={{ textAlign: "center" }}>
			<h1>Calls</h1>
			<TableContainer component={"div"}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>ID</TableCell>
							<TableCell align="right">Direction</TableCell>
							<TableCell align="right">From</TableCell>
							<TableCell align="right">To</TableCell>
							<TableCell align="right">Duration</TableCell>
							<TableCell align="right">Archived?</TableCell>
							<TableCell align="right">Call Type</TableCell>
							<TableCell align="right">Via</TableCell>
							<TableCell align="right">Created At</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{calls.map((row: Call) => (
							<Row key={row?.id} row={row} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<br />
			<Grid container justifyContent="flex-end">
				<Pagination count={Math.ceil(count / 10)} page={page} onChange={handleChange} />
			</Grid>
		</div>
	)
}

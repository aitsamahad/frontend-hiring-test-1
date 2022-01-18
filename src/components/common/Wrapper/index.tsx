import SnackbarAlert from "@common/SnackbarAlerts"
import { Portal } from "@mui/base"
import { selectToast } from "@redux/features/toast/toastSlice"
import withAuth from "@utils/customHooks/withAuth"
import React, { FC } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

const Wrapper: FC = ({ children }) => {
	const { alertStatus, alertType, alertMsg } = useSelector(selectToast)

	return (
		<PageWrapper>
			{children}
			{alertStatus && (
				<Portal>
					<SnackbarAlert status={alertStatus} msgType={alertType} msg={alertMsg} />
				</Portal>
			)}
		</PageWrapper>
	)
}

export default withAuth(Wrapper)

const PageWrapper = styled.div`
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	max-width: 1440px;
	min-height: 100vh;
	background: #fff 0% 0% no-repeat padding-box;
	opacity: 1;
	position: relative;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	border: 1px solid #eceff8;
	overflow-y: hidden;
`

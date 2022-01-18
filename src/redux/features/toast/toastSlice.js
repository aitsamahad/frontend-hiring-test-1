import { createSlice, createSelector } from "@reduxjs/toolkit"

const initialState = { alertStatus: false, alertType: "success", alertMsg: "" }

const toastSlice = createSlice({
	name: "toast",
	initialState,
	reducers: {
		showAlert: {
			reducer(state, action) {
				return {
					...state,
					...action.payload,
				}
			},
			prepare({ alertStatus, alertType = "success", alertMsg = "" }) {
				return { payload: { alertStatus, alertType, alertMsg } }
			},
		},
	},
})

export const { showAlert } = toastSlice.actions

export default toastSlice.reducer

export const selectToast = (state) => state.toast

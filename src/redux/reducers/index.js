import toastSlice from "@redux/features/toast/toastSlice"
import { combineReducers } from "@reduxjs/toolkit"

const reducers = combineReducers({
	toast: toastSlice,
})

export default reducers

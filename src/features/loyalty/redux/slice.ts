import { createSlice } from "@reduxjs/toolkit";
import { create } from "domain";
import { FetchingStatus } from "../../timeline/redux/slice";


interface LoyaltyState{
    clientLoyaltyInfo: string | null,
    fetchingStatus: FetchingStatus,
}

const initialState: LoyaltyState = {
    clientLoyaltyInfo: null,
    fetchingStatus: FetchingStatus.NEVER
}

const loyaltySlice = createSlice({
    name: 'loayaltySlice',
    initialState: initialState,
    reducers: {}
})

export default loyaltySlice.reducer;
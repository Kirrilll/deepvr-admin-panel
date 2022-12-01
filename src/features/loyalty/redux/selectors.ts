import { RootState } from "../../../app/store"

export const isLoyalty = (state: RootState) => state.loyaltyReducer.clientLoyaltyInfo != null;
import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "./ActionCreators";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // usersFetching(state) {
    //   state.isLoading = true;
    // },
    // usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
    //   state.isLoading = false;
    //   state.error = ''
    //   state.users = action.payload;
    // },
    // usersFetchingError(state, action: PayloadAction<string>) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled.type, (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = ''
      state.users = action.payload;
    })
    builder.addCase(fetchUsers.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    builder.addCase(fetchUsers.pending.type, (state) => {
      state.isLoading = true;
    })
  }
})

export default userSlice.reducer
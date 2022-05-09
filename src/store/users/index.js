import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	users: [],
	isLoading: false,
	isError: ""
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    () => {
        return axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(response => response.data)
    }
)

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		deleteUser: (state, action) => {
			state.users = state.users.filter(item => item.id !== action.payload);
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchUsers.pending, (state, action) => {
			// Add user to the state array
			state.isLoading = true;
		});
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.users = action.payload;
			state.isLoading = false;
			state.isError = "";
		});
		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.isLoading = false;
			state.users = [];
			state.isError = action.error.message;
		});
	}
});

export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;

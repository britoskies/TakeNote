import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iUser } from "../../interfaces/iUser";

const initialState = {
    values: [] as iUser[],
  };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<iUser>) => {
      const newUser: iUser = action.payload;
      state.values.push(newUser);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const id: string = action.payload;
      const foundUser = state.values.find((user) => user.id === id);
      if (foundUser) {
        state.values.splice(state.values.indexOf(foundUser), 1);
      }
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

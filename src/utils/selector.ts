import { RootState } from "../app/store";

export const selectTasks = (state: RootState) => state.tasks.values || [];
export const selectUsers = (state: RootState) => state.users.values || [];

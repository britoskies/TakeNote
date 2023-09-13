import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iTask } from "../../interfaces/iTask";

const initialState = {
  values: [] as iTask[],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<iTask>) => {
      // Task object passed by params in TaskForm
      const newTask: iTask = action.payload;
      state.values.push(newTask);
    },
    updateTask: (state, action: PayloadAction<iTask>) => {
      // Task object with new props passed by params in TaskForm
      const taskToUpdate: iTask = action.payload;
      const foundTask = state.values.find(
        (task) => task.id === taskToUpdate.id
      );
      if (foundTask) {
        state.values.splice(state.values.indexOf(foundTask), 1, taskToUpdate);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      // Task id passed by params in TaskList component
      const id: string = action.payload;
      const foundTask = state.values.find((task) => task.id === id);
      if (foundTask) {
        state.values.splice(state.values.indexOf(foundTask), 1);
      }
    },
    deleteAllTasks: (state) => {
      // Delete every element in task state
      state.values.splice(0, state.values.length);
    },
  },
});

export const { addTask, updateTask, deleteTask, deleteAllTasks } =
  taskSlice.actions;
export default taskSlice.reducer;

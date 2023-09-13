// React/Redux
import {
  deleteAllTasks,
  deleteTask,
  updateTask,
} from "../features/tasks/taskSlice";
import { useDispatch, useSelector } from "react-redux";

// Utils
import {
  warningAlert,
  messageAlert,
  promptAlert,
  successAlert,
} from "../utils/alert";
import { selectTasks, selectUsers } from "../utils/selector";
import { areAllPropertiesEmpty } from "../utils/functions";

// Services & Interfaces
import { iTask } from "../interfaces/iTask";
import sendEmail from "../services/emailService";

export const useTaskHandler = () => {
  const tasks = useSelector(selectTasks);
  const loggedUserEmail = useSelector(selectUsers).map((user) => user.email)[0];
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    warningAlert().then((result) => {
      if (result.isConfirmed) {
        messageAlert("Deleted!", "success");
        if (!id) dispatch(deleteAllTasks());
        else dispatch(deleteTask(id));
      }
    });
  };

  const handleUpdate = (task: iTask) => {
    promptAlert(task).then((result) => {
      if (areAllPropertiesEmpty(result)) {
        messageAlert("Title and Description are required", "error");
      } else {
        dispatch(updateTask(result));
        successAlert();
      }
    });
  };

  const handleCompleted = (
    event: React.ChangeEvent<HTMLInputElement>,
    task: iTask
  ) => {
    if (task.isCompleted) messageAlert("Task Pending!", "info");
    else {
      const pendingTasks = tasks.filter((t) => t.id != task.id);
      sendEmail(loggedUserEmail, pendingTasks, task);
      messageAlert("Task Completed!", "success");
    }
    dispatch(updateTask({ ...task, isCompleted: event.target.checked }));
  };

  return { tasks, handleCompleted, handleDelete, handleUpdate };
};

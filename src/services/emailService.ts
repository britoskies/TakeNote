// Emailjs
import emailjs from "@emailjs/browser";
import { iTask } from "../interfaces/iTask";

const sendEmail = (to: string, pendingTasks: iTask[], completedTask: iTask) => {
  const unfinishedTasks = pendingTasks
    .map((task, index) => `${index + 1}- ${task.title} | ${task.description}`)
    .join("\n");

  const finishedTask = `Completed Task:\n\n${completedTask.title} - ${completedTask.description}`;
  const body = `${finishedTask}\n\n Pending Tasks: \n\n${unfinishedTasks}`;

  const templateParams = {
    name: "ToDoList App",
    body,
    from: "britoskies@gmail.com",
    to,
  };

  return emailjs.send(
    "service_nba6ags",
    "template_cmg15dd",
    templateParams,
    "v2xUKwONDbR-6vOb3"
  );
};

export default sendEmail;

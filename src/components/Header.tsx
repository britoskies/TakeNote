import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { messageAlert, successAlert } from "../utils/alert";
import { areAllPropertiesEmpty, resetTaskValues } from "../utils/functions";

const Header = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (areAllPropertiesEmpty(task)) {
      messageAlert("Title and Description are required", "error");
    } else {
      dispatch(addTask({ ...task, id: uuid() }));
      setTask(resetTaskValues());
      successAlert();
    }
  };

  return (
    <header className="brown-main-bg flex flex-col items-center md:flex-row sm:justify-between md:px-10 text-white text-sm p-2 gap-2">
      <figure className="w-20 flex items-center">
        <img
          className="max-w-non overflow-clip w-full self-center"
          src="/BS_logo.png"
          alt="bs"
        />
      </figure>
      <form
        className="flex flex-col items-center justify-center md:flex-row gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            placeholder="Ej: Task"
            onChange={handleChange}
            className="h-8 pl-2 rounded-md text-black"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={task.description}
            placeholder="Ej: Learn React"
            onChange={handleChange}
            className="h-8 pl-2 rounded-md lg:w-96 text-black"
          />
        </div>
        <div className="flex w-full">
          <button className="add-button px-10 py-1 my-2 font-bold rounded-2xl w-full">
            Add
          </button>
        </div>
      </form>
    </header>
  );
};

export default Header;

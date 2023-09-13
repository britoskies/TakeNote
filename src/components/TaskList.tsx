// React/Redux
import { useState } from "react";
import { useSelector } from "react-redux";

// Hooks & Utils
import { selectUsers } from "../utils/selector";
import { useAuth } from "./../hooks/useAuth";
import { useTaskHandler } from "./../hooks/useTaskHandler";

// Components
import SignInButton from "./SignInButton";
import Avatar from "./Avatar";
import Drawer from "./Drawer";

const TaskList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const loggedUserId = useSelector(selectUsers).map((user) => user.id)[0];
  const loggedUserEmail = useSelector(selectUsers).map((user) => user.email)[0];

  const { signInUser, logoutUser } = useAuth();

  const { tasks, handleCompleted, handleDelete, handleUpdate } =
    useTaskHandler();

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="flex justify-center md:justify-end gap-2 mx-10 my-5">
        <button
          className="bg-amber-700 hover:bg-amber-600 clear-button rounded-2xl text-white px-10 py-1 my-2"
          onClick={handleOpenDrawer}
        >
          Show Options
        </button>
        <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
          {loggedUserEmail ? (
            <section className="flex flex-col justify-start items-center gap-2 mt-5">
              <div className="flex items-center justify-start gap-2">
                <Avatar name={loggedUserEmail} size="small" />
                <p className="text-white">{loggedUserEmail}</p>
              </div>
              <div>
                <button
                  className="bg-slate-300 hover:bg-slate-200 clear-button rounded-2xl px-10 py-1 my-2"
                  onClick={() => logoutUser(loggedUserId)}
                >
                  Logout
                </button>
              </div>
            </section>
          ) : (
            <section className="flex items-center justify-between w-full gap-2">
              <SignInButton signIn={signInUser} />
            </section>
          )}
          {tasks.length > 0 && (
            <section className="flex justify-center">
              <button
                className="bg-red-700 hover:bg-red-600 clear-button rounded-2xl text-white px-8 py-1 my-2"
                onClick={() => handleDelete("")}
              >
                Clear Notes
              </button>
            </section>
          )}
        </Drawer>
      </div>
      <div className="relative overflow-x-auto shadow-md md:mx-10">
        <table className="table-auto w-full text-sm md:text-base text-center">
          <thead className="text-xs text-white uppercase brown-lighter sticky top-0">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Actions</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody id="table">
            {tasks.map((task) => (
              <tr key={task.id} className="bg-zinc-300">
                <td className="p-2">{task.title}</td>
                <td className="p-2">{task.description}</td>
                <td className="p-2">
                  <button onClick={() => handleUpdate(task)}>
                    <figure className="w-5 md:w-6 flex items-center mx-2">
                      <img
                        className="max-w-non overflow-clip w-full self-center"
                        src="/pencil.png"
                        alt="edit"
                      />
                    </figure>
                  </button>
                  <button onClick={() => handleDelete(task.id)}>
                    <figure className="w-5 md:w-6 flex items-center mx-2">
                      <img
                        className="max-w-non overflow-clip w-full self-center"
                        src="/trash.png"
                        alt="edit"
                      />
                    </figure>
                  </button>
                </td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    name="isCompleted"
                    onChange={(e) => handleCompleted(e, task)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskList;

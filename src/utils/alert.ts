import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
import { iTask } from "../interfaces/iTask";

export const messageAlert = (title: string, icon: SweetAlertIcon) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon,
    title,
  });
};

export const successAlert = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "Note added succesfully!",
  });
};

export const warningAlert = () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Confirm",
  });
};

export const promptAlert = async (task: iTask): Promise<iTask> => {
  const html = `<input id="swal-input1" value="${task.title}" class="swal2-input" placeholder="Title">
    <input id="swal-input2" type="textarea" value="${task.description}" class="swal2-input" placeholder="Description">`;

  const { value: formValues }: SweetAlertResult = await Swal.fire({
    title: "Update Note",
    html,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Confirm",
    preConfirm: () => {
      return {
        id: task.id,
        title: (document.getElementById("swal-input1") as HTMLInputElement)
          ?.value,
        description: (
          document.getElementById("swal-input2") as HTMLInputElement
        )?.value,
      };
    },
  });

  if (!formValues) return task;
  return formValues;
};

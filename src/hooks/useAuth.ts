import { useEffect, useState } from "react";
import { removeUser, addUser } from "../features/users/userSlice";
import { auth, provider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { iUser } from "./../interfaces/iUser";
import { uuidv4 } from "@firebase/util";
import { selectUsers } from "../utils/selector";

export const useAuth = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectUsers);
  const [user, setUser] = useState<iUser>({
    id: "",
    email: "",
  });

  const logoutUser = (id: string) => {
    dispatch(removeUser(id));
  };

  const signInUser = () => {
    signInWithPopup(auth, provider).then((data) => {
      const userEmail: string = data.user.email ? data.user.email : "";
      if (userEmail) {
        setUser({ email: userEmail, id: uuidv4() });
        dispatch(addUser({ email: userEmail, id: uuidv4() }));
      }
    });
  };

  useEffect(() => {
    loggedUser.map((user) => {
      setUser({ id: user.id, email: user.email });
    });
  }, []);

  return { user, logoutUser, signInUser };
};

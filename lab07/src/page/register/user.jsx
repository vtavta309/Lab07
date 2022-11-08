import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../store/user.reducer";
import styles from "./register.module.css";
const User = ({ user, users, setUsers }) => {
  const dispatch = useDispatch();
  const handleDeleteUser = (idSelected) => {
    dispatch(deleteUser({ id: idSelected }));
  };
  const handleUpdateUser = () => {
    setUsers({
      ...users,
      id: user.id,
      email: user.email,
      name: user.name,
      course: user.course,
      password: user.password,
      confirmPassword: user.confirmPassword,
      status: "update",
    });
  };
  return (
    <div className={styles.user}>
      <div>
        <h3 style={{ margin: "0px" }}>{user.email}</h3>
        <span span>/{user.name}</span>
      </div>
      <div style={{ display: "flex" }}>
        <button className={styles.confirmButton} onClick={handleUpdateUser}>
          Edit
        </button>
        <button
          className={styles.closeButton}
          onClick={() => handleDeleteUser(user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default User;

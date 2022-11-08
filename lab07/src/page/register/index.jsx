import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import { NotificationManager } from "react-notifications";
import { useIsHidden } from "../../hooks/useIsHidden";
import styles from "./register.module.css";
import { useDispatch } from "react-redux";
import { addLogin } from "../../store/user.reducer";
import { validationSchema } from "../../components/validation";
import axios from "axios";
import LoginGoogle from "../login/loginGoogle";

function Register() {
  const dispatch = useDispatch();
  const { hidden, handleClick } = useIsHidden();

  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState([]);
  const users = {
    userName: "",
    password: "",
  };
  useEffect(
    () => {
      setLoading(true);
      axios({
        method: "GET",
        url: "https://5fd209f5b485ea0016eef446.mockapi.io/login",
      })
        .then((res) => {
          setLogin(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // eslint-disable-next-line
    []
  );
  const onSubmit = (values, formikHelpers) => {
    let checkUserName = "";
    let checkPassword = "";
    checkUserName = login.findIndex(
      (users) => users.userName === values.userName
    );
    checkPassword = login.findIndex(
      (users) => users.password === values.password
    );
    if (checkUserName !== -1 && checkPassword !== -1) {
      axios({
        method: "GET",
        url: `https://5fd209f5b485ea0016eef446.mockapi.io/dbPlayers/${parseInt(
          login[checkUserName].userId
        )}`,
      })
        .then((res) => {
          dispatch(addLogin(res.data));
          localStorage.setItem("userLogin", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error(err);
          NotificationManager.error("fail");
        });
    } else {
      NotificationManager.error("fail");
    }
    formikHelpers.resetForm();
  };
  return (
    <div>
      <div>
        <div className={styles.container}>
          <div className={styles.register}>
            <div
              className={`${styles.formRegisterEmail} ${
                hidden && styles.formRegisterHidden
              }`}
            >
              <div className={styles.title}>
                <h1>LOGIN</h1>
              </div>
              <div style={{ padding: "0 50px" }}>
                <div className={styles.login}>
                  <div className="MaterialForm">
                    <Formik
                      initialValues={users}
                      enableReinitialize
                      validationSchema={validationSchema}
                      onSubmit={(values, formikHelpers) => {
                        onSubmit(values, formikHelpers);
                      }}
                    >
                      {({ errors, isValid, touched, dirty }) => (
                        <Form>
                          <Field
                            name="userName"
                            type="text"
                            as={TextField}
                            variant="outlined"
                            color="primary"
                            label="userName"
                            fullWidth
                            error={
                              Boolean(errors.userName) &&
                              Boolean(touched.userName)
                            }
                            helperText={
                              Boolean(touched.userName) && errors.userName
                            }
                          />
                          <Field
                            name="password"
                            type="password"
                            as={TextField}
                            variant="outlined"
                            color="primary"
                            label="Password"
                            fullWidth
                            error={
                              Boolean(errors.password) &&
                              Boolean(touched.password)
                            }
                            helperText={
                              Boolean(touched.password) && errors.password
                            }
                          />
                          <div
                            style={{
                              display: "flex",
                              color: " #f44336",
                              marginBottom: "16px",
                            }}
                          >
                            {errors.checkbox && <span>{errors.checkbox}</span>}
                          </div>
                          {loading ? (
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              size="large"
                              disabled
                            >
                              Loading...
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              size="large"
                              disabled={!isValid || !dirty}
                            >
                              Login
                            </Button>
                          )}
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
                <LoginGoogle />
              </div>
            </div>
            <div
              className={`${styles.formRegisterHidden} ${
                hidden && styles.formRegisterEmail
              }`}
            >
              <div className={styles.title}>
                <button className={styles.back} onClick={handleClick}>
                  <div className={styles.icons}>
                    <div>
                      <span>Back</span>
                    </div>
                  </div>
                </button>
                <h1>Login</h1>
              </div>
            </div>
            <div className={styles.login}>
              {/* {userSlice.map((user) => (
                <User
                  key={user.id}
                  user={user}
                  users={users}
                  setUsers={setUsers}
                />
              ))} */}
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    </div>
  );
}

export default Register;

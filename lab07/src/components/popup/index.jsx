import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { NotificationManager } from "react-notifications";
// import NotificationContainer from "react-notifications/lib/NotificationContainer";
import axios from "axios";
import { validationAddFilm } from "../validation";
import { storeImageToFireBase } from "../../utils/storeImageToFirebase.";
function Popup({ film, setValue, handleClick, w }) {
  const users = {
    title: film.title,
    year: film.year,
    nation: film.nation,
    des: film.des,
    clip: film.clip,
  };
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFront, setImageFront] = useState(film.image);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  useEffect(
    () => {
      const uploadImage = async () => {
        setIsLoading(true);
        if (!selectedFile) {
          setIsLoading(false);
          return;
        }
        const { isSuccess, imageUrl, message } = await storeImageToFireBase(
          selectedFile
        );
        if (isSuccess) {
          setImageFront(imageUrl);
          setIsLoading(false);
          return imageUrl;
        } else {
          console.log(message);
        }
        setIsLoading(false);
      };
      uploadImage();
    },
    // eslint-disable-next-line
    [selectedFile]
  );
  const onSubmit = (values, formikHelpers) => {
    setLoading(true);
    axios({
      method: "PUT",
      url: `https://63694c1b28cd16bba71a4ee3.mockapi.io/db/${film.id}`,
      data: { ...values, image: imageFront },
    })
      .then((res) => {
        setImageFront(null);
        setLoading(false);
        setValue(true);
        NotificationManager.success("success");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        NotificationManager.error("fail");
      });
    setValue(false);
    handleClick();
    formikHelpers.resetForm();
  };

  const onClick = () => {
    handleClick();
  };
  return (
    <div className="containerModal">
      <div className="modalShadow" onClick={onClick}></div>
      <div className="modalFilm">
        <div className="containerDetail">
          {w ? (
            <iframe
              width="900px"
              height="450px"
              src={film.clip}
              title={film.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          ) : (
            <>
              <div className="white_box_5">
                <div className="profile_info">
                  <div className="Container_info">
                    {imageFront !== null && (
                      <img className="profile_card" src={imageFront} alt="" />
                    )}
                    <div>
                      {isLoading ? (
                        <button
                          type="button"
                          disabled
                          style={{
                            opacity: ".4",
                            width: "30%",
                          }}
                          className="chooseFileButton btn btn-primary btn--m"
                        >
                          loading..
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="chooseFileButton btn btn-primary btn--m"
                            style={{ width: "30%" }}
                          >
                            Chọn hình
                          </button>
                          <input
                            type="file"
                            name="profileImageUrl"
                            accept="image/*"
                            onChange={onSelectFile}
                            id="upload"
                            className="btn"
                            style={{
                              opacity: 0,
                              zIndex: 1,
                              left: 0,
                              width: "100%",
                              position: "absolute",
                            }}
                          />
                        </>
                      )}
                    </div>
                    <Formik
                      initialValues={users}
                      enableReinitialize
                      validationSchema={validationAddFilm}
                      onSubmit={(values, formikHelpers) => {
                        onSubmit(values, formikHelpers);
                      }}
                    >
                      {({ errors, isValid, touched }) => (
                        <Form>
                          <Field
                            name="title"
                            type="text"
                            as={TextField}
                            variant="outlined"
                            color="primary"
                            label="title"
                            fullWidth
                            error={
                              Boolean(errors.title) && Boolean(touched.title)
                            }
                            helperText={Boolean(touched.title) && errors.title}
                          />
                          <div style={{ display: "flex" }}>
                            <Field
                              name="year"
                              type="text"
                              as={TextField}
                              variant="outlined"
                              color="primary"
                              label="year"
                              error={
                                Boolean(errors.year) && Boolean(touched.year)
                              }
                              helperText={Boolean(touched.year) && errors.year}
                            />
                            <Field
                              name="nation"
                              type="text"
                              as={TextField}
                              variant="outlined"
                              color="primary"
                              label="nation"
                              fullWidth
                              error={
                                Boolean(errors.nation) &&
                                Boolean(touched.nation)
                              }
                              helperText={
                                Boolean(touched.nation) && errors.nation
                              }
                            />
                          </div>
                          <Field
                            name="des"
                            type="text"
                            as={TextField}
                            variant="outlined"
                            color="primary"
                            label="des"
                            fullWidth
                            error={Boolean(errors.des) && Boolean(touched.des)}
                            helperText={Boolean(touched.des) && errors.des}
                          />
                          <Field
                            name="clip"
                            type="text"
                            as={TextField}
                            variant="outlined"
                            color="primary"
                            label="URL-clip"
                            fullWidth
                            error={
                              Boolean(errors.clip) && Boolean(touched.clip)
                            }
                            helperText={Boolean(touched.clip) && errors.clip}
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
                              disabled={!isValid}
                            >
                              Update Film
                            </Button>
                          )}
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;

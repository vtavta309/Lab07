import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../card";
import { NotificationContainer } from "react-notifications";
import { NotificationManager } from "react-notifications";
function Film() {
  const [value, setValue] = useState(false);
  const [listOfFilms, setListOfFilms] = useState([]);
  useEffect(
    () => {
      axios({
        method: "GET",
        url: "https://63694c1b28cd16bba71a4ee3.mockapi.io/db",
      })
        .then((res) => {
          setListOfFilms(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // eslint-disable-next-line
    [value]
  );

  const deleteFilm = (id) => {
    axios({
      method: "DELETE",
      url: `https://63694c1b28cd16bba71a4ee3.mockapi.io/db/${id}`,
    })
      .then((res) => {
        setValue(true);
        NotificationManager.success("success");
      })
      .catch((err) => {
        console.error(err);
        NotificationManager.error("fail");
      });
    setValue(false);
  };
  return (
    <div className="containerHome">
      {listOfFilms.map((film, index) => (
        <Card film={film} deleteFilm={deleteFilm} key={index} />
      ))}
      <NotificationContainer />
    </div>
  );
}

export default Film;

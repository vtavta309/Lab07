import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { gapi } from "gapi-script";
import { addLogin } from "../../store/user.reducer";

const clientId =
  "874015971178-0461l5tlksvspu487u08779128bn5rn7.apps.googleusercontent.com";
export default function LoginGoogle() {
  const dispatch = useDispatch();
  const [listGoogle, setListGoogle] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://63694c1b28cd16bba71a4ee3.mockapi.io/dbPlayers",
    })
      .then((res) => {
        setListGoogle(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const onSuccess = async (res) => {
    let checkLogin = "";
    checkLogin = listGoogle.findIndex(
      (users) => users.userId === res.profileObj.googleId
    );
    if (checkLogin !== -1) {
      axios({
        method: "GET",
        url: `https://63694c1b28cd16bba71a4ee3.mockapi.io/dbPlayers/${parseInt(
          listGoogle[checkLogin].id
        )}`,
      })
        .then((res) => {
          dispatch(addLogin(res.data));
          localStorage.setItem("userLogin", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios({
        method: "POST",
        url: "https://63694c1b28cd16bba71a4ee3.mockapi.io/dbPlayers",
        headers: config,
        data: {
          name: res.profileObj.givenName,
          img: res.profileObj.imageUrl,
          nation: "VIETNAM",
          info: res.profileObj.email,
          userName: res.profileObj.name,
          userId: res.profileObj.googleId,
        },
      })
        .then((res) => {
          dispatch(addLogin(res.data));
          localStorage.setItem("userLogin", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const onFailure = (res) => {
    console.log("onFailure", res);
  };
  return (
    <GoogleLogin
      buttonText="Login"
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}

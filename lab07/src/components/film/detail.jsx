import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIsHidden } from "../../hooks/useIsHidden";
import Popup from "../popup";
function Detail() {
  const { detailId } = useParams();
  const { hidden, handleClick } = useIsHidden();
  const [loading, setLoading] = useState(false);
  const [film, setFilm] = useState(null);
  const onClick = () => {
    handleClick();
  };
  useEffect(
    () => {
      setLoading(true);
      axios({
        method: "GET",
        url: `https://63694c1b28cd16bba71a4ee3.mockapi.io/db/${detailId}`,
      })
        .then((res) => {
          setFilm(res.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div style={{ textAlign: "center" }}>
      <div className="containerDetail" style={{ width: "60%" }}>
        {loading || film === null ? (
          "load"
        ) : (
          <div className="white_box_5">
            <img className="profile_card" src={film.image} alt="" />
            <div className="profile_info">
              <div className="Container_info">
                <h2>
                  {film.title}
                  <span style={{ paddingTop: "10px" }}>/{film.nation}</span>
                </h2>
                <p>{film.year}</p>
                <p>{film.des}</p>
                <p
                  style={{
                    display: "inline-block",
                    backgroundColor: "pink",
                    padding: "10px 15px",
                    borderRadius: "30px",
                  }}
                  onClick={onClick}
                >
                  trailer
                </p>
              </div>
            </div>
          </div>
        )}
        {hidden && <Popup film={film} handleClick={handleClick} w={true} />}
      </div>
    </div>
  );
}

export default Detail;

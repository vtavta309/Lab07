import React from "react";
import { Link } from "react-router-dom";
import { Col, Card } from "react-materialize";
import { useIsLogin } from "../../hooks/useIsLogin";

function CardFilm({ film, deleteFilm }) {
  const { isLogin } = useIsLogin();
  return (
    <>
      <Card>
        <Col>
          <div className="card">
            <div className="item">
              <div className="avatarImg">
                <img src={film.image} alt={film.image} />
              </div>
              <div className="advisor" style={{ justifyContent: "flex-end" }}>
                <div className="profile">
                  <Link to={`/detail/${film.id}`} className="name">
                    {film.title}
                  </Link>
                  <div>
                    <span className="info">{film.year}</span>
                    <span className="info">{film.nation}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {isLogin && (
                <div className="skills">
                  <span
                    className="info"
                    style={{ background: "crimson", cursor: "pointer" }}
                    onClick={() => deleteFilm(film.id)}
                  >
                    Delete
                  </span>
                  <span
                    className="info"
                    style={{
                      background: "darkcyan",
                      cursor: "pointer",
                    }}
                  >
                    <Link
                      to={`add-film/${film.id}`}
                      style={{
                        color: "#fff",
                      }}
                    >
                      Update
                    </Link>
                  </span>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Card>
    </>
  );
}

export default CardFilm;

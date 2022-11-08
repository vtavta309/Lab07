import { Routes, Route } from "react-router-dom";
import Film from "./components/film";
import Navigation from "./components/navigation";
import "./App.css";
import Register from "./page/register";
import "react-notifications/lib/notifications.css";
import Detail from "./components/film/detail";
import AddFilm from "./components/film/addFilm";
import { useIsLogin } from "./hooks/useIsLogin";
import UpdateFilm from "./components/film/update";

function App() {
  const { isLogin } = useIsLogin();
  return (
    <div className="App">
      {isLogin ? (
        <>
          <Navigation />
          <Routes>
            <Route path="/" element={<Film />}></Route>
            <Route path="/add-film" element={<AddFilm />}></Route>
            <Route path="/add-film/:filmId" element={<UpdateFilm />}></Route>
            <Route path="/detail/:detailId" element={<Detail />}></Route>
          </Routes>
        </>
      ) : (
        <Register />
      )}
    </div>
  );
}

export default App;

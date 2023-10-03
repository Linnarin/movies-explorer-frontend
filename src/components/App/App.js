import React, { useEffect, useState } from "react";

import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { BASE_URL } from "../../utils/constatns";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]); //все фильмы
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильмы

  const [isError, setIsError] = useState({});
  
  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      handleCheckToken(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storageMovies = localStorage.getItem(`movies`);
    if (user?._id) {
      setIsLoading(true);

      fetchGetSavedMovies(token)
        .then((saved) => {
          const myMovies = saved.data.filter(
            (movie) => movie.owner === user._id
          );
            if(storageMovies){

              let newMovies = JSON.parse(storageMovies);
    
              if (myMovies.length > 0) {
                newMovies = newMovies.map((movie) => {
                  const saved = myMovies.find((save) => save.movieId == movie.id);
                  if (saved) {
                    movie._id = saved._id;
                  }
                  return movie;
                });
              }
              setMovies(newMovies);
            }
          setSavedMovies(myMovies);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    let newMovies = movies.map((item) => {
      if (item._id) {
        delete item._id;
      }
      return item;
    });
    if (savedMovies.length > 0) {
      newMovies = movies.map((movie) => {
        const save = savedMovies.find((save) => save.movieId == movie.id);

        if (save) {
          movie._id = save._id;
        }
        return movie;
      });
    }
    setMovies(newMovies);
  }, [savedMovies]);

  function handleMovieSave(movieCard) {
    mainApi
      .saveMovie(movieCard)
      .then(({ data }) => {
        setSavedMovies((prev) => [data, ...prev]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleMovieDelete(movie) {
    const movieId = movie._id;
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const newMovies = savedMovies.filter((m) =>
          m._id == movie._id ? false : true
        );
        setSavedMovies(newMovies);
      })
      .catch((err) => {
        console.log("err=>", err);
      });
  }

  function register({ name, email, password }) {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
        createError("register", err);
      })
      .finally(setIsLoading(false));
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        handleCheckToken(data.token);
      })
      .catch((err) => {
        console.log(`Ошибка при входе в систему: ${err}`);
        createError("login", err);
      })
      .finally(setIsLoading(false));
  }
  function handleCheckToken(token) {
    const pathname = location.pathname;
    mainApi
      .checkToken(token)
      .then(({ data }) => {
        setIsLoggedIn(true);
        setUser(data);

        if (pathname === "/signup" || pathname === "/signin") {
          navigate("/movies", { replace: true });
        } else {
          navigate(pathname, { replace: true });
        }
      })
      .catch((err) => {
        createError("auth", err);
        setIsLoading(false);
        console.error(`Ошибка при загрузке данных пользователя ${err}`);
      });
  }

  function handleUpdateInfoUser(data) {
    setIsLoading(true);
    mainApi
      .updateUser(data)
      .then((res) => {
        setUser(res.data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        createError("updateUser", err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser({});
    setSavedMovies([]);
    setMovies([]);
    setIsError({});
  }

  function createError(name, text) {
    setIsError((prev) => ({ ...prev, [name]: text }));
    setTimeout(
      (isError) => {
        delete isError[name];
        setIsError({ ...isError });
      },
      3000,
      isError
    );
  }

  function onSearch() {
    fetchGetMovies().then((data) => {
      const modMovies = data.map((movie) => {
        const sMovies = savedMovies.find((saved) => movie.id == saved.movieId);

        if (sMovies) {
          movie._id = sMovies._id;
        }
        return movie;
      });
      setMovies(modMovies);
    });
  }
  const fetchGetMovies = async () => {
    const storageMovies = localStorage.getItem(`movies`);
    if (storageMovies && JSON.parse(storageMovies).length > 0) {
      return Promise.resolve(JSON.parse(storageMovies));
    } else {
      setIsLoading(true);
      const data = await moviesApi.getMovies();
      const modifiedMovies = data.map((item) => {
        return {
          ...item,
          image: `${BASE_URL}${item.image.url}`,
          thumbnail: `${BASE_URL}${item.image.formats.thumbnail.url}`,
        };
      });
      localStorage.setItem(`movies`, JSON.stringify(modifiedMovies));
      setIsLoading(false);
      return modifiedMovies;
    }
  };
  function fetchGetSavedMovies(token) {
    const storageSavedMovies = localStorage.getItem(`savedMovies`);
    if (storageSavedMovies && JSON.parse(storageSavedMovies).length > 0) {
      return Promise.resolve(JSON.parse(storageSavedMovies));
    } else {
      return mainApi.getSavedMovies(token);
    }
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider
        value={{
          user,
          savedMovies,
          movies,
          isError,
          isLoggedIn,
          isLoading,
          handleMovieSave,
          handleMovieDelete,
          onSearch,
        }}
      >
        <Header />
        <main className="content">
          <Routes>
            <Route
              path="/movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} element={Movies} />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} element={SavedMovies} />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  updateInfoUser={handleUpdateInfoUser}
                  element={Profile}
                  handleLogOut={handleLogOut}
                />
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register isLoggedIn={!isLoggedIn} register={register} />
                )
              }
            />
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login isLoggedIn={!isLoggedIn} login={handleLogin} />
                )
              }
            />

            <Route path="/" element={<Main />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

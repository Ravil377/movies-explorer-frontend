import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Error404 from "../error404/error404";
import ApiMain from "../../utils/MainApi";
import ApiMovies from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";

function App() {
    const exclusionForHeader = [
        '/',
        '/movies',
        '/saved-movies',
        '/profile',
    ]
    const exclusionForFooter = [
        '/',
        '/movies',
        '/saved-movies',
    ]
    
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [isError, setIsError] = React.useState({error: '', success: ''});
    const [saveFilterMovies, setSaveFilterMovies] = React.useState([]);
    const [moviesFilter, setMoviesFilter] = React.useState([]);
    const [saveMovies, setSaveMovies] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [films, setFilms] = React.useState([]);
    const [sendForm, setSendForm] = React.useState(false);
    const [search, setSearch] = React.useState({ search: '', isShort: false, isSaveMovie: false })
    const [isFind, setIsFind] = React.useState(false);
    
    const history = useHistory();
    const location = useLocation();

    // Проверка кукисов
    React.useEffect(() => {
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    // Загрузка сохраненных фильмов и отфильтрованных
    React.useEffect(() => {
        if(loading && loggedIn) {
            handleGetSavedMovies();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, loggedIn]);

    // При обновлении состояния фильмов запускаем поиск
    React.useEffect(() => {
        if(isFind) {
            searchFromMovies();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFind]);

    // при обновлении состояния отфильтрованных фильмов либо ошибки отключаем прелоадер
    React.useEffect(() => {
        if(films !== '' && films !== null && search.search) {
            searchFromMovies();
        }
    }, [films]);
      
    const handleLoadFilteredFilm = () => {
        setMoviesFilter(() => JSON.parse(localStorage.getItem("filteredmovies")));
    }

    // Нажатие на кнопку поиска в сохраненных фильмах
    const handleSearchMoviesClick = (search, isShort, isSaveMovie) => {
        setIsLoading(true);
        !isSaveMovie && handleGetMovies();
        setSearch({search: search, isShort: isShort, isSaveMovie: isSaveMovie})
        setIsFind(true);
    }

    // Приводим название и запрос к нижнему регистру и ищем совпадение. 
    // Возвращаем разные данные в зависимости от чекбокса короткометражки.
    // Отключаем прелоадинг и возвращаем результат поиска.
    const searchFromMovies = () => {
        let data = search.isSaveMovie ? saveMovies : films;
        const filtered = data.filter((movie) => {
            let film = movie.nameRU.toLowerCase().includes(search.search.toLowerCase());
            return (search.isShort && film) ? movie.duration <= 40 : film;
        });
        filtered.length === 0 ? setIsError({error: 'Ничего не найдено'}) : search.isSaveMovie ? setSaveFilterMovies(filtered) : setMoviesFilter(filtered);
        setIsLoading(false);
        setIsFind(false);
        !search.isSaveMovie && localStorage.setItem('filteredmovies', JSON.stringify(filtered));
    };

    // Поиск фильма в сохраненных фильмах и возврат булева, для выставления лайка в мовисах.
    const compareMoviesLike = (id) => saveMovies.some((movie) => {
        // console.log(parseInt(movie.movieId) === id && id);
        return parseInt(movie.movieId) === id;
    });
 
    // Поиск в сохраненных фильмах _id
    const findIdForRemove = (id) => saveMovies.some((movie) => parseInt(movie.movieId) === id);

    // Сброс ошибок
    const resetError = () => setIsError({error: '', success: ''});

    // Обнуление отфильтрованных фильмов
    const resetFilter = () => setSaveFilterMovies([]);

    // Загрузка фильмов с проверкой на присутствие ранее загруженных фильмов и дальнейшая передача их в состояние.
    // Смена состояние поиска.
    const handleGetMovies = () => {
        if (localStorage.getItem('movies') === null) {
            getFilms();
        } else {
            setFilms(JSON.parse(localStorage.getItem("movies")));
        }
    }

    const getFilms = async () => {
        await ApiMovies.getInitialMovies()
                .then((res) => {
                    setFilms((state) => res.forEach(item => item.isLike = compareMoviesLike(item.id)));
                    localStorage.setItem("movies", JSON.stringify(films));
                })
                .catch(err => {
                    setIsError({error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'});
                });
    }

    // Загрузка сохраненных фильмов
    const handleGetSavedMovies = async() => {
        await ApiMain.getInitialSavedMovies()
            .then((res) => {
                setSaveMovies(res.filter((movie) => movie.owner === currentUser._id));
                console.log(saveMovies);
            })
            .catch((err) => {
                setIsError({error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'});
            });
    }

    // Мобильное меню
    const handleMenuClose = () => setMenuOpen(false);
    const handleMenuOpen = () => setMenuOpen(true);

    const outputHeader = (exclusionArray) => exclusionArray.indexOf(location.pathname) >= 0;

    // Сохранение фильма
    const handleSaveMovie = async (movie) => {
        await ApiMain.saveMovie(movie)
            .then((res) => {
                setSaveMovies([res, ...saveMovies]);
            })
            .catch((err) => {
                setIsError({error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'});
            });
    };

    // Удаление лайка
    const handleRemoveMovie = (id) => deleteMovie(findIdForRemove(id)._id);
  
    // Удаление фильма из сохраненных фильмов и отфильтрованных фильмов
    const deleteMovie = async (id) => {
        await ApiMain.deleteMovie(id)
            .then((res) => {
                // setFilms(() => films.find)
                setSaveFilterMovies(() => saveFilterMovies.filter((movie) => movie._id !== res._id));
                setSaveMovies(() => saveMovies.filter((movie) => movie._id !== res._id));
            })
            .catch((err) => {
                setIsError({error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'});
            });
    }
    
    const checkToken = async() => {
        await ApiMain.checkToken()
            .then((res) => {
                if (res.message !== "Необходима авторизация") {
                    setLoggedIn(true);
                    setCurrentUser(res);
                    setLoading(true);
                    handleLoadFilteredFilm();
                }
            })
            .catch((err) => {
                setLoading(true);
                console.log('Необходима авторизация');
            });
    }
        
    // Разлогинирование
    const handleSignOut = () => {
        ApiMain.logout()
            .then((res) => {
                if(res.message === "Пользователь разлогинен") {
                    localStorage.removeItem('movies');
                    localStorage.removeItem('filteredmovies');
                    setSaveFilterMovies([]);
                    setFilms([]);
                    setSaveMovies([]);
                    setLoggedIn(false);
                    setMoviesFilter([]);
                    setCurrentUser({});
                    history.push("/");
                }
            })
            .catch((err) => setIsError({error: 'На сервере произошла ошибка'}));
    };

    // Регистрация пользователя
    const handleRegisterUser = ({ email, password, name }) => {
        setSendForm(true);
        ApiMain.register(email, password, name)
            .then((res) => {
                setSendForm(false);
                handleLoginUser({ email, password });
            })
            .catch((err) => {
                setSendForm(false);
                if(err === 409) {
                    setIsError({error: 'Пользователь с таким email уже существует'});
                } else if(err === 500) {
                    setIsError({error: 'На сервере произошла ошибка'});
                } else {
                    setIsError({error: 'При регистрации пользователя произошла ошибка'});
                }
            })
    };

    // Аутентификация
    const handleLoginUser = async ({ email, password }) => {
        setSendForm(true);
        await ApiMain.login(email, password)
            .then((res) => {
                if (res.message === "Пользователь залогинен") {
                    setSendForm(false);
                    setLoggedIn(true);
                    checkToken();
                    history.push("/movies");
                }
            })
            .catch((err) => {
                setSendForm(false);
                if(err === 401) {
                    setIsError({error: 'Вы ввели неправильный логин или пароль'});
                } else {
                    setIsError({error: 'На сервере произошла ошибка'});
                }
            })    
    };

    // Изменение данных пользователя
    const handleUpdateUser = ({ name, email }) => {
        setSendForm(true);
        ApiMain.updateUser(name, email)
            .then((res) => {
                setSendForm(false);
                setCurrentUser({ name: res.name, email: res.email });
                setIsError({success: "Данные успешно изменены"})
            })
            .catch((err) => {
                setSendForm(false);
                if(err === 409) {
                    setIsError({error: 'Пользователь с таким email уже существует'});
                } else if(err === 500) {
                    setIsError({error: 'На сервере произошла ошибка'});
                } else {
                    setIsError({error: 'При обновлении профиля произошла ошибка'});
                }
            })
    };

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                {outputHeader(exclusionForHeader) && <Header 
                                        isMenuOpen={isMenuOpen} 
                                        isLogged={loggedIn} 
                                        onClose={handleMenuClose}
                                        onOpen={handleMenuOpen} />}
                {loading ? 
                    (<Switch>
                        <ProtectedRoute 
                            component={Movies}
                            path="/movies" 
                            loggedIn={loggedIn} 
                            isLoading={isLoading}
                            isError={isError} 
                            resetError={resetError}
                            checkToken={checkToken}
                            onSearchClick={handleSearchMoviesClick}
                            getMovies={handleGetMovies}
                            saveMovie={handleSaveMovie}
                            removeMovie={handleRemoveMovie}
                            isLike={compareMoviesLike}
                            // resetFilter={resetFilter}
                            movies={moviesFilter}
                        />

                        <ProtectedRoute 
                            component={SavedMovies} 
                            path="/saved-movies" 
                            loggedIn={loggedIn} 
                            isLoading={isLoading}
                            onSearchClick={handleSearchMoviesClick}
                            checkToken={checkToken}
                            isLike={compareMoviesLike}
                            saveMovies={saveMovies}
                            movies={saveFilterMovies}
                            deleteMovie={deleteMovie}
                            isError={isError} 
                            resetFilter={resetFilter}
                            resetError={resetError}
                        />

                        <ProtectedRoute
                            path="/profile"
                            loggedIn={loggedIn}
                            component={Profile}
                            signOut={handleSignOut}
                            checkToken={checkToken}
                            onUpdateUser={handleUpdateUser}
                            isError={isError}
                            sendForm={sendForm}
                            resetError={resetError}
                        />

                        <Route path="/profile">
                            <Profile 
                                loggedIn={loggedIn}
                                signOut={handleSignOut}
                                onUpdateUser={handleUpdateUser}
                                checkToken={checkToken}
                                isError={isError} 
                                sendForm={sendForm}
                                resetError={resetError}
                            />
                        </Route>

                        <Route path="/movies">
                            <Movies 
                                loggedIn={loggedIn}
                                onSearchClick={handleSearchMoviesClick}
                                getMovies={handleGetMovies}
                                saveMovie={handleSaveMovie}
                                removeMovie={handleRemoveMovie}
                                // resetFilter={resetFilter}
                                isLike={compareMoviesLike}
                                checkToken={checkToken}
                                isLoading={isLoading}
                                isError={isError}
                                movies={moviesFilter} 
                            />
                        </Route>

                        <Route path="/saved-movies">
                            <SavedMovies    
                                loggedIn={loggedIn}
                                onSearchClick={handleSearchMoviesClick}
                                resetFilter={resetFilter}
                                isLike={compareMoviesLike}
                                checkToken={checkToken}
                                saveMovies={saveMovies}
                                isLoading={isLoading}
                                isError={isError}
                                movies={saveFilterMovies} 
                            />
                        </Route>

                        <Route path="/signup">
                            <Register 
                                onRegister={handleRegisterUser}
                                isError={isError} 
                                resetError={resetError}
                                sendForm={sendForm}
                            />
                        </Route>

                        <Route path="/signin">
                            <Login 
                                onLogin={handleLoginUser}
                                isError={isError} 
                                sendForm={sendForm}
                                resetError={resetError}
                            />
                        </Route>

                        <Route exact path="/">
                            <Main />
                        </Route>

                        <Route path="*">
                            <Error404 />
                        </Route>
                    </Switch>) : <Preloader />}

                    {outputHeader(exclusionForFooter) && <Footer />}
                </div>
            </CurrentUserContext.Provider>
        </>
    );
}
export default App;
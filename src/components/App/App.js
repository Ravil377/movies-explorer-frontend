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
    const [isError, setIsError] = React.useState({error: '', success: ''});
    const [filterMovies, setFilterMovies] = React.useState([]);
    const [saveMovies, setSaveMovies] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [films, setFilms] = React.useState([]);
    const [search, setSearch] = React.useState({search: '', isShort: false, isSaveMovie: false});

    const history = useHistory();
    const location = useLocation();

    // Проверка кукисов
    React.useEffect(() => {
        // console.log('token');
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    // // Загрузка сохраненных фильмов 
    // React.useEffect(() => {
    //     if(currentUser && loggedIn) {
    //         handleGetSavedMovies();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentUser, loggedIn]);

    // При обновлении состояния фильмов запускаем поиск
    React.useEffect(() => {
        if(films !== null) {
            handleSearchMoviesClick(search.search, search.isShort, search.isSaveMovie);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [films]);

    // при обновлении состояния отфильтрованных фильмов либо ошибки отключаем прелоадер
    React.useEffect(() => {
        setIsLoading(false);
    }, [filterMovies, isError]);
      
    // Нажатие на кнопку поиска в фильмах
    const handleSearchMoviesClick = (search, isShort, isSaveMovie) => {
        setIsLoading(true);
        const bd = isSaveMovie ? saveMovies : films;
        searchFromMovies(search, isShort, bd);
    }

    // Приводим название и запрос к нижнему регистру и ищем совпадение. 
    // Возвращаем разные данные в зависимости от чекбокса короткометражки.
    // Отключаем прелоадинг и возвращаем результат поиска.
    const searchFromMovies = (search, isShort, movies) => {
        const filtered = movies.filter((movie) => {
            let film = movie.nameRU.toLowerCase().includes(search.toLowerCase());
            return (isShort && film) ? movie.duration <= 40 : film;
        });
        filtered.length === 0 ? setIsError({error: 'Ничего не найдено'}) : setFilterMovies(filtered);
    };

    // Поиск фильма в сохраненных фильмах и возврат булева, для выставления лайка в мовисах.
    const compareMoviesLike = (id) => saveMovies.some((movie) => parseInt(movie.movieId) === id);
 
    // Поиск в сохраненных фильмах _id
    const findIdForRemove = (id) => saveMovies.find((movie) => parseInt(movie.movieId) === id);

    // Сброс ошибок
    const resetError = () => setIsError({error: '', success: ''});

    // Обнуление состояния ошибки и отфильтрованных фильмов
    const resetFilter = () => setFilterMovies([]);

    // Загрузка фильмов с проверкой на присутствие ранее загруженных фильмов и дальнейшая передача их в состояние.
    // Смена состояние поиска.
    const getFilms = () => {
        ApiMovies.getInitialMovies()
                .then((res) => {
                    localStorage.setItem("movies", JSON.stringify(res));
                    setFilms(JSON.parse(localStorage.getItem("movies")));
                })
                .catch(err => {
                    setIsError({error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'});
                });
    }

    function handleGetMovies(search, isShort, isSaveMovie) {
        setIsLoading(true);
        setSearch({ search: search, isShort: isShort, isSaveMovie: isSaveMovie })
        if (localStorage.getItem('movies') === null) {
            getFilms();
        } else {
            setFilms(JSON.parse(localStorage.getItem("movies")));
        }
    }

    // Загрузка сохраненных фильмов
    const handleGetSavedMovies = () => {
        ApiMain.getInitialSavedMovies()
            .then((res) => {
                setSaveMovies(() => res.filter((movie) => movie.owner === currentUser._id));
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
    const handleSaveMovie = (movie) => {
        ApiMain.saveMovie(movie)
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
    const deleteMovie = (id) => {
        ApiMain.deleteMovie(id)
            .then((res) => {
                setFilterMovies(() => filterMovies.filter((movie) => movie._id !== res._id));
                setSaveMovies(() => saveMovies.filter((movie) => movie._id !== res._id));
            })
            .catch((err) => {
                setIsError({error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'});
            });
    }
    
    async function checkToken() {
        ApiMain.checkToken()
            .then((res) => {
                if (res.message !== "Необходима авторизация") {
                    setLoggedIn(true);
                    setCurrentUser(res);
                    handleGetSavedMovies();
                }
            })
            .catch((err) => console.log('Необходима авторизация'));
    }
        
    // Разлогинирование
    const handleSignOut = () => {
        ApiMain.logout()
            .then((res) => {
                if(res.message === "Пользователь разлогинен") {
                    localStorage.removeItem('movies');
                    setLoggedIn(false);
                    history.push("/");
                }
            })
            .catch((err) => setIsError({error: 'На сервере произошла ошибка'}));
    };

    // Регистрация пользователя
    const handleRegisterUser = ({ email, password, name }) => {
        ApiMain.register(email, password, name)
            .then((res) => {
                handleLoginUser({ email, password });
            })
            .catch((err) => {
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
    const handleLoginUser = ({ email, password }) => {
        ApiMain.login(email, password)
            .then((res) => {
                if (res.message === "Пользователь залогинен") {
                    checkToken();
                    history.push("/movies");
                }
            })
            .catch((err) => {
                if(err === 401) {
                    setIsError({error: 'Вы ввели неправильный логин или пароль'});
                } else {
                    setIsError({error: 'На сервере произошла ошибка'});
                }
            })
    };

    // Изменение данных пользователя
    const handleUpdateUser = ({ name, email }) => {
        ApiMain.updateUser(name, email)
            .then((res) => {
                setCurrentUser({ name: res.name, email: res.email });
                setIsError({success: "Данные успешно изменены"})
            })
            .catch((err) => {
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

                    <Switch>
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
                            resetFilter={resetFilter}
                            movies={filterMovies}
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
                            movies={filterMovies}
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
                            resetError={resetError}
                        />

                        <Route path="/profile">
                            <Profile 
                                loggedIn={loggedIn}
                                signOut={handleSignOut}
                                onUpdateUser={handleUpdateUser}
                                checkToken={checkToken}
                                isError={isError} 
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
                                resetFilter={resetFilter}
                                isLike={compareMoviesLike}
                                checkToken={checkToken}
                                isLoading={isLoading}
                                isError={isError}
                                movies={filterMovies} 
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
                                movies={filterMovies} 
                            />
                        </Route>

                        <Route path="/signup">
                            <Register 
                                onRegister={handleRegisterUser}
                                isError={isError} 
                                resetError={resetError}
                            />
                        </Route>

                        <Route path="/signin">
                            <Login 
                                onLogin={handleLoginUser}
                                isError={isError} 
                                resetError={resetError}
                            />
                        </Route>

                        <Route exact path="/">
                            <Main />
                        </Route>

                        <Route path="*">
                            <Error404 />
                        </Route>
                    </Switch>
                    {outputHeader(exclusionForFooter) && <Footer />}
                </div>
            </CurrentUserContext.Provider>
        </>
    );
}
export default App;
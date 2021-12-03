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
import {exclusionForHeader, exclusionForFooter} from "../../utils/Const";

function App() {    
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
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const history = useHistory();
    const location = useLocation();

    // Проверка кукисов
    React.useEffect(() => {
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    // Загрузка при запуске страницы фильтрованных и сохраненных фильмов
    React.useEffect(() => {
        if((loggedIn && currentUser)) {
            handleLoadFilteredFilm();
            handleGetSavedMovies();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);
   
    React.useEffect(() => {
        isSuccess && searchFromMovies(false);
    }, [isSuccess]);
      
    // Загрузка в состояние с локалстоража отфильтрованных фильмов
    const handleLoadFilteredFilm = () => setMoviesFilter(JSON.parse(localStorage.getItem("filteredmovies")));

    // Нажатие на кнопку поиска в Movies и SavedMovies
    const handleSearchMoviesClick = (isSaveMovie) => !isSaveMovie ? handleGetMovies() : searchFromMovies(true);

    // Приводим название и запрос к нижнему регистру и ищем совпадение. 
    // Возвращаем разные данные в зависимости от чекбокса короткометражки.
    // Отключаем прелоадинг и возвращаем результат поиска.
    const searchFromMovies = (isSaveMovie) => {
        let data = isSaveMovie ? saveMovies : films;
        const filtered = data.filter((movie) => movie.nameRU.toLowerCase().includes(search.toLowerCase()));
        filtered.length === 0 ? setIsError({error: 'Ничего не найдено'}) : isSaveMovie ? setSaveFilterMovies(filtered) : setMoviesFilter(filtered);
        !isSaveMovie && localStorage.setItem('filteredmovies', JSON.stringify(filtered));
        setIsLoading(false);
        setIsSuccess(false);
    };

    // Сброс ошибок
    const resetError = () => setIsError({error: '', success: ''});

    // Обнуление отфильтрованных фильмов
    const resetFilter = () => setSaveFilterMovies([]);

    // Загрузка фильмов и проставление лайков
    const handleGetMovies = async() => {
        await ApiMovies.getInitialMovies()
            .then((res) => {
                const addFieldLike = res.map((item) => {
                    item.isLike = compareMoviesLike(item.id);
                    return item;
                });
                setFilms(addFieldLike);
                setIsSuccess(true);
            })
            .catch(err => {
                setIsError({error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'});
            });
    }

    // Поиск фильма в сохраненных фильмах и возврат булева, для выставления лайка в мовисах.
    const compareMoviesLike = (id) => saveMovies.some((movie) => parseInt(movie.movieId) === id);

    // Загрузка сохраненных фильмов
    const handleGetSavedMovies = () => {
        ApiMain.getInitialSavedMovies()
            .then((res) => setSaveMovies(res.filter((movie) => movie.owner === currentUser._id)))
            .catch(() => setIsError({error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}));
    }

    // Мобильное меню
    const handleMenuClose = () => setMenuOpen(false);
    const handleMenuOpen = () => setMenuOpen(true);
    
    // Вывод Header
    const outputHeader = (exclusionArray) => exclusionArray.indexOf(location.pathname) >= 0;

    // Сохранение фильма
    const handleSaveMovie = async (movie) => {
        await ApiMain.saveMovie(movie)
            .then((res) => {
                setSaveMovies([res, ...saveMovies]);
                const result = moviesFilter.map((film) => {
                    if(parseInt(res.movieId) === film.id) {
                        film.isLike = true;
                    }
                    return film;
                });
                setMoviesFilter(result);
                localStorage.setItem('filteredmovies', JSON.stringify(result));
            })
            .catch((err) => setIsError({error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}));
    };

    // Поиск в сохраненных фильмах _id
    const findIdForRemove = (id) => saveMovies.find((movie) => parseInt(movie.movieId) === id);
    
    // Удаление фильма из сохраненных фильмов и отфильтрованных фильмов
    const handleRemoveMovie = async (id) => {
        await ApiMain.deleteMovie(id)
            .then((res) => {
                setSaveFilterMovies(() => saveFilterMovies.filter((movie) => movie._id !== res._id));
                setSaveMovies(() => saveMovies.filter((movie) => movie._id !== res._id));
                const result = moviesFilter.map((film) => {
                    if(parseInt(res.movieId) === film.id) {
                        film.isLike = false;
                    }
                    return film;
                });
                setMoviesFilter(result);
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
                }
            })
            .catch((err) => {
                setLoading(true);
                console.log('Необходима авторизация');
            });
    }
        
    // Разлогинирование
    const handleSignOut = async() => {
        await ApiMain.logout()
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
                    setSearch('');
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
    const handleLoginUser = ({ email, password }) => {
        setSendForm(true);
        ApiMain.login(email, password)
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
                setLoading(true);
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
                            search={search}
                            setSearch={setSearch}
                            setIsLoading={setIsLoading}
                            isError={isError} 
                            resetError={resetError}
                            checkToken={checkToken}
                            onSearchClick={handleSearchMoviesClick}
                            getMovies={handleGetMovies}
                            saveMovie={handleSaveMovie}
                            removeMovie={handleRemoveMovie}
                            findIdForRemove={findIdForRemove}
                            isLike={compareMoviesLike}
                            // resetFilter={resetFilter}
                            movies={moviesFilter}
                        />

                        <ProtectedRoute 
                            component={SavedMovies} 
                            path="/saved-movies" 
                            loggedIn={loggedIn} 
                            isLoading={isLoading}
                            search={search}
                            setSearch={setSearch}
                            setIsLoading={setIsLoading}
                            onSearchClick={handleSearchMoviesClick}
                            checkToken={checkToken}
                            isLike={compareMoviesLike}
                            saveMovies={saveMovies}
                            movies={saveFilterMovies}
                            removeMovie={handleRemoveMovie}
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
                                isLoading={isLoading}
                                search={search}
                                findIdForRemove={findIdForRemove}
                                setSearch={setSearch}
                                setIsLoading={setIsLoading}
                                onSearchClick={handleSearchMoviesClick}
                                getMovies={handleGetMovies}
                                saveMovie={handleSaveMovie}
                                removeMovie={handleRemoveMovie}
                                isLike={compareMoviesLike}
                                checkToken={checkToken}
                                isError={isError}
                                movies={moviesFilter} 
                            />
                        </Route>

                        <Route path="/saved-movies">
                            <SavedMovies    
                                loggedIn={loggedIn} 
                                isLoading={isLoading}
                                search={search}
                                setSearch={setSearch}
                                setIsLoading={setIsLoading}
                                onSearchClick={handleSearchMoviesClick}
                                resetFilter={resetFilter}
                                isLike={compareMoviesLike}
                                checkToken={checkToken}
                                saveMovies={saveMovies}
                                isError={isError}
                                movies={saveFilterMovies}
                                removeMovie={handleRemoveMovie}
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
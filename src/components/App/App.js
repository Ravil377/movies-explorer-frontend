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
    const [isError, setIsError] = React.useState('');
    const [filterMovies, setFilterMovies] = React.useState([]);
    const [saveMovies, setSaveMovies] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});

    const history = useHistory();
    const location = useLocation();

    React.useEffect(() => {
        ApiMain.checkToken()
            .then((res) => {
                setLoggedIn(true);
                history.push("/");
                setCurrentUser(res);
            })
            .catch((err) => console.log(err));
    }, [history]);

    React.useEffect(() => {
        handleGetSavedMovies();
    }, [loggedIn]);

    // React.useEffect(() => {
    //     console.log(saveMovies);
    // }, []);

    const resetFilterMovies = () => {
        setFilterMovies([]);
    }

    const handleGetMovies = (search, checkbox) => {
        setIsError(false);
        setIsLoading(true);
        if (localStorage.getItem('movies') === null) {
            ApiMovies.getInitialMovies()
            .then((res) => {
                localStorage.setItem("movies", JSON.stringify(res));
                handleFilterMovies(res, search, checkbox);
            })
            .catch(err => {
                setIsLoading(false);
                setIsError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            })
        } else {
            handleFilterMovies(JSON.parse(localStorage.getItem("movies")), search, checkbox);
        }
    }

    const compareMoviesLike = (id) => {
        const result = saveMovies.some((movie) => {
            return movie.movieId == id;
        })
        return result;
    }
    
    const handleFilterMovies = (movies, search, checkbox) => {
        const result = movies.filter((movie) => {
            let film = movie.nameRU.toLowerCase().includes(search.toLowerCase());
            return (checkbox && film) ? movie.duration <= 40 : film;
        });
        setIsLoading(false);           
        result.length === 0 ? setIsError('Ничего не найдено') : setFilterMovies(result);
    };

    const handleGetSavedMovies = () => {
        setIsError(false);
        ApiMain.getInitialSavedMovies()
        .then((res) => {
            setSaveMovies(res,...saveMovies);
        })
        .catch(err => {
            setIsError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
    }

    const handleMenuClose = () => setMenuOpen(false);
    const handleMenuOpen = () => setMenuOpen(true);


    const outputHeader = (exclusionArray) => {
        return exclusionArray.indexOf(location.pathname) >= 0
    }

    const handleSaveMovie = (movie) => {
        ApiMain.saveMovie(movie)
            .then((res) => {
                setSaveMovies([res, ...saveMovies]);
            })
            .catch((err) => console.log(err));
    };

    const handleRemoveMovie = (id) => {
        const selectMovie = saveMovies.find((movie) => {
            return movie.movieId == id;
        })
        deleteMovie(selectMovie._id);
    }

    const deleteMovie = (id) => {
        ApiMain.deleteMovie(id)
            .then(async(res) => {
                await setSaveMovies((saveMovies) => saveMovies.filter((movie) => movie._id !== id));
            })
            .catch((err) => console.log(err));
    }

    const handleSignOut = () => {
        ApiMain.logout()
            .then((res) => {
                localStorage.removeItem('movies');
                setLoggedIn(false);
                history.push("/");
            })
            .catch((err) => console.log(err));
        
    };

    const handleRegisterUser = ({ email, password, name }) => {
        ApiMain.register(email, password, name)
            .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setCurrentUser(res);
                    history.push("/movies");
                }
            })
            .catch((err) => {
                console.log(err);
                // setLoggedIn(false);
            });
    };

    const handleLoginUser = ({ email, password }) => {
        ApiMain.login(email, password)
            .then((res) => {
                if (res.message === "Пользователь залогинен") {
                    setLoggedIn(true);
                    setCurrentUser(res);
                    history.push("/movies");
                } else {
                    setLoggedIn(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoggedIn(false);
            });
    };

    const handleUpdateUser = (name, email) => {
        setCurrentUser({ name: name, email: email });
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
                            getMovies={handleGetMovies}
                            saveMovie={handleSaveMovie}
                            removeMovie={handleRemoveMovie}
                            isLike={compareMoviesLike}
                            movies={filterMovies}
                            resetMovies={resetFilterMovies} 
                        />

                        <ProtectedRoute 
                            component={SavedMovies} 
                            path="/saved-movies" 
                            loggedIn={loggedIn} 
                            isLoading={isLoading}
                            isError={isError}
                            getFilterMovies={handleFilterMovies}
                            getMovies={handleGetSavedMovies}
                            isLike={compareMoviesLike}
                            saveMovies={saveMovies}
                            movies={filterMovies}
                            deleteMovie={deleteMovie}
                            resetMovies={resetFilterMovies}
                        />

                        <ProtectedRoute
                            path="/profile"
                            loggedIn={loggedIn}
                            component={Profile}
                            signOut={handleSignOut}
                            onUpdateUser={handleUpdateUser}
                        />

                        <Route path="/signup">
                            <Register 
                                onRegister={handleRegisterUser} />
                        </Route>

                        <Route path="/signin">
                            <Login 
                                onLogin={handleLoginUser} />
                        </Route>

                        <Route path="/movies">
                            <Movies 
                                getMovies={handleGetMovies}
                                saveMovie={handleSaveMovie}
                                removeMovie={handleRemoveMovie}
                                resetMovies={resetFilterMovies}
                                isLike={compareMoviesLike}
                                isLoading={isLoading}
                                isError={isError}
                                movies={filterMovies} 
                            />
                        </Route>

                        <Route path="/saved-movies">
                            <SavedMovies 
                                getFilterMovies={handleFilterMovies}
                                getMovies={handleGetSavedMovies}
                                resetMovies={resetFilterMovies}
                                isLike={compareMoviesLike}
                                saveMovies={saveMovies}
                                isLoading={isLoading}
                                isError={isError}
                                movies={filterMovies} 
                            />
                        </Route>

                        <Route path="/profile">
                            <Profile 
                                onUpdateUser={handleUpdateUser} 
                                signOut={handleSignOut} />
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

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
import initialMovies from "../../utils/movies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Error404 from "../error404/error404";
import ApiMain from "../../utils/MainApi";
import ApiMovies from "../../utils/ApiMovies";

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



    const handleMenuClose = () => setMenuOpen(false);
    const handleMenuOpen = () => setMenuOpen(false);
    const handleLoading = () => setIsLoading((state) => !state);

    const outputHeader = (exclusionArray) => {
        return exclusionArray.indexOf(location.pathname) >= 0
    }

    const handleSignOut = () => {
        setLoggedIn(false);
        history.push("/");
    };

    const handleRegisterUser = (email, password, name) => {
        ApiMain.register(email, password, name)
            .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    history.push("/signin");
                } else {
                    setLoggedIn(false);
                }
            })
            .catch((err) => {
                setLoggedIn(false);
            });
    };

    const handleLoginUser = (email, password) => {
        ApiMain.login(email, password)
            .then((res) => {
                if (res.message === "Пользователь залогинен") {
                    setLoggedIn(true);
                    history.push("/");
                } else {
                    setLoggedIn(false);
                }
            })
            .catch((err) => {
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
                            path="/movies" 
                            loggedIn={loggedIn} 
                            isLoading={isLoading}
                            handleLoading={handleLoading}
                            component={Movies} 
                            movies={initialMovies} />

                        <ProtectedRoute 
                            path="/saved-movies" 
                            loggedIn={loggedIn} 
                            isLoading={isLoading}
                            handleLoading={handleLoading}
                            component={SavedMovies} 
                            movies={initialMovies} />

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
                                isLoading={isLoading}
                                handleLoading={handleLoading}
                                movies={initialMovies} />
                        </Route>

                        <Route path="/saved-movies">
                            <SavedMovies 
                                isLoading={isLoading}
                                handleLoading={handleLoading}
                                movies={initialMovies} />
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

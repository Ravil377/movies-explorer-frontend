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

function App() {
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const [currentUser, setCurrentUser] = React.useState({ name: "Виталий", email: "pochta@yandex.ru" });
    const history = useHistory();
    const location = useLocation();
    const handleMenuClose = () => setMenuOpen(false);
    const handleMenuOpen = () => setMenuOpen(true);
    const handleLoading = () => setIsLoading((state) => !state);

    const handleSignOut = () => {
        setLoggedIn(false);
        history.push("/");
    };

    const handleUpdateUser = (name, email) => {
        setCurrentUser({ name: name, email: email });
    };

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    {location.pathname !== ("signup" || "signin" || "*") && <Header 
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
                            <Register />
                        </Route>

                        <Route path="/signin">
                            <Login />
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
                    {location.pathname !== ("/signup" || "signin" || "*") && <Footer />}
                </div>
            </CurrentUserContext.Provider>
        </>
    );
}
export default App;

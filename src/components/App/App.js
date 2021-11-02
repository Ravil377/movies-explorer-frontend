import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isHeader, setIsHeader] = React.useState(false);
    const [isFooter, setIsFooter] = React.useState(true);
    const [isWhiteHeader, setIsWhiteHeader] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({ name: "Виталий", email: "pochta@yandex.ru" });
    const history = useHistory();

    const handleMenuClose = () => setMenuOpen(false);
    const handleMenuOpen = () => setMenuOpen(true);
    const handleHeader = (bool) => setIsHeader(bool);
    const handleFooter = (bool) => setIsFooter(bool);
    const handleWhiteHeader = (bool) => setIsWhiteHeader(bool);
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
                    {isHeader && <Header 
                                        isWhiteHeader={isWhiteHeader} 
                                        handleWhiteHeader={handleWhiteHeader} 
                                        isMenuOpen={isMenuOpen} 
                                        isLogged={loggedIn} 
                                        onClose={handleMenuClose}
                                        onOpen={handleMenuOpen} />}

                    <Switch>
                        <ProtectedRoute 
                            path="/movies" 
                            loggedIn={loggedIn} 
                            component={Movies} 
                            handleHeader={handleHeader} 
                            handleWhiteHeader={setIsWhiteHeader} 
                            handleFooter={handleFooter} 
                            movies={initialMovies} />

                        <ProtectedRoute 
                            path="/saved-movies" 
                            loggedIn={loggedIn} 
                            component={SavedMovies} 
                            handleHeader={handleHeader} 
                            handleWhiteHeader={setIsWhiteHeader} 
                            handleFooter={handleFooter} 
                            movies={initialMovies} />

                        <ProtectedRoute
                            path="/profile"
                            loggedIn={loggedIn}
                            component={Profile}
                            handleWhiteHeader={setIsWhiteHeader}
                            handleHeader={handleHeader}
                            signOut={handleSignOut}
                            handleFooter={handleFooter}
                            onUpdateUser={handleUpdateUser}
                        />

                        <Route path="/signup">
                            <Register 
                                handleHeader={handleHeader} 
                                handleFooter={handleFooter} />
                        </Route>

                        <Route path="/signin">
                            <Login 
                                handleHeader={handleHeader} 
                                handleFooter={handleFooter} />
                        </Route>

                        <Route path="/movies">
                            <Movies 
                                handleHeader={handleHeader} 
                                handleWhiteHeader={setIsWhiteHeader} 
                                handleFooter={handleFooter} 
                                movies={initialMovies} />
                        </Route>

                        <Route path="/saved-movies">
                            <SavedMovies 
                                handleHeader={handleHeader} 
                                handleWhiteHeader={setIsWhiteHeader} 
                                handleFooter={handleFooter} 
                                movies={initialMovies} />
                        </Route>

                        <Route path="/profile">
                            <Profile 
                                handleWhiteHeader={setIsWhiteHeader} 
                                handleHeader={handleHeader} 
                                handleFooter={handleFooter} 
                                onUpdateUser={handleUpdateUser} 
                                signOut={handleSignOut} />
                        </Route>

                        <Route exact path="/">
                            <Main 
                                handleHeader={handleHeader} 
                                handleWhiteHeader={setIsWhiteHeader}
                                handleFooter={handleFooter} />
                        </Route>

                        <Route path="*">
                            <Error404
                                handleHeader={handleHeader} 
                                handleFooter={handleFooter} />
                        </Route>



                    </Switch>
                    {isFooter && <Footer />}
                </div>
            </CurrentUserContext.Provider>
        </>
    );
}
export default App;

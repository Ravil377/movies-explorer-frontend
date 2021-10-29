import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import AboutProject from "../AboutProject/AboutProject";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);

  const handleMenuClose = () => setMenuOpen(false);
  const handleMenuOpen = () => setMenuOpen(true);
  const signOut = () => setLoggedIn(false);

  return (
    <>
      <div className="page">
        <Header 
          isMenuOpen={isMenuOpen}
          isLogged={loggedIn} 
          onSignOut={signOut}
          onClose={handleMenuClose} 
          onOpen={handleMenuOpen} />
        <Switch>
            {/* <ProtectedRoute
                path="/main"
                loggedIn={loggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
            /> */}
            {/* <Route path="/sign-up">
                <Register onRegister={handleRegisterUser} />
            </Route>

            <Route path="/sign-in">
                <Login onLogin={handleLoginUser} />
            </Route> */}

            <Route path="/signup">
                <Register />
            </Route>

            <Route path="/signin">
                <Login />
            </Route>

            <Route path="/profile">
                <Profile name="Виталий" email="pochta@yandex.ru" />
            </Route>

            <Route exact path="/">
                <Main />
                <Footer />
                {/* {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-up" />} */}
            </Route>
        </Switch>
      </div>
    </>
  );
}
 export default App;
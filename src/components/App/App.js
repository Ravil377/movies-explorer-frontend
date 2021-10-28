import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AboutProject from "../AboutProject/AboutProject";
import Register from "../Register/Register";
import Login from "../Login/Login";

function App() {
  
  return (
    <>
      <div className="page">
        <Header />
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

            <Route exact path="/">
                <AboutProject />
                {/* {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-up" />} */}
            </Route>
        </Switch>        
        <Footer />
      </div>
    </>
  );
}
 export default App;
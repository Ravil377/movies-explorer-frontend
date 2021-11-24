import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {

    props.checkToken().then(res => {
        console.log(res);
    })
    // console.log(props.loggedIn);
    return <Route>{() => (props.loggedIn ? <Component {...props} /> : <Redirect to="./signup" />)}</Route>;
};

export default ProtectedRoute;

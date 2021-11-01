import React from "react";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function Main(props) {
    React.useEffect(() => {
        props.handleHeader();
    }, [props]);

    return (
        <main className="main">
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
        </main>
    );
}

export default Main;

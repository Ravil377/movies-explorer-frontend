import React from "react";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main(props) {
    React.useEffect(() => {
        props.handleFooter(true);
        props.handleHeader(true);
        props.handleWhiteHeader(false);
    }, [props]);

    return (
        <main className="main">
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    );
}

export default Main;

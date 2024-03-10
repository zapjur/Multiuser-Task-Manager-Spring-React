import * as React from "react";
import WelcomeContent from "./WelcomeContent.js";
import AuthContent from "./AuthContent.js";
export default class AppContent extends React.Component{
    render() {
        return(
            <div>
                <WelcomeContent/>
                <AuthContent/>
            </div>
        );
    };
}
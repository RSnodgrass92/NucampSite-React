import React, { Component } from 'react';
import {CAMPSITES} from "../shared/campsites";
import Header from "../components/HeaderComponent.js";
import Directory from "./DirectoryComponent"
import CampsiteInfo from "./CampsiteInfoComponent"; 
import Footer from "../components/FooterComponent.js"
import Home from "./HomeComponent.js";
import {Switch, Route, Redirect} from "react-router-dom";

class Main extends Component {
    constructor(props)
    {
        super(props); 
        this.state={
            campsites: CAMPSITES, 
        };
    }

    render() {
        const HomePage =() =>{
            return (<Home />);
        }
        return (
            <div>
                <Header />
                <Switch >
                <Route path="/home" component={HomePage}/>
                <Route exact path="/directory" render= {()=><Directory campsites={this.state.campsites}/>}/>
                <Redirect to="/home" />
                </Switch>
                <Footer />   
            </div>
        );
    }
}

export default Main;
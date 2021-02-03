import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from "./DirectoryComponent"
import {CAMPSITES} from "../shared/campsites";
import CampsiteInfo from "./CampsiteInfoComponent"; 

class Main extends Component {
    constructor(props)
    {
        super(props); 
        this.state={
            campsites: CAMPSITES, 
            selectedCampsite: null
        };
    }

    onCampsiteSelect(siteId)
    {
        this.setState({selectedCampsite: siteId})
    }   

    render() {
        return (
            <div>
                <Navbar dark color="primary">
                <div className="container">
                    <NavbarBrand href="/">NuCamp</NavbarBrand>
                </div>
                </Navbar>
                <Directory campsites={this.state.campsites} onClick={siteId =>this.onCampsiteSelect(siteId)}/>
                <CampsiteInfo campsite={this.state.campsites.filter(campsite=>campsite.id === this.state.selectedCampsite)[0]}/>   
            </div>
        );
    }
}

export default Main;
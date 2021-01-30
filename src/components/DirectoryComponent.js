import React, {Component} from "react"
import {Card, CardImg, CardImgOverlay, CardTitle} from "reactstrap";
import CampsiteInfo from "./CampsiteInfoComponent"

class Directory extends Component{
    
    constructor(props)
    {
        super(props);
        this.state= {
        selectedCampsite: null
        };
    }

    onCampsiteSelect(site)
    {
        this.setState({selectedCampsite: site})
    }


    render()
    {
        const directory = this.props.campsites.map(site=> {
           return (<div key={site.id} className="col-md-5 m-1">
                    <Card onClick={()=>this.onCampsiteSelect(site)}>
                    <CardImg width="100%" src={site.image} alt={site.name} />
                    <CardImgOverlay>
                    <CardTitle>{site.name}</CardTitle>
                    </CardImgOverlay>
                    </Card>
                   </div>
            ) 
        })

        return (
            <div className="container">
                <div className="row">
                    {directory}
                </div>
                <CampsiteInfo campsite={this.state.selectedCampsite}/>   
            </div>
        );
    }
}

export default Directory
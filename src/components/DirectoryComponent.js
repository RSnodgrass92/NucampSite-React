import React, {Component} from "react"
import {Card, CardImg, CardImgOverlay, CardTitle} from "reactstrap";


class Directory extends Component{
    
    render()
    {
        const directory = this.props.campsites.map(site=> {
           return (<div key={site.id} className="col-md-5 m-1">
                    <Card onClick={()=> this.props.onClick(site.id)}>
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
            </div>
        );
    }
}

export default Directory
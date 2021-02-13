
import React, { Component } from "react";
import {Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, Col, Row, Label, ModalBody } from "reactstrap";
import{Link} from "react-router-dom"; 
import {Control, LocalForm, Errors} from "react-redux-form"

const maxLength = len => val => !val || (val.length<= len); 
const minLength= len => val => val && (val.length >= len);
const required = val => val && val.length; 
const ratingSelect= val => (val!== "Select...")
 
function RenderCampsite({campsite})
{
    if(campsite)
    {
        return (<div className="col-md-5 m-1">
        <Card>
        <CardImg top src={campsite.image} alt={campsite.name}/>
        <CardBody>
                <CardText>{campsite.description}</CardText>
            </CardBody>
        </Card>
        </div>)
    }
    else 
    {
        return(<div></div>)
    }
}

function RenderComments({comments})
{
    if (comments)
    {
        return(
        <div className="col-md-5 m-1">
            <h4>Comments</h4>
                {
                 comments.map(comment=> {
                    return (
                    <div key={comment.id}>
                    <div>{comment.text}</div>
                    <div>{`-- ${comment.author}, ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}`}</div>
                    <p></p>
                    </div>
                    )
                 })
                }
                <CommentForm />
        </div>
            ) 
    }
    else
    {
        return(<div></div>);
    } 
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                            <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return (<div></div>);
}


class CommentForm extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            isModalOpen: false, 
        }
        this.toggleModal= this.toggleModal.bind(this);
    }

    toggleModal(){
        console.log("hello")
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(values)
    {
        console.log("Current state is: "+ JSON.stringify(values)); 
        alert("Current state is: "+ JSON.stringify(values));
    }

    render()
    {
       
        return (
        <React.Fragment>
            <Button onClick={this.toggleModal} outline><i className="fa fa-pencil fa-lg" />Submit Comment</Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>

            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                
                    <Row className="form-group">
                        <Label htmlFor="rating" md={12}>Rating</Label>
                        <Col md={12}>
                            <Control.select model=".rating" name="rating"
                                className="form-control" id="rating" validators={{ 
                                    ratingSelect: ratingSelect
                                }}>
                                <option>Select...</option>
                                <option>5</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                                <option>1</option>

                               
                            </Control.select>
                            <Errors
                                className="text-danger"
                                model=".rating"
                                show="touched"
                                component="div"
                                messages={{
                                    ratingSelect: 'Please select a rating',  
                                }}/>
                        </Col>
                    </Row>



                    <Row className="form-group">
                        <Label htmlFor="name" md={12}>Your Name</Label>
                        <Col md={12}>
                                    
                        <Control.text model=".name" id="name" name="name"
                            placeholder="Your Name"
                            className="form-control"
                            validators={{ 
                                minLength: minLength(2),
                                maxLength: maxLength(15)
                            }}
                            />

                            <Errors
                                className="text-danger"
                                model=".name"
                                show="touched"
                                component="div"
                                messages={{
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </Col>
                    </Row>
                           
                    <Row className="form-group">
                        <Label htmlFor="comments" md={12}>Comment</Label>
                        <Col md={12}>
                            <Control.textarea model=".comments" id="comments" name="comments"
                                rows="3"
                                className="form-control"
                                validators={{ 
                                    required: required 
                                }}
                            />

                        <Errors
                                className="text-danger"
                                model=".comments"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required Field',
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </Col>
                    </Row>

            </LocalForm>
            </ModalBody>
            </Modal>
        </React.Fragment>
            )
    }
        
    
}


export default CampsiteInfo;


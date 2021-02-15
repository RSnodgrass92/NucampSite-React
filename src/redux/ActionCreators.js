import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addComment = (campsiteId, rating, author, text) => ({
    
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});


//double arrow function is using react thunk to enable
export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    // a call to fetch returns a promise
    return fetch(baseUrl + "campsites")
        // first check to see if we get any response back at all, if not catch
        .then(response=> {
            // response.ok will only be truthy if the http status code is in the successful range 200-299
            if (response.ok) {
                return response; 
            }
            else{
                //status and status text are built in props of the response object
                const error= new Error(`Error ${response.status}: ${response.statusText}`)
                error.response = response; 
                //sends directly to the next catch method
                throw error;
            } 
        }, 
            // no response from the server at all
            error =>
            {
                const errMess= new Error(error.message);
                throw errMess;
            }
        )

    // when the promise resolves this then method will use the json method to convert
    // the response from json to javascript, this will be the array of campsites
        .then(response => response.json())
    // the json method returns a new promise for which the converted javascript array is a new response value when it resolves. 
        .then(camps => dispatch(addCampsites(camps)))

    //if any of these promises are rejected or if a throw keyword is reached they will be caught by the catch, 
        .catch(error => dispatch(campsitesFailed(error.message)))
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});



export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});



export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});
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



export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    // a call to fetch returns a promise
    return fetch(baseUrl + "campsites")
    // when the promise resolves this then method will use the json method to convert
    // the response from json to javascript, this will be the array of campsites
        .then(response => response.json())
    // the json method returns a new promise for which the converted javascript array is a new response value when it resolves. 
        .then(camps => dispatch(addCampsites(camps)))
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



export const fetchComments= () => dispatch => {

    return fetch(baseUrl+"comments")
    .then(response=> response.json())
    .then(comments => dispatch(addComments(comments)))
}

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
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)));
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
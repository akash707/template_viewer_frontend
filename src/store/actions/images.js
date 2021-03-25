import axios from 'axios';
import * as actionTypes from './actionTypes';
import { API_BASE_URL, FETCH_IMAGES_API_ENDPOINT } from '../../env.config';

export const getImagesStart = () => ({
    type: actionTypes.GET_IMAGES_START
});

export const getImagesSuccess = (response) => ({
    type: actionTypes.GET_IMAGES_SUCCESS,
    payload: response
});

export const getImagesFail = (response) => ({
    type: actionTypes.GET_IMAGES_FAIL,
    payload: response
});

export const fetchImages = (pageNo, limit) => (dispatch) => {
    dispatch(getImagesStart());
    axios.post(`${API_BASE_URL}${FETCH_IMAGES_API_ENDPOINT}`, {
        "pageNo": pageNo,
        "limit": limit
    }).then((response) => {
        dispatch(getImagesSuccess(response.data.data));
    }).catch((error) => {
        if (error.response) {
            if (error.response.data.statusCode === 422) {
                dispatch(getImagesFail(error.response.data.errors));
            } else {
                dispatch(getImagesFail([error.response.data.errors]));
            }
        } else {
            dispatch(getImagesFail(["oops something went wrong"]));
        }
    });
};
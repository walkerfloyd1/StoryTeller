import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

// getting posts

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/stories');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
    }
}

//adding like

export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/stories/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id,
                likes: res.data
            }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
    }
}

//Removelike

export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/stories/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id,
                likes: res.data
            }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
    }
}

//DELETE POST

export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post deleted', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
    }
}

//ADD POST

export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/stories/', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post created', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
    }
}

export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/stories/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
    }
}

//ADD COMMENT

export const addComment = (postId, formData ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/stories/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment added', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
    }
}

//DELETE COMMENT

export const deleteComment = (postId, commentId ) => async dispatch => {
    
    try {
        const res = await axios.delete(`/stories/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment removed', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
    }
}
import {
  ACTIVITY_CARD_REQUEST,
  ACTIVITY_CARD_FAILURE,
  CREATE_ACTIVITY_CARD_SUCCESS,
  UPDATE_ACTIVITY_CARD_SUCCESS,
  DELETE_ACTIVITY_CARD_SUCCESS,
  LIKE_ACTIVITY_CARD_SUCCESS,
  FETCH_ACTIVITY_CARD_SUCCESS,
  FETCH_ACTIVITY_CARDS_SUCCESS
} from '../constants/actionTypes'
import axios from 'axios'

import * as api from '../api'

const API = axios.create({ baseURL: 'http://localhost:5000' })

const setupAPI = (token) => {
  API.interceptors.request.use((req) => {
    if(token) {
      req.headers.Authorization = `Bearer ${token}`
    }
  
    return req
  })
}

export const getActivityCards = (page) => {
  return async (dispatch) => {
    dispatch({ type: ACTIVITY_CARD_REQUEST })

    try {
      const { data, currentPage, numberOfPages } = await API.get(`/activityCards?page=${page}`)

      dispatch({
        type: FETCH_ACTIVITY_CARDS_SUCCESS,
        payload: { data, currentPage, numberOfPages }
      })

      return data
    } catch (error) {
      dispatch({ type: ACTIVITY_CARD_FAILURE, payload: error })     

      throw error
    }
  }
}

export const getActivityCard = (id) => {
  return async (dispatch) => {
    dispatch({ type: ACTIVITY_CARD_REQUEST })

    try {

      const { data } = await API.get(`/activityCards/${id}`)

      dispatch({
        type: FETCH_ACTIVITY_CARD_SUCCESS,
        payload: data
      })

      return data
    } catch (error) {
      dispatch({ type: ACTIVITY_CARD_FAILURE, payload: error })     

      throw error
    }
  }
}

export const createActivityCard = (card, token) => {
  return async (dispatch) => {
    dispatch({ type: ACTIVITY_CARD_REQUEST })

    try {
      setupAPI(token)

      const { data } = await API.post(`/activityCards`, card)

      dispatch({
        type: CREATE_ACTIVITY_CARD_SUCCESS,
        payload: data
      })

      return data
    } catch (error) {
      dispatch({ type: ACTIVITY_CARD_FAILURE, payload: error })     

      throw error
    }
  }
}

export const deleteActivityCard = (id, token) => {
  return async (dispatch) => {
    dispatch({ type: ACTIVITY_CARD_REQUEST })

    try {
      setupAPI(token)

      await API.delete(`/activityCards/${id}`)

      dispatch({
        type: DELETE_ACTIVITY_CARD_SUCCESS,
        payload: id
      })

      return { message: 'success' }
    } catch (error) {
      dispatch({ type: ACTIVITY_CARD_FAILURE, payload: error })

      throw error
    }
  }
}

export const updateActivityCard = (id, card, token) => {
  return async (dispatch) => {
    dispatch({ type: ACTIVITY_CARD_REQUEST })

    try {
      setupAPI(token)
      
      const { data } = await API.patch(`/activityCards/${id}`, card)

      dispatch({
        type: UPDATE_ACTIVITY_CARD_SUCCESS,
        payload: data.data
      })

      return data
    } catch (error) {
      dispatch({ type: ACTIVITY_CARD_FAILURE, payload: error })
    
      throw error
    }
  }
}

export const likeActivityCard = (id, token) => {
  
  return async (dispatch) => {
    dispatch({ type: ACTIVITY_CARD_REQUEST })

    try {
      setupAPI(token)

      const { data } = await API.patch(`/activityCards/${id}/likeActivityCard`)
      
      dispatch({
        type: LIKE_ACTIVITY_CARD_SUCCESS,
        payload: data.data
      })

      
      return data
    } catch (error) {
      dispatch({ type: ACTIVITY_CARD_FAILURE, payload: error })
      
      throw error
    }
  }
}
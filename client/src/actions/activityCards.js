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

import * as api from '../api'

export const getActivityCards = () => {
  return async (dispatch) => {
    dispatch({ type: ACTIVITY_CARD_REQUEST })

    try {

      const { data, currentPage, numberOfPages } = await api.fetchActivityCards()

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

      const { data } = await api.fetchActivityCard(id)

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

export const createActivityCard = (card) => {
  return async (dispatch) => {
    dispatch({ type: ACTIVITY_CARD_REQUEST })

    try {

      const { data } = await api.createActivityCard(card)

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

export const deleteActivityCard = (id) => {
  return async (dispatch) => {
    dispatch({ type: ACTIVITY_CARD_REQUEST })

    try {

      await api.deleteActivityCard(id)

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

export const updateActivityCard = (id, card) => {
  return async (dispatch) => {
    dispatch({ type: ACTIVITY_CARD_REQUEST })

    try {

      const { data } = await api.updateActivityCard(id, card)

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

export const likeActivityCard = (id) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  
  return async (dispatch) => {
    dispatch({ type: ACTIVITY_CARD_REQUEST })

    try {

      const { data } = await api.likeActivityCard(id, user?.token)
      
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
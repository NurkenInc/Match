import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from '../constants/actionTypes'
import * as api from '../api'

export const signin = (formData) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_REQUEST })
  
    try {
      const { data } = await api.signIn(formData)

      const token = data.token

      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          token
        }
      })
    } catch (error) {
      dispatch({ type: AUTH_FAILURE, payload: error })
    }
  }
}

export const signup = (formData) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_REQUEST })
  
    try {
      const { data } = await api.signUp(formData)

      const token = data.token

      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          token
        }
      })

    } catch (error) {
      dispatch({ type: AUTH_FAILURE, payload: error })
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST })

    try {
      localStorage.clear()

      dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
      dispatch({ type: LOGOUT_FAILURE, payload: error })
    }
  }
}
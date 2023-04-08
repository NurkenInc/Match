import {
  USER_ROLE_FAILURE,
  USER_ROLE_REQUEST,
  USER_ROLE_SUCCESS
} from '../constants/actionTypes'
import * as api from '../api'

export const getUserRole = () => {
  return async (dispatch) => {
    dispatch({ type: USER_ROLE_REQUEST })

    try {
      const { data } = await api.fetchUserRole()

      const role = data.role

      dispatch({
        type: USER_ROLE_SUCCESS,
        payload: role
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: USER_ROLE_FAILURE, payload: error })
    }
  }
}
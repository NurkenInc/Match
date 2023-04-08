import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
} from '../constants/actionTypes'

const initialState = {
  isLoading: false,
  data: [],
  error: null,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case AUTH_SUCCESS:
      localStorage.setItem('profile', JSON.stringify({ token: action.payload.token }))

      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: null
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    default:
      return state
  }
}

export default auth
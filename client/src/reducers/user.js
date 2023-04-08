import {
  USER_ROLE_FAILURE,
  USER_ROLE_REQUEST,
  USER_ROLE_SUCCESS
} from '../constants/actionTypes'

const initialState = {
  isLoading: false,
  data: '',
  error: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    case USER_ROLE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case USER_ROLE_FAILURE:
      console.log(action.payload)
    
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default user
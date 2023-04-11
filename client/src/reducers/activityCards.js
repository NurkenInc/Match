import {
  ACTIVITY_CARD_FAILURE,
  ACTIVITY_CARD_REQUEST,
  CREATE_ACTIVITY_CARD_SUCCESS,
  UPDATE_ACTIVITY_CARD_SUCCESS,
  FETCH_ACTIVITY_CARDS_SUCCESS,
  FETCH_ACTIVITY_CARD_SUCCESS,
  LIKE_ACTIVITY_CARD_SUCCESS,
  DELETE_ACTIVITY_CARD_SUCCESS
} from '../constants/actionTypes'

const initialState = {
  isLoading: false,
  activityCards: [],
  currentPage: 1,
  isUpdated: false,
  numberOfPages: null,
  activityCard: null,
  error: null
}

const activityCards = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVITY_CARD_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case ACTIVITY_CARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case FETCH_ACTIVITY_CARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activityCards: action.payload.data.data,
        currentPage: action.payload.data.currentPage,
        numberOfPages: action.payload.data.numberOfPages,
      }
    case FETCH_ACTIVITY_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activityCard: action.payload
      }
    case CREATE_ACTIVITY_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activityCards: [...state.activityCards, action.payload.data],
      }
    case UPDATE_ACTIVITY_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activityCards: state.activityCards.map((activityCard) => (
          activityCard._id === action.payload._id ? action.payload : activityCard
        ))
      }
    case DELETE_ACTIVITY_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activityCards: state.activityCards.filter((activityCard) => (
          activityCard._id !== action.payload
        ))
      }
    case LIKE_ACTIVITY_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        activityCards: state.activityCards.map((activityCard) => (
          activityCard._id === action.payload._id ? action.payload : activityCard
        ))
      }
    default:
      return state
  }
} 

export default activityCards
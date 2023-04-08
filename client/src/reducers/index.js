import { combineReducers } from 'redux'

import activityCards from './activityCards'
import auth from './auth'
import user from './user'

const reducers = combineReducers({ activityCards, auth, user })

export default reducers
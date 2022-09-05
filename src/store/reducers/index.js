import { combineReducers } from 'redux'

import login from './login'
import layout  from './layout'
import channel from './channel'
import article from './article'
const rootReducer = combineReducers({
  login,layout,channel,article
})

export default rootReducer
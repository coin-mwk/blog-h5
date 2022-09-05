
import {GET_LAYOUT_INFO} from '../actionTypes'
const initValue = {}
  export default function layout(state = initValue, action) {
      switch(action.type){
          case GET_LAYOUT_INFO:
          return action.payload
          default:
              return state
      }
  }
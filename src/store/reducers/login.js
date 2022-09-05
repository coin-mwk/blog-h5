import {GET_Token,REM_LAYOUT_TOKEN} from '../actionTypes'
import {getToken} from '@/utils/storage'
const initValue = {
    token: getToken()
  }
  export default function login(state = initValue, action) {
      switch(action.type){
          case GET_Token:
          return {...state,token:action.payload}
          case REM_LAYOUT_TOKEN:
            return {...state,token:''}
          default:
              return state
      }
  }
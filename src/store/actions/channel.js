import {GET_CHANNEL_STATE} from '../actionTypes'
import request from '@/utils/request'

export const getstate=()=>{
 return async(dispatch)=>{
     const res = await request.get('/channels')
     dispatch({
         type:GET_CHANNEL_STATE,
         payload: res.data.channels
     })
 }
}
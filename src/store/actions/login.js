import  request from '@/utils/request'
import {GET_Token,REM_LAYOUT_TOKEN} from '../actionTypes'
import {setToken,removeToken} from '@/utils/storage'
export const login=(payload)=>{
 return async(dispatch)=>{
     const res =await request({
        method: 'post',
        url: '/authorizations',
        data: payload
      })
      setToken(res.data.token) //存在本地
    dispatch({
        type:GET_Token,
        payload:res.data.token
    })
 }
}

export const get_remove_token=()=>{
  return (dispatch)=>{
      removeToken()
      dispatch({
          type:REM_LAYOUT_TOKEN
      })
  }
}
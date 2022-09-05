import request from '@/utils/request'
import {GET_LAYOUT_INFO,} from '../actionTypes'
export const get_layout_info=()=>{
    return async(dispatch)=>{
        const res =await request('/user/profile')
        dispatch({
            type:GET_LAYOUT_INFO,
            payload:res.data
        })
    }
}

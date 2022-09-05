import {GET_ARticle_LIST} from '../actionTypes'
import request from '@/utils/request'
export const getlist =(params)=>{
    return async(dispatch)=>{
        const res = await request({url:'/mp/articles',params})
        dispatch({
            type:GET_ARticle_LIST,
            payload:res.data
        })
    }
}

export const deletlist =(id)=>{
    return async()=>{
        await request({method:'delete',url:`/mp/articles/${id}`})
    }
}
import request from '@/utils/request'
export const postlist =(data,draft)=>{
 return async()=>{
     await request({method:'post',url:'/mp/articles',data,params:{draft}})
 }
} 

export const getArticleInfo = (id) => {
    return async () => {
      const res = await request(`/mp/articles/${id}`)
      return res.data
    }
  }

  export const editArticle = (draft = false, data) => {
    return async () => {
      await request({
        url: `/mp/articles/${data.id}`,
        method: 'put',
        data,
        params: {
          draft
        }
      })
    }
  }
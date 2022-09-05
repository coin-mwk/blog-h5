const GET_TOKEN = 'token'

export function getToken(){
   return localStorage.getItem(GET_TOKEN)
}
export function setToken(token) {
    localStorage.setItem(GET_TOKEN, token)
  }
  
  export function removeToken() {
    localStorage.removeItem(GET_TOKEN)
  }
  
  export function hasToken() {
    return !!getToken()
  }
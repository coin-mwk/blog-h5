import { hasToken } from '@/utils/storage'
import { Route,Redirect } from 'react-router-dom'
export default function PrivateRouter(props){
    const Component = props.component  //接收传过来的组件
    return(
        <Route
        path={props.path}  //传入传过来的地址
        render={()=>{
            if(hasToken()){ //判断是否有token
                // console.log(props,'8888');
                return <Component></Component>
                }else{
                 return <Redirect to={
                    {
                        pathname:'/login', // 当没有token时刷新跳转 到刷新前的模块
                        state:{from:window.location.pathname}
                    }
                }></Redirect>
            }
        }}
        ></Route>
    )

}
import {createBrowserHistory} from 'history'
export const history = createBrowserHistory()
//背景

// react-router-dom中直接有Router这个包，但是它Router 没有history属性

// 有如下公式：

// Router + HashHistroy = HashRouter

// Router + BrowerHistroy = BrowerRouter


//用处： 非组件环境下可以拿到history
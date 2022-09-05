import ReactDOM from 'react-dom'
// 1 在 index.js 中导入 antd 的样式文件
import 'antd/dist/antd.css'
import './index.scss'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import zhCN from 'antd/lib/locale/zh_CN';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
    <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)
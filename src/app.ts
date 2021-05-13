import { Component } from 'react'
import Taro from '@tarojs/taro'
import { getLoginInfo } from './api';
import './app.scss'

class App extends Component {

  async componentDidMount () {

    const _accessToken = Taro.getStorageSync('accessToken');
    const _loginInfoRes = await getLoginInfo({accessToken: _accessToken});
    if(!_loginInfoRes.data.length) {
      Taro.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      Taro.setStorageSync('userInfo', _loginInfoRes.data[0]);
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App

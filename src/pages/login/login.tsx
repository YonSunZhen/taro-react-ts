import { View } from '@tarojs/components';
import { Component } from 'react';
import { AtInput, AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import './login.scss';

interface LoginState {
  uid?: string;
  password?: string;
}

class Login extends Component<{}, LoginState> {

  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      password: ''
    }
  }

  handleUidChange = (value) => {
    this.setState({
      uid: value
    });
    return value;
  }

  handlePwdChange = (value) => {
    this.setState({
      password: value
    });
    return value;
  }

  login = () => {
    const { uid, password } = this.state;
    Taro.navigateTo({
      url: '/pages/home/home'
    })
  }

  render() {
    return (
      <View>
        <AtInput
          name='uid'
          title='UID'
          type='text'
          placeholder='请输入UID'
          value={this.state.uid}
          onChange={this.handleUidChange.bind(this)}
        />
        <AtInput
          name='password'
          title='Password'
          type='text'
          placeholder='请输入密码'
          value={this.state.password}
          onChange={this.handlePwdChange.bind(this)}
        />
        <AtButton type='primary' onClick={this.login}>登陆</AtButton>
      </View>
    );
  }
  
}

export default Login;

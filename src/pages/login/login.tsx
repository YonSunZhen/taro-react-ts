import { View } from '@tarojs/components';
import { Component } from 'react';
import { AtInput, AtButton, AtMessage } from 'taro-ui'
import Taro from '@tarojs/taro';
import * as CryptoJS from 'crypto-js';
import{ getPublicKey, updateSecretKey, login, getOpenId, CLIENT_ID } from '../../api';
import { dhCrypto } from '../../utils';
import './login.scss';

interface LoginState {
  uid?: string;
  password?: string;
  loading?: boolean
}

class Login extends Component<{}, LoginState> {

  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      password: '',
      loading: false
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

  showMessage = (msg: string) => {
    msg = msg ? msg : '未知错误';
    Taro.atMessage({
      'message': `登陆失败: ${msg}`,
      'type': 'error',
    });
    this.setState({
      loading: false
    });
  }


  login = async () => {
    this.setState({
      loading: true
    })
    const { uid, password } = this.state;
    const _openId = (await getOpenId()).openid;
    const publicKeyRes = await getPublicKey();
    const _publicKey = publicKeyRes.data;
    if(publicKeyRes.code !== 0) {
      this.showMessage(publicKeyRes.message)
      return;
    }
    const _pubN = _publicKey.pubN;
    const _modN = _publicKey.modN;
    const _sPubResultN = _publicKey.sPubResultN;
    dhCrypto.setPublicKey(_pubN, _modN);
    const cPubResultN = dhCrypto.getCPubResultN();
    const cSecretKey = dhCrypto.generateSecretKey(_sPubResultN).toString();
    const cSecretKeyHash = CryptoJS.SHA1(cSecretKey).toString(CryptoJS.enc.Hex);
    const updateSecretKeyRes = await updateSecretKey({
      uid: uid,
      pubResultN: cPubResultN,
      secretKeyHash: cSecretKeyHash,
      clientId: CLIENT_ID,
      publicKeyId: _publicKey.publicKeyId
    })
    if(updateSecretKeyRes.code !== 0) {
      this.showMessage(updateSecretKeyRes.message);
      return;
    }
    const pwdHash = CryptoJS.AES.encrypt(password as string, cSecretKey).toString();
    const loginRes = await login({
      clientId: CLIENT_ID,
      uid: uid,
      password: pwdHash,
      openId: _openId
    });
    if(loginRes.code === 0) {
      Taro.setStorageSync('accessToken', loginRes.data.accessToken);
      Taro.setStorageSync('userInfo', loginRes.data)
      this.setState({
        loading: false
      })
      Taro.navigateTo({
        url: '/pages/home/home'
      })
    } else {
      this.showMessage(loginRes.message)
      return;
    }

  }

  render() {
    return (
      <View>
        <AtMessage />
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
        <AtButton loading={this.state.loading} type='primary' onClick={this.login}>登陆</AtButton>
      </View>
    );
  }

}

export default Login;

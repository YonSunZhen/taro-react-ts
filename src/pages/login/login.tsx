import React from 'react';
import { View } from '@tarojs/components';
import { AtButton, AtTimeline } from 'taro-ui'
import './login.scss';

function Login() {
  return (
    <View>
      <AtButton type='primary'>按钮文案</AtButton>
      <AtTimeline 
        items={[
          { title: '刷牙洗脸' }, 
          { title: '吃早餐' }, 
          { title: '上班' }, 
          { title: '睡觉' }
        ]}
      >
</AtTimeline>
    </View>
  );
}

export default Login;

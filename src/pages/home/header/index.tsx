import React from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtAvatar } from 'taro-ui'

function Header() {

  const uesrInfo = Taro.getStorageSync('userInfo');
  const _avatar = `data:image/png;base64,${uesrInfo.avatar}`;

  return (
    <View>
      <AtAvatar image={_avatar} circle size='large'></AtAvatar>
    </View>
  );
}

export default Header;

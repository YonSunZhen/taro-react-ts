import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { Component } from 'react';
import Header from './header';
import { Me, Pride, Project, Team } from './main';
import './home.scss'

interface HomeState {
  currentTabIdx: number;
}

export default class Home extends Component<{}, HomeState> {
  
  constructor(props) {
    super(props);
    this.state = {
      currentTabIdx: 0
    }
  }

  // react class生命周期
  componentWillUnmount () { }

  // taro生命周期 对应原生onShow
  componentDidShow () { 
  }

  // taro生命周期 对应原生onHide
  componentDidHide () { }

  handleClick (value) {
    this.setState({
      currentTabIdx: value
    })
  }

  render () {
    const tabList = [{ title: 'Me' }, { title: 'My Team' }, { title: 'My Projects' }, { title: 'My Prides'}]
    return (
      <View>
        <Header></Header> 
        <View>
          <AtTabs current={this.state.currentTabIdx} tabList={tabList} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.currentTabIdx} index={0} >
              <Me></Me>
            </AtTabsPane>
            <AtTabsPane current={this.state.currentTabIdx} index={1}>
              <Team></Team>
            </AtTabsPane>
            <AtTabsPane current={this.state.currentTabIdx} index={2}>
              <Project></Project>
            </AtTabsPane>
            <AtTabsPane current={this.state.currentTabIdx} index={3}>
              <Pride></Pride>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    )
  }
}

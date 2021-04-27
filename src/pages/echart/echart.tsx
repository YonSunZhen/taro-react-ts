import React from 'react';
import { View, Text } from '@tarojs/components'
import { EChart } from "echarts-taro3-react";
import { EChartsHelp, IEChartsColor, IEChartsItem } from '../../utils'
import './echart.scss'

interface IChartNodeDetail<T> {
  value1: T;
  value2: T;
}


class Echart extends React.Component {

  barChart: any;

  refBarChart = (node) => (this.barChart = node);

  componentDidMount() {
    console.log('debug2');

    const _color: IChartNodeDetail<IEChartsColor> = {
      value1: {tips: 'value1', color: '#EF476F', selected: true},
      value2: {tips: 'value2', color: '#FFD166', selected: true},
    };
    const echarts = new EChartsHelp<IChartNodeDetail<any>>({
      title: 'XX 人力资源需求偏差分析',
      type: 'bar',
      color: _color,
    });
    const dataset: IEChartsItem<IChartNodeDetail<any>>[] = [
      { xAxisName: 'Mon', detail: {value1: 120, value2: 100, }},
      { xAxisName: 'Tue', detail: {value1: 200, value2: 100,}},
      { xAxisName: 'Wed', detail: {value1: 150, value2: 100,}},
      { xAxisName: 'Thu', detail: {value1: 80, value2: 100,}},
      { xAxisName: 'Fri', detail: {value1: 70, value2: 100,}},
      { xAxisName: 'Sat', detail: {value1: 110, value2: 100,}},
      { xAxisName: 'Sun', detail: {value1: 130, value2: 100,}},
    ]
    const defautOption = echarts.genConf({dataset: dataset});
    this.barChart.refresh(defautOption);
  }

  render() {
    return (
      <View className='bar-chart'>
        <EChart ref={this.refBarChart} canvasId='bar-canvas' />
      </View>
    );
  }
}

export default Echart;

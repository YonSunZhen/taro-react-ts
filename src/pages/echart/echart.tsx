import React from 'react';
import { View, Text } from '@tarojs/components'
import { EChart } from "echarts-taro3-react";
import { ChartHelp, IChartItemInfo, IChartDataset } from '../../utils'
import './echart.scss'

// 同一横坐标有多少个维度的数据
interface IChartDimension<T = any> {
  a?: T;
  b?: T;
  c?: T;
  d?: T;
}


class Echart extends React.Component {

  barChart: any;

  refBarChart = (node) => (this.barChart = node);

  componentDidMount() {

    const _itemsConf: IChartDimension<IChartItemInfo> = {
      a: {label: 'value1', color: '#EF476F', selected: false},
      b: {label: 'value2', color: '#1C2541', selected: true},
      c: {label: 'value3', color: '#06D6A0', selected: true},
      d: {label: 'value4', color: '#B388EB', selected: true},
    }
    const dataset: IChartDataset<IChartDimension<number>>[] = [
      { detail: {a: 120, b: 195, c: 90, d: 150 }},
    ]
    const defautOption = new ChartHelp<IChartDimension>({
      title: 'XX 人力资源需求偏差分析',
      type: 'pie',
      itemsConf: _itemsConf,
      dataset: dataset
    }).genPieConf();
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

import React from 'react';
import { View, Text } from '@tarojs/components'
import { EChart } from "echarts-taro3-react";
import './echart.scss'


class Echart extends React.Component {

  barChart: any;

  refBarChart = (node) => (this.barChart = node);

  componentDidMount() {
    console.log('debug2');
    const defautOption = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(220, 220, 220, 0.8)",
          },
        },
      ],
    };
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

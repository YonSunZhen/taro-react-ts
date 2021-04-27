import { EChartOption, EChartsSeriesType } from 'echarts';

// 重写对象中的每一个子项的类型
type Color<T> = {
  [k in keyof T]: IEChartsColor
};

export interface IEChartsColor {
  tips: string;
  color: string;
  selected: boolean;
}

export interface IEChartsParams<T = object> {
  title?: string;
  type?: EChartsSeriesType;
  dataset?: IEChartsItem<T>[];
  color?: Color<T>;
}

export interface IEChartsItem<T = object> {
  xAxisName?: string;
  detail: T;
}

// tslint:disable: forin
export class EChartsHelp<T = object> {

  private _title: string;
  private _type: EChartsSeriesType;
  private _color: Color<T>;
  constructor(params: IEChartsParams<T>) {
    this._title = params.title as string;
    this._type = params.type as EChartsSeriesType;
    this._color = params.color as Color<T>;
  }

  genConf(params: IEChartsParams<T>): EChartOption {
    const conf: EChartOption = {};
    const _title = this._title ? this._title : params.title ? params.title : '';
    const _color: Color<T> = this._color ? this._color : params.color as Color<T>;
    const _dataset = params.dataset;
    const _colorData = this._formatColorData(_color);

    conf.title = {text: _title, left: 'center'};

    conf.animation = false;

    conf.color = _colorData.color;

    conf.xAxis = this._genXAxis();

    conf.yAxis = this._genYAxis();

    conf.dataset = this._genDataSet(_dataset, _color);

    conf.series = this._genSeries(_colorData.tips);

    // 右上角工具按钮
    // conf.toolbox = this._genToolBox();

    // 右上角类型提示
    // conf.legend = { orient: 'vertical', type: 'scroll', right: '0', top: 50 };

    // conf.grid = {
    //   right: '14%',
    //   bottom: 50
    // };

    // conf.tooltip = {
    //   trigger: 'axis',
    //   formatter: (_params: any[]) => {
    //     let result = _params[0].name + '<br/>';
    //     _params.forEach(item => {
    //       const _str = item.dimensionNames[item.seriesIndex + 1];
    //       result += `${item.marker}${item.seriesName}:  ${(item.value === '') ? '无数据' : `${item.value[_str]}`} </br>`;
    //     });
    //     return result;
    //   }
    // };
    // 设置右上角显示隐藏按钮
    // conf.legend = {
    //   selected: _colorData.selected,
    //   type: 'scroll',
    //   right: 0,
    //   top: 50,
    //   orient: 'vertical',
    // };

    return conf;
  }

  private _formatColorData(color: Color<T>) {
    if (!color) {
      return {};
    }
    const _colorArr: string[] = [];
    const _tipsArr: string[] = [];
    const _selected = {} as any;
    for (const k in color) {
      const _kColor = color[k].color;
      const _kTips = color[k].tips;
      _colorArr.push(_kColor);
      _tipsArr.push(_kTips);
      _selected[color[k].tips] = color[k].selected;
    }

    return {
      color: _colorArr,
      tips: _tipsArr,
      selected: _selected
    };
  }

  // 生成x轴相关配置
  private _genXAxis(): EChartOption.XAxis[] {
    const xAxisArr: EChartOption.XAxis[] = [];
    const _objXAxis: EChartOption.XAxis = {
      type: 'category',
      // axisLabel: {
      //   rotate: params.xAxisData.length >= 10 ? -30 : 0,
      //   interval: 0,
      // },
      axisPointer: { type: 'shadow' },
      axisTick: {
        // x轴标注居中显示
        alignWithLabel: true
      }
    };
    xAxisArr.push(_objXAxis);
    return xAxisArr;
  }

  // 生成y轴相关配置
  private _genYAxis(): EChartOption.YAxis[] {
    const yAxisArr: EChartOption.YAxis[] = [];
    const _objYAxia: EChartOption.YAxis = {
      type: 'value',
      name: '资源/人月',
      axisLabel: {
        formatter: '{value}'
      }
    };
    yAxisArr.push(_objYAxia);
    return yAxisArr;
  }

  private _genSeries(tips?: string[]) {
    const _seriesArr: EChartOption.Series[]  = [];
    if (tips) {
      tips.forEach(t => {
        const _objSeries: EChartOption.SeriesLine = {};
        _objSeries.type = this._type;
        _objSeries.name = t;
        _objSeries.label = {
          // show: true, // 设置显示label
        };
        _seriesArr.push(_objSeries);
      });
    }
    return _seriesArr;
  }

  private _genDataSet(data?: IEChartsItem<T>[], color?: Color<T>) {
    const _dataset: EChartOption.Dataset = {};
    const _dimensions: string[] = [];
    let _source: any[] = [];
    if (data) {
      const _first = data[0];
      for (const _f in _first) {
        _dimensions.push(_f);
        break;
      }
      for (const _f in color) {
        _dimensions.push(_f);
      }

      _source = data.map(d => {
        const _temp = Object.assign({}, {[_dimensions[0]]: d.xAxisName}, d.detail);
        return _temp;
      });
    }
    _dataset.dimensions = _dimensions;
    _dataset.source = _source;
    return _dataset;
  }

  private _genToolBox() {
    const _toolbox = {
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    };
    return _toolbox;
  }

}

import React from 'react'
import ReactECharts from 'echarts-for-react';

type TicEchartProp={
    times:number[],
    tics:number[],
}

const TicEchart:React.FC<TicEchartProp> = (props) => {
    const onChartClick = (params:any) => {
        console.log('Chart clicked', params);
        alert(2)
      };
    const onEvent = {
        "click": alert(2)
      };

    const   {times,tics} = props
    const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      data:times,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: tics,
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return <ReactECharts  option={options} onEvents={onEvent  }/>;
}

export default TicEchart

import React, { useState, useEffect, createContext } from 'react';
import { Button } from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

function Chart() {

  const [person, setPerson] = useState([{
    name: "",
    originze: "",
    age: "",
    job: "",
    grade: "",
    tags: ""
  }])

  const getList = () => {
    fetch('/api/personlist').then(resp => resp.json()).then((person) => {

      person.list.forEach(item => {
        item.tags = item.tags.split(' ')
      });
      // console.log(person.list)
      setPerson(person.list)
    })
  };

  useEffect(getList, [])

  const chartinit = function () {
    // console.log(person)
    let originize: any[] = []
    let originizekey: any[] = []
    let originizevalue: any[] = []

    let age: any[] = []
    let agekey: any[] = []
    let agevalue: any[] = []

    let grade: any[] = []
    let gradekey: any[] = []
    let gradevalue: any[] = []

    for (let i = 0; i < person.length; i++) {
      originize.push(person[i].originze)
      age.push(person[i].age)
      grade.push(person[i].grade)

    }

    var objGroup = originize.reduce(function (obj, name) {
      obj[name] = obj[name] ? ++obj[name] : 1;
      return obj;
    }, {});

    var objGroup2 = age.reduce(function (obj, name) {
      obj[name] = obj[name] ? ++obj[name] : 1;
      return obj;
    }, {});
    var objGroup3 = grade.reduce(function (obj, name) {
      obj[name] = obj[name] ? ++obj[name] : 1;
      return obj;
    }, {});

    for (let key in objGroup) {
      originizekey.push(key)
      originizevalue.push(objGroup[key])
    }

    let ageres: any[] = []
    for (let key in objGroup2) {
      agekey.push(key)
      agevalue.push(objGroup2[key])
      ageres.push({
        value: objGroup2[key],
        name: key
      })
    }
    let graderes: any[] = []
    for (let key in objGroup3) {
      gradekey.push(key)
      gradevalue.push(objGroup3[key])
      graderes.push({
        value: objGroup3[key],
        name: key
      })
    }
    // console.log(age)
    // console.log(objGroup2)
    // console.log(ageres)

    // console.log(originize)
    // console.log(objGroup)
    // console.log(originizekey)
    // console.log(originizevalue)
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('main'));
    let myChart2 = echarts.init(document.getElementById('main2'));
    let myChart3 = echarts.init(document.getElementById('main3'));
    // 绘制图表
    myChart.setOption(
      {
        title: { text: `组织人数统计(${person.length}人)` },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: originizekey,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '总人数',
            type: 'bar',
            barWidth: '60%',
            showBackground: true,
            data: originizevalue,
            backgroundStyle: {
          color: 'rgba(157, 219, 243, 0.8)'
        }
          }
        ]
      }
    );

    // {
    //   title: { text: '组织人数统计' },
    //   tooltip: {
    //     trigger: 'axis',
    //       axisPointer: {            // 坐标轴指示器，坐标轴触发有效
    //       type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    //     }
    //   },
    //   xAxis: {
    //     data: originizekey
    //   },
    //   yAxis: { },
    //   series: [{
    //     name: '人数',
    //     type: 'bar',
    //     showBackground: true,
    //     data: originizevalue,
    //     backgroundStyle: {
    //       color: 'rgba(157, 219, 243, 0.8)'
    //     }
    //   }]
    // }

    myChart2.setOption({
      title: {
        text: '年龄统计',
        subtext: '左侧可以点击',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: agekey
      },
      series: [
        {
          name: '所占比例',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: ageres,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
    myChart3.setOption({
      title: {
        text: '年级统计',
        subtext: '左侧可以点击',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: gradekey
      },
      series: [
        {
          name: '所占比例',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: graderes,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
  useEffect(chartinit)
  return (
    <div>
      <div id="main" style={{ width: 1000, height: 400 }}></div>
      <div style={{ display: "flex" }}>
        <div id="main2" style={{ width: 500, height: 400, marginLeft: 50 }}></div>
        <div id="main3" style={{ width: 400, height: 400, marginLeft: 50 }}></div>
      </div>

      {/* <Button type="primary" onClick={chartinit}>Primary Button</Button> */}
    </div>

  )
}

export default Chart
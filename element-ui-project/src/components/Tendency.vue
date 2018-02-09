<template>
  <div id="main" style="height:500px;"></div>

</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        myChart: {}
      }
    },
    props: ['sevenDay', 'sevenDate'],
    methods: {
      setOptions() {
        var option = {
          title: {
            text: '走势图',
            left: '5%',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['新注册用户', '新增订单', '新增管理员'],
            left: '35%',
          },
          grid: {
            left: '10%',
            right: '20%',
            containLabel: true
          },
          toolbox: {
            show: true,
            right: '20%',
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.sevenDay
          },
          yAxis: [
            {
              type: 'value',
              name: '用户',
              min: 0,
              max: 500,
              position: 'left',
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '订单',
              min: 0,
              max: 500,
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '新注册用户',
              type: 'line',
              yAxisIndex: 1,
              data: this.sevenDate[0],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
            },
            {
              name: '新增订单',
              type: 'line',
              yAxisIndex: 1,
              data: this.sevenDate[1],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
            },
            {
              name: '新增管理员',
              type: 'line',
              yAxisIndex: 1,
              data: this.sevenDate[2],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
            }
          ]
        };

        this.myChart.setOption(option);
      }
    },
    mounted() {
      this.myChart = echarts.init(document.getElementById('main'));
      this.setOptions();

    }
  }
</script>

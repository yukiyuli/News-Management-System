// insert public js module

import { load, isLogin } from "/admin/util/LoadView.js"

load("sidemenu-home")


let user = JSON.parse(isLogin())

document.querySelector(".userprofile").innerHTML = `
    <img src="${user.photo}" style="width:100px;" />
    <div>
        <div>${user.username}</div>
        <div><pre>${user.introduction || "This man is lazy and left nothing behind"}</pre></div>   

    </div>
`

// pre: keep the original text style

  // Initialize the echarts instance based on the prepared dom
  var myChart = echarts.init(document.getElementById('main'));

  // Specify the configuration items and data for the chart
  var option = {
    title: {
      text: 'ECharts Getting Started Example'
    },
    tooltip: {},
    legend: {
      data: ['sales']
    },
    xAxis: {
      data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
    },
    yAxis: {},
    series: [
      {
        name: 'sales',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };

  // Display the chart using the configuration items and data just specified.
  myChart.setOption(option);

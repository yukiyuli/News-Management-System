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
var option = option = {
    title: {
        text: 'News posted by current user',
        subtext: 'Proportion of different categories',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

// Display the chart using the configuration items and data just specified.
myChart.setOption(option);

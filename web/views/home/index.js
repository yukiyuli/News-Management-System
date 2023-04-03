// insert public js module

import { load, isLogin } from "/admin/util/LoadView.js"

load("sidemenu-home")


let user = JSON.parse(isLogin())

let categoryList = ["Lastest news", "Typical Case", "Announcement"]

document.querySelector(".userprofile").innerHTML = `
    <img src="${user.photo}" style="width:100px;" />
    <div>
        <div>${user.username}</div>
        <div><pre>${user.introduction || "This man is lazy and left nothing behind"}</pre></div>   

    </div>
`

// pre: keep the original text style





async function analyst() {
    let res = await fetch("http://localhost:3000/news?author=" + user.username).then(res => res.json())

    let obj = _.groupBy(res, item => item.category)

    let arr = []
    for (let i in obj) {
        arr.push({
            name: categoryList[i],
            value: obj[i].length
        })
    }
    renderEcharts(arr)
}

function renderEcharts(data) {
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
                name: 'Category',
                type: 'pie',
                radius: '50%',
                data: data,
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
}

analyst()
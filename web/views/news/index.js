// insert public js module

import { load } from "/web/util/LoadView.js"

load("topbar-news")

let list = []

search.oninput = async function () {

    if (!search.value) {
        document.querySelector(".list-group").style.display = "none"   // 隐藏搜索结果框
        return
    }
    document.querySelector(".list-group").style.display = "block"   // 显示搜索结果框
    let res = await fetch("http://localhost:3000/news?title_like=" + search.value).then(res => res.json())
    // console.log(res)
    document.querySelector(".list-group").innerHTML = res.map(item => `
    <li class="list-group-item"><a href="/web/views/news/index.html?id=${item.id}">${item.title}</a></li>
    `).join("")
}

search.onblur = function () {
    setTimeout(() => {
        document.querySelector(".list-group").style.display = "none"
    }, 300)
}

function render() {
    renderList()
    renderTab()
}

async function renderList() {
    list = await fetch("http://localhost:3000/news").then(res => res.json())
    list.reverse()
    let cardcontainer = document.querySelector(".card-container")
    cardcontainer.innerHTML = list.slice(0, 4).map(item => `
    <div class="card" data-id="${item.id}">
        <div style="background-image:url(${item.cover});" class="imgcover"></div>
        <div class="card-body">
            <h5 class="card-title" style="font-size:16px">${item.title}</h5>
            <p class="card-text" style="font-size:14px;color:gray;">Author: ${item.author}</p>
        </div>
    </div>
    `).join("")

    for (let item of document.querySelectorAll(".card")) {
        item.onclick = function () {
            location.href = `/web/views/detail/index.html?id=${item.dataset.id}`
        }
    }
}



function renderTab() {

}

render()
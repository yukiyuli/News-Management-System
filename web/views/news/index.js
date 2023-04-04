// insert public js module

import { load } from "/web/util/LoadView.js"

load("topbar-news")

search.oninput =async function(){

    if(!search.value ) {
        document.querySelector(".list-group").style.display = "none"   // 隐藏搜索结果框
        return
    } 
    document.querySelector(".list-group").style.display = "block"   // 显示搜索结果框
     let res =await fetch("http://localhost:3000/news?title_like="+search.value).then(res=>res.json())
    // console.log(res)
    document.querySelector(".list-group").innerHTML = res.map(item=>`
    <li class="list-group-item">${item.title}</a></li>
    `).join("")
}


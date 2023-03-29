// insert public js module

import { load, isLogin } from "/admin/util/LoadView.js"

load("sidemenu-newsList")

let list = []

let categoryList = ["Lastest news", "Typical Case", "Announcement"]

async function render() {
    let username = JSON.parse(isLogin()).username
    list = await fetch(`http://localhost:3000/news?author=${username}`).then(res => res.json())
    listbody.innerHTML = list.map(item => `
    <tr>
        <th scope="row">${item.title}</th>
        <td>
            ${categoryList[item.category]}
        </td>
        <td>
        <button type="button" class="btn btn-success btn-sm btn-edit" data-myid="${item.id}" >Preview</button>
        <button type="button" class="btn btn-primary btn-sm btn-edit" data-myid="${item.id}" >Edit</button>
        <button type="button" class="btn btn-danger btn-sm btn-del" data-myid="${item.id}">Delete</button>

        </td>
    </tr>
       
    `).join("")
}

render()
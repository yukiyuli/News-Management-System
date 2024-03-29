// insert public js module

import { load, isLogin } from "/admin/util/LoadView.js"

load("sidemenu-newsList")

let list = []

let editId = 0

var previewModal = new bootstrap.Modal(document.getElementById('previewModal'))
var delModal = new bootstrap.Modal(document.getElementById('delModal'))

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
        <button type="button" class="btn btn-success btn-sm btn-preview" data-myid="${item.id}" >Preview</button>
        <button type="button" class="btn btn-primary btn-sm btn-edit" data-myid="${item.id}" >Edit</button>
        <button type="button" class="btn btn-danger btn-sm btn-del" data-myid="${item.id}">Delete</button>

        </td>
    </tr>
       
    `).join("")
}

// 事件委托
listbody.onclick = function (evt) {
    if (evt.target.className.includes("btn-preview")) {
        previewModal.toggle()

        let obj = list.filter(item => item.id == evt.target.dataset.myid)[0]
        renderPreviewModal(obj)
    }
    else if (evt.target.className.includes("btn-edit")) {
        location.href = "/admin/views/news-manage/EditNews/index.html?id=" + evt.target.dataset.myid //带上id才知道修改的是哪条新闻
    }
    else if (evt.target.className.includes("btn-del")) {
        editId = evt.target.dataset.myid

        // show edit modal
        delModal.toggle()
    }
}

function renderPreviewModal(obj) {
    previewModalTitle.innerHTML = obj.title
    previewModalContent.innerHTML = obj.content
    if (obj.cover) {
        const img = document.createElement('img')
        img.setAttribute('src', obj.cover)
        img.setAttribute('class', 'img-fluid')
        previewModalPhoto.innerHTML = ''
        previewModalPhoto.appendChild(img)
    } else {
        previewModalPhoto.innerHTML = ''
    }
}

delConfirm.onclick = async function () {
    await fetch(`http://localhost:3000/news/${editId}`, {
        method: "delete"
    })
    delModal.toggle()
    render()
}

render()
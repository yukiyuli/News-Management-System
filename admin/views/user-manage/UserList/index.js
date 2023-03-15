// insert public js module

import { load } from "/admin/util/LoadView.js"

load("sidemenu-userList")

var editModal = new bootstrap.Modal(document.getElementById('editModal'))

let list = []

let updateId = 0

let photodata = ""

async function render() {

    list = await fetch("http://localhost:3000/users").then(res => res.json())

    listbody.innerHTML = list.map(item => `
            <tr>
                <th scope="row">${item.username}</th>
                <td>
                    <img src="${item.photo}" style="width:50px;border-radius:50%"/>
                </td>
                <td>
                // data- 自定义属性
                <button type="button" class="btn btn-primary btn-sm btn-edit" ${item.default ? "disabled" : ""} data-myid="${item.id}" >Edit</button>
                <button type="button" class="btn btn-danger btn-sm btn-del" ${item.default ? "disabled" : ""} data-myid="${item.id}">Delete</button>

                </td>
            </tr>
    `).join("")
}

// user List 读取数据
listbody.onclick = function (evt) {
    if (evt.target.className.includes("btn-edit")) {

        // dataset 与上面的data- 自定义属性相呼应，找到对应的信息
        updateId = evt.target.dataset.myid
        // show modal
        editModal.toggle()
        // pre-fill modal
        let { username, password, introduction, photo } = list.filter(item => item.id == updateId)[0]

        document.querySelector("#username").value = username
        document.querySelector("#password").value = password
        document.querySelector("#introduction").value = introduction

        // 第一次就需要收集photo信息
        photodata = photo

    } else if (evt.target.className.includes("btn-del")) {

    }

}


editConfirm.onclick = async function () {
    await fetch(`http://localhost:3000/users/${updateId}`, {
        method: "PATCH",  // PATCH一定要大写
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: document.querySelector("#username").value,
            password: document.querySelector("#password").value,
            introduction: document.querySelector("#introduction").value,
            photo: photodata
        })
    }).then(res => res.json())

    
    editModal.toggle()

    render()
}

photofile.onchange = function (evt) {
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function (e) {
        photo = e.target.result
    }
}

render()
// insert public js module

import { load } from "/admin/util/LoadView.js"

load("sidemenu-addUser")

let photo = ""

addUserForm.onsubmit = async function (evt) {
    evt.preventDefault()
    await fetch("http://locaohost:3000/users", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            introduction: introduction.value,
            photo
        })
    }).then(res => res.json())

    location.href = "/admin/views/user-manage/UserList/index.html"
}

// base64转码事件
photofile.onchange = function (evt) {
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function (e) {
        photo = e.target.result
    }
}
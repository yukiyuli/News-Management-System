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
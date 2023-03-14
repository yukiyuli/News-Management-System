// insert public js module

import { load } from "/admin/util/LoadView.js"

load("sidemenu-userList")

async function render(){

    let list = await fetch("http://localhost:3000/users").then(res=>res.json())

    listbody.innerHTML = list.map(item=>`
            <tr>
                <th scope="row">${item.username}</th>
                <td>
                    <img src="${item.photo}" style="width:50px;border-radius:50%"/>
                </td>
                <td>
                <button type="button" class="btn btn-primary btn-sm btn-edit" ${item.default?"disabled":""} data-myid="${item.id}" >Edit</button>
                <button type="button" class="btn btn-danger btn-sm btn-del" ${item.default?"disabled":""} data-myid="${item.id}">Delete</button>

                </td>
            </tr>
    `).join("")
}

render()
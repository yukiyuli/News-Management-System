// insert public js module

import { load, isLogin } from "/admin/util/LoadView.js"

load("sidemenu-newsList")

// get id
let editId = new URL(location.href).searchParams.get("id")

let content = ""
let cover=""

const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
        const html = editor.getHtml()
        // console.log('editor content', html)
        // You can sync HTML to <textarea>
        // 改变都收集到content里
        content = html
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})


coverphoto.onchange = function (evt) {
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function (e) {
        cover = e.target.result
    }
}

addNewsForm.onsubmit =async  function(evt){
    evt.preventDefault()
    await fetch(`http://localhost:3000/news${editId}`,{ 
        headers:{
            "content-type":"application/json"
        },
        method:"PATCH",
        body:JSON.stringify({
            title:title.value,
            content,
            category:category.value,
            cover:coverphoto,
        })
    }).then(res=>res.json())

    location.href = "/admin/views/news-manage/NewsList/index.html"
}

async function render(){
    let {title,category,content:mycontent,cover:mycover} = await fetch(`http://localhost:3000/news/${editId}`).then(res=>res.json())
    // console.log(obj)

    document.querySelector("#title").value = title
    document.querySelector("#category").value = category


    //set content
    editor.setHtml(mycontent)

    // if no change for content or cover, keep the old ones
    content = mycontent

    cover  = mycover
}

render()
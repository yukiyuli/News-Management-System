
async function load(id) {
    let user = isLogin()
    if (user) {
        let topbarText = await fetch("/web/components/topbar/index.html").then(res => res.text())

        document.querySelector(".topbar").innerHTML = topbarText;

    }

}

export { load }




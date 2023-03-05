function isLogin() {
    return localStorage.getItem("token")
}

function renderTopbar(user) {
    let photo = document.querySelector("#topbar-photo")
    let currentUsername = document.querySelector("#currentUsername")
    let exit = document.querySelector("#exit")

    photo.src = user.photo
    currentUsername.innerHTML = user.username

    exit.onclick = function () {
        localStorage.removeItem("token")
        location.href = "/admin/views/login/index.html"
    }
}

async function load() {
    let user = isLogin()
    if (user) {
        let topbarText = await fetch("/admin/components/topbar/index.html").then(res => res.text())

        document.querySelector(".topbar").innerHTML = topbarText;

        renderTopbar(JSON.parse(user))
    }
    else {
        location.href = "/admin/views/login/index.html"
    }
}

export { load }




if (localStorage.getItem("token")) {
    fetch("/admin/components/topbar/index.html").then(res => res.text()).then(res => {
        document.querySelector(".topbar").innerHTML = res;
    })

} else {
    location.href = "/admin/views/login/index.html"
}


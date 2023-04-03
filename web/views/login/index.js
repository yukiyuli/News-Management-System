const loginform = document.querySelector("#loginform")
loginform.onsubmit = async function (evt) {
    loginwarning.style.display = "none"
    evt.preventDefault()

    console.log(username.value, password.value)

    // json-server: get=search, post=add, put=update, delete=delete

    let res = await fetch(`http://localhost:3000/users?username=${username.value}&password=${password.value}`).then(res => res.json())

    if (res.length > 0) {
        localStorage.setItem("token", JSON.stringify({
            ...res[0],
            password: "*******"
        }))
        location.href = "/admin/views/home/index.html"
    } else {
        console.log("failed")
        loginwarning.style.display = "block"
    }

}
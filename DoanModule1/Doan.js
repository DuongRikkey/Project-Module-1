let user = document.getElementById("user")
let login = document.getElementsByClassName("login")
let body = document.getElementsByTagName("body")
let mark1 = document.getElementById("mark1")
let overlay = document.getElementsByClassName("overlay")

user.onclick = function () {
    login[0].style.display = "block"
    overlay[0].style.display = "block"
}
mark1.onclick = function () {
    login[0].style.display = "none"
    overlay[0].style.display = "none"

}
overlay[0].onclick = function () {
    login[0].style.display = "none"
    overlay[0].style.display = "none"
}

let user = document.getElementById("user")
let login = document.getElementsByClassName("login")
let body = document.getElementsByTagName("body")
let mark1 = document.getElementById("mark1")
let overlay = document.getElementsByClassName("overlay")
const soundmarshall = document.getElementsByClassName("sound-marshall");
const productcheap = document.getElementsByClassName("total-product-cheap");
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


let catedb = JSON.parse(localStorage.getItem("product"))
console.log(catedb);

function redermodal() {
  let catedb = JSON.parse(localStorage.getItem("product"));

  catedb = catedb.slice(0, 4)

  let stringHTML = ""
  for (let i = 0; i < catedb.length; i++) {
    stringHTML += ` <div class="list-marshall">
          <img
            style="width: 255px; height: 230px"
            src="${catedb[i].image
      }"
            alt=""
          />
          <div class="text-marshall">
            <p>${catedb[i].productName}</p></p>
            <p class="color-ms">TAI NGHE MARSHALL, IN-EAR</p>
            <p class="Star">
              <i class="fa-solid fa-star"" style="color: yellow;"></i>
              <i class="fa-solid fa-star"" style="color: yellow;" ></i>
              <i class="fa-solid fa-star"" style="color: yellow;" ></i>
              <i class="fa-solid fa-star"" style="color: yellow;" ></i>
              <i class="fa-solid fa-star"" style="color: yellow;" ></i>
            </p>
            <p><i class="fa-solid fa-check"></i> ${catedb[i].inventory}</p>
            <p style="font-weight: bold;" >${catedb[i].price}  VND</p>
            <p><i class="fa-solid fa-circle"></i></p>
            <p>
              <button>
                <a style="color: white" href="">Lựa Chọn Các Tùy Chọn</a>
              </button>
            </p>
          </div>
          <div class="infor-news">
            <p class="green">NEW</p>
            <p class="red">HOT</p>
          </div>
        </div>
        `
  }
  soundmarshall[0].innerHTML = stringHTML
}
redermodal()


function renderAccount() {
  const userLogin = JSON.parse(localStorage.getItem('user-login'))
  if (userLogin) {
    document.getElementById('text-name-account').innerHTML = userLogin.fullname
    document.getElementById('btn-logout').style.display = "block"
  } else {
    document.getElementById('text-name-account').innerHTML = `<button> <a href="../LoginRegister/Register.html">Login</a> </button>`
    document.getElementById('btn-logout').style.display = "none"
  }
}
renderAccount()

document.getElementById('btn-logout').onclick = function () {
  localStorage.removeItem('user-login')
  renderAccount()
}
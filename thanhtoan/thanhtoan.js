const card = document.getElementById("cart-total")
const totalmoney = document.getElementById("total-money")
const totalcurrent = document.getElementById("total-current")


function renderCart() {

  let userLogin = JSON.parse(localStorage.getItem("user-login"));
  const cart = userLogin.cart
  let totalProduct = cart.reduce(function (acc, cur) {
    return (acc += cur.quantity);
  }, 0);
  totalCart.innerHTML = totalProduct;
}
renderCart()


function renderPayment() {
  const userLogin = JSON.parse(localStorage.getItem("user-login"))
  const dbproductms = JSON.parse(localStorage.getItem("product"))
  const cart = userLogin.cart
  let totalPrice = 0;
  let Stringpayment = ""
  for (let i = 0; i < cart.length; i++) {
    const product = dbproductms.find((el) => el.id == cart[i].productId)
    totalPrice += product.price * cart[i].quantity
    Stringpayment +=
      ` <div class="cart-item">
          <div class="item-info">
            <img
              src="${product.image
      }"
              alt="Marshall Emberton Diamond Jubilee - Black"
            />
            <div>
              <p>${product.productName}</p>
            </div>
          </div>
          <div class="item-price"> ${Number(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      }</div>
          <div class="item-quantity">
            <button onclick="minusQuantity(${cart[i].productId})" >-</button>  
            <span>${cart[i].quantity}</span>
            <button onclick="plusQuantity(${cart[i].productId})" >+</button>
          </div>
          <div class="item-total"> ${Number(product.price * cart[i].quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      } đ</div>
        </div>
        
        `
  } card.innerHTML = Stringpayment
  totalmoney.innerHTML = Number(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  totalcurrent.innerHTML = Number(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })

}
renderPayment()

function plusQuantity(productId) {
  const userLogin = JSON.parse(localStorage.getItem('user-login'))
  const cart = userLogin.cart

  const index = cart.findIndex(el => el.productId == productId)
  cart[index].quantity += 1

  userLogin.cart = cart
  localStorage.setItem('user-login', JSON.stringify(userLogin))
  renderPayment()
}

function minusQuantity(productId) {
  const userLogin = JSON.parse(localStorage.getItem('user-login'))
  const cart = userLogin.cart

  const index = cart.findIndex(el => el.productId == productId)

  if (cart[index].quantity == 1) {
    cart.splice(index, 1)
    userLogin.cart = cart
    localStorage.setItem('user-login', JSON.stringify(userLogin))
    renderPayment()
    return
  }

  cart[index].quantity -= 1
  userLogin.cart = cart
  localStorage.setItem('user-login', JSON.stringify(userLogin))
  renderPayment()
}

function confirmDeletion() {
  // Hiển thị hộp thoại xác nhận
  const userconfirmed = confirm("Xác nhận thanh toán");

  if (userconfirmed) {
    // Người dùng nhấn "OK"
    console.log("Người dùng đã xác nhận mua hàng.");
    // Thực hiện hành động xóa ở đây
  } else {
    // Người dùng nhấn "Cancel"
    console.log("Người dùng đã hủy hành động mua hàng.");
    // Không làm gì cả hoặc thực hiện hành động khác ở đây
  }
}
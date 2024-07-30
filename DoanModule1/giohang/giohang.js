const creatproduct = document.getElementById("creat-product");
const namepay = document.getElementById("name");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const orderNotes = document.getElementById("order-notes");
const ordersummary = document.getElementsByClassName("order-summary");

const productoder = document.getElementById("product-oder");
const total = document.getElementById("total");
const totaldemo = document.getElementById("total-demo");

const pagination = document.getElementById("pagination-user")

function renderCart() {

    let userLogin = JSON.parse(localStorage.getItem("user-login"));
    const cart = userLogin.cart
    let totalProduct = cart.reduce(function (acc, cur) {
        return (acc += cur.quantity);
    }, 0);
    totalCart.innerHTML = totalProduct;
}
renderCart()


creatproduct.onclick = function () {
    const namepayment = namepay.value.trim();
    const addresspayment = address.value.trim();
    const phonepayment = phone.value.trim();
    const emailpayment = email.value.trim();

    if (!namepayment) {
        alert("Bạn vui lòng không để trống tên");
        return;
    }
    if (!addresspayment) {
        alert("Bạn vui lòng không để trống địa chỉ nhận hàng");
        return;
    }
    if (!phonepayment) {
        alert("Bạn vui lòng không để trống số điện thoại");
        return;
    }


    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const userLogin = JSON.parse(localStorage.getItem("user-login"));

    let id = 1;
    if (orders.length > 1) {
        id = orders[orders.length - 1].id + 1
    }

    const newOrderItem = {
        id: id,
        userId: userLogin.id,
        name: namepayment,
        address: addresspayment,
        phone: phonepayment,
        email: emailpayment,
        note: orderNotes.value,
        date: new Date(),
        status: 0,
        cart: userLogin.cart,
        total: totalPrice
    }

    orders.push(newOrderItem)
    userLogin.cart = []

    localStorage.setItem('orders', JSON.stringify(orders))
    localStorage.setItem('user-login', JSON.stringify(userLogin))
    window.location.href = "../doan/Doan.html"
};



function renderPayment() {
    const userLogin = JSON.parse(localStorage.getItem("user-login"));
    const dbproductms = JSON.parse(localStorage.getItem("product"));
    const cart = userLogin.cart;
    totalPrice = 0;
    let Stringpayment = "";
    for (let i = 0; i < cart.length; i++) {

        const product = dbproductms.find((el) => el.id == cart[i].productId);
        totalPrice += product.price * cart[i].quantity;
        Stringpayment += `

            <div
              style="width: 100%; display: flex; justify-content: space-between;text-align: center"
            >
              <p>${product.productName}</p>
             <div style="text-align: center> <p ">${cart[i].quantity}</p> </div>
              <p> ${Number(product.price * cart[i].quantity).toLocaleString(
            "it-IT",
            { style: "currency", currency: "VND" }
        )}</p>
            </div>
        `;
    }

    productoder.innerHTML = Stringpayment;
    total.innerHTML = Number(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    totaldemo.innerHTML = Number(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
renderPayment();

function renderAccount() {
    const userLogin = JSON.parse(localStorage.getItem('user-login'))
    if (userLogin) {
        document.getElementById('text-name-account').innerHTML = userLogin.fullname

        document.getElementById('btn-logout').style.display = "block"
    } else {
        document.getElementById('text-name-account').innerHTML = `<button  > <a style="color: black" href="../../LoginRegister/Register.html">Login</a> </button>`
        document.getElementById('btn-logout').style.display = "none"
    }
}
renderAccount()

document.getElementById('btn-logout').onclick = function () {
    localStorage.removeItem('user-login')
    renderAccount()
}

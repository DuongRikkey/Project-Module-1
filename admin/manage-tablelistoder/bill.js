const listcategory = document.getElementById("list-category")

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


            `
           <tr>
                      <td>  <img
              src="${product.image}"
      }"
              alt="Marshall Emberton Diamond Jubilee - Black"
            /> ${product.productName}</td>
                      <td>${Number(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
            }</td>
                      <td>${cart[i].productId}</td>
                      <td>${Number(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
            }</td>
                    </tr> 
          `
    } listcategory.innerHTML = Stringpayment
    // totalmoney.innerHTML = Number(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    // totalcurrent.innerHTML = Number(totalPrice).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })

}
renderPayment()

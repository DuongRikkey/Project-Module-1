const textprodcut = document.getElementsByClassName("total-product-cheap");


let dbproductms = JSON.parse(localStorage.getItem("product"))
let search = document.getElementById("search")
let inpsearch = document.getElementById("inpsearch")
let filter = document.getElementById("filter")
let listCategory = document.getElementById("list-category")

let categoryIdChoose = 0


function renderCategory() {
  let dbCategory = JSON.parse(localStorage.getItem("categories"));
  let dbProducts = JSON.parse(localStorage.getItem("product"));

  let stringHTML = ""
  for (let i = 0; i < dbCategory.length; i++) {

    const listProduct = dbProducts.filter(el => el.categoryId == dbCategory[i].id)

    stringHTML +=
      `
      <main class="main-product" onclick="clickCategory(${dbCategory[i].id})" >
          <img
            style="height: 55px; width: 100px"
            src="../Image/cate1.jpg"
            alt=""
          />
          <p>
            <a href="">
              ${dbCategory[i].name} <br />
              <span>${listProduct.length} product</span>
            </a>
          </p>
      </main> 
    `
  }

  stringHTML +=
    `
      <main class="main-product" onclick="clickCategory(0)" >
          <img
            style="height: 55px; width: 100px"
            src="../Image/cate1.jpg"
            alt=""
          />
          <p>
            <a href="">
              Tất cả <br />
              <span>${dbProducts.length} product</span>
            </a>
          </p>
      </main> 
    `

  listCategory.innerHTML = stringHTML
}
renderCategory()


function redermodal() {
  let dbproductms = JSON.parse(localStorage.getItem("product"));
  dbproductms = dbproductms.filter((el) => el.productName.toLowerCase().includes(inpsearch.value.trim().toLowerCase()))
  const categorydb = JSON.parse(localStorage.getItem("categories"))

  if (categoryIdChoose != 0) {
    dbproductms = dbproductms.filter(el => el.categoryId == categoryIdChoose)
  }


  switch (filter.value) {
    case '0':
      break;
    case '1':
      dbproductms = dbproductms.filter((el) => el.price >= 2000000 && el.price < 4000000)
      break;
    case '2':
      dbproductms = dbproductms.filter((el) => el.price >= 4000000 && el.price < 8000000)
      break;
    case '3':
      dbproductms = dbproductms.filter((el) => el.price >= 8000000 && el.price < 12000000)
      break;
    case '4':
      dbproductms = dbproductms.filter((el) => el.price >= 12000000 && el.price < 15000000)
      break;
    case '5':
      dbproductms = dbproductms.filter((el) => el.price >= 15000000)
      break;
  }
  let stringHTML = ""
  for (let i = 0; i < dbproductms.length; i++) {
    stringHTML += `    <div class="new-product">
                <img
                  style="width: 195px; height: 197px"
                  class="img-product"
                  src="${dbproductms[i].image}"
                  alt=""
                />
                <div class="text-marshall-small">
                  <p class="cheap-ms">${dbproductms[i].productName}</p>
                  <p class="color-ms-cheap">${categorydb.find(el => el.id == dbproductms[i].categoryId).name}</p>
                  <p class="Star-Yellow-Cheap">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                  </p>
                  <p style="font-size: 14px; font-weight: bold">
                    <i style="font-size: 15px" class="fa-solid fa-check"></i> 
                    ${dbproductms[i].inventory}
                  </p>
                  <p>
                    <span class="bold-ms">  ${new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(
      dbproductms[i].price
    )}VNĐ     
                    </span>
                  </p>
                  <p>
                    <i class="fa-solid fa-circle"></i
                    ><i
                      style="padding: 5px; color: #af6349; font-size: 15px"
                      class="fa-solid fa-circle"
                    ></i>
                  </p>
                  <p>
                    <button class="smart-ms" href="">
                      Lựa Chọn Các Tùy Chọn
                    </button>
                  </p>
                  <div class="infor-news-small">
                    <p class="black">-34%</p>
                  </div>
                </div>
              </div>
        `
  }
  textprodcut[0].innerHTML = stringHTML
}
redermodal()

filter.onchange = function () {
  redermodal()
}

function clickCategory(categoryId) {
  categoryIdChoose = categoryId
  redermodal()
}
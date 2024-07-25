// Thêm category
const btnagree = document.getElementById("btn-Agree")
const input = document.getElementById("category-input-name")
const error1 = document.getElementById("error-1")
const btncancel = document.getElementById("btn-Cancel")
const listcategory = document.getElementById("list-category")
const Updatename = document.getElementById("Updatename")

const inputSearch = document.getElementById("input-search")
const btnSearch = document.getElementById("btn-search")
const sortall = document.getElementById("sortall")
let idUpdateGlobal = null;
let filtercategory = document.getElementById("filter-category ");
const pagesize = 5;
const totalpgae = 1
btnagree.onclick = function () {
    const categoryname = input.value.trim()
    const dbCategory = JSON.parse(localStorage.getItem("categories")) || []
    if (!categoryname) {
        error1.innerHTML = "Mời bạn nhập lại"
        return;

    }
    const vitri = dbCategory.findIndex((element) => {
        return element.name.toLowerCase() === categoryname.toLowerCase()
    })


    if (vitri !== -1) {
        error1.innerHTML = "Đã có sản phẩm này";
        return;
    }

    let id = 1;
    if (dbCategory.length > 0) {
        id = dbCategory[dbCategory.length - 1].id + 1
    }
    if (idUpdateGlobal) {
        let idUpdateGlobalindex = dbCategory.findIndex(e => e.id === idUpdateGlobal)
        dbCategory[idUpdateGlobalindex].name = categoryname;
        localStorage.setItem("categories", JSON.stringify(dbCategory))
        idUpdateGlobal = null; // nếu ko null vào 
        renderCategory()
        input.value = ""
        Updatename.innerHTML = "Them danh muc"
        return;
    }
    const Overvieww = {
        id: id,
        name: categoryname
    }
    // let index = dbCategory.findIndex((c) => c.id == Overvieww.id)
    // console.log(index);


    dbCategory.push(Overvieww)
    console.log(dbCategory);

    localStorage.setItem("categories", JSON.stringify(dbCategory))
    error1.innerHTML = ""

    input.value = ""
    //Them vao
    renderCategory()


}

btncancel.onclick = function () {
    input.value = ""
    error1.innerHTML = ""
}

function renderCategory() {
    let dbCategory = JSON.parse(localStorage.getItem("categories")) || []

    dbCategory = dbCategory.filter((el) => el.name.toLowerCase().includes(inputSearch.value.trim().toLowerCase()))
    switch (sortall.value) {
        case `bandau`:
            break;
        case `tangdan`:
            dbCategory.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case `giamdan`:
            dbCategory.sort((a, b) => b.name.localeCompare(a.name))
            break;
    }
    let string = "";
    for (i = 0; i < dbCategory.length; i++) {
        string +=
            `<tr>
                <td>${i + 1}</td>
                <td>${dbCategory[i].id}</td>
                <td>${dbCategory[i].name}</td>
                <td>
                <button onclick="enterEdit(${dbCategory[i].id})">Update</button>
                 <button onclick="deletecategory(${dbCategory[i].id})">Delete</button>
                </td>
            </tr>
            `
    }
    listcategory.innerHTML = string
}
renderCategory()



function deletecategory(idDelete) {
    if (confirm("Bạn có chắc xóa hay không")) {
        const dbCategory = JSON.parse(localStorage.getItem("categories")) || []
        let vitri = dbCategory.findIndex(element => element.id == idDelete)
        dbCategory.splice(vitri, 1)
        localStorage.setItem("categories", JSON.stringify(dbCategory))
        renderCategory()
    }
}
function enterEdit(idcanedit) {
    const dbCategory = JSON.parse(localStorage.getItem("categories")) || []
    let giatri = dbCategory.find(function (element) {
        return element.id === idcanedit;
    })
    input.value = giatri.name;

    idUpdateGlobal = idcanedit

    localStorage.setItem("categories", JSON.stringify(dbCategory))


    renderCategory()
    Updatename.innerHTML = "Update";
    return;


}

btnSearch.onclick = function () {
    renderCategory()
};
//Bước cuối
sortall.onchange = function () {
    renderCategory()
}


//Phân trang

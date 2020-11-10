$('.menuhide').hide();
$(window).scroll(function () {
    var vitri = $(document).scrollTop();
    var manhinh = $(window).width();
    if (vitri >= 280 && manhinh > 1200) {
        $('.menuhide').show();
    }
    else {
        $('.menuhide').hide();
    }
});


cart = JSON.parse(localStorage.getItem('local'));

$('.click-add-cart').click(function (e) {
    e.preventDefault();
    var Id =$(this).parents("div.add-id-cart").data("id");
    var tensp = $(this).parents(".card_btn").siblings(".card-title").html();
    var anh = $(this).parents(".add-id-cart").find("img.imgchinh").attr('src');
    var gia = $(this).parents(".card_btn").siblings(".card-text").html();
    var obj = {
        id: Id,
        productName: tensp,
        imageUrl: anh,
        price: gia,
    };
    // kiểm tra xem sp đã có trong giỏ hàng hay chưa
    var flag = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == obj.id) {
            flag = true;
            break;
        }
    }

    if (flag === false) { // sản phẩm chưa  có trong giỏ hàng
        obj.quantity = 1;
        cart.push(obj);
    }
    else cart[i].quantity += 1; // sản phẩm đã có trong giỏ hàng
    
    localStorage.setItem('local', JSON.stringify(cart));
});

console.log(cart);

var data = localStorage.getItem('local');
if (data) {
    cart = JSON.parse(data);
}
else {
    cart = [];
}
addProduct();


// thêm giao diện giỏ hàng
function addProduct() {
    $('#cartPro').empty();
    var cartInit = "";
    var bill = "";
    var totalPrice = 0;


    for (var i = 0; i < cart.length; i++) {
        cartInit += `
    <tr style="height:75px">
        <td>
            <i class="fa fa-times click-remove-pr" aria-hidden="true" id="${cart[i].id}" onclick="removeInit(${cart[i].id})"></i>
        </td>
        <td style="width:100px">
            <img src="${cart[i].imageUrl}" alt="">
        </td>
        <td>${cart[i].productName}</td>
        <td>${cart[i].price}</td>
        <td>
            <div class="tanggiam">
                <i class="fas fa-arrow-alt-circle-down" aria-hidden="true" onclick="tru(${cart[i].id})" style="cursor:pointer;"></i>
                <input  value="${cart[i].quantity}" onchange="changeQuantity(this,${cart[i].id})">
                <i class="fas fa-arrow-alt-circle-up" aria-hidden="true" onclick="cong(${cart[i].id})" style="cursor:pointer;"></i>
            </div>
        </td>
        <td>${cart[i].quantity * parseInt(cart[i].price)} VNĐ</td>
    </tr>
    `;
        totalPrice += cart[i].quantity * parseInt(cart[i].price);
    }
    $('#cartPro').append(cartInit);


    var bill = "";
    $('#bill').empty();
    bill = `
        <tr>
            <th scope="row">Tổng sản phẩm</th>
            <td>${totalPrice} VNĐ</td>
        </tr>
        <tr>
            <th scope="row">Phí vận chuyển</th>
            <td>50000 VNĐ</td>
        </tr>
        <tr>
            <th scope="row">Tổng tiền</th>
            <td>${totalPrice + 50000} VNĐ</td>
        </tr>
    `;
    $('#bill').append(bill);

    // gio hang tren thanh menu
    $('.cart').empty();
    var gio = "";
    gio = `
        <a href="cart.html">
            <button type="button" class="card-item btn">
                 <i class="fa fa-cart-arrow-down" aria-hidden="true" style="color: #73be47;"></i>
                 <span id="sosp">${cart.length}</span>
                <span style="margin-right:5px;">sp</span>
                <span>${totalPrice}</span>
                <span>VNĐ</span>
            </button>
        </a>
        `;
    $('.cart').append(gio);
}

// click khi them sp len menutop
$('.click-add-cart').click(function (e) {
    addProduct();
});

// xóa sp
function removeInit(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('local', JSON.stringify(cart));
    addProduct();
}

// thay đổi số lượng
function changeQuantity(e, id) {
    var sosp = e.value;
    if (sosp > 0) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id == id) {
                cart[i].quantity = sosp;
                break;
            }
        }
        localStorage.setItem('local', JSON.stringify(cart));
        addProduct();
    }
    else { removeInit(id); addProduct(); }
}


// tang khi click
function cong(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].quantity += 1;
            break;
        }
    }
    localStorage.setItem('local', JSON.stringify(cart));
    addProduct();
}


// giam khi click
function tru(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            if (cart[i].quantity > 1) {
                cart[i].quantity -= 1;
                break;
            }
        }
    }
    localStorage.setItem('local', JSON.stringify(cart));
    addProduct();
}
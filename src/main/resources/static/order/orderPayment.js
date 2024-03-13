document.addEventListener('DOMContentLoaded', () => {
    setEventListeners();
    getBook();
    getDeliverInfo();
});

const orderRequest = {
    "userId": null,
    "addressId": null,
    "orderBookRequestList": []
};

function setEventListeners() {
    const createOrderButton = document.querySelector('.create-order-button');
    createOrderButton.addEventListener('click', createOrder);
}

async function createOrder() {
    console.log("createOrder 메소드 호출");

    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    const response = await fetch(`/api/order`, {method: 'POST', headers, body: JSON.stringify(orderRequest)});
    if (response.ok) {
        const order = await response.json();
        console.log("주문이 생성되었습니다:", order);
        window.location.href = '/order/orderList.html';
    } else {
        console.error("주문 생성에 실패했습니다.");
    }
}

async function getDeliverInfo() {
    console.log("getDeliverInfo 메소드 호출");

    const defaultAddress = await fetchDefaultAddress();
    renderDeliverInfo(defaultAddress);
}

async function fetchDefaultAddress() {
    console.log("fetchDefaultAddress 메소드 호출");

    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    const response = await fetch(`/api/address/default`, {headers});
    return await response.json();
}

function renderDeliverInfo(defaultAddress) {
    console.log("renderDeliverInfo 메소드 호출");

    orderRequest.userId = defaultAddress['user']['id'];
    orderRequest.addressId = defaultAddress['id'];

    const deliverName = document.querySelector(".deliver-name");
    deliverName.textContent = defaultAddress['addressName'];

    const deliverPerson = document.querySelector(".deliver-person");
    deliverPerson.textContent = defaultAddress['user']['name'];

    const deliverPhoneNumber = document.querySelector(".deliver-phone-number");
    deliverPhoneNumber.textContent = defaultAddress['phoneNumber'];

    const deliverAddress = document.querySelector(".deliver-address");
    deliverAddress.textContent = "[" + defaultAddress['zipCode'] + "] " + defaultAddress['mainAddress'] + " " + defaultAddress['subAddress'];
}

async function getBook() {
    console.log("getBook 메소드 호출");

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');

    const book = await fetchBookById(bookId);
    renderBookData(book);
}

async function fetchBookById(bookId) {
    console.log("fetchBookById 메소드 호출");

    const orderBookRequest = {"bookId": bookId, "stock": 1};
    orderRequest.orderBookRequestList.push(orderBookRequest);

    const response = await fetch(`/api/book/${bookId}`);
    return await response.json();
}

function renderBookData(book) {
    console.log("renderBookData 메소드 호출");

    const bookItemDetail = document.querySelector(".book-item-detail");
    bookItemDetail.innerHTML = '';

    const bookItemDetailHTML = `
        <img class="order-book-img" src="${book['thumbnailUrl']}" alt="책 표지 사진"/>
        <div class="order-book-info">
            <p>${book['title']}</p>
            <span>수량: 1</span>
        </div>
    `;
    bookItemDetail.insertAdjacentHTML('beforeend', bookItemDetailHTML);

    const orderBookPrice = document.querySelector(".book-item-price");
    orderBookPrice.textContent = book['price'] + "원";

    renderOrderPaymentResult(book['price']);
}

async function renderOrderPaymentResult(orderBookPrice) {
    console.log("renderOrderPaymentResult 메소드 호출");

    const deliveryPrice = 3000;
    const totalPaymentPrice = orderBookPrice + deliveryPrice;

    const orderPaymentBookPrice = document.querySelector(".order-payment-book-price p:last-child");
    orderPaymentBookPrice.textContent = orderBookPrice + "원";

    const orderPaymentDeliverPrice = document.querySelector(".order-payment-deliver-price p:last-child");
    orderPaymentDeliverPrice.textContent = deliveryPrice + "원";

    const orderPaymentResultPrice = document.querySelector(".order-payment-result-price p:last-child");
    orderPaymentResultPrice.textContent = totalPaymentPrice + "원";
}

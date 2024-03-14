if(!localStorage.getItem("token")){
    window.location.href = "../login/login.html"
}
document.addEventListener("DOMContentLoaded", function (){
    const jwtToken = localStorage.getItem("token");
    const orderList = document.getElementById("orderList");

    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }
    const name = document.getElementById("name");
    fetch('/user', {
        method: 'GET',
        headers: headers
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('유저 정보를 가져오는데 실패했습니다.');
        }
        return response.json();
    })
    .then(data=>{
        console.log(data);
        name.textContent = data.name;
    })
    .catch(error=>{
        console.log('유저 정보를 가져오는데 실패했습니다.', error);
    });

    fetch('/api/order', {
        method: 'GET',
        headers: headers
    })
        .then(response=>{
            if(!response.ok){
                throw new Error('주문 정보를 가져오는데 실패했습니다.');
            }
            return response.json();
        })
        .then(data=>{
            console.log(data);
            if (data && data.length > 0) {
                displayOrderList(data);
            } else {
                orderList.textContent = '주문내역이 없습니다.';
                orderList.style.textAlign = 'center';
            }
        })
        .catch(error=>{
            console.log('주문 정보를 가져오는데 실패했습니다.', error);
        });

    fetch('/api/address/default', {
        method: 'GET',
        headers: headers
    })
        .then(response=>{
            if(!response.ok){
                throw new Error('주소 정보를 가져오는데 실패했습니다.');
            }
            return response.json();
        })
        .then(data=>{
            console.log(data);
            displayAddress(data);
        })
        .catch(error=>{
            console.log('주소 정보를 가져오는데 실패했습니다.', error);
            const addressMessage = document.getElementById("defaultAddress");
            addressMessage.textContent = "기본 주소지가 없습니다.";
        });
})
function displayOrderList(data) {
    const orderListContainer = document.getElementById("orderList");
    const orderToDetail = document.createElement("a");
    const orderContainer = document.createElement("div");
    const orderContent = document.createElement("div");
    const orderPriceContainer = document.createElement("div");
    orderContainer.style.display = "flex"
    orderContainer.style.justifyContent = "space-between"
    orderContainer.style.marginTop = "10px";

    orderListContainer.innerHTML = '';

    let orderStatus;
    let orderDate;
    let orderBookStock = 0;
    let totalAmount = 0;
    data.forEach(order => {
        orderStatus = order.orderStatus;
        orderDate = order.orderDate;

        orderContainer.classList.add("order-number");
        orderContent.classList.add("order-content");

        order.orderBookList.forEach(orderBook=>{
            orderBookStock += orderBook.stock;

            totalAmount += (orderBook.book.price * orderBook.stock);
        });
    });
    orderToDetail.textContent = "상세보기 >";
    orderToDetail.href = "/order/orderList.html";
    orderToDetail.style.textDecoration = "none";
    orderToDetail.style.color = "#484848";

    const bookImage = document.createElement("img");
    bookImage.src = "../images/book.png";
    bookImage.alt = "책사진";

    const orderDetail = document.createElement("div");
    orderDetail.classList.add("order-detail");

    const title = document.createElement("p");
    title.style.fontWeight = "bold";
    title.textContent = `[국내도서] ${data[data.length-1].orderBookList[data[data.length-1].orderBookList.length-1].book.title}`;

    const stock = document.createElement("p");
    stock.textContent = `수량:${data[data.length-1].orderBookList[data[data.length-1].orderBookList.length-1].stock}`;

    const etc = document.createElement("p");
    etc.textContent = (orderBookStock - data[data.length-1].orderBookList[data[data.length-1].orderBookList.length-1].stock) !== 0 ? "외 " + (orderBookStock - data[data.length-1].orderBookList[data[data.length-1].orderBookList.length-1].stock) + "권" : "";
    etc.style.marginTop = "40px"
    orderDetail.appendChild(title);
    orderDetail.appendChild(stock);
    orderDetail.appendChild(etc);

    const bookContainer = document.createElement("div");
    bookContainer.style.display = "flex";
    bookContainer.appendChild(bookImage);
    bookContainer.appendChild(orderDetail);

    orderContent.appendChild(bookContainer);

    const orderPrice = document.createElement("p");
    orderPrice.style.marginRight = "40px";
    orderPrice.style.marginTop = "40px";
    orderPrice.style.fontSize = "15px";
    orderPrice.textContent = `총 결제 금액 ${totalAmount}원`;
    orderPriceContainer.appendChild(orderPrice);

    const orderStatusElement = document.createElement("div");
    orderStatusElement.classList.add("order-status");

    const orderStatusText = document.createElement("p");
    orderStatusText.textContent = orderStatus;

    const orderDateText = document.createElement("p");
    orderDateText.style.fontSize = "10px";
    orderDateText.style.color = "#484848";
    orderDateText.textContent = `${orderDate} 배송 완료`;

    const reviewButton = document.createElement("button");
    reviewButton.type = "button";
    reviewButton.textContent = "리뷰작성";

    orderStatusElement.appendChild(orderStatusText);
    orderStatusElement.appendChild(orderDateText);
    orderStatusElement.appendChild(reviewButton);

    orderContainer.appendChild(orderContent);
    const orderPriceStatusContainer = document.createElement("div");
    orderPriceStatusContainer.style.display = "flex";
    orderPriceStatusContainer.appendChild(orderPriceContainer);
    orderPriceStatusContainer.appendChild(orderStatusElement);
    orderContainer.appendChild(orderPriceStatusContainer);

    orderListContainer.appendChild(orderToDetail);
    orderListContainer.appendChild(orderContainer);
}
function displayAddress(data){
    const address = document.getElementById("address");
    const addressContainer = document.createElement("div");
    const addressDiv = document.createElement('div');
    const addressDetailDiv = document.createElement("div");
    addressContainer.style.display = "flex";
    addressDiv.style.marginRight = "150px";

    const addressNameParagraph = document.createElement('p');
    addressNameParagraph.textContent = '주소지: ' + data.addressName;
    addressNameParagraph.style.fontSize = "15px";
    addressDiv.appendChild(addressNameParagraph);

    const phoneNumberParagraph = document.createElement('p');
    phoneNumberParagraph.textContent = '전화번호: ' + data.phoneNumber;
    phoneNumberParagraph.style.fontSize = "15px";
    addressDiv.appendChild(phoneNumberParagraph);

    const mainAddressParagraph = document.createElement('p');
    mainAddressParagraph.textContent = '주소: ' + data.mainAddress + ' ' + data.subAddress + ' ['+data.zipCode+']';
    mainAddressParagraph.style.fontSize = "20px";
    addressDetailDiv.appendChild(mainAddressParagraph);

    addressContainer.appendChild(addressDiv);
    addressContainer.appendChild(addressDetailDiv);

    address.appendChild(addressContainer);
}
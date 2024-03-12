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
        })
})
function displayOrderList(data) {
    const orderListContainer = document.getElementById("orderList");

    orderListContainer.innerHTML = '';

    data.forEach(order => {
        let totalAmount = 0;
        const orderStatus = order.orderStatus;
        const orderDate = order.orderDate;
        let orderBookStock = 0;

        const orderContainer = document.createElement("div");
        orderContainer.classList.add("order-number");

        const orderContent = document.createElement("div");
        orderContent.classList.add("order-content");

        order.orderBookList.forEach(orderBook=>{
            orderBookStock += orderBook.stock;

            totalAmount += (orderBook.book.price * orderBook.stock);
        })

        order.orderBookList.forEach((orderBook) => {
            const bookImage = document.createElement("img");
            bookImage.src = "../images/book.png";
            bookImage.alt = "책사진";

            const orderDetail = document.createElement("div");
            orderDetail.classList.add("order-detail");

            const title = document.createElement("p");
            title.style.fontWeight = "bold";
            title.textContent = `[국내도서] ${orderBook.book.title}`; // Replace with the appropriate field in your OrderBook

            const stock = document.createElement("p");
            stock.textContent = `수량:${orderBook.stock}`; // Replace with the appropriate field in your OrderBook

            orderDetail.appendChild(title);
            orderDetail.appendChild(stock);

            const etc = document.createElement("p");
            // todo 주문한 책 수량
            etc.textContent = orderBookStock - orderBook.stock === 0 ? "외 " + (totalAmount-orderBook.stock) + "권" : "";

            const bookContainer = document.createElement("div");
            bookContainer.style.display = "flex";
            bookContainer.appendChild(bookImage);
            bookContainer.appendChild(orderDetail);

            orderContent.appendChild(bookContainer);
            orderContent.appendChild(etc);
        });

        const orderPrice = document.createElement("p");
        orderPrice.style.marginRight = "40px";
        orderPrice.style.marginTop = "40px";
        orderPrice.style.fontSize = "15px";
        orderPrice.textContent = `총 결제 금액 ${totalAmount}원`;

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
        orderContainer.appendChild(orderPrice);
        orderContainer.appendChild(orderStatusElement);

        orderListContainer.appendChild(orderContainer);
    });

    orderList.appendChild(table);
}
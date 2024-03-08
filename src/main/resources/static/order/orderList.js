document.addEventListener('DOMContentLoaded', () => {
    setEventListeners();
    getAllOrder();
});

function setEventListeners() {

}

async function getAllOrder() {
    const response = await fetch("/api/order");
    const orderList = await response.json();
    const orderListWrap = document.querySelector(".order-list-wrap");

    orderListWrap.innerHTML = '';

    orderList.forEach(order => {
        let totalPrice = 0;
        const orderDetailLink = `/order/orderDetail.html?orderId=${order['id']}`;
        const orderItemHtml = `
            <div class="order-item-wrap">
                <span>주문내역</span>
                <div class="order-item-meta-wrap">
                    <p id="order-item-number">${order['id']}</p>
                    <p id="order-item-detail"><a href="${orderDetailLink}">상세보기 ></a></p>
                </div>
                <div class="order-item-contents-wrap">
                    <div>
                        <img src="../images/book.png" alt="책 표지 사진"/>
                        <ul class="order-item-contents">
                            ${order['orderBookList'].map(book => {
                                const subtotal = book['stock'] * book['book']['price'];
                                totalPrice += subtotal;
                                return `
                                    <li>
                                        <p>${book['book']['title']}</p>
                                        <p>수량 : ${book['stock']}</p>
                                        <p>가격 : ${subtotal.toLocaleString()}원</p>
                                    </li>`;
                            }).join('')}
                        </ul>
                    </div>
                    <div>
                        <div class="order-item-price">
                            <p>총 결제 금액</p>
                            <p>${totalPrice.toLocaleString()}원</p>
                        </div>
                        <div class="order-item-deliver-wrap">
                            <p class="order-item-deliver-status">${order['orderStatus']}</p>
                            <p class="order-item-deliver-status-date">${order['orderDate'].split('T')[0]}</p>
                            <button>리뷰 작성</button>
                        </div>
                    </div>
                </div>
            </div>
        `

        orderListWrap.insertAdjacentHTML('beforeend', orderItemHtml);
    });
}

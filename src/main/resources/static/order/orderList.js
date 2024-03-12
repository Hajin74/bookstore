document.addEventListener('DOMContentLoaded', () => {
    getUser();
    getAllOrderByUser();
});

async function getUser() {
    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    const nickname = document.querySelector(".nickname");
    console.log("nickname: " + nickname);
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
            nickname.textContent = data.name;
        })
        .catch(error=>{
            console.log('유저 정보를 가져오는데 실패했습니다.', error);
        })
}

async function getCountByOrderStatus(data) {
    console.log("getCountByOrderStatus 메소드 호출");

    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    fetch('/api/order/status/count', {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('주문 상태별 분류 및 갯수 조회에 실패했습니다.');
            }
        })
        .then(data => {
            console.log('주문 상태별 분류 및 갯수 조회에 성공했습니다');
            renderOrderStatusData(data);
        })
        .catch(error => {
            console.error('주문 상태별 분류 및 갯수 조회에 실패했습니다.', error);
        });
}


async function getAllOrderByUser() {
    console.log("getAllOrderByUser 메소드 호출");

    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    fetch('/api/order', {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('주문 목록을 가져오는데 실패했습니다.');
            }
        })
        .then(data => {
            console.log('주문 정보를 가져오는데 성공했습니다');
            renderOrderListData(data);
            getCountByOrderStatus(data);
        })
        .catch(error => {
            console.error('주문 정보를 가져오는데 실패했습니다.', error);
        });
}

function renderOrderListData(orderBookList) {
    console.log("renderOrderListData 호출");
    const orderListWrap = document.querySelector(".order-list-wrap");

    orderBookList.forEach(order => {
        console.log("orderBook: " + order['id']);
        let totalPrice = 0;
        const orderDetailLink = `/order/orderDetail.html?orderId=${order['id']}`;
        const koreanOrderStatus = getOrderStatusKorean(order['orderStatus']);
        const orderBookHtml = `
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
                                const subtotal = book['book']['price'] * book['stock'];
                                totalPrice += subtotal;
                                return `
                                <li>
                                    <p>${book['book']['title']}</p>
                                    <p>수량 : ${book['stock']}</p>
                                </li>`;
                            }).join('')}
                        </ul>
                    </div>
                    <div>
                        <div class="order-item-price">
                            <p>총 결제 금액</p>
                            <p>${totalPrice}</p>
                        </div>
                        <div class="order-item-deliver-wrap">
                            <p class="order-item-deliver-status">${koreanOrderStatus}</p>
                            <p class="order-item-deliver-status-date">${order['orderDate']}</p>
                            <button>리뷰 작성</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        orderListWrap.insertAdjacentHTML('beforeend', orderBookHtml);
    });
}

function renderOrderStatusData(data) {
    console.log("renderOrderStatusData 호출");

    const preparing = document.querySelector(".order-result-preparing-count");
    if (data['READY_FOR_SHIPPING'] != null) {
        preparing.textContent = data['READY_FOR_SHIPPING'];
    }

    const shipping = document.querySelector(".order-result-shipping-count");
    if (data['SHIPPING_IN_PROGRESS'] != null) {
        shipping.textContent = data['SHIPPING_IN_PROGRESS'];
    }


    const completed = document.querySelector(".order-result-deliver-completed-count");
    if (data['SHIPPING_COMPLETED'] != null) {
        completed.textContent = data['SHIPPING_COMPLETED'];
    }
}

function getOrderStatusKorean(status) {
    switch (status) {
        case 'READY_FOR_SHIPPING':
            return '배송 준비중';
        case 'SHIPPING_IN_PROGRESS':
            return '배송중';
        case 'SHIPPING_COMPLETED':
            return '배송 완료';
        default:
            return status;
    }
}
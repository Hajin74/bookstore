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
        })
        .catch(error => {
            console.error('주문 정보를 가져오는데 실패했습니다.', error);
        });
}

function renderOrderListData(orderBookList) {
    const orderListWrap = document.querySelector(".order-list-wrap");

    orderBookList.forEach(order => {
        console.log("orderBook: " + order['id']);
        const orderDetailLink = `/order/orderDetail.html?orderId=${order['id']}`;
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
                            ${order['orderBookList'].map(book => `
                                <li>
                                    <p>${book['book']['title']}</p>
                                    <p>수량 : ${book['stock']}</p>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div>
                        <div class="order-item-price">
                            <p>총 결제 금액</p>
                            <p>00,000원</p>
                        </div>
                        <div class="order-item-deliver-wrap">
                            <p class="order-item-deliver-status">${order['orderStatus']}</p>
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
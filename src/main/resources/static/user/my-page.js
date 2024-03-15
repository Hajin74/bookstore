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
            const addressMessage = document.getElementById("address");
            addressMessage.textContent = "기본 주소지가 없습니다.";
        });
})
function displayOrderList(orderList) {
    console.log("displayOrderList 메소드 호출");

    const orderListWrap = document.getElementById("orderList");
    orderList.forEach(order => {
        const orderHTML = `
            <span>주문번호 : ${order.id}</span> | 
            <span>주문날짜 : ${order.orderDate}</span> | 
            <span>배송상태 : ${order.orderStatus}</span><br>
        `;

        orderListWrap.insertAdjacentHTML('beforeend', orderHTML);
    });
}

function displayAddress(data){
    console.log("displayAddress 메소드 호출");

    const addressWrap = document.getElementById("address");
    const addressHTML = `
        <span class="address-address">${data.addressName}</span><br>
        <span>${data.user['name']}</span> /  
        <span class="address-phone-number">${data.phoneNumber}</span><br>
        <span class="address-zip-code">[${data.zipCode}]</span>
        <span class="address-main-address">${data.mainAddress}</span> 
        <span class="address-sub-address">${data.subAddress}</span>
    `;

    addressWrap.insertAdjacentHTML('beforeend', addressHTML);
}
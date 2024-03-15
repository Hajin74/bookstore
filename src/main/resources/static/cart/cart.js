//아이템 가져오기
async function fetchCartItems(userId) {
    try {
        const response = await fetch(`/api/cart/byUserId/${userId}`);
        const cart = await response.json();

        const latestCartId = cart ? cart.id : null;

        return latestCartId;
    } catch (error) {
        console.error('장바구니 아이템을 가져오는데 실패했습니다.', error);
        throw error;
    }
}

//아이템 html에 추가
async function populateCartItems(userId) {
    try {
        const latestCartId = await fetchCartItems(userId);

        if (!latestCartId) {
            console.error('장바구니가 비어있습니다.');
            return;
        }

        const cartItemsResponse = await fetch(`/api/cartItem/byCartId/${latestCartId}`);
        const cartItems = await cartItemsResponse.json();

        const cartItemsContainer = document.querySelector('.cart-items');

        cartItems.forEach(item => {
            const { _id, title, quantity, price } = item;

            cartItemsContainer.insertAdjacentHTML(
                "beforeend",
                `
                <div class="cart-item">
                    <div class="item-checkbox">
                        <input type="checkbox" id="item-${_id}" name="item-${_id}">
                    </div>
                    <div class="item-details">
                        <div class="item-name">${title}</div>
                        <div class="item-price">${price}원</div>
                    </div>
                    <div class="item-actions">
                        <div class="item-quantity">
                            <button type="button" ${quantity <= 1 ? "disabled" : ""}>-</button>
                            <input type="number" value="${quantity}" min="1">
                            <button type="button" ${quantity >= 99 ? "disabled" : ""}>+</button>
                        </div>
                    </div>
                </div>
                `
            );
        });

    } catch (error) {
        console.error('장바구니 아이템을 가져오는 중에 오류가 발생했습니다:', error);
        throw error;
    }
}

window.onload = async function() {
    try {
        // userId 가져오기
        const userId = await getUserId();

        if (!userId) {
            console.error('사용자 정보를 가져오는데 실패했습니다.');
            return;
        }

        await populateCartItems(userId);
    } catch (error) {
        console.error('장바구니 아이템을 가져오는 중에 오류가 발생했습니다:', error);
    }
};

//총 구매가격 업데이트
function updateTotalPrice() {
    var totalPrice = 0;
    var discountAmount = 0;
    var shippingFee = 0;

    document.querySelectorAll('.cart-item').forEach(function(item) {
        if (item.querySelector('.item-checkbox input').checked) {
            var quantityInput = item.querySelector('.item-quantity input');
            var priceDisplay = item.querySelector('.item-price');
            var price = parseInt(priceDisplay.dataset.basePrice);
            totalPrice += price * parseInt(quantityInput.value);
        }
    });

    var finalPrice = totalPrice - discountAmount + shippingFee;

    document.querySelector('.subtotal').textContent = totalPrice.toLocaleString() + ' 원';
    document.querySelector('.discount').textContent = '-' + discountAmount.toLocaleString() + ' 원';
    document.querySelector('.shipping').textContent = '+' + shippingFee.toLocaleString() + ' 원';
    document.querySelector('.total').textContent = finalPrice.toLocaleString() + ' 원';
}

//수량 업데이트
function updateQuantity(quantityInput, isIncrement) {
    var currentValue = parseInt(quantityInput.value);
    if (isIncrement) {
        quantityInput.value = currentValue + 1;
    } else if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
    updateTotalPrice();
}
document.querySelectorAll('.item-actions button').forEach(button => {
    button.addEventListener('click', event => {
        const quantityInput = event.target.parentNode.querySelector('input[type="number"]');
        const isIncrement = event.target.textContent === '+';
        updateQuantity(quantityInput, isIncrement);
    });
});


//session storage
//세션에 장바구니 정보 저장
async function storeCartItemsToSessionStorage(userId) {
    try {
        const cart = await getAllCartsByUserId(userId);

        const cartId = getLatestCartId(cart);

        if (!cartId) {
            console.error('장바구니가 비었습니다.');
            return;
        }

        const response = await fetch(`/api/cartItem/byCartId/${cartId}`);
        const cartItems = await response.json();

        cartItems.forEach(item => {
            sessionStorage.setItem(`cart.${item.bookId}`, item.quantity);
        });

    } catch (error) {
        console.error('장바구니 항목을 가져오는데 실패했습니다.', error);
        throw error;
    }
}

async function getAllCartsByUserId(userId) {
    try {
        const response = await fetch(`/api/cart?userId=${userId}`);
        const cart = await response.json();
        return cart;

    } catch (error) {
        console.error('모든 장바구니를 가져오는데 실패했습니다.', error);
        throw error;
    }
}

//결제페이지로 이동
function goToCheckoutPage() {
    window.location.href = '/order';
}

//주문버튼 이벤트
document.querySelector('.order-btn').addEventListener('click', async () => {
    try {
        // userId 가져오기
        const userId = await getUserId();

        if (!userId) {
            console.error('사용자 정보를 가져오는데 실패했습니다.');
            return;
        }

        storeCartItemsToSessionStorage(userId);

        goToCheckoutPage();
    } catch (error) {
        console.error('주문을 생성하는 중에 오류가 발생했습니다:', error);
    }
});
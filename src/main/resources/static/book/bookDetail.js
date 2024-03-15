document.addEventListener('DOMContentLoaded', getBook);

async function getBook() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');
    await displayBookDetails(bookId);

    const bookPayButton = document.querySelector(".book-payment-button");
    bookPayButton.addEventListener("click", () => redirectToOrderPayment(bookId));

    const bookCartButton = document.querySelector(".book-cart-button");
    bookCartButton.addEventListener("click", () => addToCartAndRedirect(bookId));
}

async function displayBookDetails(bookId) {
    try {
        const book = await fetchBookById(bookId);
        console.log("book: " + book.contents);

        updateElementTextContent(".book-detail-title", book.title);
        updateElementTextContent(".book-detail-contents", book.contents);
        updateElementTextContent(".book-detail-writer", book.writer);
        updateElementTextContent(".book-detail-publisher", book.publisher);
        updateElementTextContent(".book-detail-price", `${book.price}원`);

        const bookDetailImg = document.querySelector(".book-detail-img");
        bookDetailImg.setAttribute("src", book.thumbnailUrl);
    } catch (error) {
        console.error('책 정보를 표시하는데 오류가 발생했습니다:', error);
    }
}

async function fetchBookById(bookId) {
    const response = await fetch(`/api/book/${bookId}`);
    return await response.json();
}

function updateElementTextContent(selector, text) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = text;
    }
}

function redirectToOrderPayment(bookId) {
    const queryParams = new URLSearchParams({ bookId });
    window.location.href = `/order/orderPayment.html?${queryParams.toString()}`;
}

function redirectToCart() {
    window.location.href = '/cart/cart.html';
}

async function addToCartAndRedirect(bookId) {
    try {
        const userId = await getUserId();

        if (!userId) {
            console.error('유저 정보를 가져오는데 실패했습니다.');
            return;
        }

        const book = await fetchBookById(bookId);
        const item = {
            userId: userId,
            bookId: bookId,
            quantity: 1,
            title: book.title,
            price: book.price
        };

        await addToCart(item);

        redirectToCart();
    } catch (error) {
        console.error('장바구니에 아이템을 추가 / 장바구니 페이지로 이동하는데 오류가 발생했습니다:', error);
    }
}

async function addToCart(item) {
    try {
        const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        if (!response.ok) {
            console.error('장바구니에 아이템을 추가하는데 실패했습니다.');
            return;
        }

        console.log('장바구니에 아이템을 추가했습니다.');
    } catch (error) {
        console.error('장바구니에 아이템을 추가하는 중에 오류가 발생했습니다:', error);
    }
}

//유저아이디 목데이터로 1 사용
async function getUserId() {
    try {
        return 1;
    } catch (error) {
        console.error('사용자 ID를 가져오는 중에 오류가 발생했습니다:', error);
        throw error;
    }
}
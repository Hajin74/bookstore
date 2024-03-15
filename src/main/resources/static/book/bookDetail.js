document.addEventListener('DOMContentLoaded', getBook);

async function getBook() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');
    await displayBookDetails(bookId);

    const bookPayButton = document.querySelector(".book-payment-button");
    bookPayButton.addEventListener("click", () => redirectToOrderPayment(bookId));

    const bookCartButton = document.querySelector(".book-cart-button");
    bookCartButton.addEventListener("click", () => addCart(bookId));
}

async function displayBookDetails(bookId) {
    const book = await fetchBookById(bookId);
    console.log("book: " + book.contents);

    updateElementTextContent(".book-detail-title", book.title);
    updateElementTextContent(".book-detail-contents", book.contents);
    updateElementTextContent(".book-detail-writer", book.writer);
    updateElementTextContent(".book-detail-publisher", book.publisher);
    updateElementTextContent(".book-detail-price", `${Number(book.price).toLocaleString()}원`);


    const bookDetailImg = document.querySelector(".book-detail-img");
    bookDetailImg.setAttribute("src", book.thumbnailUrl);
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

function addCart(bookId) {
    console.log("addCart 메소드 호출");
    const book = {"bookId": bookId, "quantity": 1};
    fetchAddCart(book);
}

async function fetchAddCart(book) {
    console.log("fetchAddCart 메소드 호출");
    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    const response = await fetch( '/cart/cart', {method: 'POST', headers, body: JSON.stringify(book)});
    return await response.json();
}

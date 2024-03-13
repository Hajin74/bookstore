document.addEventListener('DOMContentLoaded', getBook);

async function getBook() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');
    await displayBookDetails(bookId);

    const bookPayButton = document.querySelector(".book-payment-button");
    bookPayButton.addEventListener("click", () => redirectToOrderPayment(bookId));
}

async function displayBookDetails(bookId) {
    const book = await fetchBookById(bookId);

    updateElementTextContent(".book-detail-title", book.title);
    updateElementTextContent(".book-detail-sub-title", book.subTitle);
    updateElementTextContent(".book-detail-publisher", book.publisher);
    updateElementTextContent(".book-detail-price", `${book.price}원`);

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

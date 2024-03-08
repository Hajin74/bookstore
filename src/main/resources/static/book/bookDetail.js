document.addEventListener('DOMContentLoaded', () => {
   getBook();
});

function getBook() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');

    getBookById(bookId);
}

async function getBookById(bookId) {
    const response = await fetch(`/api/book/${bookId}`);
    const book = await response.json();

    const bookDetailImg = document.querySelector(".book-detail-img");
    bookDetailImg.setAttribute("src", book['thumbnailUrl']);

    const bookDetailTitle = document.querySelector(".book-detail-title");
    bookDetailTitle.innerHTML = book['title'];

    const bookDetailSubTitle = document.querySelector(".book-detail-sub-title");
    bookDetailSubTitle.innerHTML = book['subTitle'];

    const bookDetailPublisher = document.querySelector(".book-detail-publisher");
    bookDetailPublisher.innerHTML = book['publisher'];

    const bookDetailPrice = document.querySelector(".book-detail-price");
    bookDetailPrice.innerHTML = book['price'] + "원";
}

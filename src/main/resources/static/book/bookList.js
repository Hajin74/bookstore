// 페이지네이션에 필요한 변수
const itemsPerPage = 5;
let currentPage = 1;
let booksData;

getBookList();

async function getBookList() {
    console.log("getBookList 호출");

    fetch('/api/book', {
        method: 'GET'
    })
        .then(response=>{
            if(!response.ok){
                throw new Error('책 정보를 가져오는데 실패했습니다.');
            }
            console.log('책 정보를 가져오는데 성공했습니다.');
            return response.json();
        })
        .then(data=>{
            console.log(data);
            booksData = data;
            displayBooks(currentPage);
            setupPagination();
        })
        .catch(error=>{
            console.log('책 정보를 가져오는데 실패했습니다.', error);
        })
}

// 책 목록을 표시하는 함수
function displayBooks(page) {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedBooks = booksData.slice(startIndex, endIndex);

    displayedBooks.forEach(book => {
        const bookDetailLink = `/book/bookDetail.html?bookId=${book['id']}`;
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");
        bookItem.innerHTML = `
            <img src="${book.thumbnailUrl}" alt="${book.title}" class="thumbnail">
            <div class="book-item-info-wrap">
                <h3><a href="${bookDetailLink}">${book.title}</a></h3>
                <p>작가: ${book.writer}</p>
            </div>
        `;
        bookList.appendChild(bookItem);
    });
}

// 페이지네이션을 처리하는 함수
function setupPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(booksData.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("button");
        pageLink.textContent = i;
        pageLink.addEventListener("click", () => {
            currentPage = i;
            displayBooks(currentPage);
            highlightCurrentPage();
        });

        if (i === currentPage) {
            pageLink.classList.add("current-page");
        }


        pagination.appendChild(pageLink);
    }
}

function highlightCurrentPage() {
    const pagination = document.getElementById("pagination");
    const pageLinks = pagination.querySelectorAll("button");
    pageLinks.forEach(link => {
        link.classList.remove("current-page"); // 모든 버튼에서 클래스 제거
    });
    const currentPageButton = pagination.querySelector(`button:nth-child(${currentPage})`);
    currentPageButton.classList.add("current-page"); // 현재 페이지 버튼에 클래스 추가
}


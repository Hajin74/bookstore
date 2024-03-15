document.addEventListener('DOMContentLoaded', () => {
    getTodayBook();
});

function getTodayBook() {
    console.log("getTodayBook 호출");

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
        renderTodayBookData(data);
        renderBestSellerData(data);
    })
    .catch(error=>{
        console.log('책 정보를 가져오는데 실패했습니다.', error);
    })
}

function renderTodayBookData(data) {
    console.log("renderTodayBookData 호출");
    const todayBookWrap = document.querySelector(".today-book-wrap");
    const todayBookList = getRandomSublist(data, 5);
    todayBookWrap.innerHTML = '';

    todayBookList.forEach(todayBook => {
        console.log(todayBook);
        const bookDetailLink = `/book/bookDetail.html?bookId=${todayBook['id']}`;
        const todayBookHtml = `
            <div class="today-book-item" onclick="location.href='${bookDetailLink}'">
                <img src="${todayBook['thumbnailUrl']}"  alt="책 표지"/>
                <p>${todayBook['title']}</p>
                <span>${todayBook['writer']}</span>
            </div>
        `;

        todayBookWrap.insertAdjacentHTML('beforeend', todayBookHtml);
    });
}

function renderBestSellerData(data) {
    console.log("renderBestSellerData 호출");

    const bestSellerWrap = document.querySelector(".best-seller-wrap");
    const bestSellerList = getRandomSublist(data, 5);
    bestSellerWrap.innerHTML = '';

    bestSellerList.forEach(bestSeller => {
        console.log(bestSeller);
        const bookDetailLink = `/book/bookDetail.html?bookId=${bestSeller['id']}`;
        const bestSellerHtml = `
            <div class="best-seller-item" onclick="location.href='${bookDetailLink}'" >
                <img src="${bestSeller['thumbnailUrl']}"  alt="책 표지"/>
                <p>${bestSeller['title']}</p>
                <span>${bestSeller['writer']}</span>
            </div>
        `;

        bestSellerWrap.insertAdjacentHTML('beforeend', bestSellerHtml);
    });
}

function getRandomSublist(list, count) {
    const shuffled = list.slice(); // 리스트 복사
    let i = list.length;
    const min = i - count;
    let temp, index;

    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random()); // 무작위 인덱스 선택
        temp = shuffled[index]; // 현재 요소를 임시 변수에 저장
        shuffled[index] = shuffled[i]; // 무작위로 선택한 요소를 현재 요소와 교체
        shuffled[i] = temp; // 현재 요소를 무작위로 선택한 요소와 교체
    }

    return shuffled.slice(min); // 무작위로 선택된 요소들의 서브리스트 반환
}

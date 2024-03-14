document.addEventListener("DOMContentLoaded", function (){
    const jwtToken = localStorage.getItem("token");
    const header = document.querySelector('.header');

    if (jwtToken !== null){
        header.innerHTML = `
            <a href="/">
                <img class="logo" src="../images/logo.png" alt="로고"/>
            </a>
            <nav>
                <ul>
                    <li><a href="#">장바구니</a></li>
                    <li><a href="/user/my-page.html">마이페이지</a></li>
                    <li id="logout"><a href="/">로그아웃</a></li>
                    <li>
                        <a href="#">
                            <img class="user" src="../images/user.png" alt="유저"/>
                        </a>
                    </li>
                </ul>
            </nav>
        `;
        const logout = document.getElementById("logout");
        logout.addEventListener("click",function (){
            localStorage.removeItem("token");
            window.location.href = "/";
        })

        const headers = {
            'Content-Type': 'application/json'
        };
        headers['Authorization'] = jwtToken;
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
            })
            .catch(error=>{
                console.log('유저 정보를 가져오는데 실패했습니다.', error);
                localStorage.removeItem("token");
                window.location.href = "/";
            });
    }
})
document.addEventListener("DOMContentLoaded", function (){
    const loginForm = document.getElementById("loginUserForm");

    const errorMessage = document.getElementById("errorContainer");

    loginForm.addEventListener("submit", function (event){
        event.preventDefault();

        const formData = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };

        errorMessage.textContent = "";

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok){
                    return response.text();
                }
                localStorage.setItem("token", response.body);
                response.json();
            })
            .then(data => {
                if(data === "존재하지 않는 아이디 입니다." ||
                    data === "비밀번호가 틀렸습니다.") {
                    errorMessage.textContent = data;
                    throw new Error(data);
                }
                console.log("로그인 성공 : " + data);
                // window.location.href = "../edit-user/edit-user.html";
                window.location.href = "../user/my-page.html";
            })
            .catch(error => {
                console.log("로그인 실패 : " + error);
            });
    })
})
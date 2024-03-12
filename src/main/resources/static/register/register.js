document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerUserForm");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); // 기본 폼 제출 동작을 막습니다.

        // 폼 데이터 수집
        const formData = {
            username: document.getElementById("username").value,
            userId: document.getElementById("userId").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            passwordConfirm: document.getElementById("passwordConfirm").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            birthday: document.getElementById("birthday").value,
        };

        // 회원가입 엔드포인트에 API 호출
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                // 서버 응답 데이터 처리, 필요에 따라 다른 페이지로 리다이렉션할 수 있습니다.
                console.log("회원가입 성공:", data);
            })
            .catch(error => {
                // 에러 처리, 필요에 따라 사용자에게 에러 메시지를 표시할 수 있습니다.
                console.error("회원가입 실패:", error);
            });
    });
});
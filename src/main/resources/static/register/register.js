document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerUserForm");
    const errorContainer = document.getElementById("errorContainer");

    const nameErrorMessage = document.getElementById("nameInputErrorMessage");
    const usernameErrorMessage = document.getElementById("usernameInputErrorMessage");
    const emailErrorMessage = document.getElementById("emailInputErrorMessage");
    const passwordErrorMessage = document.getElementById("passwordInputErrorMessage");
    const passwordConfirmErrorMessage = document.getElementById("passwordConfirmErrorMessage");
    const mobileErrorMessage = document.getElementById("mobileNumberErrorMessage");
    const birthdayErrorMessage = document.getElementById("birthdayInputErrorMessage");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); // 기본 폼 제출 동작을 막습니다.

        // 폼 데이터 수집
        const formData = {
            name: document.getElementById("name").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            passwordConfirm: document.getElementById("passwordConfirm").value,
            mobileNumber: document.getElementById("mobileNumber").value,
            birthday: document.getElementById("birthday").value,
        };

        errorContainer.textContent = "";
        nameErrorMessage.textContent = "";
        usernameErrorMessage.textContent = "";
        emailErrorMessage.textContent = "";
        passwordErrorMessage.textContent = "";
        passwordConfirmErrorMessage.textContent = "";
        mobileErrorMessage.textContent = "";
        birthdayErrorMessage.textContent = "";

        // 회원가입 엔드포인트에 API 호출
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response =>{
                if(!response.ok){
                    return response.json();
                }
                return response.text();
            })
            .then(data => {
                if(typeof data === 'object' && data !== null) {
                    Object.keys(data).forEach(fieldName => {
                        const errorMessage = data[fieldName];

                        if (fieldName === "name") {
                            nameErrorMessage.textContent = errorMessage;
                        } else if (fieldName === "username") {
                            usernameErrorMessage.textContent = errorMessage;
                        } else if (fieldName === "email") {
                            emailErrorMessage.textContent = errorMessage;
                        } else if (fieldName === "password") {
                            passwordErrorMessage.textContent = errorMessage;
                        } else if (fieldName === "passwordConfirm") {
                            passwordConfirmErrorMessage.textContent = errorMessage;
                        } else if (fieldName === "mobileNumber") {
                            mobileErrorMessage.textContent = errorMessage;
                        } else if (fieldName === "birthday") {
                            birthdayErrorMessage.textContent = errorMessage;
                        } else if (fieldName === "error"){
                            errorContainer.textContent = errorMessage;
                        }
                    });
                    throw new Error(data);
                }
                // 서버 응답 데이터 처리, 필요에 따라 다른 페이지로 리다이렉션할 수 있습니다.
                console.log("회원가입 성공:", data);
                window.location.href = "/../login/login.html";
            })
            .catch(error => {
                // 에러 처리, 필요에 따라 사용자에게 에러 메시지를 표시할 수 있습니다.
                console.error("회원가입 실패:", error);
            });
    });
});
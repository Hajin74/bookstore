document.addEventListener("DOMContentLoaded", function () {
    const findUsernameForm = document.getElementById("findPasswordForm");
    const errorContainer = document.getElementById("errorContainer");
    const resultContainer = document.getElementById("resultContainer");

    findUsernameForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value
        };

        errorContainer.textContent = "";
        resultContainer.textContent = "";

        fetch("/password-finder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    return response.text()
                        .then(errorMessage => {
                            errorContainer.textContent = errorMessage;
                            throw new Error(errorMessage);
                        });
                }
                return response.text();
            })
            .then(username => {
                console.log("비밀번호 찾기 성공:", username);
                window.location.href = "/password-reset.html";
            })
            .catch(error => {
                console.error("비밀번호 찾기 실패:", error);
            });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const findUsernameForm = document.getElementById("findUsernameForm");
    const errorContainer = document.getElementById("errorContainer");
    const resultContainer = document.getElementById("resultContainer");

    findUsernameForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value
        };

        errorContainer.textContent = "";
        resultContainer.textContent = "";

        fetch("/username-finder", {
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
                console.log("아이디 찾기 성공:", username);
                resultContainer.textContent = username;
            })
            .catch(error => {
                console.error("아이디 찾기 실패:", error);
            });
    });
});
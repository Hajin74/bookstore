document.addEventListener("DOMContentLoaded", function () {
    // 토큰 가져오기
    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
    };
    if(jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }
    // 서버에 GET 요청 보내기
    fetch('/user', {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('유저 정보를 가져오는데 실패했습니다.');
            }
            return response.json();
        })
        .then(data => {
            // 받아온 데이터를 사용하여 화면 업데이트 등 필요한 작업 수행
            updateUserInfoOnPage(data);
        })
        .catch(error => {
            console.error('유저 정보를 가져오는데 실패했습니다.', error);
        });
    function updateUserInfoOnPage(user) {
        document.getElementById("name").value = user.name;
        document.getElementById("username").value = user.username;
        document.getElementById("birthday").value = user.birthday;
        document.getElementById("email").value = user.email;
        document.getElementById("mobileNumber").value = user.mobileNumber;
    }

    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // 기본 폼 제출 동작을 막음

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("passwordConfirm").value;
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;

        const passwordInputErrorMessage = document.getElementById("passwordInputErrorMessage");
        const passwordConfirmInputErrorMessage = document.getElementById("passwordConfirmErrorMessage");

        passwordInputErrorMessage.textContent = "";
        passwordConfirmInputErrorMessage.textContent = "";
        if (password !== passwordConfirm) {
            document.getElementById("passwordConfirmErrorMessage").innerText = "비밀번호가 일치하지 않습니다.";
            return;
        }

        // 서버에 PUT 요청 보내기
        const editUserData = {
            username: username,
            password: password,
            passwordConfirm: passwordConfirm,
            name: name,
            email: email
        };

        fetch('/edit-user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken
            },
            body: JSON.stringify(editUserData)
        })
            .then(response =>{
                if(!response.ok){
                    return response.json();
                }
            })
            .then(data => {
                if(typeof data === 'object' && data !== null) {
                    Object.keys(data).forEach(fieldName => {
                        const errorMessage = data[fieldName];

                        if(fieldName === "password"){
                            passwordInputErrorMessage.textContent = errorMessage;
                        }else if(fieldName === "passwordConfirm"){
                            passwordConfirmInputErrorMessage.textContent = errorMessage;
                        }else if(errorMessage === "비밀번호가 일치하지 않습니다."){
                            passwordConfirmInputErrorMessage.textContent = errorMessage;
                        }
                    });
                    throw new Error(data);
                }
                console.log('유저 정보 수정 성공');
                window.history.back();
            })
            .catch(error => {
                console.error('유저 정보 수정에 실패했습니다.', error);
            });
    });

    const deleteButton = document.getElementById("deleteButton");
    deleteButton.addEventListener("click", function (event){
        event.preventDefault();

        if(window.confirm("회원 탈퇴를 하시겠습니까?") && window.confirm("탈퇴를 하시게 되면, 데이터는 절대 복구 불가능합니다.")){
            fetch('/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwtToken
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Errorr(response.json());
                    }
                })
                .then(data => {
                    console.log('회원탈퇴 성공');
                    window.location.href = "/../login/login.html";
                })
                .catch(error => {
                    console.error('회원탈퇴 실패' + error);
                });
        }
    });

    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", function () {
        window.history.back();
    });
});

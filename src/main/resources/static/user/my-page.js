document.addEventListener("DOMContentLoaded", function (){
    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }
    const name = document.getElementById("name");
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
        name.textContent = data.name;
    })
    .catch(error=>{
        console.log('유저 정보를 가져오는데 실패했습니다.', error);
    })
})
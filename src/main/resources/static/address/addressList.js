document.addEventListener('DOMContentLoaded', () => {
    getAllAddressByUser();
    setEventListeners();
    getUser();
});

async function getUser() {
    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    const nickname = document.querySelector(".nickname");
    console.log("nickname: " + nickname);
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
            nickname.textContent = data.name;
        })
        .catch(error=>{
            console.log('유저 정보를 가져오는데 실패했습니다.', error);
        })
}

function getDefaultAddress(defaultAddress) {
    console.log("defaultAddress: " + defaultAddress);
    const defaultAddressWrap = document.querySelector('.default-address-wrap');
    defaultAddressWrap.innerHTML = '';

    const defaultAddressHtml = `
        <p>배송주소록</p>
        <div class="address-info">
            <span>${defaultAddress['addressName']}</span> |
            <span>기본배송지</span><br>
            <span>${defaultAddress['phoneNumber']}</span><br>
            [<span>${defaultAddress['zipCode']}</span>]
            <span>${defaultAddress['mainAddress']}</span>
            <span>${defaultAddress['subAddress']}</span>
        </div>
    `

    defaultAddressWrap.insertAdjacentHTML('beforeend', defaultAddressHtml);
}

async function getAllAddressByUser() {
    console.log("getAllAddressByUser 메소드 호출");

    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    let defaultAddress;

    fetch('/api/address', {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('주소지 목록을 가져오는데 실패했습니다.');
        }
    })
    .then(data => {
        console.log('주소지 정보를 가져오는데 성공했습니다');
        console.log("주소지: " + data);
        renderAddressListData(data);
    })
    .catch(error => {
        console.error('주소지 정보를 가져오는데 실패했습니다.', error);
    });
}

function renderAddressListData(data) {
    console.log("renderAddressListData 호출");

    let defaultAddress;
    const addressListWrap = document.querySelector('.address-list-wrap');
    addressListWrap.innerHTML = '';

    data.forEach(address => {
        let isDefaultSpan;
        let defaultAddressBtn;

        if (address['default'] === true) {
            defaultAddress = address;
            isDefaultSpan = '| <span>기본배송지</span>';
            defaultAddressBtn = '';
        } else {
            isDefaultSpan = '';
            defaultAddressBtn = '<button class="set-default-address-btn" type="submit">기본 배송지로 설정</button>';
        }

        const addressItemHtml = `
            <div class="address-item-wrap">
                <div class="address-info">
                    <span id="address-id" style="display: none;">${address['id']}</span>
                    <span>${address['addressName']}</span>
                    ${isDefaultSpan}<br>
                    <span>${address['phoneNumber']}</span><br>
                    [<span>${address['zipCode']}</span>]
                    <span>${address['mainAddress']}</span>
                    <span>${address['subAddress']}</span>
                </div>
                <div class="address-item-button-wrap">
                    ${defaultAddressBtn}
                    <button class="edit-address-btn" type="submit">수정</button>
                    <button class="delete-address-btn" type="submit">삭제</button>
                </div>
            </div>
        `
        addressListWrap.insertAdjacentHTML('beforeend', addressItemHtml);
    })

    getDefaultAddress(defaultAddress);
    setDefaultAddress();
    deleteAddress();
    updateAddressListeners();
}


const editModal = document.querySelector('.edit-modal');
const editCloseBtn = document.querySelector('.edit-close');
const editSubmitBtn = document.querySelector('.edit-submit');
editCloseBtn.addEventListener('click', () => {
    editModal.style.display = "none";
});

editSubmitBtn.addEventListener('click', () => {
    console.log("edit-submit");

    const editAddress = {
        addressName: document.getElementById("editAddressName").value,
        phoneNumber: document.getElementById("editPhoneNumber").value,
        mainAddress: document.getElementById("editMainAddress").value,
        subAddress: document.getElementById("editSubAddress").value,
        zipCode: document.getElementById("editZipCode").value
    };
    console.log(editAddress);

    updateAddress(editAddressId, editAddress);

    editModal.style.display = "none";
});

async function updateAddress(addressId, editAddress) {
    const response = await fetch(`/api/address/${addressId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editAddress)
    })

    const findAddress = await response.json();
    console.log(findAddress.addressName);
    getAllAddressByUser();
}


let editAddressId;
async function updateAddressListeners(){
    const updateButtons = document.querySelectorAll(".edit-address-btn");
    updateButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const addressIdElement = button.closest('.address-item-wrap').querySelector('#address-id');
            editAddressId = addressIdElement.textContent;
            console.log("수정 클릭", editAddressId);
            editModal.style.display = "block";
        });
    });
}

async function addAddress(address){
    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    fetch("/api/address", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(address)
    })
    .then(response => {
        if (response.ok) {
            const createdAddress = response.json();
            console.log(createdAddress.addressName);
            console.log("주소지 등록에 성공했습니다");
            getAllAddressByUser();
            return response.json();
        } else {
            throw new Error('주소지 등록에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('주소지 등록에 실패했습니다.', error);
    });
}

async function setDefaultAddress() {
    const setDefaultAddressButtons = document.querySelectorAll(".set-default-address-btn");
    setDefaultAddressButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const jwtToken = localStorage.getItem("token");
            const headers = {
                'Content-Type': 'application/json'
            };
            if (jwtToken !== null){
                headers['Authorization'] = jwtToken;
            }

            const addressIdElement = button.closest('.address-item-wrap').querySelector('#address-id');
            const addressId = addressIdElement.textContent;

            console.log("setDefaultAddress 호출 : " + addressId);

            fetch(`/api/address/${addressId}/default`, {
                method: 'PUT',
                headers: headers
            })
            .then(response => {
                if (response.ok) {
                    console.log("기본 주소지 설정에 성공했습니다");
                    return response.json();
                } else {
                    throw new Error('기본 주소지 설정에 실패했습니다.');
                }
            })
            .catch(error => {
                console.error('기본 주소지 설정에 실패했습니다.', error);
            });
        });
    });

    getAllAddressByUser();
}


async function deleteAddress() {
    const deleteButtons = document.querySelectorAll(".delete-address-btn");

    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const jwtToken = localStorage.getItem("token");
            const headers = {
                'Content-Type': 'application/json'
            };
            if (jwtToken !== null){
                headers['Authorization'] = jwtToken;
            }

            const addressIdElement = button.closest('.address-item-wrap').querySelector('#address-id');
            const addressId = addressIdElement.textContent;

            fetch(`/api/address/${addressId}`, {
                method: 'DELETE',
                headers: headers
            })
            .then(response => {
            if (response.ok) {
                console.log("주소지 삭제에 성공했습니다");
                return response.json();
            } else {
                throw new Error('주소지 삭제에 실패했습니다.');
            }
            })
            .catch(error => {
                console.error('주소지 삭제에 실패했습니다.', error);
            });

            getAllAddressByUser();
        });
    });
}

function setEventListeners() {

    const addAddressBtn = document.querySelector(".add-address-btn");
    const addModal = document.querySelector(".add-modal");
    const editModal = document.querySelector('.edit-modal');
    const addCloseBtn = document.querySelector(".add-close");
    const editCloseBtn = document.querySelector(".edit-close");
    const addSubmitBtn = document.querySelector(".add-submit");

    addAddressBtn.addEventListener('click', () => {
        addModal.style.display = "block";
    });

    addCloseBtn.addEventListener('click', () => {
        addModal.style.display = "none";
    });

    editCloseBtn.addEventListener('click', () => {
        editModal.style.display = "none";
    });

    addSubmitBtn.addEventListener('click', () => {
        const address = {
            addressName: document.getElementById("addressName").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            mainAddress: document.getElementById("mainAddress").value,
            subAddress: document.getElementById("subAddress").value,
            zipCode: document.getElementById("zipCode").value
        }

        addAddress(address);
        addModal.style.display = "none";
    });
}

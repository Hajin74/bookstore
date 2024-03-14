document.addEventListener('DOMContentLoaded', () => {
    getAllAddressByUser();
    getDefaultAddress();
    setEventListeners();
});

async function getDefaultAddress() {
    console.log("getDefaultAddress 메소드 호출");

    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    const response = await fetch("/api/address/default", {headers});
    const responseData = await response.json();

    if (!responseData) {
        console.log("기본 주소지가 없습니다.");
        return;
    }

    if (response.ok) {
        console.log("기본 주소지 조회에 성공했습니다.");
        renderDefaultAddress(responseData);
    } else {
        console.error("기본 주소지 조회에 실패했습니다.");
    }
}

function renderDefaultAddress(defaultAddress) {
    console.log("renderDefaultAddress 메소드 호출");

    const defaultAddressWrap = document.querySelector(".default-address-wrap");
    defaultAddressWrap.innerHTML = '';

    const defaultAddressHtml = `
        <p>배송주소록</p>
        <div class="address-info">
            <span>기본배송지</span> |
            <span>${defaultAddress['addressName']}</span><br>
            <span>${defaultAddress['phoneNumber']}</span><br>
            [<span>${defaultAddress['zipCode']}</span>]
            <span>${defaultAddress['mainAddress']}</span>
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

    const response = await fetch("/api/address", {headers});
    if (response.ok) {
        const addressList = await response.json();
        console.log("주소지 조회에 성공했습니다.");
        renderAllAddressByUser(addressList);
    } else {
        console.error("주소지 조회에 실패했습니다.");
    }

    setDefaultAddress();
    updateAddressListeners();
    deleteAddress();
}

function renderAllAddressByUser(addressList) {
    const addressListWrap = document.querySelector('.address-list-wrap');
    addressListWrap.innerHTML = '';

    addressList.forEach(address => {
        let isDefaultSpan;
        let defaultAddressBtn;

        if (address['default'] === true) {
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
                </div>
                <div class="address-item-button-wrap">
                    ${defaultAddressBtn}
                    <button class="edit-address-btn" type="submit">수정</button>
                    <button class="delete-address-btn" type="submit">삭제</button>
                </div>
            </div>
        `
        addressListWrap.insertAdjacentHTML('beforeend', addressItemHtml);
    });
}

async function addAddress(address){
    console.log("addAddress 메소드 호출");

    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    const response = await fetch("/api/address", {method: 'POST', headers, body: JSON.stringify(address)});
    if (response.ok) {
        const createdAddress = await response.json();
        console.log("주소지가 생성되었습니다:", createdAddress);
    } else {
        console.error("주소지 생성에 실패했습니다.");
    }

    getAllAddressByUser();
}

async function deleteAddress() {
    const deleteButtons = document.querySelectorAll(".delete-address-btn");
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const addressIdElement = button.closest('.address-item-wrap').querySelector('#address-id');
            const addressId = addressIdElement.textContent;

            const jwtToken = localStorage.getItem("token");
            const headers = {
                'Content-Type': 'application/json'
            };
            if (jwtToken !== null){
                headers['Authorization'] = jwtToken;
            }

            const response = await fetch(`/api/address/${addressId}`, {method: 'DELETE', headers});
            if (response.ok) {
                console.log("주소지 삭제 성공");
            } else {
                console.error("주소지 삭제 실패");
            }

            getAllAddressByUser();
        });
    });
}

async function setDefaultAddress() {
    console.log("setDefaultAddress 메소드 호출");

    const setDefaultAddressButtons = document.querySelectorAll(".set-default-address-btn");
    setDefaultAddressButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const addressIdElement = button.closest('.address-item-wrap').querySelector('#address-id');
            const addressId = addressIdElement.textContent;

            const jwtToken = localStorage.getItem("token");
            const headers = {
                'Content-Type': 'application/json'
            };
            if (jwtToken !== null){
                headers['Authorization'] = jwtToken;
            }

            const response = await fetch(`/api/address/${addressId}/default`, {method: 'PUT', headers: headers});
            if (response.ok) {
                const defaultAddress = await response.json();
                console.log("기본 주소지 설정 성공:", defaultAddress);
                getDefaultAddress();
            } else {
                console.error("기본 주소지 설정 실패:", response.statusText);
            }

            getAllAddressByUser();
        });
    });
}

const editModal = document.querySelector('.edit-modal');
const editCloseBtn = document.querySelector('.edit-close');
const editSubmitBtn = document.querySelector('.edit-submit');

editCloseBtn.addEventListener('click', () => {
    editModal.style.display = "none";
});

editSubmitBtn.addEventListener('click', () => {
    console.log("edit-submit 버튼");

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
    console.log("updateAddress 메소드 호출");

    const jwtToken = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json'
    };
    if (jwtToken !== null){
        headers['Authorization'] = jwtToken;
    }

    const response = await fetch(`/api/address/${addressId}`, {method: 'PATCH', headers: headers, body: JSON.stringify(editAddress)});
    if (response.ok) {
        console.log("주소지 수정 성공:");
    } else {
        console.error("주소지 수정 실패:");
    }
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

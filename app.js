function inputValidation() {

    const nameInput = document.getElementById('inName');
    const addressInput = document.getElementById('inAddress');
    const phoneInput = document.getElementById('inPhone');
    const sexInput = document.querySelectorAll('input[type="radio"]');
    const dateInput = document.getElementById('inDate');
    const emailInput = document.getElementById('inEmail');

    const submitButton = document.querySelector('#signUp');

    submitButton.addEventListener("click", ()=> {
        console.log('submitted')
        let isValid = true;

        //HANDLE NAME
        //Delete head and tail spaces and split text into words
        let checkName = nameInput.value.trim().split(' ');
        let validWords = checkName.filter(word => word !== '');

        if (nameInput.value.trim() === '') {
            document.getElementById('inName').classList.add('highlight');
            document.getElementById('name_error').innerText = "*Họ tên chưa được điền";
            isValid = false;
        }
        
        else if (validWords.length < 2) {
            document.getElementById('inName').classList.add('highlight');
            document.getElementById('name_error').innerText = "*Họ và tên chưa hợp lệ";
            isValid = false;
        } 
        else {
            document.getElementById('name_error').innerText = "";
            document.getElementById('inName').classList.remove('highlight');
        }
        
        //HANDLE ADDRESS
        if (addressInput.value.trim() === '') {
            document.getElementById('inAddress').classList.add('highlight');
            document.getElementById('address_error').innerText = "*Địa chỉ chưa được điền";
            isValid = false;
        }
        else {
            document.getElementById('address_error').innerText = "";
            document.getElementById('inAddress').classList.remove('highlight');
        }

        //HANDLE PHONE NUM
        var phoneNum = parseFloat(phoneInput.value);
        const numFormat = /^0\d{9}$/;

        if (isNaN(phoneNum)) {
            document.getElementById('inPhone').classList.add('highlight');
            document.getElementById('phone_error').innerText = "*Số điện thoại nhập chưa hợp lệ";
            isValid = false;
        }

        if (phoneInput.value.trim() === '') {
            document.getElementById('inPhone').classList.add('highlight');
            document.getElementById('phone_error').innerText = "*Số điện thoại chưa được điền";
            isValid = false;
        }
        
        else if (numFormat.test(phoneInput.value.trim()) !== true) {
            document.getElementById('inPhone').classList.add('highlight');
            document.getElementById('phone_error').innerText = "*Số điện thoại nhập chưa hợp lệ";
            isValid = false;
        }
        else {
            document.getElementById('phone_error').innerText = "";
            document.getElementById('inPhone').classList.remove('highlight');
        }
        
        let isSelected = false;

        //HANDLE SEX BUTTON
        let selected;
        for (const selectedSex of sexInput) {
            if (selectedSex.checked) {
                selected = selectedSex.value;
                isSelected = true;
                break;
            }
        }

        if(!isSelected) {
            document.getElementById('male').classList.add('highlight_radio');
            document.getElementById('female').classList.add('highlight_radio');
            document.getElementById('sex_error').innerText = "*Giới tính chưa được chọn";
            isValid = false;
        } else {
            document.getElementById('male').classList.remove('highlight_radio');
            document.getElementById('female').classList.remove('highlight_radio');
            document.getElementById('sex_error').innerText = "";

        }

        //HANDLE DATE
        //Split the date format
        const inputD = new Date(dateInput.value)
        const curDate = new Date();

        console.log(dateInput);
        console.log(curDate);
        if (dateInput.value.trim() === '') {
            document.getElementById('inDate').classList.add('highlight');
            document.getElementById('date_error').innerText = "*Ngày giao hàng chưa được điền";
            isValid = false;
        }
        else if (inputD < curDate) {
            document.getElementById('inDate').classList.add('highlight');
            document.getElementById('date_error').innerText = "*Ngày giao hàng không thể trước ngày hiện tại";
            isValid = false;
        }
        else {
            document.getElementById('inDate').classList.remove('highlight');
            document.getElementById('date_error').innerText = "";
        }

        //HANDLE EMAIL
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailInput.value.trim() === '') {
            document.getElementById('inEmail').classList.add('highlight');
            document.getElementById('email_error').innerText = "*Email chưa được điền";
            isValid = false;
        }
        else if (emailFormat.test(emailInput.value.trim()) !== true) {
            document.getElementById('inEmail').classList.add('highlight');
            document.getElementById('email_error').innerText = "*Email nhập chưa hợp lệ";
            isValid = false;
        }
        else {
            document.getElementById('inEmail').classList.remove('highlight');
            document.getElementById('email_error').innerText = "";
        }







        if (!isValid) {
            console.log('Input failed');
            return;
        }

    })

    

}

// function selectAddProduct() {
//     const itemsAdd = document.querySelectorAll('.list_item');
//     const addButton = document.getElementById('add');
//     const addedList = document.querySelector('.list_container_selected');
//     const addAllButton = document.getElementById('addAll');

//     itemsAdd.forEach(item =>{
//         item.addEventListener("click", ()=> {
//             item.classList.toggle('highlight_item')
//             console.log(item);
//         })
//     })
//     addButton.addEventListener("click", () => {
//         itemsAdd.forEach(item =>{
//             if(item.classList.contains('highlight_item')) {
//                 item.classList.remove('list_item', 'highlight_item');
//                 item.classList.add('list_item_chose');
//                 addedList.appendChild(item);
//             }
//         })
//     })

//     addAllButton.addEventListener("click", () => {
//         itemsAdd.forEach(item =>{

//             item.classList.remove('list_item','highlight_item');
//             item.classList.add('list_item_chose');
//             addedList.appendChild(item);

//         })
//     })

//     removeProduct()

// }
// function removeProduct() {
//     const itemsAdd = document.querySelectorAll('.list_item_chose');

//     const returnList = document.querySelector('.list_container');
//     const putBackButton = document.getElementById('putBack');
//     const putBackAllButton = document.getElementById('putBackAll');

    
//     itemsAdd.forEach(item =>{
//         item.addEventListener("click", ()=> {

//             console.log(item.parentNode)
//             item.classList.toggle('highlight_item');

//             console.log(item);
//         })
//     })
//     putBackButton.addEventListener("click", () => {
//         itemsAdd.forEach(item =>{
            
//             if(item.classList.contains('highlight_item')) {
//                 item.classList.remove('list_item_chose', 'highlight_item');
//                 item.classList.add('list_item');

//                 returnList.appendChild(item);
//             }
//         })
//     })

//     putBackAllButton.addEventListener("click", () => {
//         itemsAdd.forEach(item =>{
//             returnList.appendChild(item);
//             item.classList.remove('list_item_chose', 'highlight_item');
//             item.classList.add('list_item');

//             returnList.appendChild(item);

//         })
//     })
// }

function selectAddProduct() {
    const itemsAdd = document.querySelectorAll('.list_item');
    const addButton = document.getElementById('add');
    const addedList = document.querySelector('.list_container_selected');
    const addAllButton = document.getElementById('addAll');

    //Select
    itemsAdd.forEach(item =>{
        item.addEventListener("click", ()=> {
            item.classList.toggle('highlight_item')
            console.log(item);
        })
    })


    addButton.addEventListener("click", () => {
        itemsAdd.forEach(item =>{
            if(item.classList.contains('highlight_item')) {
                item.classList.remove('list_item', 'highlight_item');
                item.classList.add('list_item_chose');
                addedList.appendChild(item.cloneNode(true));
                item.remove();
            }
        })
    })

    addAllButton.addEventListener("click", () => {
        itemsAdd.forEach(item =>{

            item.classList.remove('list_item','highlight_item');
            item.classList.add('list_item_chose');
            addedList.appendChild(item);

        })
    })

    removeProduct()

}
function removeProduct() {
    const itemsAdd = document.querySelectorAll('.list_item_chose');

    const returnList = document.querySelector('.list_container');
    const putBackButton = document.getElementById('putBack');
    const putBackAllButton = document.getElementById('putBackAll');

    
    itemsAdd.forEach(item =>{
        item.addEventListener("click", ()=> {

            console.log(item.parentNode)
            item.classList.toggle('highlight_item');

            console.log(item);
        })
    })
    putBackButton.addEventListener("click", () => {
        itemsAdd.forEach(item =>{
            
            if(item.classList.contains('highlight_item')) {
                item.classList.remove('list_item_chose', 'highlight_item');
                item.classList.add('list_item');

                returnList.appendChild(item.cloneNode(true));
                item.remove();

            }
        })
    })

    putBackAllButton.addEventListener("click", () => {
        itemsAdd.forEach(item =>{
            returnList.appendChild(item);
            item.classList.remove('list_item_chose', 'highlight_item');
            item.classList.add('list_item');

            returnList.appendChild(item);

        })
    })
}

//Side function
function hideNewsContent() {
    const showingButtons = document.querySelectorAll('.expanding');

    showingButtons.forEach(button => {
        button.addEventListener("click", () =>{
            console.log(button.parentNode)
            
            //Get the news data
            const content = button.closest(".side_item");
            const data = content.querySelector(".news_data");
            
            button.parentNode.classList.toggle('hidden_bar');
            //delete the expanded to hide
            button.parentNode.classList.remove('expanded');
            
            

            if (!button.parentNode.classList.contains('hidden_bar')) {
                button.parentNode.classList.add('expanded');
                button.innerText="⬇"


            } else {
                button.innerText="▶"
            }
        

            //Remove the hidden tag
            data.classList.toggle('hidden');
        })
    })
}

function showNewsContent() {
    const hidingButtons = document.querySelectorAll('.hiding');

    hidingButtons.forEach(button => {
        button.addEventListener("click", () =>{
            console.log(button.parentNode)
            
            //Get the news data
            const content = button.closest(".side_item");
            const data = content.querySelector(".news_data");
            
            //toggle expanded
            button.parentNode.classList.toggle('expanded');
            //if expanded then remove hidden
            data.classList.remove('hidden');

            //If not currently expanded then hide content
            if (!button.parentNode.classList.contains('expanded')) {
                data.classList.add('hidden');
                button.innerText="▶"


            } else {
                button.innerText="⬇"

            }
            
            
            
        })
    })
}


inputValidation();
selectAddProduct();
hideNewsContent();
showNewsContent();

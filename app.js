let gender;
function inputValidation() {
    const nameInput = document.getElementById('inName');
    const addressInput = document.getElementById('inAddress');
    const phoneInput = document.getElementById('inPhone');
    const sexInput = document.querySelectorAll('input[type="radio"]');
    const dateInput = document.getElementById('inDate');
    const emailInput = document.getElementById('inEmail');


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
    for (const selectedSex of sexInput) {
        if (selectedSex.checked) {
            gender = selectedSex.value;
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


    return isValid;

}


function formatDate(dateInput) {
    var selectedDate = new Date(dateInput.value);

    //Check if the date is valid
    if (!isNaN(selectedDate.getTime())) {
        //Extract day, month, and year
        let day = selectedDate.getDate();
        let month = selectedDate.getMonth() + 1;
        let year = selectedDate.getFullYear();

        console.log(day);
        console.log(month);
        console.log(year);

        //Ensure day and month are displayed with leading zeros if needed
        let formattedDay = (day < 10) ? "0" + day : day;
        let formattedMonth = (month < 10) ? "0" + month : month;
        //dd/mm/yyyy
        const formattedDate = formattedDay + "/" + formattedMonth + "/" + year;

        // Display the formatted date
        return formattedDate;
    }
    return;
}

function getOrderedList() {
    const orderedItems = document.querySelectorAll('.selected');
    //Array of ordered items
    const array = [];

    orderedItems.forEach((item, i) => {
        const itemNamePara = item.querySelector('p:nth-child(2)');
        const itemName = itemNamePara.innerText.trim();
        array.push(itemName);

    })
    let result;
    if (array.length <= 1) {
        return array;
    } else {
        result = array.join('; ');
        return result;
    }

}


function addNewData() {
    const name = document.getElementById('inName').value.trim();
    const address = document.getElementById('inAddress').value.trim();
    const sex = gender;
    const date = document.getElementById('inDate');
    const formattedDate = formatDate(date);

    const orderedList = getOrderedList();
    console.log(orderedList);
    if(orderedList.length === 0) {
        return;
    }

    const table = document.getElementsByClassName('table')[0];
    const tableBody = table.querySelector('tbody');

    console.log('Date', formattedDate)
    console.log('Gend', sex);

    var newRow = document.createElement("tr");
    //Init row data
    var rowData = [name, sex, address, formattedDate, orderedList]
    //
    for (var i = 0; i < rowData.length; i++) {
        var cell = document.createElement("td");
        //Add data
        cell.textContent = rowData[i];
        //Append to tr
        newRow.appendChild(cell);

    }

    tableBody.appendChild(newRow);

    //Clear data
    document.getElementById('inName').value='';
    document.getElementById('inAddress').value='';
    document.getElementById('inPhone').value='';
    const resetGen = document.querySelectorAll('input[type="radio"]');
    resetGen.forEach((button) => {
        button.checked = false;
    })



    document.getElementById('inDate').value='';
    document.getElementById('inEmail').value='';
    return;
}

function deleteAllOrder() {
    const removeAllOrderBtn = document.querySelector('#deleteAll');


    const orderTable = document.getElementsByClassName('table')[0];
    const tableBody = orderTable.querySelectorAll('tbody');


    removeAllOrderBtn.addEventListener("click", () =>{
        console.log('table', orderTable);
        tableBody.forEach(row => {
            row.remove();
        })
        
    })
    
}

function submission() {
    const submitButton = document.querySelector('#signUp');
    submitButton.addEventListener("click", ()=> {
        if (inputValidation()) {
            addNewData();
        } else {
            return;
        }
    })
    
}


function selectItem(item) {
    item.classList.toggle('highlight_item');
}


function addAndDelete() {
    const addButton = document.getElementById('add');
    const addAllButton = document.getElementById('addAll');
    const removeButton = document.getElementById('putBack');
    const removeAllButton = document.getElementById('putBackAll');

    
    addButton.addEventListener("click", () => {
        addSelected();
    })

    removeButton.addEventListener("click", () => {
        removeSelected();
    })

    addAllButton.addEventListener("click", ()=> {
        addAllList();
    })

    removeAllButton.addEventListener("click", () => {
        removeAllList();
    })



}

function addSelected() {
    const selected = document.querySelectorAll('.list_item.highlight_item');
    const chosedList = document.querySelector('.list_container_selected')

    selected.forEach((item) => {
        item.classList.remove('highlight_item');
        item.classList.add('selected');

        chosedList.appendChild(item.cloneNode(true));
        item.remove();

       

    });
   
}

function removeSelected() {
    const selected = document.querySelectorAll('.list_item.highlight_item');
    const returnList = document.querySelector('.list_container')

    selected.forEach((item) => {
        item.classList.remove('highlight_item');
        item.classList.remove('selected');

        returnList.appendChild(item.cloneNode(true));
        item.remove();
    });
}

function addAllList() {
    const selected = document.querySelectorAll('.list_container .list_item');
    const chosedList = document.querySelector('.list_container_selected')

    selected.forEach((item) => {
        item.classList.add('selected');

        chosedList.appendChild(item.cloneNode(true));
        item.remove();

       

    });
}

function removeAllList() {
    const selected = document.querySelectorAll('.list_container_selected .list_item');
    const returnList = document.querySelector('.list_container')

    selected.forEach((item) => {
        item.classList.remove('selected');
        returnList.appendChild(item.cloneNode(true));
        item.remove();

       

    });
}


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

let selectedNews;
function dragNews() {
    const allNews = document.querySelectorAll('.side_item');
    allNews.forEach((news) => {
        news.setAttribute('draggable', true);
    })
    window.onload = function() {
        allNews.forEach(news => {
            news.addEventListener('dragstart', onDragStart);
            news.addEventListener('dragover', onDragOver);
            news.addEventListener('dragend', onDragEnd);
            news.addEventListener('drop', onDragDrop);

        })
    }
}


function onDragStart(e) {
    console.log(e.target);
    selectedNews = e.target;
}

function onDragOver(e) {
    e.preventDefault();
    if (selectedNews !== e.target) {
        selectedNews.classList.add('thumb');
    }
}

function onDragEnd(e) {
    e.target.classList.remove('thumb');
    selectedNews.classList.remove('thumb');
}
function isValidDropNews(target, selectedNews) {
    return (target.classList.contains('side_item') || target.parentNode.classList.contains('side_item_header')
    || target.parentNode.classList.contains('side_item')) && target !== selectedNews;

}

function onDragDrop(e) {
    // e.preventDefault()
    console.log(e.target)

    let targetNode = e.target;
    while (true) {
        //If not the side item selected
        if (!targetNode.classList.contains('side_item')) {
            //Get the parentnode until meet side_item
            targetNode = targetNode.parentNode;
        } else {
            break;
        }
    }
    
    if (isValidDropNews(targetNode, selectedNews)) {
        targetNode.parentNode.insertBefore(selectedNews, targetNode);

    }
}


//Drag drop order item
function dragDropOrderItem() {
    const itemList = document.querySelectorAll('.list_item');
    itemList.forEach(item => {
        item.setAttribute('draggable',true);
    })
    window.onload = function() {
        itemList.forEach(item => {
            item.addEventListener('dragstart', onDragStart2);
            item.addEventListener('dragover', onDragOver2);
            item.addEventListener('dragend', onDragEnd2);
            item.addEventListener('drop', onDragDrop2);

        })
    }
    console.log(itemList);
}

let selectedDragItem;
function onDragStart2(e) {
    selectedDragItem = e.target;
    console.log(e.target);

}

function onDragOver2(e) {
    e.preventDefault();
    if (selectedDragItem !== e.target) {
        selectedDragItem.classList.add('thumb');
    }
}

function onDragEnd2(e) {
    e.target.classList.remove('thumb');
    selectedDragItem.classList.remove('thumb');
}


function onDragDrop2(e) {
    const list = document.querySelector('.list_container');
    const orderList = document.querySelector('.list_container_selected');
    
    let targetNode = e.target;
    while (true) {
        //If not the list item selected
        if (!targetNode.classList.contains('list_item')) {
            //Get the parentnode until meet class list_item
            targetNode = targetNode.parentNode;
        } else {
            break;
        }
    }

    console.log('targetNode', targetNode.parentNode)
    //Case move list_container to container_selected
    //No selected tag
    if (selectedDragItem.classList.contains('selected') === false
        && targetNode.parentNode.classList.contains('list_container_selected')
    ) {
        //Add the selected tag

        selectedDragItem.classList.remove('highlight_item');
        selectedDragItem.classList.add('selected');
        selectedDragItem.classList.remove('thumb');

        //Add to order list
        orderList.appendChild(selectedDragItem.cloneNode(true));
        console.log('return', orderList)

        selectedDragItem.remove();
    }
    else if (selectedDragItem.classList.contains('selected') === true
        && targetNode.parentNode.classList.contains('list_container')
    ) {
        selectedDragItem.classList.remove('highlight_item');
        selectedDragItem.classList.remove('selected');
        selectedDragItem.classList.remove('thumb');

        //Add to list
        list.appendChild(selectedDragItem.cloneNode(true));
        console.log('order', list)
        selectedDragItem.remove();
    }   
    e.preventDefault();
    e.stopPropagation();

}

function main() {
    submission();
    deleteAllOrder();
    addAndDelete();
    dragNews();
    hideNewsContent();
    showNewsContent();
    dragDropOrderItem();
}

main();


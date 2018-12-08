import {
    auth,
    callAPI
} from './modules/api.vk.js';

main();

// let fram = document.querySelector('.frame');
// fram.setAttribute('draggable', 'true');

function main() {
    let listAll      = document.querySelector('.listAll');
    let listSelected = document.querySelector('.listSelected');
    let saveButton   = document.querySelector('.saveButton');

    let leftInput    = document.querySelector('.leftInput');
    let rightInput   = document.querySelector('.rightInput');

    if (sessionStorage.allFriends == undefined) {
        initFunc(listAll, listSelected, saveButton, leftInput, rightInput);
    } else {
        saveButton.addEventListener('click', () => {
            storageFunction(listAll, listSelected);
        });

        addingFriendFromLocalAll(listAll, sessionStorage.allFriends);
        addingFriendFromLocalAll(listSelected, sessionStorage.selectedFriends);
        
        //filter allfriends
        let allFriends  = [];

        for (let i = 0; i < listAll.children.length; i++) {
            allFriends.push(listAll.children[i]);
        }

        leftInput.addEventListener('keyup', () => {
            isMatching(leftInput, listAll, allFriends);
        });

        //filter selected friends
        let selectedFriends  = [];

        for (let i = 0; i < listSelected.children.length; i++) {
            selectedFriends.push(listSelected.children[i]);
        }

        rightInput.addEventListener('keyup', () => {
            isMatching(rightInput, listSelected, selectedFriends);
        });

    }

    listAll.addEventListener('click', moveFriend);
    listSelected.addEventListener('click', returnFriend);
}

async function initFunc(listAll, listSelected, saveButton, leftInput, rightInput) {
    VK.init({ apiId: 6774126 });
    await auth();

    let data = await callAPI('friends.get', {'fields': 'first_name, last_name, photo_100'});
    let allFriends = data.items;

    addingFriend(allFriends, listAll);

    saveButton.addEventListener('click', () => {
        storageFunction(listAll, listSelected);
    });

    // //filter
    // let allInitFriends  = [];

    // for (let i = 0; i < listAll.children.length; i++) {
    //     allInitFriends.push(listAll.children[i]);
    // }

    // leftInput.addEventListener('keyup', () => {
    //     isMatching(leftInput, listAll, allInitFriends);
    // });

    // //filter selected friends
    // let selectedFriends  = [];

    // for (let i = 0; i < listSelected.children.length; i++) {
    //     selectedFriends.push(listSelected.children[i]);
    // }

    // rightInput.addEventListener('keyup', () => {
    //     isMatching(rightInput, listSelected, selectedFriends);
    // });
}

function addingFriend(arrFriends, list) {
    for (let i = 0; i < arrFriends.length; i++) {
        let friend       = document.createElement('div');
        let imageAndName = document.createElement('div');
        let image        = document.createElement('div');
        let name         = document.createElement('div');
        let add          = document.createElement('div');

        friend.classList.add('friend');
        friend.setAttribute('data-first_name', `${arrFriends[i].first_name}`);
        friend.setAttribute('data-last_name', `${arrFriends[i].last_name}`);
        friend.setAttribute('data-photo_100', `${arrFriends[i].photo_100}`);
        friend.setAttribute('draggable', 'true');

        imageAndName.classList.add('imageAndName');
        image.classList.add('image');
        name.classList.add('name');
        add.classList.add('add');

        name.textContent    = `${arrFriends[i].first_name} ${arrFriends[i].last_name}`;
        image.style.cssText = `background-image: url(${arrFriends[i].photo_100});`;
        imageAndName.appendChild(image);
        imageAndName.appendChild(name);
        friend.appendChild(imageAndName);
        friend.appendChild(add);
        list.appendChild(friend);
    }
}

function addingFriendFromLocalAll(list, storage) {
    let arrFriends = JSON.parse(storage);

    for (let i = 0; i < arrFriends.length; i++) {
        let friend       = document.createElement('div');
        let imageAndName = document.createElement('div');
        let image        = document.createElement('div');
        let name         = document.createElement('div');
        let add          = document.createElement('div');

        friend.classList.add('friend');
        friend.setAttribute('data-first_name', `${arrFriends[i].first_name}`);
        friend.setAttribute('data-last_name', `${arrFriends[i].last_name}`);
        friend.setAttribute('data-photo_100', `${arrFriends[i].photo_100}`);
        friend.setAttribute('data-photo_100', `${arrFriends[i].photo_100}`);
        friend.setAttribute('draggable', 'true');

        imageAndName.classList.add('imageAndName');
        image.classList.add('image');
        name.classList.add('name');
        add.classList.add('add');

        name.textContent    = `${arrFriends[i].first_name} ${arrFriends[i].last_name}`;
        image.style.cssText = `background-image: url(${arrFriends[i].photo_100});`;
        imageAndName.appendChild(image);
        imageAndName.appendChild(name);
        friend.appendChild(imageAndName);
        friend.appendChild(add);
        list.appendChild(friend);
    }
}

function moveFriend() {
    let listSelected = document.querySelector('.listSelected');

    if (event.target.classList.contains('add')) {
        let selectedFriend = event.target.parentNode;
        listSelected.appendChild(selectedFriend);
    }
}

function returnFriend() {
    let listAll = document.querySelector('.listAll');

    if (event.target.classList.contains('add')) {
        let selectedFriend = event.target.parentNode;
        listAll.appendChild(selectedFriend);
    }
}

//обновление данных в SessionStorage
function storageFunction(leftList, rightList) {
    let allStorageFriends = [];

    for (let i = 0; i < leftList.children.length; i++) {
        let tempObj = {};
        tempObj.first_name = leftList.children[i].getAttribute('data-first_name');
        tempObj.last_name = leftList.children[i].getAttribute('data-last_name');
        tempObj.photo_100 = leftList.children[i].getAttribute('data-photo_100');
        allStorageFriends.push(tempObj);
    }

    sessionStorage.allFriends = JSON.stringify(allStorageFriends);

    let selectedStorageFriends = [];

    for (let i = 0; i < rightList.children.length; i++) {
        let tempObj = {};
        tempObj.first_name = rightList.children[i].getAttribute('data-first_name');
        tempObj.last_name = rightList.children[i].getAttribute('data-last_name');
        tempObj.photo_100 = rightList.children[i].getAttribute('data-photo_100');
        selectedStorageFriends.push(tempObj);
    }
    sessionStorage.selectedFriends = JSON.stringify(selectedStorageFriends);
}

// function createInitFriedsList(storage) {
//     let arrFriends = JSON.parse(storage);
//     let tagsArrFriends = [];

//     for (let i = 0; i < arrFriends.length; i++) {
//         let friend       = document.createElement('div');
//         let imageAndName = document.createElement('div');
//         let image        = document.createElement('div');
//         let name         = document.createElement('div');
//         let add          = document.createElement('div');

//         friend.classList.add('friend');
//         friend.setAttribute('data-first_name', `${arrFriends[i].first_name}`);
//         friend.setAttribute('data-last_name', `${arrFriends[i].last_name}`);
//         friend.setAttribute('data-photo_100', `${arrFriends[i].photo_100}`);

//         imageAndName.classList.add('imageAndName');
//         image.classList.add('image');
//         name.classList.add('name');
//         add.classList.add('add');

//         name.textContent    = `${arrFriends[i].first_name} ${arrFriends[i].last_name}`;
//         image.style.cssText = `background-image: url(${arrFriends[i].photo_100});`;
//         imageAndName.appendChild(image);
//         imageAndName.appendChild(name);
//         friend.appendChild(imageAndName);
//         friend.appendChild(add);
//         tagsArrFriends.push(friend);
//     }
// }

//Реализация фильтрации
function isMatching(input, list, friends) {
    
    let filterValue = input.value.toUpperCase();

    if (filterValue == '') {
        list.innerHTML = '';
        for (let i = 0; i < friends.length; i++) {
            list.appendChild(friends[i]);
        }
        return;
    }

    let someFriends = [];

    for (let i = 0; i < list.children.length; i++) {
        let fullName = `${list.children[i].getAttribute('data-first_name')} ${list.children[i].getAttribute('data-last_name')}`;
        
        fullName = fullName.toUpperCase();
        
        if (filterValue === '') {
            list.innerHTML = '';
            for (let i = 0; i < friends.length; i++) {
                list.appendChild(friends[i]);
            }
            return;
        } 

        if (fullName.indexOf(filterValue) !== -1) {
            someFriends.push(list.children[i]);
        }  
    }

    console.log(someFriends);

    if (someFriends.length !== 0) {
        list.innerHTML = '';
        for (let i = 0; i < someFriends.length; i++) {
            list.appendChild(someFriends[i]);
        }
    }
};
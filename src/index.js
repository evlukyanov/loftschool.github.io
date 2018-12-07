import {
    auth,
    callAPI
} from './modules/api.vk.js';

VK.init({
    apiId: 6774126
});

let listAll = document.querySelector('.listAll');

if (sessionStorage.allFriends == undefined) {
    auth()
        .then(() => {
            return callAPI('friends.get', { fields: 'first_name, last_name, photo_100' });
        })
        .then(data => {
            let friendsList = data.items;  
            listAll.addEventListener('click', moveFriend);
            let list = saveSession(friendsList);
            addingFriend(list, listAll);
        });
} else {
    listAll.addEventListener('click', moveFriend);
    let saveListFriends = JSON.parse(sessionStorage.allFriends)
    addingFriend(saveListFriends, listAll);
}



function addingFriend(arrFriends, list) {

    for (let i = 0; i < arrFriends.length; i++) {
        let friend       = document.createElement('div');
        let imageAndName = document.createElement('div');
        let image        = document.createElement('div');
        let name         = document.createElement('div');
        let add          = document.createElement('div');

        friend.classList.add('friend');
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

function saveSession(list) {
    let friendList = [];
    for (let i = 0; i < list.length; i++) {
        let tempObj = {};
        tempObj.first_name = list[i].first_name;
        tempObj.last_name = list[i].last_name;
        tempObj.photo_100 = list[i].photo_100;
        friendList.push(tempObj);
    }
    sessionStorage.allFriends = JSON.stringify(friendList);
    return friendList;
}

function moveFriend(list) {
    let listSelected = document.querySelector('.listSelected');

    if (event.target.classList.contains('add')) {
        let selectedFriend = event.target.parentNode;
        listSelected.appendChild(selectedFriend);
    }
}
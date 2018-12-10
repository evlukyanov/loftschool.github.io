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

function moveFriend(leftFriends, rightFriends) {
    let listSelected = document.querySelector('.listSelected');

    if (event.target.classList.contains('add')) {
        let selectedFriend = event.target.parentNode;
        listSelected.appendChild(selectedFriend);
        rightFriends.push(selectedFriend);

        for (let i = 0; i < leftFriends.length; i++) {
            if (leftFriends[i] == selectedFriend) {
                leftFriends.splice(i, 1);
            }
            
        }
    }
}

function returnFriend(leftFriends, rightFriends) {
    let listAll = document.querySelector('.listAll');

    if (event.target.classList.contains('add')) {
        let selectedFriend = event.target.parentNode;
        listAll.appendChild(selectedFriend);
        leftFriends.push(selectedFriend);

        for (let i = 0; i < rightFriends.length; i++) {
            if (rightFriends[i] == selectedFriend) {
                rightFriends.splice(i, 1);
            }
            
        }
    }
}

export {
    addingFriend,
    addingFriendFromLocalAll,
    moveFriend,
    returnFriend
};
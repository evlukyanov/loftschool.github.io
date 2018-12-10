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

export {
    storageFunction
};
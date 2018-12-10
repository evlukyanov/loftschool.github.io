import {
    auth,
    callAPI,
} from './modules/api.vk.js';

import {
    addingFriend,
    addingFriendFromLocalAll,
    moveFriend,
    returnFriend
} from './modules/friends.js';

import {
    makeDnDInit
} from './modules/dnd.js';

import {
    storageFunction
} from './modules/storage.js';

import {
    isMatchingInit
} from './modules/matching.js';

main();

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

        let allInitFriends  = [];
        let selectedFriends  = [];

        for (let i = 0; i < listAll.children.length; i++) {
            allInitFriends.push(listAll.children[i]);
        }

        for (let i = 0; i < listSelected.children.length; i++) {
            selectedFriends.push(listSelected.children[i]);
        }

        leftInput.addEventListener('keyup', () => {
            isMatchingInit(leftInput, listAll, allInitFriends);
        });

        rightInput.addEventListener('keyup', () => {
            isMatchingInit(rightInput, listSelected, selectedFriends);
        });

        listAll.addEventListener('click', () => {
            moveFriend(allInitFriends, selectedFriends);
        });

        listSelected.addEventListener('click', () => {
            returnFriend(allInitFriends, selectedFriends);
        });

        makeDnDInit([listAll, listSelected], listAll, listSelected, allInitFriends, selectedFriends);
    }
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

    let allInitFriends  = [];
    let selectedFriends  = [];

    for (let i = 0; i < listAll.children.length; i++) {
        allInitFriends.push(listAll.children[i]);
    }

    leftInput.addEventListener('keyup', () => {
        isMatchingInit(leftInput, listAll, allInitFriends);
    });

    rightInput.addEventListener('keyup', () => {
        isMatchingInit(rightInput, listSelected, selectedFriends);
    });

    listAll.addEventListener('click', () => {
        moveFriend(allInitFriends, selectedFriends);
    });

    listSelected.addEventListener('click', () => {
        returnFriend(allInitFriends, selectedFriends);
    });

    makeDnDInit([listAll, listSelected], listAll, listSelected, allInitFriends, selectedFriends);
}
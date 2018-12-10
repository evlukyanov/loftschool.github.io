function isMatchingInit(input, list, friends) {
    let filterValue = input.value.toUpperCase();

    if (filterValue == '') {
        list.innerHTML = '';
        for (let i = 0; i < friends.length; i++) {
            list.appendChild(friends[i]);
        }
        return;
    }

    let someFriends = [];

    for (let i = 0; i < friends.length; i++) {
        let fullName = `${friends[i].getAttribute('data-first_name')} ${friends[i].getAttribute('data-last_name')}`;
        
        fullName = fullName.toUpperCase();

        if (fullName.indexOf(filterValue) !== -1) {
            someFriends.push(friends[i]);
        }  
    }

    if (someFriends.length !== 0) {
        list.innerHTML = '';
        for (let i = 0; i < someFriends.length; i++) {
            list.appendChild(someFriends[i]);
        }
    }
};

export {
    isMatchingInit
};
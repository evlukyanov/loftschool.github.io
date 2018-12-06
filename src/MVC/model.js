module.exports = class {
    constructor(api) {
        this.apiVK = api;
    }

    get user() {
        return this.apiVK.callApi('users.get', {fields: 'photo_100'}).then(response => response);
    }

    get friends() {
        return this.apiVK.callApi('friends.get', {fields: 'first_name, last_name, photo_100'}).then(response => response);
    }
}
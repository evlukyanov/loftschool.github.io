const VK    = require('./modules/api.vk');
const Model = require('./MVC/model');

const apiVK = new VK(6774126, 2);
const model = new Model(apiVK);

console.log(model.friends);
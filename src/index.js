import { resolve } from "dns";
import { rejects } from "assert";

/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  var seconds = 5000;
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve();
      }, seconds);
  });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', () => {
        if (xhr.status >= 400) {
            reject();
        } else {
            var sortCityes = sortObj(xhr.response);
            resolve(sortCityes);
        }
    });

    xhr.addEventListener('error', reject);
    xhr.addEventListener('abort', reject);
});

function sortObj(obj) {
    obj.sort(compareName);
    return obj;
}

function compareName(cityA, cityB) {
    if (cityA.name > cityB.name) return 1;
    if (cityA.name < cityB.name) return -1;
}
}

export {
    delayPromise,
    loadAndSortTowns
};

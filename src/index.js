/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let index = 0; index < array.length; index++) {
    fn(array[index], index, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  var newArray = [];
  var temp;

  for (let index = 0; index < array.length; index++) {
    temp = fn(array[index], index, array);
    newArray.push(temp);
  }

  return newArray;
}



/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  var init = initial || array[0],
      i = initial ? 0 : 1;

  for (; i < array.length; i++) {
      init = fn(init, array[i], i, array);
  }

  return init;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  var arr = [];

  for (var key in obj) {
    key = key.toUpperCase();
    arr.push(key);
  }

  return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
  var newArr = [];
  if (to >= array.length || to === undefined) {
      to = array.length;
  };

  if (from < 0) {
      from = 0;
  };


  if (to < 0) {
      to = array.length + to;
  };

  for (var i = from; i < to; i++){
      newArr.push(arr[i]);
  };

  return newArr;
}



/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};

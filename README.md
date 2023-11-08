# Частичная реализация EventEmitter

Реализован класс MyEventEmitter, задача которого - повторить поведение стандартного класса EventEmitter. Разработан в учебных целях.

## Методы класса

### `.on(event, fn)`

Добавляет слушателя `fn` на событие `event`.

### `.off(event, fn)`

Убирает слушателя `fn` с события `event` (не работает для слушателей, добавленных с помощью метода `.on(event, fn)`).

### `.once(event, fn)`

Добавляет слушателя `fn` на событие `event`. Обработчик сработает только один раз.

### `.delete(event)`

Удаляет все обработчики для события `event`.

### `.emit(event[, ...args])`

Вызывает все обработчики для события `event`.

## Пример использования

```javascript
const myEventEmitter = new MyEventEmitter();
myEventEmitter.on("hi", (name) => console.log("Hello,", name));
myEventEmitter.once("hi", (name) => console.log("Hello once again,", name));
myEventEmitter.emit("hi", "Ivan");

myEventEmitter.on("hi", (firstName, lastName) =>
  console.log("Hello there,", firstName, lastName)
);
myEventEmitter.emit("hi", "Ivan", "Ivanov");

// output:
//    Hello, Ivan
//    Hello once again, Ivan
//    Hello, Ivan
//    Hello there, Ivan Ivanov
```

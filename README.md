# Simple Lazyload - простая отложенная загрузка изображений и блоков

## Инициализация

```js
(function(){
    class owSimpleLazyload{
      //compress code............
    }
        
    // Инициализируем общую отложенную загрузку для изображений
    const imageObserver = new owSimpleLazyload();
    imageObserver.init();
    
    // Добавляем отслеживание для определенного блока
    const instagramObserver = new owSimpleLazyload();
    instagramObserver.IO.observe(document.querySelector('#instagram'));
})();
```

### callback

Можно добавить функционал, отрабатывающий после появления блока

```js
const instagramObserver = new owSimpleLazyload((el) => console.log(el));
```

## Настройка шаблона

< img >

```html
<img src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" data-lazyload="/images/01.webp" >
```

Если используется **background-image**

```html
<a href="#" data-lazyload="/images/01.webp" style="background-image: url('data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=')"></a>
```
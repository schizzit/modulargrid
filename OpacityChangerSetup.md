# Основные настройки #
Все настройки изменения прозрачности задаются как свойства объекта `opacity` в объекте настройки:
```
ModularGrid.init(
   {
      opacity: {...}
   }
);
```

Начальное значение степени прозрачности задаётся числом `opacity.opacity`. Возможные значения параметра - от 0 (абсолютно прозрачное) до 1 (абсолютно непрозрачное).

Шаг изменения степени прозрачности задаётся числом `opacity.opacityStep`. Возможные значения параметра - от 0 до 1.

# Дополнительные настройки #
```
/**
 * Функция вызывается каждый раз при нажатии клавиш в браузере.
 * @param {Object} params информация о нажатой комбинации клавиш (params.ctrlKey, params.altKey, params.keyCode)
 * @return {Boolean} true, если нужно сделать изображение менее прозрачным на opacityStep процентов
 */
shouldStepUpOpacity:
   function (params) {
      // Ctrl + ]
      var result = (params.ctrlKey && params.keyCode == 221);
      return result;
   },

/**
 * Функция вызывается каждый раз при нажатии клавиш в браузере.
 * @param {Object} params информация о нажатой комбинации клавиш (params.ctrlKey, params.altKey, params.keyCode)
 * @return {Boolean} true, если нужно сделать изображение более прозрачным на opacityStep процентов
 */
shouldStepDownOpacity:
   function (params) {
      // Ctrl + [
      var result = (params.ctrlKey && params.keyCode == 219);
      return result;
   }
```
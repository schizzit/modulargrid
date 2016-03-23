# Настройка вертикальной модульной сетки #
Все настройки вертикальной модульной сетки задаются как свойства объекта `grid` в объекте настройки:
```
ModularGrid.init(
   {
      grid: {...}
   }
);
```

## Алгоритм (Как задать настройки?) ##
  1. Задайте высоту модуля в расстояниях между линиями шрифтовой сетки (параметр `grid.lineHeight`) значением параметра `grid.hDivisions`
  1. Если нужен отступ относительно левого края рабочей области браузера установите значение `grid.marginLeft` (возможные значения аналогичны значениям CSS-свойства `margin-left`
  1. Если нужен отступ относительно правого края рабочей области браузера установите значение `grid.marginRight` (возможные значения аналогичны значениям CSS-свойства `margin-right`
  1. Если нужен отступ относительно верхнего края рабочей области браузера установите значение `grid.marginTop` в пикселах

## Пример ##
```
ModularGrid.init(
   {
      grid: {
            lineHeight: 32,
            hDivisions: 3
      }
   }
);
```

Создаст горизонтальные модули высотой в три строки (96 пикселов).

![http://modulargrid.googlecode.com/svn/trunk/demo/images/horizontal-grid.png](http://modulargrid.googlecode.com/svn/trunk/demo/images/horizontal-grid.png)

# Другие настройки #
```
shouldToggleHorizontalGridVisibility:
	function (params) {
		// Ctrl + Alt + h
		// показать/скрыть горизонтальные элементы сетки (строки)
		var result = (params.ctrlKey && params.altKey && params.keyCode == 72 );
		return result;
	},

'z-index': 255,

/**
 * Цвет фона колонок и строк модульной сетки.
 * Цвет линий шрифтовой сетки задаётся отдельно.
 * @see lineColor
 * @type String
 */
color: "#F00"
```
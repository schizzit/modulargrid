# Настройка шрифтовой сетки #
Все настройки направляющих задаются как  свойства объекта `grid` в объекте настройки:
```
ModularGrid.init(
   {
      grid: {...}
   }
);
```

Расстояние между линиями шрифтовой сетки задаётся в пикселах свойством `grid.lineHeight`. Линия шрифтовой сетки рисуется на `grid.lineHeight` + 1 пикселе.

Стиль линий шрифтовой сетки задаётся свойством `grid.lineStyle`. Значения этого свойства аналогичны значениям CSS-свойства `border-style`.

Толщина линий шрифтовой сетки задаётся свойством `grid.lineWidth`. Значения этого свойства аналогичны значениям CSS-свойства `border-width`.

Цвет линий шрифтовой сетки задаётся свойством `grid.lineColor`. Значения этого свойства аналогичны значениям CSS-свойства `border-color`.

`z-index` линий шрифтовой сетки задаётся одним значением с модульной сеткой - `grid.z-index`.

Прозрачность линий шрифтовой сетки задаётся [общими настройками прозрачности сетки и изображения макета](http://code.google.com/p/modulargrid/wiki/OpacityChangerSetup).

## Пример ##
```
ModularGrid.init(
   {
      grid: {
            lineHeight: 32
      }
   }
);
```

Создаст шрифтовую сетку высотой 32 пиксела: на каждем 33-ем пикселе по вертикали будет нарисована горизонтальная линия.

![http://modulargrid.googlecode.com/svn/trunk/demo/images/font-grid.png](http://modulargrid.googlecode.com/svn/trunk/demo/images/font-grid.png)

## Другие настройки ##
```
shouldToggleFontGridVisibility:
	function (params) {
		// Ctrl + Alt + f
		// показать/скрыть шрифтовую сетку
		var result = (params.ctrlKey && params.altKey && params.keyCode == 70 );
		return result;
	}
```
/** @include "index.js" */

ModularGrid.Image.defaults = {
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
		},
	/**
	 * Функция вызывается каждый раз при нажатии клавиш в браузере.
	 * @param {Object} params информация о нажатой комбинации клавиш (params.ctrlKey, params.altKey, params.keyCode)
	 * @return {Boolean} true, если нужно показать/скрыть изображение
	 */
	shouldToggleVisibility:
		function (params) {
			// Ctrl + \
			var result = (params.ctrlKey && params.keyCode == 220);
			return result;
		},

	/**
	 * Значения CSS-свойства z-index HTML-контейнера изображения
	 * @type Number
	 */
	'z-index': 255,

	/**
	 * Начальное значение прозрачности изображения от 0 до 1 (0 - абсолютно прозрачное, 1 - абсолютно непрозрачное)
	 * @type Number
	 */
	opacity: 0.85,
	/**
	 * Шаг изменения значения прозрачности для изображения от 0 до 1
	 * @type Number
	 */
	opacityStep: 0.05,

	/**
	 * Центрировать ли изображение относительно рабочей области браузера
	 * @type Boolean
	 */
	centered: false,

	/**
	 * Отступ от верхнего края рабочей области браузера до изображения в пикселах
	 * @type Number
	 */
	marginTop: 0,
	/**
	 * Отступ от левого края рабочей области браузера до изображения.
	 * Возможные значения аналогичны значениям CSS-свойства margin-left
	 * @type Number
	 */
	marginLeft: '0px',
	/**
	 * Отступ от правого края рабочей области браузера до изображения.
	 * Возможные значения аналогичны значениям CSS-свойства margin-left
	 * @type Number
	 */
	marginRight: '0px',

	/**
	 * URL файла изображения
	 * @type String
	 */
	src: '',

	/**
	 * Ширина изображения в пикселах
	 * @type Number
	 */
	width: 100,
	/**
	 * Высота изображения в пикселах
	 * @type Number
	 */
	height: 100
};
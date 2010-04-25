/**
 * @include "namespace.js"
 * @include "Utils/index.js"
 * @include "Grid/index.js"
 * @include "Guides/index.js"
 * @include "Resizer/index.js"
 */

ModularGrid.keyDownEventProvider = null;

/**
 * Возвращает обертку для отлова события нажатия клавиш
 * @private
 * @return {ModularGrid.Utils.EventProvider} для события нажатия клавиш
 */
ModularGrid.getKeyDownEventProvider = function () {
	if ( this.keyDownEventProvider == null ) {
		this.keyDownEventProvider =
			new ModularGrid.Utils.EventProvider(
				'keydown',
				function (event) {
					var keyboardEvent = ( window.event ? window.event : event );
					var keyCode = (keyboardEvent.keyCode ? keyboardEvent.keyCode : (keyboardEvent.which ? keyboardEvent.which : null));

					return {
						keyCode: keyCode,

						altKey: keyboardEvent.altKey,
						shiftKey: keyboardEvent.shiftKey,
						ctrlKey: keyboardEvent.ctrlKey,

						event: keyboardEvent
					};
				}
			);
	};

	return this.keyDownEventProvider;
};

/**
 * Устанавливает настройки модульной сетки и ставит обработчики событий для показа сетки
 * @param {Object} params параметры инициализации
 */
ModularGrid.init = function (params) {
	var self = this;

	// изображение
	this.Image.init(params.image);
	var imageStateChanger =
		new ModularGrid.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.Image.params.shouldToggleVisibility,
			function () {
				self.Image.toggleVisibility();
			}
		);
	var imageOpacityUpChanger =
		new ModularGrid.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.Image.params.shouldStepUpOpacity,
			function () {
				self.Image.stepUpOpacity();
			}
		);
	var imageOpacityDownChanger =
		new ModularGrid.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.Image.params.shouldStepDownOpacity,
			function () {
				self.Image.stepDownOpacity();
			}
		);

	// гайды
	this.Guides.init(params.guides);
	var guidesStateChanger =
		new ModularGrid.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.Guides.params.shouldToggleVisibility,
			function () {
				self.Guides.toggleVisibility();
			}
		);

	// сетка
	this.Grid.init(params.grid);
	var gridStateChanger =
		new ModularGrid.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.Grid.params.shouldToggleVisibility,
			function () {
				self.Grid.toggleVisibility();
			}
		);

	var gridFontGridVisibilityChanger =
		new ModularGrid.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.Grid.params.shouldToggleFontGridVisibility,
			function () {
				self.Grid.toggleFontGridVisibility();
			}
		);

	var gridHorizontalGridVisibilityChanger =
		new ModularGrid.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.Grid.params.shouldToggleHorizontalGridVisibility,
			function () {
				self.Grid.toggleHorizontalGridVisibility();
			}
		);

	var gridVerticalGridVisibilityChanger =
		new ModularGrid.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.Grid.params.shouldToggleVerticalGridVisibility,
			function () {
				self.Grid.toggleVerticalGridVisibility();
			}
		);

	// resizer
	this.Resizer.init(params.resizer, this.Grid);
	var resizerSizeChanger =
		new ModularGrid.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.Resizer.params.shouldToggleSize,
			function () {
				self.Resizer.toggleSize();
			}
		);
};
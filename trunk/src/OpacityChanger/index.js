ModularGrid.OpacityChanger.params = null;

/** @type Array */
ModularGrid.OpacityChanger.handlers = null;

/**
 * Устанавливает настройки для гайдов
 *
 * @param {Object}
 *            params параметры гайдов
 */
ModularGrid.OpacityChanger.init = function(params) {
	this.params = ModularGrid.Utils.createParams(this.defaults, params);
	this.handlers = [];
};

ModularGrid.OpacityChanger.setOpacity = function(value) {
	this.params.opacity = value;
	this.params.opacity = (this.params.opacity < 0 ? 0.0 : this.params.opacity);
	this.params.opacity = (this.params.opacity > 1 ? 1.0 : this.params.opacity);

	this.updateOpacity(this.params.opacity);

	return this.params.opacity;
};

ModularGrid.OpacityChanger.stepDownOpacity = function() {
	return this.setOpacity(this.params.opacity - this.params.opacityStep);
};

ModularGrid.OpacityChanger.stepUpOpacity = function() {
	return this.setOpacity(this.params.opacity + this.params.opacityStep);
};

ModularGrid.OpacityChanger.addHandler = function (handler) {
	this.handlers[this.handlers.length] = handler;
};

ModularGrid.OpacityChanger.updateOpacity = function(opacity) {
	for(var i = 0, length = this.handlers.length; i < length; i++)
		this.handlers[i]();
};

ModularGrid.OpacityChanger.changeElementOpacity = function (element) {
	if (element)
		element.style.opacity = this.params.opacity;
};
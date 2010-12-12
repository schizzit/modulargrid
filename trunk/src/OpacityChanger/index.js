ModularGrid.OpacityChanger = {

	params: null,

	/** @type Array */
	handlers: null,

	/**
	 * Устанавливает настройки для гайдов
	 *
	 * @param {Object}
	 *            params параметры гайдов
	 */
	init: function(params) {
		this.params = ModularGrid.Utils.createParams(this.defaults, params);
		this.handlers = [];
	},

	setOpacity: function(value) {
		this.params.opacity = value;
		this.params.opacity = (this.params.opacity < 0 ? 0.0 : this.params.opacity);
		this.params.opacity = (this.params.opacity > 1 ? 1.0 : this.params.opacity);

		this.updateOpacity(this.params.opacity);

		return this.params.opacity;
	},

	stepDownOpacity: function() {
		return this.setOpacity(this.params.opacity - this.params.opacityStep);
	},

	stepUpOpacity: function() {
		return this.setOpacity(this.params.opacity + this.params.opacityStep);
	},

	addHandler: function (handler) {
		this.handlers[this.handlers.length] = handler;
	},

	updateOpacity: function(opacity) {
		for(var i = 0, length = this.handlers.length; i < length; i++)
			this.handlers[i]();
	},

	changeElementOpacity: function (element) {
		if (element)
			element.style.opacity = this.params.opacity;
	}
};
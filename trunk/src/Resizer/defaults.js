/** @include "index.js */

ModularGrid.Resizer.defaults = {
	shouldToggleSize:
		function (params) {
			var result = (params.ctrlKey && params.altKey && params.keyCode == 82);
			return result;
		},

	changeTitle: true,

	sizes: []
};
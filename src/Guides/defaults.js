/** @include "index.js */

ModularGrid.Guides.defaults = {
	shouldToggleVisibility:
		function (params) {
			var result = (params.ctrlKey && (params.keyCode == 59 || params.keyCode == 186));
			return result;
		},

	lineStyle: 'solid',
	lineColor: '#9dffff',
	lineWidth: '1px',

	'z-index': 255,

	items: []
};
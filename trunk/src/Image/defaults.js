/** @include "index.js" */

ModularGrid.Image.defaults = {
	shouldStepUpOpacity:
		function (params) {
			// Ctrl + ]
			var result = (params.ctrlKey && params.keyCode == 221);
			return result;
		},
	shouldStepDownOpacity:
		function (params) {
			// Ctrl + [
			var result = (params.ctrlKey && params.keyCode == 219);
			return result;
		},
	shouldToggleVisibility:
		function (params) {
			var result = (params.ctrlKey && params.keyCode == 220);
			return result;
		},

	'z-index': 255,

	opacity: 0.85,
	opacityStep: 0.05,

	centered: false,

	marginTop: 0,
	marginLeft: '0px',
	marginRight: '0px',

	width: 100,
	height: 100
};
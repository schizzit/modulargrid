/** @include "index.js" */

// init
ModularGrid.init(
	{
		image: {
			src: 'design.png',
			width: 950,
			height: 2450,

			centered: true
		},
		grid: {


		},
		resizer: {
			sizes:
				[
					{
						width: 800
					},
					{
						width: 1024,
						height: 768
					}
				]
		},
		guides: {
			items: [
				{
					type: 'center',
					width: '30%'
				},
				{
					type: 'vertical',
					left: '20px'
				},
				{
					type: 'vertical',
					left: '20%'
				},
				{
					type: 'vertical',
					right: '20px'
				},
				{
					type: 'vertical',
					right: '20%'
				},
				{
					type: 'horizontal',
					top: '20px'
				},
				{
					type: 'horizontal',
					top: '20%'
				},
				{
					type: 'horizontal',
					bottom: '20px'
				},
				{
					type: 'horizontal',
					bottom: '20%'
				}
			]
		}
	}
);
var ModularGrid = {

	/** @type {Function} */
	shouldTriggerKeyDown: function (event, keyCode) { return (event.ctrlKey && keyCode == 192); },
	/** @type {Number} */ 
	zindex: 255,	
	/** @type {Number} */
	opacity: 0.5,
	/** @type {Number} */
	opacityStyleString: null,
	/** @type {Boolean} */
	centered: true,
	/** @type {Number} */
	fluid: false,
	/** @type {String} */
	color: "#F00",
	/** @type {Number} */
	gutter: 16,	
	/** @type {Number} */
	vDivisions: 6,
	/** @type {Number} */
	marginLeft: 18,
	/** @type {Number} */
	marginRight: 18,
	/** @type {Number} */
	width: 464,	
	/** @type {Number} */
	lineHeight: 16,
	/** @type {Number} */
	lineWidth: 1,
	/** @type {String} */
	lineColor: "#555",
	/** @type {Number} */
	lineBelowCount: 2,
	/** @type {Number} */
	marginTop: 18,
	/** @type {Number} */
	hDivisions: 4,	
	/** @type {Boolean} */
	handlersAdded: false,
	/** @type {Boolean} */
	showing: false,
	/** @type {Element} */
	parentElement: null,
	/** @type {Element} */
	documentBodyElement: null,	

	/**
	 * Устанавливает параметры сетки, добавляет показ по нажатию клавиш,
	 * перерисовку по изменению размера окна 
	 * @param {Object} [params] параметры модульной сетки (высота строки, центрированность и т.п.)
	 * @param {Number} [params.lineHeight=18] высота строки для горизонтальной шрифтовой сетки
	 * @param {Number} [params.marginTop=18] отступ сверху от начала вертикальной сетки
	 * @see #addHandlers 
	 */
	init:
		function (params) {
			if ( params ) {
				this.shouldTriggerKeyDown = this.getParam(params, "shouldTriggerKeyDown", this.shouldTriggerKeyDown);
				
				this.opacity = this.getParam(params, "opacity", this.opacity);
				this.zindex = this.getParam(params, "zindex", this.zindex);
				this.fluid = this.getParam(params, "fluid", this.fluid);				
				this.color = this.getParam(params, "color", this.color);

				this.centered = this.getParam(params, "centered", this.centered);
				this.hDivisions = this.getParam(params, "hDivisions", this.hDivisions);				
				this.vDivisions = this.getParam(params, "vDivisions", this.vDivisions);
				this.gutter = this.getParam(params, "gutter", this.gutter);
				this.width = this.getParam(params, "width", this.width);
				
				this.lineHeight = this.getParam(params, "lineHeight", this.lineHeight);
				this.lineWidth = this.getParam(params, "lineWidth", this.lineWidth);
				this.lineColor = this.getParam(params, "lineColor", this.lineColor);
				this.lineBelowCount = this.getParam(params, "lineBelowCount", this.lineBelowCount);
				
				this.marginTop = this.getParam(params, "marginTop", this.marginTop);
				this.marginLeft = this.getParam(params, "marginLeft", this.marginLeft);
				this.marginRight = this.getParam(params, "marginRight", this.marginRight);
			}

			if ( !this.handlersAdded )
				this.handlersAdded = this.addHandlers();
		},
	
	/**
	 * Возвращает значение параметра, если он определён, или значение по-умолчанию
	 * @private
	 * @param {Object} params параметры
	 * @param {String} propertyName свойство объекта параметров
	 * @param {Number|String|Function} defaultValue значение по-умолчанию
	 * @return {Number|String|Function} значение параметра
	 */
	getParam:
		function (params, propertyName, defaultValue) {
			var result = defaultValue;
			
			if ( params[propertyName] != null )
				result = params[propertyName];
			
				return result;
		},
	
	/**
	 * @private
	 * Показывает сетку, при первом вызове добавляет сетку в DOM
	 * @see #createParentElement
	 */
	toggleVisibility:
		function () {
			if ( this.parentElement == null ) {
				this.parentElement = this.createParentElement();
				this.parentElement.style.height = this.getClientHeight() + "px";
				
				this.createGrid( this.parentElement );
			}
			
			var displayValue = "block";
			if ( this.showing )
				displayValue = "none";

			this.parentElement.style.display = displayValue;				
			this.showing = !this.showing;			
		},

	/**
	 * @private
	 * @param {Element} parentElement контейнер для сетки
	 * @see #createVerticalGridHTML, #createHorizontalGridHTML
	 */
	createGrid:
		function ( parentElement ) {
			var horizontalGridHTML = this.createHorizontalGridHTML();
			var verticalGridHTML = this.createVerticalGridHTML();
			
			// установим innerHTML и добавим контейнер сетки в DOM
			parentElement.innerHTML = verticalGridHTML + horizontalGridHTML;
			var body = this.getDocumentBodyElement().appendChild(parentElement);
		},

	/**
	 * @private
	 * @return {String} HTML для отображения вертикальной модульной сетки
	 */
	createVerticalGridHTML:
		function () {
			var html = '';
			
			var width = this.width + this.gutter;
			var containerWidth = ((width - (this.vDivisions) * this.gutter) / this.vDivisions) + this.gutter;

			
			var containerPercent =  (containerWidth / this.width) * 100;

			var gutterPercent = (this.gutter / this.width) * 100;
			var columnPercent = 100 - (this.gutter / containerWidth) * 100;
			
			var lastContainerIndex = this.vDivisions - 1;
			for(var i = 0, length = this.vDivisions; i < length; i++ ) {
				if ( i == lastContainerIndex ) {
					containerPercent -= gutterPercent;
					columnPercent = 100;
				}

				html += '<div style="float:left;height:100%;width:' + containerPercent + '%"><div style="float:left;height:100%;width:' + columnPercent + '%;background:' + this.color + ';' + this.getOpacityStyleString() + '"></div></div>';
			}
			
			if ( this.width )
				html = '<div style="height:100%;width:100%;min-width:' + this.width + 'px">' + html +'</div>';
			
			if ( !this.fluid && this.width ) {
				var newHtml = '<div style="width:' + this.width + 'px;height:100%;';
				if ( this.centered )
					newHtml += 'margin:0 auto';

				newHtml += '">' + html +'</div>';
				html = newHtml;
			}

			
			var newHtml = '<div style="position:absolute;left:' + this.marginLeft + 'px;right:' + this.marginRight + 'px;top:' + this.marginTop + 'px;height:' + (this.getClientHeight() - this.marginTop) + 'px;';
			if ( this.centered )
				newHtml += 'text-align:center';
			newHtml += '">' + html +'</div>';

			return newHtml;
		},

	/**
	 * @private
	 * @return {String} HTML для отображения горизонтальной модульной сетки
	 */
	createHorizontalGridHTML:
		function () {
			var fontDivInnerHTML = "";
			var horizontalDivInnerHTML = "";

			// создаём вертикальную шрифтовую сетку
			var fontDivPrefix = '<div style="position:absolute;left:' + this.marginLeft + 'px;right:' + this.marginRight + 'px;top:';
			var fontDivPostfix = 'px;height:0;border-bottom:' + this.lineWidth + 'px solid ' + this.lineColor + ';' + this.getOpacityStyleString() + '"></div>';
			
			var height = (this.getClientHeight() + this.lineBelowCount * this.lineHeight ) - this.marginTop;
			var y = this.marginTop;
			
			var hCounter = 0;
			var hCounterMax = this.hDivisions + 1;
			var hHeight = this.lineHeight * this.hDivisions;

			var horizontalDivPrefix = '<div style="position:absolute;left:' + this.marginLeft + 'px;right:' + this.marginRight + 'px;height:' + hHeight + 'px;background:' + this.color + ';top:';
			var horizontalDivPostfix = 'px;' + this.getOpacityStyleString() + '"></div>';

			while ( y < height ) {
				if ( hCounter == 0 && (y + hHeight) < height )
					horizontalDivInnerHTML += horizontalDivPrefix + y + horizontalDivPostfix;				

				y += this.lineHeight;
				fontDivInnerHTML += fontDivPrefix + (y - this.lineHeight) + fontDivPostfix;
				
				hCounter++;
				if ( hCounter == hCounterMax )
					hCounter = 0;
			}

			return (horizontalDivInnerHTML + fontDivInnerHTML);
		},
	
	/**
	 * @private
	 * Создаёт элемент-контейнер для сетки
	 * @return {Element} контейнер сетки
	 */
	createParentElement:
		function () {
			/** @type {Element} */
			var parentElement = document.createElement("div");
			parentElement.setAttribute("style", "position:absolute;z-index:" + this.zindex + ";left:0;top:0;display:none;width:100%");
			
			return parentElement;
		},

	/**
	 * @private
	 * @return {String} фрагмент значения атрибута style для установки полупрозрачности
	 */
	getOpacityStyleString:
		function () {
			if ( this.opacityStyleString == null )
				this.opacityStyleString = "opacity:" + this.opacity + ";-khtml-opacity:" + this.opacity + ";-moz-opacity:" + this.opacity + ";filter:progid:DXImageTransform.Microsoft.Alpha(opacity=" + (this.opacity * 100) + ")";

			return this.opacityStyleString;
		},
		
	/**
	 * Добавляет обработчики нажатия клавиш и изменения размера окна браузера
	 * @private
	 * @return {Bool} true, если обработчики успешно добавлены
	 * @see #keyDownHandler 
	 */
	addHandlers:
		function () {
			var result = true;
			
			var self = this;
			document.onkeydown = function (event) { self.keyDownHandler(event); };
			
			return result;
		},

	/**
	 * Обрабатывает нажатие клавиш в браузере.
	 * При нажатии Ctrl+~ вызывает метод show
	 * @private
	 * @param {Event} event
	 * @see #toggleVisibility
	 */
	keyDownHandler:
		function (event) {
			var keyboardEvent = event;
			if ( window.event )
				keyboardEvent = window.event;
			
			var keyCode = (keyboardEvent.keyCode ? keyboardEvent.keyCode : (keyboardEvent.which ? keyboardEvent.which : null));
			
			if ( this.shouldTriggerKeyDown(keyboardEvent, keyCode) )
				this.toggleVisibility();			
		},

	/**
	 * @private
	 * @return {Number} высота области для сетки в пикселах
	 */
	getClientHeight:
		function () {
			var height = document.documentElement.clientHeight;
			height = this.getDocumentBodyElement().offsetHeight;

			return height;
		},

	/**
	 * @private
	 * @return {Number} ширина области для сетки в пикселах
	 */
	getClientWidth:
		function () {			
			var width = document.documentElement.clientWidth;
			return width;
		},
	
	/**
	 * @provate
	 * @return {Element} body
	 */
	getDocumentBodyElement:
		function () {
			if ( this.documentBodyElement == null )
				this.documentBodyElement = document.getElementsByTagName("body")[0];
			
			return this.documentBodyElement;
		}
};

ModularGrid.init(
	{
		shouldTriggerKeyDown: function (event, keyCode) { return (event.ctrlKey && keyCode == 192); },

		zindex: 255,	
		opacity: 0.5,

		centered: true,
		fluid: false,
		width: 464,

		color: "#F00",

		gutter: 16,	
		vDivisions: 6,
		hDivisions: 4,

		marginTop: 18,
		marginLeft: 18,
		marginRight: 18,
			
		lineHeight: 16,
		lineWidth: 1,
		lineColor: "#555",
		lineBelowCount: 2			
	}
);
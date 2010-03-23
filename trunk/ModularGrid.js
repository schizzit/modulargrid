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
	/** @type {String} */
	color: "#F00",
	/** @type {Boolean} */
	prependGutter: false,
	/** @type {Boolean} */
	appendGutter: false,
	/** @type {Number} */
	gutter: 16,	
	/** @type {Number} */
	vDivisions: 6,
	/** @type {Number} */
	marginLeft: 18,
	/** @type {String} */
	marginLeftStyleString: null,
	/** @type {Number} */
	marginRight: 18,
	/** @type {String} */
	marginRightStyleString: null,
	/** @type {Number|String} */
	width: 464,	
	/** @type {Number} */
	minWidth: 464,
	/** @type {Number} */
	maxWidth: null,
	/** @type {Number} */
	lineHeight: 16,
	/** @type {Number} */
	lineWidth: 1,
	/** @type {String} */
	lineColor: "#555",
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
	/** @type {String} */
	cookieName: "__ModularGrid",

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
				this.color = this.getParam(params, "color", this.color);

				this.centered = this.getParam(params, "centered", this.centered);
				this.hDivisions = this.getParam(params, "hDivisions", this.hDivisions);				
				this.vDivisions = this.getParam(params, "vDivisions", this.vDivisions);
				this.prependGutter = this.getParam(params, "prependGutter", this.prependGutter);
				this.appendGutter = this.getParam(params, "appendGutter", this.appendGutter);
				this.gutter = this.getParam(params, "gutter", this.gutter);
				this.width = this.getParam(params, "width", this.width);
				this.minWidth = this.getParam(params, "minWidth", this.minWidth);
				this.maxWidth = this.getParam(params, "maxWidth", this.maxWidth);
				
				this.lineHeight = this.getParam(params, "lineHeight", this.lineHeight);
				this.lineWidth = this.getParam(params, "lineWidth", this.lineWidth);
				this.lineColor = this.getParam(params, "lineColor", this.lineColor);
				
				this.marginTop = this.getParam(params, "marginTop", this.marginTop);
				this.marginLeft = this.getParam(params, "marginLeft", this.marginLeft);
				this.marginRight = this.getParam(params, "marginRight", this.marginRight);
				
				this.cookieName = this.getParam(params, "cookieName", this.cookieName);
			}

			if ( !this.handlersAdded )
				this.handlersAdded = this.addHandlers();
			
			if ( this.getVisibilityCookieValue() )
				this.toggleVisibility();
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
			
			this.updateVisibilityCookieValue( this.showing );
		},

	/**
	 * @private
	 * Удаляет или сохраняет параметр показа сетки в cookie
	 * @param {Boolean} visible true, если нужно сохранить куку, false если нужно стереть
	 */
	updateVisibilityCookieValue:
		function ( visible ) {
			var forever = new Date();
			var yearIncrement = 1;
			
			if ( !visible )
				yearIncrement = -1;

			forever.setYear(forever.getFullYear() + yearIncrement);
			
			document.cookie = this.cookieName + "=1;expires=" + forever.toString();
		},
	
	/**
	 * @private
	 * @return {Boolean} true, если значение куки установлено
	 */
	getVisibilityCookieValue:
		function () {
			return (document.cookie.indexOf(this.cookieName + "=1") > -1);
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

	getMarginLeftStyleString:
		function () {
			if ( this.marginLeftStyleString == null )
				this.marginLeftStyleString = this.getMarginStyleString(this.marginLeft);
			
			return this.marginLeftStyleString;
		},

	getMarginRightStyleString:
		function () {
			if ( this.marginRightStyleString == null )
				this.marginRightStyleString = this.getMarginStyleString(this.marginRight);
			
			return this.marginRightStyleString;
		},
	
	/**
	 * @private
	 * @param {String|Number} propertyValue значение поля margin
	 * @return {String} значение строки стиля
	 */
	getMarginStyleString:
		function (propertyValue) {
			/** @type {String} */
			var value = propertyValue + "";
			var result = value;
			
			if ( value.substr(value.length - 1) != "%" )
				result += "px";
			
			return result;
		},
	
	/**
	 * @private
	 * @return {String} HTML для отображения вертикальной модульной сетки
	 */
	createVerticalGridHTML:
		function () {
			var html = '';
			
			var fluid = ( typeof(this.width) == "string" && this.width.substr(this.width.length - 1) == "%" );			
			var width = (fluid ? this.minWidth : this.width);
			
			// создаём вертикальную сетку
			var gutterCount = this.vDivisions - 1;
			if ( this.prependGutter )
				gutterCount++;
			if ( this.appendGutter )
				gutterCount++;
			
			var gutterPercent = (this.gutter / width) * 100;
			var divisionPercent = (100 - gutterCount * gutterPercent) / this.vDivisions;
			
			var x = (this.prependGutter ? gutterPercent : 0)
			for(var i = 0, length = this.vDivisions; i < length; i++) {
				html += '<div style="position:relative;left:' + x + '%;float:left;margin-right:-' + divisionPercent + '%;height:100%;width:' + divisionPercent + '%;background:' + this.color + ';' + this.getOpacityStyleString() + '"></div>';
				x += gutterPercent + divisionPercent;
			}
			
			// создаём контейнер колонок (центрирование, фиксация ширины и т.п.)
			var containerWidth;
			var containerStyleString = "";
			
			if ( fluid ) {
				containerWidth = this.width;				
			}
			else {
				containerWidth = width + "px";
			}

			if ( this.centered )
				html = '<div style="width:100%;height:100%;text-align:center"><div style="width:' + containerWidth + ';height:100%;margin:0 auto;' + containerStyleString + '">' + html + '</div></div>';
			else
				html = '<div style="width:' + containerWidth + ';height:100%;' + containerStyleString + '">' + html + '</div>';
			html = '<div style="height:100%;padding: 0 ' + this.getMarginRightStyleString() + ' 0 ' + this.getMarginLeftStyleString() + '">' + html + '</div>';
					
			return html;
		},

	/**
	 * @private
	 * @return {String} HTML для отображения горизонтальной модульной сетки
	 */
	createHorizontalGridHTML:
		function () {
			var fontDivInnerHTML = "";
			var horizontalDivInnerHTML = "";

			var fontDivPrefix = '<div style="float:none;position:absolute;left:' + this.getMarginLeftStyleString() + ';right:' + this.getMarginRightStyleString() + ';top:';
			var fontDivPostfix = 'px;height:0;border-bottom:' + this.lineWidth + 'px solid ' + this.lineColor + ';' + this.getOpacityStyleString() + '"></div>';
			
			var height = this.getClientHeight();
			var y = this.marginTop;
			
			var hCounter = 0;
			var hCounterMax = this.hDivisions + 1;
			var hHeight = this.lineHeight * this.hDivisions;

			var horizontalDivPrefix = '<div style="float:none;position:absolute;left:' + this.getMarginLeftStyleString() + ';right:' + this.getMarginRightStyleString() + ';height:' + hHeight + 'px;background:' + this.color + ';top:';
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
			var height = Math.max(document.documentElement.clientHeight, this.getDocumentBodyElement().offsetHeight);
			height = Math.max(height, window.scrollMaxY);
			height = Math.max(height, document.documentElement.scrollHeight);

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
		width: 426,
		centered: true,
		
		marginLeft: 10,
		marginRight: 10,
		
		marginTop: 100
/*		
		shouldTriggerKeyDown: function (event, keyCode) { return (event.ctrlKey && keyCode == 192); },

		zindex: 255,	
		opacity: 0.5,

		centered: false,
		width: "100%",

		color: "#F00",

		gutter: 16,
		prependGutter: true,
		appendGutter: true,
		vDivisions: 6,
		hDivisions: 4,

		marginTop: 18,
		marginLeft: "10%",
		marginRight: "10%",
			
		lineHeight: 16,
		lineWidth: 1,
		lineColor: "#555",
					*/
	}
);
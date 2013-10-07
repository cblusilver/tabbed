// JavaScript Document
var addEvent = function () {
	var setListener;

	return function (el, ev, fn) {
		if (!setListener) {
			if (el.addEventListener) {
				setListener = function (el, ev, fn) {
					el.addEventListener(ev, fn, false);
				};
			} else if (el.attachEvent) {
				setListener = function (el, ev, fn) {
					el.attachEvent('on' + ev, fn);
				};
			} else {
				setListener = function (el, ev, fn) {
					el['on' + ev] =  fn;
				};
			}
		}
		setListener(el, ev, fn);
	};
}();

var getAttribute = function(element, attributeName) {
  return (typeof element.attributes[attributeName] != 'undefined') ? element.attributes[attributeName].value : false;
}

var historyIndex = 100;
var updateState = function(newState) {
		window.history.pushState({ id: historyIndex }, newState, newState);
		historyIndex++;
};

var switchTab = function(e) {
		if (e && e.preventDefault) {
				e.preventDefault();
		}
		else if (window.event && window.event.returnValue) {
				window.eventReturnValue = false;
		};

		var value = getAttribute(this, 'href');
		console.log(value);
		
		if (value) {
//			  updateState(value);
				
				var tc = document.getElementsByClassName('tab_container')[0];	
				
				var className = tc.className;
				var classArr = className.split(' ');
				var newNames = [];
				
				for (var i=0; i<classArr.length; i++) {
					if (classArr[i].indexOf('tab_select_') == -1) {
						newNames.push(classArr[i]);
					}
				}
				
				newNames.push('tab_select_' + value.substring(1));
				tc.className = newNames.join(" ");		
				console.log(tc.className);
		}
}

var tabs = document.getElementsByClassName('tab');
for (var i=0; i<tabs.length; i++) {
		addEvent(tabs[i], "click", switchTab);
}
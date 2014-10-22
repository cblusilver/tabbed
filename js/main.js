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

var onready = function(handler) {
  if (document.readyState === "complete") {
    return handler();
  }
  if (window.addEventListener) {
    window.addEventListener("DOMContentLoaded",handler,false);
  }
  else if (window.attachEvent && window == window.top) {
    if (_readyQueue.push(handler) == 1) {
       _readyIEtop();
    }
  }
  else if (window.attachEvent) {
    window.attachEvent("onload",handler);
  }
};

var _readyQueue = [];
var _readyIEtop = function() {
  try {
    document.documentElement.doScroll("left");
    var fn;
    while ((fn=_readyQueue.shift()) != undefined) {
      fn();
    }
  }
  catch(err) {
    setTimeout(_readyIEtop,50);
  }
};

var getAttribute = function(element, attributeName) {
  return (typeof element.attributes[attributeName] != 'undefined') ? element.attributes[attributeName].value : false;
}

var updateState = function(url) {
  window.history.pushState({ tab: url }, url, url);
};

var updateTab = function(value) {
  value = value || "#zombies";
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
}

var switchTab = function(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  else if (window.event && window.event.returnValue) {
    window.eventReturnValue = false;
  };

  var url = getAttribute(this, 'href');
  updateState(url);
  updateTab(url);
};

var previousState = function() {
  var url = (window.location.hash) ? window.location.hash : null;
  updateTab(url);
};

onready(function() {
  var tabs = document.getElementsByClassName('tab');
  for (var i=0; i<tabs.length; i++) {
  addEvent(tabs[i], "click", switchTab);
  }

  addEvent(window, 'popstate', previousState);

  var url = (window.location.hash) ? window.location.hash : null;
  window.history.replaceState({ tab: url }, url, url);
  if (url) {
  updateTab(url);
  }
});

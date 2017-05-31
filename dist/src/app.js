(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Home = require('./home.js');

ReactDOM.render(React.createElement(Home, null), document.getElementById('app'));

},{"./home.js":2}],2:[function(require,module,exports){
"use strict";

var Home = React.createClass({
    displayName: "Home",


    getInitialState: function getInitialState() {
        return {};
    },

    componentWillMount: function componentWillMount() {},

    render: function render() {

        return React.createElement(
            "div",
            null,
            "console.log('dscsdac')"
        );
    }
});

module.exports = Home;

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcaG9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxPQUFPLFFBQVEsV0FBUixDQUFYOztBQUVBLFNBQVMsTUFBVCxDQUNJLG9CQUFDLElBQUQsT0FESixFQUNjLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQURkOzs7OztBQ0ZBLElBQUksT0FBTyxNQUFNLFdBQU4sQ0FBa0I7QUFBQTs7O0FBRXpCLHFCQUFpQiwyQkFBVTtBQUN2QixlQUFPLEVBQVA7QUFHSCxLQU53Qjs7QUFRekIsd0JBQW9CLDhCQUFVLENBQzdCLENBVHdCOztBQVd6QixZQUFRLGtCQUFVOztBQUVkLGVBQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURKO0FBS0g7QUFsQndCLENBQWxCLENBQVg7O0FBcUJBLE9BQU8sT0FBUCxHQUFpQixJQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgSG9tZSA9IHJlcXVpcmUoJy4vaG9tZS5qcycpXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8SG9tZSAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsiLCJ2YXIgSG9tZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybih7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKXtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RzY3NkYWMnKVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIb21lOyJdfQ==

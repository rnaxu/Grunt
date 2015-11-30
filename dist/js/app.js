(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Hage = require('./module/Hage');

var app = new Hage();

},{"./module/Hage":2}],2:[function(require,module,exports){
var Hoge = require('./Hoge');
var Huge = require('./Huge');

module.exports = (function(){

    function Hage() {
        this.hoge = new Hoge();
        this.huge = new Huge();
        this.createHage();
    }

    Hage.prototype.createHage = function(){
        this.hoge.createHoge();
        this.huge.createHuge();
    };

    return Hage;

})();

},{"./Hoge":3,"./Huge":4}],3:[function(require,module,exports){
module.exports = (function(){
    function Hoge() {
    }

    Hoge.prototype.createHoge = function(){
        var hoge = "hoge";
        console.log(hoge);
    };

    return Hoge;
})();

},{}],4:[function(require,module,exports){
module.exports = (function(){
    function Huge() {
    }

    Huge.prototype.createHuge = function(){
        var huge = "huge";
        console.log(huge);
    };

    return Huge;
})();

},{}]},{},[1]);

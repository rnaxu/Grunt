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

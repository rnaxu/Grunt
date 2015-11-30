module.exports = (function(){
    function Huge() {
    }

    Huge.prototype.createHuge = function(){
        var huge = "huge";
        console.log(huge);
    };

    return Huge;
})();

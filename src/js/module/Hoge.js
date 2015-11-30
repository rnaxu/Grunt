module.exports = (function(){
    function Hoge() {
    }

    Hoge.prototype.createHoge = function(){
        var hoge = "hoge";
        console.log(hoge);
    };

    return Hoge;
})();

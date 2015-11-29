$(function() {

    function createHashArray() {
        var hashArray = {};
        if( 1 < location.hash.length) {
            // 最初の1文字 (#記号) を除いた文字列を取得する
            var query = location.hash.substring(1);

            // クエリの区切り記号 (&) で文字列を配列に分割する
            var hashes = query.split('&');

            for(var i = 0; i < hashes.length; i++)　{
               // ハッシュ名とハッシュ値に分割する
               var element = hashes[i].split('=');

               var hashName = element[0];
               var hashValue = element[1];

               // ハッシュ名をキーとして連想配列に追加する
               hashArray[hashName] = hashValue;
            }
        }
        return hashArray;
    }

    function createHashString(hashArray) {
        var hashString = '';
        var key;
        var i = 0;

        for(key in hashArray){
            if(i === 0) {
                hashString = "" + key + "=" + hashArray[key];
            } else {
                hashString += "&" + key + "=" + hashArray[key];
            }
            i++;
        }

        return hashString;
    }

    var hashArray = createHashArray();
    var hashString = createHashString(hashArray);

    $('.js-test').on('click', function() {
        history.replaceState('test', null, '#' + hashString);
    });
});

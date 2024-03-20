function callName() {
    console.log(this.name);
}

var name = '全域阿婆';
var auntie = {
    name: '漂亮阿姨',
    callName: callName
    // 這裡的 function 指向全域的 function，但不重要
};

callName();        // '全域阿婆'
auntie.callName(); // '漂亮阿姨'，呼叫是在物件下調用，那麼 this 則是該物件

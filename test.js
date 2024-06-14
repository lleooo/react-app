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



// "proxy": "https://react-app-flask-server.onrender.com",

//todo:
//google login wait
//dont show dark mode btn in popular page v
//dark mode error v
//show redirect on toast v
//toast top pos v
//map error in console
//search box


//專案遇到的問題
//1. 部屬後api失效(新增process.env)
//2. 部屬後跨域問題
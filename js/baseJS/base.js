
/*console.log($());
console.log($.isFunction(""));
*/
//从一行代码里面学点JavaScript
/*[].forEach.call($$("*"),function(a){
  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
})*/

//#################################################################################################
//jQuery的静态方法原理
/*
var   fun=function(){
    console.log("这是一个方法");
    return fun.prototype.init();
}
//下面是挂在在fun上的属性和方法
fun.VERSION="0.0.1";
fun.name="zhang";
fun.prototype.init=function(){
    console.log("init");
    console.log(this);
    return this;
}
fun.prototype.name="prototype";
fun.prototype.getName=function(){
    console.log(this);    
    console.log(this.name);//因为这里的this是实例，而不是原型，因此挂载在原型上的
    return this.name;
}
fun.getVersion=function(){
    console.log(this.VERSION);
    return this.VERSION;
}
fun().getName();
fun.getVersion();
*/

//#################################################################################################
//模仿jQuery，创建zhang自己的常用方法对象
/*
;(function() {
    // 注册到window对象和$
     var zhang = window.zhang =window.$$$ = function(selector) {
        return new zhang.fn.init(selector);
    }
    // 版本
    zhang.VERSION = '0.0.1(dev)';
    // 创建fn的命名空间,该内容为框架基础功能
    zhang.fn = zhang.prototype = {
        constructor: zhang,
        // initialize [初始化]
        init : function(selector) {
//            "" ,  null ,  undefined
            if (!selector) {
                selector=document;
            }
            selector = selector || document;
            if (selector.nodeType) {
                this[0] = selector;
                return this;
            }
             if (typeof selector === "string")
                    this[0] = document.getElementById(selector);
             return this;
        }
        
    };
    // zhang.fn缓存zhang.prototype;避免频繁的操作zhang.prototype
   //内部处理了实例创建不用new去生成实例，处理了prototype保证多实例共享方法减少资源开支
    zhang.fn.init.prototype = zhang.fn;
    // 扩展zhang.js对象。用来在fn命名空间上增加新函数
    zhang.extend = zhang.fn.extend = function(obj, property) {
        if (!property) {
            property = obj;
            obj = this;
        }
        // obj用以扩展的对象，prop为扩展的函数集,如果参数只有一个，则扩展新函数到zhang对象上
        for ( var i in property) {
            obj[i] = property[i];
        }
        return obj;
    };
     zhang.extend({
        isNull : function(data){
            if(data==null){
                return true;
            }
            if(data==undefined){
                return true;
            }
            if(data==""){
                return true;
            }
        return false;
        }
    });
    // 给fn添加的功能，需要先选择节点，然后才能操作
    // 调用方式： [$("id").get();],对象方法
    zhang.fn.extend({
        get : function(name) {
            return name;
        }
    });
    // 给zhang对象添加的功能（静态方法），可以直接点方法名 ，进行操作
    // 调用方式： [$.getQueryString("查询名");]
     zhang.extend({
        getQueryString : function(options) {
            return  zhang.Query.getQueryString(options);
        }
    });
    zhang.Query = {
     getQueryString: function (name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
    }
    };
})(window);
console.log(zhang.Query.getQueryString("id"));

console.log(zhang.VERSION);
console.log($$$());
console.log(zhang.isNull());
console.log(zhang.getQueryString("id"));
console.log(zhang().get("na"));
*/
//#################################################################################################
//Shadow DOM
/*var shadow=document.getElementById("shadow");
var root=shadow.createShadowRoot();
var cnt = document.createElement("div");
cnt.innerHTML = "shadow";
root.appendChild(cnt);
*/

//#################################################################################################
//ES6
/*var i的时候，i是全局属性，因此当循环完毕后，i=10；这时候调用a[]的时候，输出的总是10；
而let 是块级作用域有效，每次循环，每次有效，每次循环，都是一个新的j；
var a=[];
for (var i = 0; i < 10; i++) {
    a[i]=function(){console.log(i);}
}

var b=[];
for (let j = 0; j < 10; j++) {
    b[j]=function(){console.log(j);}
}
a[6]();
b[6]();
*/
//解构赋值
/*var [a,b,c]=[1,2,3];//a=1,b=2,c=3
var [a,b,c,d,e]="hello";//a='h',b='e',c='l',d='l',e='0';
//默认值，如果后面赋值是undifined的话，默认值生效，否则，不生效。
//严格意义上的“===”undifined。如果默认值是表达式，用到才求值。
var [foo=true]=[];//foo=true
var [x=1]=[null];//x=null
var [y=1]=[undefined];//y=undifined
var [foo]=[];//foo=undifined

function f(){console.log("set value");}
var [z=f()]=[1];//f()不会被调用
console.log(z);*/
//对象解构，名称对应解构，若没有，返回undifined，无序
/*var {foo,bar}={foo:'aaa',bar:'bbb'};
console.log(foo);
var {dd,cc}={cc:'aaa',dd:'bbb'};
console.log(dd);
//其真实情况是一种简写var {foo:foo,bar:bar}={foo:'aaa',bar:'bbb'};
*/
//常用情况 1交换变量 2函数返回多值[]/{} 3函数参数定义[]/{} 4提取JSON数据 5函数参数默认值 6遍历for of map 
/*var [x,y]=[1,2];
console.log("x:"+x+" y:"+y);
[x,y]=[y,x];
console.log("x:"+x+" y:"+y);
*/
//函数参数默认值
/*function move({x=0,y=0}){
    console.log("x:"+x+" y:"+y);
}
move({x:1});
*/
//######################################################
//字符串 Unicode \u0000-\uFFFF
/*console.log('\u{1F680}'==='\uD83D\uDE80');
console.log('\u{1F680}');//UTF-16
console.log('\uD83D\uDE80');//UTF-8
*/
//二进制：0111 1010 （01 111 010 ）  八进制 172   十六进制： 7A   十进制：7*16+A*1=122
//对应ASCII编码是122 如果是ASCII中的字符，UTF-8中是一致的，0-127对应0000 0000 -0xxx xxxx
//而其他的需要两个字节的，高位补0  因此为 0000 0000 0111 1010  ==> 007A
/*
console.log('z');
console.log('\z');//转义字符，因为z不用转义，所以还是z
console.log('\172');//ASCII  
console.log('\x7A');//ASCII 
console.log('\u007A');//Unicode
console.log('\u{7A}');//Unicode

console.log('a');//二进制：0110 0001 八进制141  十六进制： 61   十进制：6*16+1*1=97
console.log('\a');
console.log('\141');
console.log('\x61');//ASCII 
console.log('\u0061');
console.log('\u{61}');
*/
//B（Binary)表示二进制，O（Octal）表示八进制，D（Decimal）或不加表示十进制，H（Hexadecimal）表示十六进制。
//加0b表示二进制　　加0x表示十六进制　加0表示八进制
//' ' //ASCII值是63 '\077' //是8进制表示' '，0可以省略，因为C,C++规定不允许使用斜杠加10进制数来表示字符 '\0x3F' //是16进制表示' '
/*
console.log('张');
console.log('\张');
console.log('\u5F20');
console.log('\u{5F20}');
*/
/*
console.log('\uD842\uDFB7');
console.log('\u{20BB7}');
console.log('\uD869\uDEA5');
console.log('\u4DFE');
*/
//template 
/*var name="I'm String";
function fn(){return "I'm function"}
var str=`
<ul>
    <li>${name}</li>
    <li>${fn()}</li>
</ul>  
`;
$("#demo").append(str);
console.log(`my name is ${name}`);
*/
/*
function compile(template){
var evalExpr=/<%=(.+?)%>/g;
var expr=/<%([\s\S]+?)%>/g;
template=template.replace(evalExpr,'`); \n echo ($1); \n echo (`')
.replace(expr,'`); \n $1 echo(`');
template='echo(`'+template+'`)';
var script=`
    (function parse(data){
        var output="";
    function echo(html){
        output+=html;
    }
    ${template}
    return output;
    })
`;
//console.log(script);
return script;
}
var data=["as","df","cv"];
var template=`
    <ul>
    <% for (var i = 0; i < data.length; i++) {%>
      <li><%=data[i]%></li>
    <%}%>
    </ul>
`;
var parse=eval(compile(template));
var str=parse(data);
$("#demo").append(str);
*/
//######################################################
//Number, Math, Array,
//Number，扩充Number.isFinite()和Number.isNaN()，和直接调用不同。
//是否非无穷大
/*console.log(Number.isFinite(12));//确实是非无穷大 true，

console.log(isFinite(true));//直接调用的话，会优先转换，再做判断
console.log(Number.isFinite(true));
console.log(Number.isFinite({})); //false Number.isFinite对于所有非数字，返回false
console.log(Number.isFinite("")); //false
console.log(Number.isFinite(NaN)); //false
console.log(Number.isFinite(Infinity));

console.log(Number.isNaN(NaN));// true//是否是 Not A Number
console.log(Number.isNaN(12));//false

*/

/*
console.log(Number.EPSILON);//极小值常量
console.log(2**3);//指数
*/
/*
var arr=Array.from([1,3,5,7],x=>x**x);
console.log(arr);
//keys(),values(),entries()
console.log(arr.includes(2)); //ES7中的用法
*/
//######################################################
//Function
/*function log(x=0,y=0){
   console.log("x:"+x+" y:"+y);
}
log(1);
function esajax(url,{method="get",global=true,processData=true,async=true}={}){
    console.log(method);
}
esajax();//双重默认解构，一般情况下默认解构参数在最后
*/
//默认值
/*
function m1({x=0,y=0}={}){
    console.log("x:"+x+" y:"+y);
}
function m2({x,y}={x:0,y:0}){
    console.log("x:"+x+" y:"+y);
}
m1();
m2();
m1({});
m2({});*/

//作用域
/*
var x=1;//Global中的x
function foo(x,y=function(){x=2;}){//Local的x，
    var x=3;//Block的x，定义并赋值undifined--->3
    y();//执行函数，把Locak中的x，由undifined变为2
    console.log(x);//输出Block中的x 3
}
foo();

var z=1;//Global中的x
function fooz(z,y=function(){z=2;}){//Local的x，
     z=3;//当没有var时候，这里定义的z就是Local范围内的x了，undifined--->3
    y();//执行函数，把Locak中的x，由3------>2
    console.log(z);//输出Local中的x, 2
}
fooz();
*/

//rest参数
/*function add(...values){
    var sum=0;
    for (var i = 0; i < values.length; i++) {
        sum+=values[i];
    }
    console.log(sum);
}
add(2,3,2,1,1);
*/
//扩展运算符...
/*var arr=[...[12,23,12,43],...[2332,2134,54,34,56,3]];
console.log(arr);
arr.push(...[23,32,34,45,56,232,34,32,2]);
console.log(arr);

console.log(Math.max(...[12,23,34,54,56,12,768,123,43]));
console.log(Math.max.apply(null,[12,23,34,54,56,12,768,123,43]));
console.log(Math.max(12,23,34,54,56,12,768,123,43));
*/
//=>未看完
/*var f=v=>v;
var f=function(v){
    return v;
}

var fun=()=>5; 
console.log(fun()); 

var fun =({name=1,value=0}={})=>{console.log(this.name); return name+value;};
console.log(fun({name:2}));
*/
//Object下一个
/*
console.log(Object.is({'zg':'zas'},{'zg':'zas'}));//false
console.log(Object.is(NaN,NaN));//true
console.log(NaN==NaN);//false
console.log(Object.is(-0,+0));//false

var birth=new Date(...[1994,8.11]);
var Person={
    name:'zhang',
    birth,
    ['pass'+'word']:'password',
    ['get'+'Password'](){console.log(this.password);},
    getBirth(){console.log(this.birth);},
    hello(){
        console.log(this.name);
    }
}
Person.a={ac:12}
console.log(Person);
Object.assign(Person,{a:1},{b:2});//将后一个对象合并到目标对象,但是是浅拷贝
console.log(Person);
Person.hello();
Person.getBirth();
Person.getPassword();
//属性的属性(特性，特征)
var desc=Object.getOwnPropertyDescriptor(Person,'a');
console.log(desc);
*/

//Symbol使用
//null undifined String Boolean Number Object Symbol
/*var allis=Symbol('is');
var allis1=Symbol('is');
var oneis=Symbol.for('is');
var oneis1=Symbol.for('is');
console.log(allis);
console.log(typeof allis);

console.log(allis1===allis);
console.log(oneis1===oneis);//使用Symbol.for(),的话，描述一样，全局只有一个，Symbol(),每个都不同。
//显式的转换成String和Boolean，但是不能用''+Symbol();
//console.log('te'+allis);Uncaught TypeError: Cannot convert a Symbol value to a string
console.log(Symbol("zx").toString());
console.log(Boolean(allis));//true
console.log(JSON[Symbol.toStringTag]);
*/

//######################################################
//Proxy可以当做拦截器来搞一些事情。
//Reflect，
/*var target={};
var handler={
    get:function(target,property){
        console.log('handler get');
        return target[property];
    },
    set(target,propkey,value){
        console.log("handler set value:"+value);
        return Reflect.set(...arguments);
    }
};
var proxy=new Proxy(target,handler);
proxy.a='a';
console.log("target a:"+target.a);//实际上不知道target，只知道proxy，所以所有的对target的操作都落在proxy上了。
console.log("proxy a:"+proxy.a);//通过proxy取得target上的值，广义上，通过操作proxy来操作target。
console.log('=========================');
var target=function(){};
var proto={constructor:target,'proto':'proto'};
var handler={
    get:function(target,property){
        console.log('handler get');
        return target[property];
    },
    set(target,propkey,value){
        console.log("handler set value:"+value);
        return Reflect.set(...arguments);
    },
    setPrototypeOf(target,proto){
        return Reflect.setPrototypeOf(...arguments);
    }
};
var proxy=new Proxy(target,handler);
Object.setPrototypeOf(proxy,proto);
var my =new proxy();
console.log(proxy);
console.log(my);

console.log(new Proxy({},{}));//5+2+2+2+1+1
console.log(typeof new Proxy({},{}));//5+2+2+2+1+1

//get(target,propkey) set() has() deleteProperty() difineProperty()
//getOwnPropertyDescriptor() ownKeys()
//getPrototypeOf() setPrototypeOf()
//isExtensible()判断是否可以扩展， preventExtensions()阻止添加新属性
//apply construct
//Proxy.revocable()取消实例
console.log(Reflect);//5+2+2+2+1+1
console.log(typeof Reflect);//5+2+2+2+1+1
*/
//get set has deleteProperty difineProperty   setPrototyoeOf() getPrototypeOf()  isExtensible() preventExtensions()   ownKeys() hasOwnPropertyDescriptor()
//apply() construct()

//console.log(Object());
//Object() get set has deleteProperty difineProperty
//getOwnProperty 
//
//getPrototypeOf setPrototypeOf
/*var Person=function(name,age){
    this['Person function']='Person function';
    this.name=name;
    this.age=age;
    this.getAge=function(){return this.age;};
}

Person.prototype={constructor:Person,'Person.prototype':'Person.prototype'};
var myPerson=new Person('zhang',20);
Object.preventExtensions(myPerson);
Object.freeze(myPerson);

myPerson.a='as';
console.log(myPerson);
console.log(myPerson.a);//undifined因为myPerson被freeze了，其中freeze是冻结，preventExtensions是组织扩展，阻止添加新属性
console.log(myPerson.__proto__);
console.log(Object.getPrototypeOf(myPerson));
console.log(Person.prototype);
console.log(myPerson.constructor==Person);
console.log(Person.prototype.constructor);
*/

//class语法糖
/*
class Person{
    constructor(name,password){
        this.name=name;
        this.password=password;
    }
    toString(){
        return '('+this.name+','+this.password+')';
    }
}
console.log(typeof Person);//function
*/
//######################################################
//set map 有序集合 ，有序键值对 WeakSet WeakMap
/*
var set=new Set();
set.add("zhang");
set.add("wang");
console.log(set); 
console.log(set.has("zhang"));
set.forEach(console.log);
set.forEach(function(i){console.log(i);});
set.clear();
console.log(set.has("zhang"));

console.log("==================================================");
var map=new Map();
map.set("str","val");
map.set({"zx":{}},{"val":"cv"});
console.log(map);
console.log(map.get("str"));
console.log(map.has("str"));
map.forEach(function(i){console.log(i);});
var keys=map.keys();
for (key of keys) {
    console.log(key);
}
var values=map.values();
for (value of values) {
    console.log(value);
}
var entries=map.entries();
for (entry of entries) {
    console.log(entry);
}
map.clear();
console.log(map);
console.log(map.get("str"));
console.log(map.has("str"));
*/
//Map JSON转换
/*
var map=new Map();
map.set("str","val");
map.set({"zx":{'asas':'asas'}},{"val":"cv"});
console.log('map++++++++++');
console.log(map);
console.log('map json字符串++++++++++');
var jsonstr=JSON.stringify([...map]);
console.log(jsonstr);
console.log(jsonstr.str);//未定义
console.log('map json对象++++++++++');
var jsonobj=JSON.parse(JSON.stringify([...map]));
console.log(jsonobj);
console.log(jsonobj.str);
console.log('jsonobj对象 还原map++++++++++');
var map2=new Map(jsonobj);
console.log(map2);
console.log('jsonstr字符串 还原map++++++++++');
var map3=new Map(jsonstr);
console.log(map3);//失败
*/

//######################################################
//Generator逐步对生成器函数及利用它进行异步编程进行浅层的分析理解。
/*
function* hello(){
    console.log('hello');
    yield 'hello';
    console.log('world');
    yield 'world';
    yield 'return';
    return 'hello world return';
}
var h=hello();// 初始化迭代器，函数不执行
console.log(h.next());//Object {value: "hello", done: false}done是说遍历还没有结束
console.log(h.next());
console.log(h.next());
console.log(h.next());//Object {value: "hello world return", done: true}遍历结束了，done:true

console.log(hello());
console.log(hello().next());
console.log('hello:'+(yield));
*/
//######################################################
//Promise
/*
var promise=new Promise(function(resolve,reject){


});
//Async函数
//Thunk函数
var a=1;
function f(a,b){
    console.log(arguments);//2,1，按值调用
    console.log(b);
}
f(a+1,1)
*/
//###############################################################################################//
//数据类型
//简单类型和对应的复杂类型，相等问题,实质上是，引用类型和值类型的区别
/*
var Person=function(name,age){
    this['Person function']='Person function';
    this.name=name;
    this.age=age;
    this.getAge=function(){return this.age;};
}

Person.prototype={constructor:Person,'Person.prototype':'Person.prototype'};
var myPerson=new Person('zhang',20);

console.log( myPerson instanceof Person);
console.log(typeof  myPerson);
console.log( myPerson);

console.log( new Number(3) instanceof Number);
console.log(typeof  new Number(3));
console.log(typeof 3);
console.log( 3 instanceof Number);
*/
//默认有符号 32位 最高位代表正负  0为正1为负
var num=9;//9=2^3+2^0   1001
var num2=5;//5=2^2+2^0  0101
console.log(~num);//NOT 取反减1 -10
console.log(num&num2);//AND  0001 1
console.log(num|num2);//OR  1101  8+4+1=13
console.log(num^num2);//XOR 只有一个1取1  1100  8+4=12
console.log(num<<1);//
console.log(num>>1);//
console.log(num>>>1);//


/*var price1=10;
var price2='10';
var price3=Number('10');
var price4=new Number(10);//引用
var price5=price4;//引用
console.log(price1===price2);//false
console.log(price1===price3);//true
console.log(price1===price4);//false
console.log( price1==price4);//true考虑==和===的区别
console.log(price4===price5);//true
price4=10;
console.log(price4===price5);//false
console.log( typeof price5);//object
console.log( typeof price4);//number
*/
//简单类型 字符串，数字，null undifined true false
//只要不是使用new关键字的实例，对于一上五种类型都是简单类型。
/*var primitiveString1='foo';
var primitiveString2=String('foo');
var primitiveNumber1=12;
var primitiveNumber2=Number(12);
var primitiveBoolean1=true;
var primitiveBoolean2=Boolean('true');
console.log(typeof primitiveString1, typeof primitiveString2);
console.log(typeof primitiveNumber1,typeof primitiveNumber2);
console.log(typeof primitiveBoolean1,typeof primitiveBoolean2);
*/
//原生构造函数,new 复杂类型
/*var mystring=new String('zhang');
var mynumber=new Number(12);
var myboolean=new Boolean(false);
var myobject=new Object();
var myfunction=new Function();
var myarray=new Array();
var mydate=new Date();
var myregexp=new RegExp();
var myerror=new Error();
原生的构造函数都是native code
console.log(String.constructor);
console.log(Number.constructor);
console.log(Boolean.constructor);
console.log(Object.constructor);
console.log(Function.constructor);
console.log(Array.constructor);
console.log(Date.constructor);
console.log(RegExp.constructor);
console.log(Error.constructor);
*/
//使用Object创建其他复杂类型，因为其他的比如Array是继承自Object，然后Array在其中添加了一些常用的方法，
/*
console.log(  new Object('foo') );
console.log(  new Object(1) );
console.log(  new Object(true) );
console.log(  new Object(function(){}) );
console.log(  new Object([]) );
console.log(  new Object(/[a-z]/) );
console.log( typeof new Object('foo') );
console.log( typeof new Object(1) );
console.log( typeof new Object(true) );
console.log( typeof new Object(function(){}) );
console.log( typeof new Object([]) );
console.log( typeof new Object(/[a-z]/) );
*/

//查找对应属性的顺序是 myArray----->Array.prototype------>Object.prototype
/*var myArray=[];
Object.prototype.foo='object-foo';
Array.prototype.foo='array.foo';
myArray.foo='foo';
console.log(myArray);
console.log(myArray.foo);//查找最近的foo属性，如果没有返回undifined
*/

/*除了Function外，类型都是Object
console.log(typeof mystring);
console.log(typeof mynumber);
console.log(typeof myboolean);
console.log(typeof myobject);
console.log('myfunction:'+ typeof myfunction);
console.log(typeof myarray);
console.log(typeof mydate);
console.log(typeof myregexp);
console.log(typeof myerror);
*/
//###############################################################################################//
//对象
//两种创建对象的方法，new Object()和new function方法
//理解原型的部分
/*
var Person=function(name,age){
    this['Person function']='Person function';
    this.name=name;
    this.age=age;
    this.getAge=function(){return this.age;};
}

Person.prototype={constructor:Person,'Person.prototype':'Person.prototype'};
var myPerson=new Person('zhang',20);
Object.preventExtensions(myPerson);
Object.freeze(myPerson);

myPerson.a='as';
console.log(myPerson);
console.log(myPerson.a);//undifined因为myPerson被freeze了，其中freeze是冻结，preventExtensions是组织扩展，阻止添加新属性
console.log(myPerson.__proto__);
console.log(Object.getPrototypeOf(myPerson));
console.log(Person.prototype);
console.log(myPerson.constructor==Person);
console.log(Person.prototype.constructor);
*/

/*function(){}
var Person=function(name,age){
    this.name=name;
    this.age=age;
    this.getAge=function(){return this.age;};
}
Person.prototype={constructor:Person};
var myPerson=new Person('zhang',20);
console.log(myPerson);
console.log(myPerson.constructor==Person);
console.log(Person.prototype.constructor);

var User=function(name,age){
    this.name=name;
    this.age=age;
    this.getAge=function(){return this.age;};
}
//User.prototype={constructor:User};
var myUser=new User('zhang',20);
console.log(myUser);
*/
/*new Object();
var myPerson=new Object();
myPerson.name='zhang';
myPerson.age=20;
myPerson.getAge=function(){return this.age;};
console.log(myPerson);
console.log(myPerson.getAge());
*/

/*for in hasOwnProperty
var Person=function(name,age){
    this.name=name;
    this.age=age;
    this.getAge=function(){return this.age;};
}
var myPerson=new Person('zhang',20);
Person.prototype.forin=function(){
    for(var key in this){
        if(myPerson.hasOwnProperty(key)){
        console.log(key+':'+this[key]);
        }else{
        console.log('不是Own的属性'+key+':'+this[key]);  
        }
    }
};
myPerson.forin();
Object.defineProperty(Person.prototype,"constructor",{
    enumerable:false,
});
*/
/*
Object.defineProperty通过这个方法设置对象中的属性或者方法的可读可写可配置可枚举四大属性
//属性
Person.prototype.pro=1;
Object.defineProperty(Person.prototype,"pro",{
    value:2,
    enumerable:true,
    writable:true,
    configurable:true
});
//方法
Person.prototype.getName=function(){return 'method';};
Object.defineProperty(Person.prototype,"getName",{
    enumerable:false,
});
*/
//###############################################################################################//
//函数返回值默认undifined

/*嵌套函数自执行
(function(arg){
    (function(arg){
        console.log(arg);
        console.log('hi');
    })(arg);    
})('adssad');
*/
/*函数自执行，需要依靠(),
(function(arg){
    console.log(arg);
}('my'));

(function(arg){
    console.log(arg);
})('wai');
var fun=function(arg){console.log(arg);}('var');
*/

/*call apply arguments
var myFunction=function(foo,bar){
    this.foo=foo;
    this.bar=bar;
    console.log(this);//指调用者arguments指参数
    console.log(arguments);
    //arguments 有两个属性callee和length  //callee指代函数自己，length指参数的长度
};
console.log(myFunction());
var myObject={'name':'zhang'};
var myObject1={'name':'wang'};

myFunction.call(myObject,'foo','bar');
myFunction.apply(myObject,['foo','ba']);
myFunction.call(myObject1,'foo','bar');
myFunction.apply(myObject1,['foo','ba']);
*/
/*两种形式定义方法，区别在于解释器的提升
var fnuexp=function(){
return ' function expression';
}//函数表达式,不会提升，因此在之前不能被调用
function funlan(){
    return ' function language';
}//函数语句(函数定义),被提升
*/

/*外部的this会带入到对象中，
var myObject={
    fun1:function(bar){
        bar();//window
        console.log('fun1'+this);//myObject
        var fun2=function(){
            console.log('fun2'+this);//window
            var fun3=function(){
            console.log('fun3'+this);       //window        
            }();
        }();
    }
}
var outfun=function(){console.log(this);};
myObject.fun1(outfun);
*/

//###############################################################################################//
//

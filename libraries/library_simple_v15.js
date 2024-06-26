/*
    ----------------Simple----------------
          Use JavaScript but simply.
    Version: 15
    Created By: JoeTheHobo (John Jones)
    Email: johnjonesma@gmail.com
*/
Object.prototype.classRemove = function(classes) {
    if (this.length == undefined) {
        [this].classRemove(classes);
    } else {
        let arr = [];
        repeat(this,(obj) => {
            arr.push(obj)
        })
        arr.classRemove(classes);
    }
    return this;
}
Object.prototype.classAdd = function(classes) {
    if (this.length == undefined) {
        [this].classAdd(classes);
    } else {
        let arr = [];
        repeat(this,(obj) => {
            arr.push(obj)
        })
        arr.classAdd(classes);
    }
    return this;
}
Array.prototype.classAdd = function(classes) {
    let list = classes.split(" ")
    repeat(this,(object,i) => {
        repeat(list,(name,i) => {
            object.classList.add(name);
        })
    })
    return this;
}
Array.prototype.classRemove = function(classes) {
    let list = classes.split(" ")
    repeat(this,(object,i) => {
        repeat(list,(name,i) => {
            object.classList.remove(name);
        })
    })
    return this;
}


Object.prototype.$P = function(x = 1) {
    let a = this;
    for (var i = 0; i < x; i++) {
        a = a.parentNode;
    }
    return a;
}
Object.prototype.$ = function(c) {
    return $(c,this); 
}
function $(selector,context = document) {
    if (selector.includes(' ')) {
        return selector.split(" ").map(s => $(s, context));
    } else {
        if(!'#.<'.includes(selector.charAt(0))) selector = '#' + selector;
        if (selector.charAt(0) == '<') selector = selector.charAt(selector.length-1) == '>' ? selector.substring(1,selector.length-1) : selector.substring(1,selector.length);
        const elements  = context.querySelectorAll(selector);
        return elements.length === 1 ? (elements[0]) : (elements.length === 0 ? false : Array.from(elements));
    }
}
Object.prototype.each = function(type,func) {
    let objs = [];
    if (this.length) {
        for (let i = 0; i < this.length; i++) {
            objs.push(this[i])
        }
    } else {
        objs = [this];
    }
    
    return objs.each(type,func);
}
Array.prototype.each = function(type,response) {
    let whatToPerform;
    let typeCreateDomReturnList = [];

    if (typeof type == "string") whatToPerform = "action";
    if (typeof type == "string" && type == "innerHTML") whatToPerform = "innerHTML";
    if (typeof type == "string" && type == "placeholder") whatToPerform = "placeholder";
    if (typeof type == "string" && type == "id") whatToPerform = "id";
    if (typeof type == "string" && type == "value") whatToPerform = "value";
    if (typeof type == "string" && (type == "class" || type == "className")) whatToPerform = "class";
    if (typeof type == "string" && type == "classRemove") whatToPerform = "classRemove";
    if (typeof type == "string" && type == "classAdd") whatToPerform = "classAdd";
    if (typeof type == "string" && type == "src") whatToPerform = "src";
    if (typeof type == "string" && type == "create") whatToPerform = "create";
    if (typeof type == "function") whatToPerform = "function";
    if (getType(type) == "object") whatToPerform = "style";
    if (getType(type) == "array") whatToPerform = "multiAction";
    if (typeof type == "string" && type.includes(" ")) whatToPerform = "stringMultiAction";
    if (whatToPerform == "action" && type.substring(0,2) == "on") type = type.substring(2,type.length);
    if (whatToPerform == "action") type = type.toLowerCase();
    if (whatToPerform == "stringMultiAction") {
        type = type.split(" ");
        whatToPerform = "multiAction";
    }

    for (let i = 0; i < this.length; i++) {
        if (whatToPerform == 'action') {
            this[i].addEventListener(type,response);
        }
        if (whatToPerform == "multiAction") {
            for (let j = 0; j < type.length; j++) {
                this[i].addEventListener(type[j],response);
            }
        }
        if (whatToPerform == 'style') this[i].css(type);
        if (whatToPerform == 'innerHTML') this[i].innerHTML = response;
        if (whatToPerform == 'placeholder') this[i].placeholder = response;
        if (whatToPerform == 'src') this[i].src = response;
        if (whatToPerform == 'id') this[i].id = response;
        if (whatToPerform == 'class') this[i].className = response;
        if (whatToPerform == 'value') this[i].value = response;
        if (whatToPerform == 'classAdd') this[i].classList.add(response)
        if (whatToPerform == 'classRemove') this[i].classList.remove(response)
        if (whatToPerform == 'function') type(this[i]);
        if (whatToPerform == 'create') typeCreateDomReturnList.push(this[i].id.create(response));
    }
    if (typeCreateDomReturnList.length > 0) return typeCreateDomReturnList;
    else return this;
}

Object.prototype.css = function(obj) {
    for (let i = 0; i < Object.keys(obj).length; i++) {
        eval('this.style.' + Object.keys(obj)[i] + ' = "' + Object.values(obj)[i] + '"')
    }
}
Object.prototype.on = function(what,func) {
    this.length ? this.map(x => x.on(what,func)) : this.addEventListener(what,func);
    return this;
}
String.prototype.rnd = function(amt = false,l=[]) {
    for (let i = 0; i < amt; i++) {
        l.push(this.charAt(rnd(0,this.length - 1)));
    }
    return amt !== false ? l : this.charAt(rnd(0,this.length - 1));
}
Array.prototype.rnd = function(amt = false,l=[]) {
    for (let i = 0; i < amt; i++) {
        l.push(this[rnd(0,this.length - 1)]);
    }
    return amt !== false ? l : this[rnd(0,this.length - 1)];
}

/*
    Documentation
    getType(object,detailed) return a string of whatever the object is
    Detailed is set to false, if you set it too true it will give you a detailed explanation of the type
    All Types
    ------------
    number
    string
    array
    object
    boolean
    number
    function
    HTMLElement
    class
    symbol
    bigint
    null
    undefined
*/
function getType(ele,detailed = false) {
    if (ele == null || ele == undefined) {
        obj = {
            type: ele+"",
            value: ele,
        }
        return detailed ? obj : ele+"";
    }
    
    let returnName = ele.constructor.name;
    if (ele instanceof HTMLElement) returnName = "HTMLElement";
    if (isClass(ele)) returnName = "class";

    if (detailed) {
        let returnObj = {
            type: ele.constructor.name.toLowerCase(),
            detailedType: ele.constructor.name,
            constructor: ele.constructor,
            value: ele,
        }
        if (returnName == "HTMLElement") {
            returnObj.type = "htmlelement";
            returnObj.parent = ele.$P();
            returnObj.children = ele.children;
        }
        if (returnObj.type == "array" || returnObj.type == "string") {
            returnObj.length = ele.length;
        }
        if (returnObj.type == "string") {
            returnObj.isNumber = !isNaN(ele);

            if (ele.length == 1 && "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(ele)) {
                returnObj.isUpperCase = ele.toUpperCase() == ele;
                returnObj.isLowerCase = ele.toLowerCase() == ele;
            }
        }

        if (isClass(ele)) returnObj.type = "class";

        return returnObj;
    } else return returnName.toLowerCase();
}

function isClass(obj) {
    const isCtorClass = obj.constructor
        && obj.constructor.toString().substring(0, 5) === 'class'
    if(obj.prototype === undefined) {
      return isCtorClass
    }
    const isPrototypeCtorClass = obj.prototype.constructor 
      && obj.prototype.constructor.toString
      && obj.prototype.constructor.toString().substring(0, 5) === 'class'
    return isCtorClass || isPrototypeCtorClass
  }
//////////////////
//HOW TO USE RND//
//////////////////
//rnd(num) Returns random number 1 through your number
//rnd(num1,num2) Returns random number between first and second number
//
//rnd("color",none|"rgb"|"hex") Return random color (hex)
//rnd("abc"||"ABC"||"letter"||"LETTER"||"Abc"||"Letter") Return random letter from ABC. Captilized if string is
//////////////////

function rnd(num,to,exp) {
    if (!isNaN(num)) {
        while (true) {
            if (!to && to !== 0) {
                to = num;
                num = 1;
            }
            let finalNum = Math.floor((Math.random() * (to - num + 1)) + num);
            let checked = true; 
            if (exp) {
                if (!exp.length) exp = [exp];
                for (let i = 0; i < exp.length; i++) {
                    if (exp[i] == finalNum) checked = false;
                }
            }
            if (checked || !exp) return finalNum;
        }
    }

    if (typeof num == 'string') {
        if ((num.toLowerCase() == 'letter' || num.toLowerCase() == 'abc') && to !== false) {
            let abc = 'abcdefghijklmnopqrstuvwxyz';
            if (num === 'LETTER' || num === 'ABC') return abc.rnd().toUpperCase();
            if (num === 'Letter' || num === 'Abc') return rnd(2) == 2 ? abc.rnd().toUpperCase() : abc.rnd();
            return abc.rnd();
        }

        if (num == 'color') {
            if (to == 'hex' || !to) {
                let tool = '0123456789abcdef';
                return '#' + tool.rnd() + tool.rnd() + tool.rnd() + tool.rnd() + tool.rnd() + tool.rnd();
            }
            if (to == 'rgb') return 'rgb(' + rnd(0,255) + ',' + rnd(0,255) + ',' + rnd(0,255) + ')';

            return console.warn('Invalid Coler Format, try "hex" or "rgb"');
        }

        //Return Random Letter In String Num
        return num.rnd();
    }
    if (typeof num == 'object') {
        return num.rnd();
    }
}

/*
    Documentation

        --Create A Simple Div--
        create("div")

        --Give Classes And IDS--
        create("div #id .class")
            -Space Between Attributes
            Other Acceptable Ways To Write
            -id="id"
            -#=id
            -class="class"
        
        --Write InnerHTML--
        create("div>innerHTML");

        ------INPUTS--------
        Add Placeholders
        create("input placeholder=placeholder")
            -placeholderINSERTTEXT (Also acceptable Formating)
        
        Add input Types
        create("input type='checkbox')
            -typeTYPE (Also acceptable Formating)
    
*/
function create(ele,x = null) {
    return document.body.create(ele,x);
}
Object.prototype.create = function(elem,x = null) {
    let all = [];
    let type = false;
    class addition {
        constructor(obj) {
            this.names = obj.names.length ? obj.names : [obj.names];
            this.txt = '';
            this.on = false;
            this.control = obj.control;
            this.fix = obj.fix;
        }
    }
    all.push(new addition({
        names: ['#','id'],
        fix: function(ele) {
            ele.id = this.txt;
        },
    }))
    all.push(new addition({
        names: ['.','class'],
        fix: function(ele) {
            ele.className = this.txt;
        },
    }))
    all.push(new addition({
        names: ['type'],
        fix: function(ele) {
            ele.type = this.txt;
        },
    }))
    all.push(new addition({
        names: ['placeholder'],
        fix: function(ele) {
            ele.placeholder = this.txt;
        },
    }))
    let text = '';


    let element = '';
    let acceptable = [' ','>','.','#'];
    for (let i = 0; i < elem.length; i++) {
        if (elem.charAt(i) !== '<' && !acceptable.includes(elem.charAt(i))) element += elem.charAt(i);
        if (acceptable.includes(elem.charAt(i))) break;
    }
    for (let i = element.length; i < elem.length; i++) {
        let a = elem.charAt(i);

        let ban = ['<',' ','"',"'",'`','='];
        if (!ban.includes(a)) {
            all.forEach((e) => {
                let worked = e.names.length;
                let key = false;
                e.names.forEach((n) => {
                    let pass = true;
                    for (let k = 0; k < n.length; k++) {
                        if (elem.charAt(i+k) !== n.charAt(k)) {
                            pass = false;
                        }
                    }
                    if (!pass) worked--;
                    else key = n;
                });
                if (worked > 0) {
                    i += key.length - 1;
                    for (let j = i+1; j < elem.length; j++) {
                        if (!ban.includes(elem.charAt(j)) && !acceptable.includes(elem.charAt(j))) e.txt += elem.charAt(j);
                        if (acceptable.includes(elem.charAt(j))) {
                            i = j;
                            break;
                        }
                    }
                }
            })

            if(elem.charAt(i-1) == '>') {
                for (let j = i; j < elem.length; j++) {
                    text += elem.charAt(j);
                    i = j;
                }
            }
        }
    }

    let ele = document.createElement(element);
    all.forEach((e) => {
        if (e.txt) e.fix(ele);
    })
    if (text) ele.innerHTML = text;
    if (x !== null) {
    this.insertBefore(ele,this.children[x]);
    } else this.appendChild(ele);
    return ele;
}
/*
    Documentation

    --Repeat From 0 to x--
    repeat(x,(i) => {

    })
        -The Count Of The Loop Is Sent To The Functions Parameter

    --Start At Any Number--
    repeat(firstNum,LastNum,Function);

    --Repeat Through Arrays--
    let array = [1,2,3]
    repeat(array,(child,i) => {

    })
        -The Count of the loop, and the current child is sent to the functions Parameters;

    --Repeat Through Strings--
    let string = "abc"
    repeat(string,(child,i) => {
        
    })

    --Tips--

    -You Can Break a Loop by returning false in your functions

    --Inverting A List--
    Simply add a -1 parameter to the end of the repeat function to go backwards.
    repeat(count,function,-1)
        -You can do any number! It just controls the count of the loop. You can index by 2s and more!


    --Doing A While Loop--
    Setting First Parameter to true will make it iterate forever. Make sure to return false somewhere in the function.
    repeat(true,(iteration) => {

        return false;
    })
        -Iteration is passed to your functions parameters
        
*/
function repeat(count, func, func2, inverse = 1) {
    let startNum = 0;
    let countTo;
    let isInverse = inverse;
    let type = typeof count === 'string' ? 'string' : Array.isArray(count) ? 'array' : count === true ? 'while' : '';

    if (type === 'string' || type === 'array') {
        countTo = count.length;
    } else if (type === 'while') {
        let i = 0;
        while (true) {
            let resolve = func(i);
            if (resolve === false) break;
            i++;
        }
        return;
    } else {
        countTo = count;
    }

    if (func2 && typeof func2 === 'function') {
        startNum = count;
        isInverse = inverse;
        func = func2;
    }

    let iterator;
    if (isInverse > 0) {
        iterator = i => i < countTo;
    } else {
        iterator = i => i > startNum - 1;
    }

    for (let i = startNum; iterator(i); i += isInverse) {
        let wontKill = true;
        if (type === 'array') {
            wontKill = func(count[i], i);
        } else if (type === 'string') {
            wontKill = func(count.charAt(i), i);
        } else {
            wontKill = func(i);
        }
        if (wontKill === false) break;
    }
}
/*
    $MAP Documentation
    Example:
    let map = $MAP(5,5,function(i,j) {
        return i*j;
    });
    Example Written Out
    $MAP(height,width,(i,j) => { 
        let cell = null;
        return cell;
    })

*/
function $MAP(y,x=y,func = function() {return null}) {
    let map = [];
    for (let i = 0; i < y; i++) {
        let toPush = [];
        for (let j = 0; j < x; j++) {
            toPush.push(func(i,j))
        }
        map.push(toPush)
    }
    return map;
}


function s_shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
Array.prototype.shuffle = function() {
    return s_shuffle(this);
}
String.prototype.shuffle = function() {
    let arr = this.split('');
    let cop = '';
    let exp = [];
    for (let i = 0; i < arr.length; i++) {
        let num = rnd(0,arr.length-1,exp);
        let chosen = arr[num];
        exp.push(num)
        cop += chosen;
    }

    return cop;
}


Array.prototype.sum = function() {
    return this.reduce((total,num) => { return total + num; });
}
Array.prototype.avg = function() {
    return this.sum()/this.length;
}
Array.prototype.high = function() {
    return Math.max(...this);
}
Array.prototype.low = function() {
    return Math.min(...this);
}
Array.prototype.median = function () {
    return this.slice().sort((a, b) => a - b)[Math.floor(this.length / 2)];
};
Array.prototype.mode = function() {
    let a = this;
    return Object.values(
    a.reduce((count, i) => {
        if (!(i in count)) {
        count[i] = [0, i];
        }
        
        count[i][0]++;
        return count;
    }, {})
    ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
}

function clone(orig) {
    return Object.assign(Object.create(Object.getPrototypeOf(orig)),orig);
}

/*
    Example code:
    slog('.[background: green; color: red;]Hello World'); //Out puts a log that says "Hello World" in red with a green background.
*/
window.slog = function() {
    let final = 'console.log(';
    if (!arguments.length) arguments = [''];
    for (let k = 0; k < arguments.length; k++) {
        let texts = [];
        let addons = [];
        let text = '';
        let prev = false;
        let txt = arguments[k] + '';
        if (txt !== '<br>') {
            for (var i = 0; i < txt.length; i++) {
                if (txt.charAt(i) == '.' && txt.charAt(i + 1) == '[') {
                    if (prev) {
                        texts.push(text);
                        text = '';
                    }
                    i += 2;
                    let add = '';
                    for (var j = i; j < txt.length; j++) {
                        if (txt.charAt(j) == ']') {
                            addons.push(add);
                            i = j;
                            j = txt.length;
                        } else {
                            add += txt.charAt(j);
                        }
                    }
                    prev = true;
                } else {
                    text += txt.charAt(i);
                }
            }
            texts.push(text);
            if (addons.length > 0) {
                for (var i = 0; i < texts.length - k; i++) {
                    final += ' "%c' + texts[i] + '" +';
                }
            } else if (k > 0) {
                final += "'" + texts + "''";
            } else {
                final += "'" + texts + "''";
            }
            final = final.substring(0, final.length - 1);
            final += ',';
            for (var i = 0; i < addons.length; i++) {
                final += ' "' + addons[i] + '",';
            }   
            final = final.substring(0, final.length - 1);
            final += ',';
        } else {
            final += `"<br>",`;
        }
    }
    final = final.substring(0,final.length - 1) + ')';
    eval(final);
}
sloglibrary = function(v,n,c) {
slog('.[background: lightgreen; font-weight: bold; font-size: 14px; color: black]V' + v + ' Library .[background: lightgreen;font-weight: bold; font-size: 20px; color: black]' + n + '.[background: lightgreen;font-weight: bold; font-size: 14px; color: black] ' + c);
}
slogplugin = function(v,n,c) {
    slog('.[background: lightyellow; color: black;font-weight: bold; black;font-size: 14px]V' + v + ' Plugin .[background: lightyellow;font-weight: bold;color: black; font-size: 20px]' + n +'.[background: lightyellow;color: black;font-weight: bold; font-size: 14px] ' + c);
}
let includesString = "-Simple Includes: ";
slogIncludes = function(text) {
    slog(`.[font-size: 12px; background: silver; color: black;]${text}`)
}







/*
LS Version 3

Localstorage! LS object
ls.save(name, value)  -  Save any value (arrays, objects, numbers, strings) to a given name.
ls.get(name, result)  -  Returns the value of the name given, and if it can't find anything returns result.
ls.clear()  -  Deletes all items.
ls.delete(name)  -  Deletes that one item with given name.
ls.log()  -  Logs all the items in your Localstorage.
*/

window.ls = {
    uniqueID: false,
    setID: function(id) {
        ls.uniqueID = id;
    },
    save: function(saveName,whatToSave) {
        let add = ls.uniqueID ? "/ui/" + ls.uniqueID + "/ui/" : "";
        localStorage.setItem(add + saveName,JSON.stringify(whatToSave))
    },
    get: function(saveName,elseReturn = false,byPass) {
        let add = ls.uniqueID ? "/ui/" + ls.uniqueID + "/ui/" : "";
        if (byPass) add = "";
        
        if (localStorage.getItem(add+saveName) == null || localStorage.getItem(add+saveName) == undefined) return elseReturn;
        else if (localStorage.getItem(add+saveName) == "undefined") return undefined;
        else return JSON.parse(localStorage.getItem(add+saveName));
    },
    clear: function(deleteAll = false) {
        if (deleteAll) localStorage.clear();
        else {
            if (ls.uniqueID) {
                repeat(Object.keys(localStorage),(name,i) => {
                    if (name.includes("/ui/" + ls.uniqueID + "/ui/")) {
                        ls.delete(name,true)
                    }
                })
            } else
                console.warn("Local Storage: No uniqueID set, to delete all cookies write ls.clear(true), or set UniqueID by writing ls.setUniqueID(yourID)");
        }
    },
    delete: function(saveName,byPass) {
        let add = ls.uniqueID ? "/ui/" + ls.uniqueID + "/ui/" : "";
        if (byPass) add = "";
        localStorage.removeItem(add + saveName);
    },
    log: function(logAll = false) {
        if (!logAll) 
            if (ls.uniqueID) logAll = false;

        logAll ? slog(".[background:white;color:black;font-size:15px]LS is Logging All Storages") : slog(".[background:white;color:black;font-size:15px]LS is Logging '" + ls.uniqueID + "' Storage");
        
        if (logAll) {
            let groups = ls.getArrayOfMe();
            repeat(groups,(group,i) => {
                slog(`.[font-weight: bold;color:black;background:silver;font-size:10px]In Storage '${group.name}':`);
                repeat(group.storage,(obj,j) => {
                    console.log(obj.key + ": ",obj.value)
                })
            })
        } else {
            repeat(localStorage,(item,i) => {
                if (Object.keys(localStorage)[i].includes("/ui/" + ls.uniqueID + "/ui/")) {
                    console.log(Object.keys(localStorage)[i].split("/ui/" + ls.uniqueID + "/ui/")[1] + ": ", ls.get(Object.keys(localStorage)[i],false,true))
                }
            })
    
        }
    },
    facts: function() {
        let groups = ls.getArrayOfMe();

        var _lsTotal = 0,
            _xLen, _x;
        for (_x in localStorage) {
            if (!localStorage.hasOwnProperty(_x)) {
                continue;
            }
            _xLen = ((localStorage[_x].length + _x.length) * 2);
            _lsTotal += _xLen;
            let newObj = {
                key: _x.substring(0, 50),
                value: (_xLen / 1024).toFixed(2),
            }
            let within = false;
            if (newObj.key.includes("/ui/")) {
                within = newObj.key.split("/ui/")[1];
                newObj.key = newObj.key.split("/ui/")[2];
                
            }

            repeat(groups,(group,i) => {
                if (within && group.name !== within) {
                    return;
                }
                repeat(group.storage,(obj,j) => {
                    if (obj.key == newObj.key) {
                        obj.space = (_xLen / 1024).toFixed(2);
                        group.space += Number((_xLen / 1024).toFixed(2));
                    }
                })
            })
        };

        let TotalUsed = (_lsTotal / 1024).toFixed(2);
        let percent = Math.round((TotalUsed / 5000)*10000)/100;



        slog(".[background:white;color:black;font-size:15px]--LS FACTS--")
        slog("Total Storage: 5000 KB");
        slog("Total Used: " + TotalUsed + " KB (" + percent + "%)");
        repeat(groups,(group,i) => {
            slog(`.[font-weight: bold;color:black;background:silver;font-size:12px]Storage '${group.name}' uses ${group.space.toFixed(2)} KB:`);
            repeat(group.storage,(obj,j) => {
                console.log(obj.key + ": " + obj.space + " KB")
            })
        })
    },
    getArrayOfMe: function() {
        let groups = [{name:"General Storage",storage:[],space:0}];
        repeat(localStorage,(item,i) => {
            if (!Object.keys(localStorage)[i].includes("/ui/")) {
                groups[0].storage.push({
                    key: Object.keys(localStorage)[i],
                    value: ls.get(Object.keys(localStorage)[i],false,true),
                    space: 0,
                })
            } else {
                let foundGroup = false;
                let keyName = Object.keys(localStorage)[i].split("/ui/")[1]
                repeat(groups,(obj,i) => {
                    if (obj.name == keyName) foundGroup = i;
                })
                if (!foundGroup) {
                    groups.push({
                        name: keyName,
                        storage: [
                            {
                                key: Object.keys(localStorage)[i].split("/ui/")[2],
                                value: ls.get(Object.keys(localStorage)[i],false,true),
                                space: 0,
                            }
                        ],
                        space: 0,
                    })
                } else {
                    groups[foundGroup].storage.push(
                        {
                            key: Object.keys(localStorage)[i].split("/ui/")[2],
                            value: ls.get(Object.keys(localStorage)[i],false,true),
                            space: 0,
                        }
                    )
                }
            }
        })
        return groups;
    },
}
includesString += 'Local Storage V3';




/*
    ProTimer
    -Set Timers, Stop Timers
*/
class Timer {
    constructor() {
        this.times = [];
        this.laps = [];
        this.average = 0;
    }
    start = function() {
        this.times = [];
        this.laps = [];

        let timeNow = new Date();
        this.laps.push(timeNow.getTime());
    }
    lap = function(log) {
        let timeNow = new Date();
        this.times.push(timeNow.getTime() - this.laps[this.laps.length-1]);
        this.laps.push(timeNow.getTime());
        if (log) console.log("Lap: " + (this.laps.length-1) + ":",this.times[this.times.length-1],"ms")
        return this.times;
    }
    stop = function(log) {
        let timeNow = new Date();
        this.times.push(timeNow.getTime() - this.laps[this.laps.length-1]);
        if (log) console.log("Lap: " + this.laps.length + ":",this.times[this.times.length-1],"ms")
        return this.times;
    }
    
}

includesString += ', proTimer V1';

/*

-------------
-----DOM-----
-------------

domElement.fadeOut(speedInMS);
domElement.fadeIn(speedInMS);
domElement.hide();
domElement.show();
domElement.delete();
domElement.getSize() (Return width and height object)
domElement.slideIn("width"/"height",speedInMS);
domElement.slideOut("width"/"height",speedInMS);
domElement.hover(cssObj);

*/
/*
    _warning Documentation

    let a = new _warning({
        text: "hey", -Optional popup text
        time: [miliseconds], -Optional time popup is on screen
        fade: true/false, -Optional if popup fades in and out
        speed: [miliseconds], -Optional speed of fade in and out
        css: {}"css", -Optional Control CSS
    });
    a.show("I'm A Bunny, And I really like to dance");

    _warning.show(text [string] optional, time [milliseconds] optional);
*/

class _warning {
    constructor(obj = {}) {
        if (obj.css)
            this.css = obj.css;
        
        this.css.color = obj.css.color ?? "white";
        this.css.background = obj.css.background ? obj.css.background : "#414141ee";
        this.css.borderRadius = obj.css.borderRadius ? obj.css.borderRadius : "5px";
        this.css.width = obj.css.width ? obj.css.width : "80%";
        this.css.maxWidth = obj.css.maxWidth ? obj.css.maxWidth : "500px";
        this.css.height = obj.css.height ? obj.css.height : "";
        this.css.padding = obj.css.padding ? obj.css.padding : "5px";
        this.css.position = obj.css.position ? obj.css.position : "fixed";
        this.css.left = obj.css.left ? obj.css.left : 0;
        this.css.right = obj.css.right ? obj.css.right : 0;
        this.css.bottom = obj.css.bottom ? obj.css.bottom : "50px";
        this.css.top = obj.css.top ? obj.css.top : "";
        this.css.margin = obj.css.margin ? obj.css.margin : "auto";
        this.css.textAlign = obj.css.textAlign ? obj.css.textAlign : "center";
        this.css.lineHeight = obj.css.lineHeight ?? (obj.css.height ?? "");
        this.css.fontSize = obj.css.fontSize ? obj.css.fontSize : "20px";
        this.css.opacity = obj.css.opacity ? obj.css.opacity : 0;
            
        
        this.text = obj.text ? obj.text : "";
        this.time = obj.time ? obj.time : 1000;
        this.fade = obj.fade ? obj.fade : true;
        this.speed = obj.speed ? obj.speed : 5000;
        if (!this.fade) {
            this.css.opacity = obj.opacity ? obj.opacity : 1;
        }
        this.css.transition =  obj.transition ? obj.transition : "all " + (this.speed/10000) + "s ease-in-out";

    }
    show(text = this.text,time = this.time) {
        this.div = document.body.create("div");
        this.div.css(this.css);
        this.div.css({
            zIndex: 1000,
        })
        this.div.innerHTML = text;

        let div = this.div;
        if (this.fade) {
            setTimeout(function() {
                div.style.opacity = 1;
                
            },1)
        }
        
        let ele = this;
        setTimeout(function() {
            
            if (ele.fade) {
                setTimeout(function() {
                    div.style.opacity = 0;
                    
                    setTimeout(function() {
                        ele.hide();
                    },ele.speed)
                },1)
            } else {
                ele.hide();
            }
        },time)
    }
    hide() {
        this.div.remove();
    }
}


Object.prototype.fadeOut = function(ms = 1000,whatHappensToMe = "hidden") {
    let element = this;
    this.css({
        transition: "opacity " + (ms/1000) + "s",
        opacity: 1, 
    })

    setTimeout(function() {
        element.css({
            opacity: 0,
        })
        setTimeout(function() {
            element.css({
                visibility: whatHappensToMe,
            })
        },ms)
    },1)
}
Object.prototype.fadeIn = function(ms = 1000,whatHappensToMe = "visible") {
    let element = this;
    this.css({
        transition: "opacity " + (ms/1000) + "s",
        opacity: 0, 
        visibility: whatHappensToMe,
    })

    setTimeout(function() {
        element.css({
            opacity: 1,
        })
    },1)
}
Object.prototype.show = function(as = "block") {
    this.style.display = as;
}
Object.prototype.hide = function() {
    this.style.display = "none";
}
Object.prototype.delete = function() {
    this.remove();
}
Object.prototype.getSize = function() {
    let node = this.cloneNode();

    node.style.transition = "";
    node.style.maxWidth = window.innerWidth + "px";
    node.style.maxHeight = window.innerHeight + "px";
    node.style.visibility = "visible";

    document.body.appendChild(node)

    let object = {
        width: node.offsetWidth,
        height: node.offsetHeight,
    }
    
    node.delete();

    return object;
} 


Object.prototype.slideOut = function(where = "width",speedMS = 500) {
    let whatToTransition = "max-" + where;

    let element = this;
    this.css({
        transition: whatToTransition + " " + (speedMS/1000) + "s",
    })

    if (whatToTransition == "max-width") this.style.maxWidth = this.offsetWidth + "px";
    else this.style.maxHeight = this.offsetHeight + "px";

    setTimeout(function() {
        if (whatToTransition == "max-width") element.style.maxWidth = "0px";
        else element.style.maxHeight = "0px";

        setTimeout(function() {
            element.css({
                visibility: "hidden",
            })
        },speedMS)
    },1)
}
Object.prototype.slideIn = function(where = "width",speedMS = 500) {
    let whatToTransition = "max-" + where;

    let element = this;
    this.css({
        transition: whatToTransition + " " + (speedMS/1000) + "s",
        visibility: "visible",
    })

    if (whatToTransition == "max-width") {
        this.style.maxWidth = "0px";
        this.style.maxHeight = "100%";
    } else {
        this.style.maxHeight = "0px";
        this.style.maxWidth = "100%";
    } 

    setTimeout(function() {
        if (whatToTransition == "max-width") element.style.maxWidth = element.getSize().width + "px";
        else element.style.maxHeight = element.getSize().height + "px";
    },1)
}
Object.prototype.hover = function(obj) {
    this.hoverSaves = this.hoverSaves ? this.hoverSaves : [];
    for (let i = 0; i < Object.keys(obj).length; i++) {
        this.hoverSaves.push({
            key: Object.keys(obj)[i],
            value: eval("this.style." + Object.keys(obj)[i]),
            newVal: Object.values(obj)[i]
        })
    }
    this.on('mouseover',function() {
        for (let i = 0; i < this.hoverSaves.length; i++) {
            eval('this.style.' + this.hoverSaves[i].key + ' = "' + this.hoverSaves[i].newVal + '"')
        }
    });
    this.on('mouseout',function(obj) {
        for (let i = 0; i < this.hoverSaves.length; i++) {
            eval('this.style.' + this.hoverSaves[i].key + ' = "' + this.hoverSaves[i].value + '"')
        }
    });
}

includesString += ', DOM V1';

/*
    Currently Working:
    innerHTML
    placeholder
    src
    id
    className
    href
    title
    disabled
    checked
    alt
    target
    type
    size
    pattern

    Cant Work:
    Value
    maxlength

    Havent Attemped:
    style
    min
    max
    rows
    cols
    readonly
    contenteditable
    data-*
    download
    rel
    autocomplete
    autofocus
    controls
    form
    formaction
    formenctype
    formmethod
    formtarget
    muliple
    required
    tabindex
    translate
    aria-*
    lang
    scrolling
    sandbox
    charset
    defer
    async
    integrity
    media
    sizes
    usemap
    datetime
    poster
    loop
    muted
    preload
    open
    label
    selected
    wrap
*/


Object.defineProperty(Array.prototype, 'pattern', {
    get: function() {
        // When accessing the property, return the innerHTML of the first element
        return this[0] ? this[0].pattern : '';
    },
    set: function(pattern) {
        // When setting the property, set innerHTML for all elements in the array
        this.forEach(element => {
            if (element) {
                element.pattern = pattern;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'size', {
    get: function() {
        // When accessing the property, return the innerHTML of the first element
        return this[0] ? this[0].size : '';
    },
    set: function(size) {
        // When setting the property, set innerHTML for all elements in the array
        this.forEach(element => {
            if (element) {
                element.size = size;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'innerHTML', {
    get: function() {
        // When accessing the property, return the innerHTML of the first element
        return this[0] ? this[0].innerHTML : '';
    },
    set: function(html) {
        // When setting the property, set innerHTML for all elements in the array
        this.forEach(element => {
            if (element) {
                element.innerHTML = html;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'placeholder', {
    get: function() {
        // When accessing the property, return the placeholder attribute of the first element
        return this[0] ? this[0].placeholder : '';
    },
    set: function(placeholder) {
        // When setting the property, set the placeholder attribute for all elements in the array
        this.forEach(element => {
            if (element && element.tagName.toLowerCase() === 'input') {
                element.placeholder = placeholder;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'value', {
    get: function() {
        // When accessing the property, return the value property of the first element
        return this[0] ? this[0].value : '';
    },
    set: function(value) {
        // When setting the property, set the value property for all elements in the array
        this.forEach(element => {
            if (element && typeof element.value !== 'undefined') {
                element.value = value;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'id', {
    get: function() {
        // When accessing the property, return the value property of the first element
        return this[0] ? this[0].id : '';
    },
    set: function(id) {
        // When setting the property, set the value property for all elements in the array
        this.forEach(element => {
            if (element && typeof element.id !== 'undefined') {
                element.id = id;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'className', {
    get: function() {
        // When accessing the property, return the value property of the first element
        return this[0] ? this[0].class : '';
    },
    set: function(className) {
        // When setting the property, set the value property for all elements in the array
        this.forEach(element => {
            if (element && typeof element.className !== 'undefined') {
                element.className = className;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'href', {
    get: function() {
        // When accessing the property, return the value property of the first element
        return this[0] ? this[0].class : '';
    },
    set: function(href) {
        // When setting the property, set the value property for all elements in the array
        this.forEach(element => {
            if (element && typeof element.href !== 'undefined') {
                element.href = href;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'title', {
    get: function() {
        // When accessing the property, return the value property of the first element
        return this[0] ? this[0].class : '';
    },
    set: function(title) {
        // When setting the property, set the value property for all elements in the array
        this.forEach(element => {
            if (element && typeof element.title !== 'undefined') {
                element.title = title;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'disabled', {
    get: function() {
        // When accessing the property, return the value property of the first element
        return this[0] ? this[0].class : '';
    },
    set: function(disabled) {
        // When setting the property, set the value property for all elements in the array
        this.forEach(element => {
            if (element && typeof element.disabled !== 'undefined') {
                element.disabled = disabled;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'checked', {
    get: function() {
        // When accessing the property, return the value property of the first element
        return this[0] ? this[0].class : '';
    },
    set: function(checked) {
        // When setting the property, set the value property for all elements in the array
        this.forEach(element => {
            if (element && typeof element.checked !== 'undefined') {
                element.checked = checked;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'alt', {
    get: function() {
        // When accessing the property, return the value property of the first element
        return this[0] ? this[0].class : '';
    },
    set: function(alt) {
        // When setting the property, set the value property for all elements in the array
        this.forEach(element => {
            if (element && typeof element.alt !== 'undefined') {
                element.alt = alt;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'target', {
    get: function() {
        // When accessing the property, return the value property of the first element
        return this[0] ? this[0].class : '';
    },
    set: function(target) {
        // When setting the property, set the value property for all elements in the array
        this.forEach(element => {
            if (element && typeof element.target !== 'undefined') {
                element.target = target;
            }
        });
    }
});
Object.defineProperty(Array.prototype, 'type', {
    get: function() {
        // When accessing the property, return the value property of the first element
        return this[0] ? this[0].class : '';
    },
    set: function(type) {
        // When setting the property, set the value property for all elements in the array
        this.forEach(element => {
            if (element && typeof element.type !== 'undefined') {
                element.type = type;
            }
        });
    }
});

//Lorem
let lorem_elements = $("<lorem");
if (!lorem_elements.length) lorem_elements = [lorem_elements];
for (let i = 0; i < lorem_elements.length; i++) {
    let wordCount = 50;
    let paragraphs = 1;
    if (lorem_elements[i].id) {
        let idSplit = lorem_elements[i].id.split(",")
        wordCount = Number(idSplit[0]);
        if (idSplit[1]) paragraphs = Number(idSplit[1]);
    }

    
    lorem_elements[i].innerHTML = lorem(Number(wordCount),Number(paragraphs));
}



function lorem(words,paragraphs=1) {
    let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet lectus proin. Urna nunc id cursus metus aliquam. Vitae justo eget magna fermentum iaculis eu non. Phasellus faucibus scelerisque eleifend donec. Accumsan tortor posuere ac ut consequat semper viverra. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Consectetur a erat nam at lectus urna duis. In iaculis nunc sed augue. Purus sit amet luctus venenatis lectus magna fringilla urna porttitor. Mi eget mauris pharetra et ultrices neque. Id interdum velit laoreet id donec ultrices tincidunt arcu. Pharetra sit amet aliquam id diam. Ac turpis egestas maecenas pharetra convallis posuere morbi. Convallis posuere morbi leo urna molestie at elementum eu.'
    let textSplit = text.split(" ");
    let returnText = "";
    let count = 0;
    let whenToSplitCount = 0;
    let WhenToSplit = Math.round(words/paragraphs);
    let capitalize = false;

    repeat(words,(i) => {
        let word = textSplit[count];
        if (capitalize) {
            word = word.charAt(0).toUpperCase() + word.substring(1,word.length);
            capitalize = false;

            if (word.charAt(word.length-1) == ".") word = word.substring(0,word.length-1)
        }
        returnText += word + " ";

        if (whenToSplitCount == WhenToSplit && paragraphs !== 1) {
            returnText = returnText.substring(0,returnText.length-1) + '.<br><br>'
            whenToSplitCount = 0;
            capitalize = true;
        }

        count++;
        whenToSplitCount++;
        if (count > textSplit.length) count = 0;
    })
    return returnText;
}

/*
    c Documentation

*/

let c_listOfSensors = [];
function c(selector,css) {
    if (!$(".javaScriptStyleTags")) $("<head").create("<style .javaScriptStyleTags");

    //Get Selector String
    let selectorString = _css_generateSelectorString(selector);

    //IF Css Is Provided Then Chagne Attributes
    if (css) {
        //Get Attributes String
        let attributes = _css_generateAttributesString(css);
        //Write CSS
        $(".javaScriptStyleTags").innerHTML += `
        ${selectorString} {
            ${attributes}}`
    }
    
    let obj = {
        selectorString: selectorString,
        css: css,
        selection: function(css) {
            //Get Attributes String
            let attributes = _css_generateAttributesString(css)
    
            $(".javaScriptStyleTags").innerHTML += `${this.selectorString}::selection {
                ${attributes}}`
            
            return this;
        },
        placeholder: function(css) {
            //Get Attributes String
            let attributes = _css_generateAttributesString(css)
    
            $(".javaScriptStyleTags").innerHTML += `${this.selectorString}::placeholder {
                ${attributes}}`
            
            return this;
        },
        hover: function(css,time) {
            //Get Attributes String
            let attributes = _css_generateAttributesString(css)

            if (!time) {
                $(".javaScriptStyleTags").innerHTML += `${this.selectorString}:hover {
                    ${attributes}}`
            } else {
                let animationName = _css_makeAnimation(this.css,css,time);
                //Set Hover To Animation
                $(".javaScriptStyleTags").innerHTML += `
                    ${this.selectorString}:hover {
                        animation: ${animationName} ${time/1000}s 1;
                    }
                `
            }
            
            return this;
        },
        hoverC: function(selector,css,time) {
            let className = rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter");
            //Also Create a Class To Play Said Animation
            $(".javaScriptStyleTags").innerHTML += `
                .${className + "Class"} {
                    ${_css_generateAttributesString(css)}
                }
            `
            let searchingFor = selectorString;
            
            document.on("mousemove",function(e) {
                if (_css_onTestIfAccurrate(e.target,searchingFor)) {
                    $(selector).classAdd(className + "Class")
                } else {
                    $(selector).classRemove(className + "Class")

                }
            })

            return this;
        },
        toggle: function(type,css) {
            let searchingFor  = selectorString;
            let css2 = this.css;
            document.on(type,function(e) {
                if (_css_onTestIfAccurrate(e.target,searchingFor)) {
                    if (e.target.c_toggled == false || e.target.c_toggled == undefined) {
                        e.target.c_toggled = true;
                        e.target.css(css)
                    } else {
                        e.target.c_toggled = false;
                        e.target.css(css2)
                    }
                }
            })

            return this;
        },
        on: function(type,css,time) {
            if (!time) {
                let searchingFor  = selectorString;

                searchingFor = "#.".includes(searchingFor.charAt(0)) ? searchingFor : "<" + searchingFor;
                let elements = $(searchingFor);
                if (!elements.length) elements = [elements];
                for (let i = 0; i < elements.length; i++) {
                    let effect = elements[i];
                    if (elements[i] == $("<body")) elements[i] = document;

                    elements[i].on(type,function(e) {
                        effect.css(css)
                    })
                }
                c_listOfSensors.push({
                    css: css,
                    type: type,
                    selector: selectorString,
                })
            } else {
                let animationName = _css_makeAnimation(this.css,css,time);

                let searchingFor = selectorString;
                document.on(type,function(e) {
                    if (_css_onTestIfAccurrate(e.target,searchingFor)) {
                        let target = e.target;
                        if (_css_onTestIfAccurrate(e.target,searchingFor) == "body") target = $("<body")

                        target.classAdd(animationName + "Class");
                        setTimeout(function() {
                            target.classRemove(animationName + "Class")
                        },time)
                    }
                })
            }

            
            return this;
        },
        onC: function(type,selector,css) {

            let searchingFor = this.selectorString;
            searchingFor = "#.".includes(searchingFor.charAt(0)) ? searchingFor : "<" + searchingFor;
            let elements = $(searchingFor);
            if (!elements.length) elements = [elements];
            
            for (let i = 0; i < elements.length; i++) { 
                if (!elements[i]._css_OnOthers) elements[i]._css_OnOthers = [];
                elements[i]._css_OnOthers.push({
                    whoDoIEffect: selector,
                    css: css,
                    type: type,
                });
                elements[i].on(type,function(e) {
                    for (let i = 0; i < this._css_OnOthers.length; i++) {
                        if (this._css_OnOthers[i].type == type) {
                            let thisEvent = this._css_OnOthers[i];
                            let target = $(thisEvent.whoDoIEffect);
                            target.each(thisEvent.css)
                        }
                    }
                })
            }

            c_listOfSensors.push({
                css: css,
                type: type,
                selector: selectorString,
                whoDoIEffect: selector,
            })

            
            return this;
        },
    }

    return obj;
}
function _css_testNewElements(elementTag,element) {
    for (let i = 0; i < c_listOfSensors.length; i++) {

        let searchingFor = c_listOfSensors[i].selector;
        let passed = false;
        switch (searchingFor.charAt(0)) {
            case "#":
                if (element.id == searchingFor.substring(1,searchingFor.length)) passed = true;
                break;
            case ".":
                if (element.classList.contains(searchingFor.substring(1,searchingFor.length))) passed = true;
                break;
            default:
                if (elementTag.toLowerCase() == searchingFor.toLowerCase()) passed = true;
                break;
        }

        if (passed) {
            if (c_listOfSensors[i].whoDoIEffect) {

                if (!element._css_OnOthers) element._css_OnOthers = [];
                element._css_OnOthers.push({
                    whoDoIEffect: c_listOfSensors[i].whoDoIEffect,
                    css: c_listOfSensors[i].css,
                    type: c_listOfSensors[i].type,
                });

                element.on(c_listOfSensors[i].type,function(e) {
                    for (let i = 0; i < this._css_OnOthers.length; i++) {
                        if (this._css_OnOthers[i].type == c_listOfSensors[i].type) {
                            let thisEvent = this._css_OnOthers[i];
                            let target = $(thisEvent.whoDoIEffect);
                            target.each(thisEvent.css)
                        }
                    }
                })
            } else {
                element.on(c_listOfSensors[i].type,function(e) {
                    element.css(c_listOfSensors[i].css)
                })

            }
        }
    }
}
function _css_makeAnimation(oldCSS,newCSS,time) {
    let animationName = rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter") + rnd("Letter");
    
    let activeTime,transitionTime = 0,totalTime,longPercent,shortPercent;
    totalTime = time;

    if (oldCSS) {
        repeat(Object.keys(oldCSS),(key,i) => {
            if (key == "transition") {
                let values = Object.values(oldCSS)[i].split(" ");
                if (values[0] !== "all") return false;

                transitionTime = Number(values[1].substring(0,values[1].length-1))*1000;
                
                return false;
            }
        })
    }

    activeTime = totalTime - (transitionTime*2);

    longPercent = (activeTime*100)/totalTime;
    shortPercent = (transitionTime*100)/totalTime;

    let time1=0,time2=shortPercent,time3=100-shortPercent,time4=100;

    let useAttributes = {};
    repeat(Object.keys(newCSS),(key,i) => {
        eval("useAttributes." + key + " = '" + Object.values(newCSS)[i] + "'");
    })
    attributes = _css_generateAttributesString(useAttributes)

    //Create An Animation
    $(".javaScriptStyleTags").innerHTML += `
        @keyframes ${animationName} {
            ${time1}% {}
            ${time2}% {${attributes}}
            ${time3}% {${attributes}}
            ${time4}% {}
        }
    `
    //Also Create a Class To Play Said Animation
    $(".javaScriptStyleTags").innerHTML += `
        .${animationName + "Class"} {
            animation: ${animationName} ${time/1000}s 1;
        }
    `

    return animationName;
}
function _css_onTestIfAccurrate(target,searching) {
    let isAccurate = false;

    if (searching.charAt(0) == "#") {
        if (target.id == searching.substring(1,searching.length)) isAccurate = true;
    }
    if (searching.charAt(0) == ".") {
        if (target.className == searching.substring(1,searching.length)) isAccurate = true;
    }
    if (!"#.".includes(searching.charAt(0))) {
        if (getType(target,true).constructor.name.toLowerCase().includes(searching)) isAccurate = true;

        if (getType(target,true).constructor.name.toLowerCase() == "htmlhtmlelement" && searching == "body") isAccurate = "body";
    }


    return isAccurate;
}
function _css_generateSelectorString(string) {
    let newList = [];
    let kids = string.split(",");
    repeat(kids,(str,i) => {
        if (str.includes("![")) {
            let substring = "";
            let text = "";
            let isText = false;
            repeat(str,(char,i) => {
                if (char == "!") {
                    return true;   
                }
                if (char == "[") {
                    isText = true;
                    return true;
                }
                if (char == "]" && isText) {
                    return false;
                }
                if (isText)
                    text += char;
                else
                    substring += char;
            })
            if (getType(text,true).isNumber === true) {
                str = substring + ":nth-child(" + (Number(text) + 1) + ")";
            } else {
                if (text == "firstchild") text = "first-child";
                if (text == "first child") text = "first-child";
                if (text == "lastchild") text = "last-child";
                if (text == "last child") text = "last-child";
                str = substring + ":" + text;
            }

        }

        newList.push(str)
    })
    return newList.join(",");
}
function _css_generateAttributesString(obj) {
    let attribute = '';
    repeat(Object.keys(obj),(key,i) => {
        let value = Object.values(obj)[i];
        let shouldIskipAddingValue = false;

        if (key == "scan_boxShadow") {
            key = "box-shadow";
            value += "";
            let valueSplit = value.split(" ");
            value = scan_boxShadow_list[Number(valueSplit[0])];
        }
        checkingPaddingAndMargin: if (key.includes("padding") || key.includes("margin")) {
            let firstString;
            let stringCount;
            if (key.includes("padding")) firstString = "padding";
            if (key.includes("margin")) firstString = "margin";
            stringCount = firstString.length;
            if (key.length <= stringCount) break checkingPaddingAndMargin;

            let lrtb = ["left","right","top","bottom"];
            let myList = [];
            let string = '';
            shouldIskipAddingValue = true;

            for (let i = stringCount; i < key.length; i++) {
                let char = key.charAt(i).toLowerCase();
                string += char;

                if (lrtb.includes(string)) {
                    myList.push(string);
                    string = "";
                }
            }

            for (let i = 0; i < myList.length; i++) {
                attribute += `${firstString}-${myList[i]}: ${value};
                `
            }

            
        }

        //Fixing Hyphonated Cases like backgroundColor to background-color;
        let correctKey = "";
        repeat(key,(char,i) => {
            if (getType(char,true).isUpperCase) {
                correctKey += "-" + char.toLowerCase();
            } else
                correctKey += char;
        })
        key = correctKey;
        
        //Add Attributes
        if (!shouldIskipAddingValue)
            attribute += `${key}: ${value};
        `
    })

    return attribute;
}

// Function to observe DOM mutations
function observeDOMChanges(callback) {
    // Create a new observer instance
    const observer = new MutationObserver(mutationsList => {
        // Loop through the mutations
        mutationsList.forEach(mutation => {
            // Check if nodes were added
            if (mutation.type === 'childList') {
                // Loop through the added nodes
                mutation.addedNodes.forEach(node => {
                    // Check if the added node is an element
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Call the callback function with the added element
                        callback(node.tagName.toLowerCase(),node);
                    }
                });
            }
        });
    });

    // Start observing the DOM with specific configuration
    observer.observe(document.body, { childList: true, subtree: true });
}

// Example usage
observeDOMChanges((newElementTag,node) => {
    _css_testNewElements(newElementTag,node);
});



// /https://getcssscan.com/css-box-shadow-examples
let scan_boxShadow_list = ["rgba(149, 157, 165, 0.2) 0px 8px 24px","rgba(100, 100, 111, 0.2) 0px 7px 29px 0px","rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px","rgba(0, 0, 0, 0.35) 0px 5px 15px","rgba(0, 0, 0, 0.16) 0px 1px 4px","rgba(0, 0, 0, 0.24) 0px 3px 8px","rgba(99, 99, 99, 0.2) 0px 2px 8px 0px","rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px","rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px","rgba(0, 0, 0, 0.1) 0px 4px 12px","rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px","rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px","rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px","rgba(17, 12, 46, 0.15) 0px 48px 100px 0px","rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset","rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px","rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px","rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px","rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px","rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px","rgb(38, 57, 77) 0px 20px 30px -10px","rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset","rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px","rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px","rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px","rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset","rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px","rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px","rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px","rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px","rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px","rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px","rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px","rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px","rgba(0, 0, 0, 0.05) 0px 0px 0px 1px","rgba(0, 0, 0, 0.05) 0px 1px 2px 0px","rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px","rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px","rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px","rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px","rgba(0, 0, 0, 0.25) 0px 25px 50px -12px","rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset","rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px","rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px","rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px","rgba(0, 0, 0, 0.2) 0px 18px 50px -10px","rgba(0, 0, 0, 0.1) 0px 10px 50px","rgba(0, 0, 0, 0.04) 0px 3px 5px","rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px","rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px","rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px","rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px","rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em","rgba(0, 0, 0, 0.1) 0px 1px 2px 0px","rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset","rgba(3, 102, 214, 0.3) 0px 0px 0px 3px","rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px","rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset","rgba(0, 0, 0, 0.15) 0px 5px 15px 0px","rgba(33, 35, 38, 0.1) 0px 10px 10px -10px","blue 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px, rgb(31, 193, 27) 10px -10px, rgb(255, 255, 255) 20px -20px 0px -3px, rgb(255, 217, 19) 20px -20px, rgb(255, 255, 255) 30px -30px 0px -3px, rgb(255, 156, 85) 30px -30px, rgb(255, 255, 255) 40px -40px 0px -3px, rgb(255, 85, 85) 40px -40px","rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px","rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset","rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px","rgba(17, 17, 26, 0.1) 0px 1px 0px","rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px","rgba(17, 17, 26, 0.1) 0px 0px 16px","rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px","rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px","rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px","rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px","rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px","rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px","rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px","rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px","rgba(0, 0, 0, 0.15) 0px 3px 3px 0px","rgba(0, 0, 0, 0.08) 0px 4px 12px","rgba(0, 0, 0, 0.15) 0px 2px 8px","rgba(0, 0, 0, 0.18) 0px 2px 4px","rgba(0, 0, 0, 0.1) -4px 9px 25px -6px","rgba(0, 0, 0, 0.2) 0px 60px 40px -7px","rgba(0, 0, 0, 0.4) 0px 30px 90px","rgba(0, 0, 0, 0.56) 0px 22px 70px 4px","rgba(0, 0, 0, 0.2) 0px 20px 30px","rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px","rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset","rgba(0, 0, 0, 0.09) 0px 3px 12px","rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px","rgba(0, 0, 0, 0.45) 0px 25px 20px -20px","rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset","rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset","rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset","rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px","rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"];

includesString += ', C V1';


sloglibrary(15.5,'Simple','JoeTheHobo');
slogIncludes(includesString)
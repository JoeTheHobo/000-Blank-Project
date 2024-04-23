class Canvas {
    constructor(dom,obj = {}) {
        this.canvas = dom ?? create("canvas");
        this.ctx = this.canvas.getContext('2d');

        if (obj.width) {
            if (obj.width == "100%") obj.width = window.innerWidth;
            this.canvas.width = obj.width;
            this.canvas.style.width = obj.width + "px";
        }
        if (obj.height) {
            if (obj.height == "100%") obj.height = window.innerHeight;
            this.canvas.height = obj.height;
            this.canvas.style.height = obj.height + "px";
        }
        if (obj.background) {
            this.canvas.css({background: obj.background});
        }

        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;

        this.outline = obj.outline ?? false;
        this.outlineColor = obj.outlineColor ?? "red";
        this.outlineLineWidth = obj.outlineLineWidth ?? 2;
    }
    start(func,fps = 1000/60) {
        this.interval = setInterval(function() {
            func();
        },fps)
    }
    stop() {
        clearInterval(this.interval);
    }
    clear() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    render(object) {
        _render(this,object,this.canvas.width,this.canvas.height);
    }
}
function _render(main,object,mainWidth,mainHeight) {
    let ctx = main.ctx;
    let objX = object.pos.x;
    let objY = object.pos.y;

    let positionType = object.position;
    let positionY = object.positionY;
    let positionX = object.positionX;

    if (positionType == 'absolute') {
        if (object.left !== false) {
            objX = (object.width/2) + object.left;
        }
        if (object.right !== false) {
            objX = (mainWidth+(object.width/2)) - object.right;
        }
        if (object.top !== false) {
            objY = (object.height/2)+object.top;
        }
        if (object.bottom !== false) {
            objY = (mainHeight+(object.height/2)) - object.bottom;
        }
    }
    if (positionX == "absolute") {
        if (object.left !== false) {
            objX = (object.width/2) + object.left;
        }
        if (object.right !== false) {
            objX = (mainWidth+(object.width/2)) - object.right;
        }
    }
    if (positionY == "absolute") {
        if (object.top !== false) {
            objY = (object.height/2)+object.top;
        }
        if (object.bottom !== false) {
            objY = (mainHeight+(object.height/2)) - object.bottom;
        }
    }

    let correctX,correctY;

    if (positionType == "relative") {
        correctX = objX + main.centerX;
        correctY = objY + main.centerY;
    }
    if (positionType == "absolute") {
        correctX = objX;
        correctY = objY;
    }
    if (positionX == "absolute") {
        correctX = objX;
    }
    if (positionY == "absolute") {
        correctY = objY;
    }

    let objWidth = object.width;
    let objHeight = object.height;

    if (object.alignX == "center") {
        correctX -= (objWidth/2);
    }
    if (object.alignX == "right") {
        correctX -= (objWidth);
    }
    if (object.alignY == "center") {
        correctY -= (objHeight/2);
    }
    if (object.alignY == "bottom") {
        correctY -= (objHeight);
    }


    object.render(ctx,correctX,correctY);

    if (main.outline) {
        ctx.strokeStyle = main.outlineColor;
        ctx.lineWidth = main.outlineLineWidth;
        ctx.strokeRect(correctX,correctY,objWidth,objHeight);
    }
}
class renderObject {
    constructor(obj = {}) {
        this.pos = {
            x: 0,
            y: 0,
        }
        if (obj.pos) {
            if (obj.pos.x) this.pos.x = obj.pos.x;
            if (obj.pos.y) this.pos.y = obj.pos.y;
        }

        this.position = obj.position ?? "relative";
        this.positionX = obj.positionX ?? this.position;
        this.positionY = obj.positionY ?? this.position;

        this.left = obj.left ?? false;
        this.right = obj.right ?? false;
        this.bottom = obj.bottom ?? false;
        this.top = obj.top ?? false;

        
        this.width = obj.width ?? 0;
        this.height = obj.height ?? 0;

        let align = (obj.alignX ?? "center") + " " + (obj.alignY ?? "center");
        this.align = obj.align ?? align;
        this.alignX = this.align.split(" ")[0];
        this.alignY = this.align.split(" ")[1];

    }
}
class Module extends renderObject {
    constructor(obj) {
        super(obj);
        this.kids = [];
        
        
        this.outline = obj.outline ?? false;
        this.outlineColor = obj.outlineColor ?? "red";
        this.outlineLineWidth = obj.outlineLineWidth ?? 2;
    }
    add(ele) {
        this.kids.push(ele)
    }
    render(ctx,x,y) {
        let module = this;
        module.centerX = x;
        module.centerY = y;
        module.ctx = ctx;
        repeat(this.kids,(object) => {
            _render(module,object,module.width,module.height);
        })
    }
}
class Shape extends renderObject {
    constructor(obj) {
        super(obj);

        this.stroke = obj.stroke ?? false;
        this.strokeStyle = obj.strokeStyle ??"black";
        this.lineWidth  = obj.lineWidth ?? 1;
        this.fillStyle = obj.fillStyle ?? "black";
        this.fill = obj.fill ?? true;

        this.borderRadius = obj.borderRadius ?? 0;

    }
}
Object.prototype.offset = function() {
    const rect = this.getBoundingClientRect()
    return {
    	top: rect.top + window.scrollY,
    	left: rect.left + window.scrollX,
    }
}
var getTextHeight = function(font) {

    var text = create('span>Hg');
    text.css({ font: font });
    var block = create('div');
    block.css({
        display: "inline-block",
        width: "1px",
        height: "0px",
    })
  
    var div = create('div')
    div.appendChild(text);
    div.appendChild(block)
  
    var body = document.body;
    body.appendChild(div);
  
    try {
  
      var result = {};
  
      block.css({ verticalAlign: 'baseline' });
      result.ascent = block.offset().top - text.offset().top;
  
      block.css({ verticalAlign: 'bottom' });
      result.height = block.offset().top - text.offset().top;
  
      result.descent = result.height - result.ascent;
  
    } finally {
      div.remove();
      block.remove();
      text.remove();
    }
  
    return result;
  };
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    canvas.remove();
    return metrics.width;
  }
class Text extends Shape {
    constructor(text = "",obj = {}) {
        obj.fontSize = obj.fontSize ?? 50;
        if (obj.fontSize.includes('px')) obj.fontSize = obj.fontSize.substring(0,obj.fontSize.length-2);
        obj.fontFamily = obj.fontFamily ?? "Arial";
        obj.font = obj.font ?? `${obj.fontSize}px ${obj.fontFamily}`;

        let textHeight = getTextHeight(obj.font).height;
        let textWidth = getTextWidth(text,obj.font);

        obj.textAlign = obj.textAlign ?? "center";
        obj.alignX = obj.textAlign;


        //Set Width 
            obj.width = textWidth;

        //Set Height
            let number = "";
            repeat(obj.font,(char) => {
                if (char == 'p') return false;
                number += char;
            })
            number = Number(number);
            /*
                xx    yy
                -- == --
                50    90
                (x*90)/50=y
            */
            let offSetHeight = (number*90)/50;
            obj.height = textHeight-offSetHeight;


        super(obj);

        this.text = text;
        this.font = obj.font;

    }
    render(ctx,x,y) {
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillStyle;

        ctx.font = this.font;

        if (this.stroke) ctx.strokeText(this.text,x,y);
        if (this.fill) ctx.fillText(this.text,x,y);
    }
}
class Rect extends Shape {
    constructor(width,height = width,obj = {}) {
        obj.width = width;
        obj.height = height;
        super(obj);

    }
    render(ctx,x,y) {
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillStyle;

        ctx.beginPath();
        ctx.roundRect(x,y,this.width,this.height,this.borderRadius);

        if (this.stroke) ctx.stroke();
        if (this.fill) ctx.fill();
    }
}
class Circle extends Shape {
    constructor(radius,obj = {}) {
        obj.width = 0;
        obj.height = 0;
        super(obj);

        this.radius = radius;

    }
    render(ctx,x,y) {
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.fillStyle;

        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        
        if (this.stroke) ctx.stroke();
        if (this.fill) ctx.fill();
    }
}


sloglibrary(1,"canvas","JoeTheHobo");
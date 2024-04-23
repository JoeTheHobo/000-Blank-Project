ls.setID("Untitled");

let div = $("<div")
div.css({
    position: "absolute",
    width: "50%",
    height: "50%",
    background: "green",
})

class _animation {
    constructor(keyFrames = [],obj = {}) {
        this.duration = obj.duration ?? 1000;
        this.delay = obj.delay ?? "Untitled";
        this.count = obj.count ?? 1;
        this.direction = obj.direction ?? "Untitled";
        this.timingFunction = obj.timingFunction ?? "Untitled";
        this.fillMode = obj.fillMode ?? "Untitled";
        this.animation = obj.animation ?? "Untitled";
        this.keyframes = keyFrames;
        this.repeat = obj.repeat ?? false;

    }
}




Object.prototype._animate = function(animation) {
    let oldDOMTransitionStyle = this.style.transition;

    let css = animation.keyframes[0];
    this.css(css)

    this._isAnimating = true;

    let Element = this;


    setTimeout(function() {
        Element.style.transition = "all " + (animation.duration / 1000) + "s ease-in-out"
        _animationKeyFrame(Element,animation,1,animation.count);
    },1)
}
Object.prototype._stopAnimation = function() {
    this._isAnimating = false;
}
function _animationKeyFrame(Element,Animation,Index,Count) {
    if (!Element._isAnimating) return;

    if (Index > Animation.keyframes.length -1) {
        Count--;
        if (Count > 0 || Animation.repeat) Index = 0;
        else {
            Element._isAnimating = false;
            return;
        }
    }

    let css = Animation.keyframes[Index];
    Element.css(css)

    setTimeout(function() {
      _animationKeyFrame(Element,Animation,Index+1,Count)  
    },Animation.duration)
}





let myAnimation = new _animation([{left: 0,background:"green"},{left: "200px",background:"blue"}],{
    duration: 1000,
    repeat: true,
});

div._animate(myAnimation);
setTimeout(function() {
    div._stopAnimation()
},3560);
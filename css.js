c("body",{
    background: "#efefef",
    transition: "all .2s ease-in-out",
})
.on("mousedown",{
    background: "black",
})
.on("mouseup",{
    background: "#efefef",
})


c("div",{
    background: "black",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    width: "200px",
    height: "200px",
    scan_boxShadow: 48,
    transition: "all .2s ease-in-out",
    cursor: "pointer",
})
.hover({
    background: "#efefef",
    scan_boxShadow: 50,
})
.hoverC($("<body"),{
    background: "black !important",
})


c("body",{
    background: "#efefef",
    transition: "all .2s ease-in-out",
})

c("*",{
    userSelect: "none",
})

c("#container",{
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    width: "max-content",
    height: "max-content",
})

c("#block",{
    background: "black",
    width: "300px",
    height: "200px",
    scan_boxShadow: 48,
    transition: "all .2s ease-in-out",
    cursor: "pointer",
    textAlign: "center",
    color: "white",
    lineHeight: "200px",
    fontSize: "25px",
})
.hover({
    background: "#fff",
    color: "black",
    scan_boxShadow: 50,
})
.on("click",{
    display: "none",
})
.onC("click","<body",{
    background: "#efefef",
})
.onC("click","#container",{
    display: "none",
})

c("input", {
    marginTop: "25px",
    outline: "none",
    border: "none",
    height: "35px",
    paddingLeftRight: "15px",
    scan_boxShadow: 19,
    borderRadius: "5px",
    transition: "all .2s"
}).placeholder({
    opacity: 0.9,
    userSelect: "none",
})


c("#heyo",{
    marginTop: "50px",
})


c("#lorem",{
    marginTop: "25px",
    width: "400px",
})

c("lorem").hover({
    textShadow: "2px 2px 4px #000000",
    color: "white",
})
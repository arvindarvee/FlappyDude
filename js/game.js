var stage, w, h, loader, ground;

function handleComplete() {
    document.getElementById("loader").className = "";
    var groundImg = loader.getResult("ground");
    ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
    ground.tileW = groundImg.width;
    ground.y = h - groundImg.height;
    stage.addChild(ground);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
    //$(createjs.Ticker).on('tick',tick);
    setTimeout(function() {
        createjs.Ticker.setPaused(true);
    }, 10);
    //createjs.Ticker.setPaused(true);
}

function play_pause() {
    var isPaused = createjs.Ticker.getPaused();
    if (isPaused)
        createjs.Ticker.setPaused(false);
    else
        createjs.Ticker.setPaused(true);
}

function handleJumpStart() {
    grant.gotoAndPlay("jump");
}

function tick(event) {
    if (createjs.Ticker.getPaused()) {

    } else {
        var deltaS = event.delta / 1000;
        ground.x = (ground.x - deltaS * 200) % ground.tileW;
        stage.update(event);
    }
}

$(document).on('ready',function(){
    if (window.top !== window) {
        document.getElementById("header").style.display = "none";
    }
    
    $(document).on('mousedown',function(e){
       $(this).trigger('touchstart',{});
    });
    
    $(document).on('touchstart',function(e){
        play_pause();
    });
    
    stage = new createjs.Stage("testCanvas");

    // grab canvas width and height for later calculations:
    w = stage.canvas.width;
    h = stage.canvas.height;

    manifest = [
        {src: "img/ground.png", id: "ground"}
    ];

    loader = new createjs.LoadQueue(false);
    $(loader).on('complete',handleComplete);
    //loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);
});
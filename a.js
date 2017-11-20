var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy);

listenToMouse(yyy);

var eraserEnabled = false;
eraser.onclick = function(){
    eraserEnabled = true;
    action.className = 'actions x';
}

brush.onclick = function(){
    eraserEnabled = false;
    actions.className = 'actions';
}

function autoSetCanvasSize(canvas){
    autoSetCanvasSize();

    window.onresize = function(){
        autoSetCanvasSize();
    }

    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function drawCircle(x,y,radius){
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(x,y,radius,0,Math.PI * 2);
    context.fill();
}

function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.strokeStyle = 'black';
    context.moveTo(x1,y1);
    context.linewidth = 5;
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}

function listenToMouse(canvas){
    var using = false;
    var lastPoint = {
        x:undefined,
        y:undefined
    }
    canvas.onmousedown = function(aaa){
        var x = aaa.clientX;
        var y = aaa.clientY;
        using = true;
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10);
        }else{
            lastpoint = {
                "x":x,
                "y":y
            }
        }
    }

    canvas.onmousemove = function(aaa){
        var x = aaa.clientX;
        var y = aaa.clientY;

        if(!using){
            return
        }

        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10)
        }else{
            var newPoint = {
                "x":x,
                "y":y
            }
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
            lastPoint = newPoint;
        }
    }

    canvas.onmouseup = function(aaa){
        using = false;
    }
}












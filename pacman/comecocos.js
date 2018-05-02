//VARIABLES GLOBALES
var change = "";
var pacman;
var countingInterval = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var totaltime = 0; //segundos
var pause = false;
var returnGhosts = 10000; //[milisegundos] Segundos en volver a normal los fantasmas
var random;
var prueba = 0;
var src = "";
var soundtrack;
var maxTime = 30; //[segundos]
var maxScore = 216;
var miStorage = localStorage;
var message = "";

function GameMapConstructor(wallSrc, cocoSrc, floorSrc, fruitSrc) {
    //  1:pared, 2:bola, 3:bola enorme, 4:fruta
    this.gameAreaMatrix = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
        [1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
        [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 2, 4, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
        [1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 4, 1, 2, 2, 2, 2, 2, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1],
        [1, 4, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
    this.numColumns = 25;
    this.numRows = 17;
    //Parámetros que determinan anchura/altura del rectángulo basico para dibujar el mapa
    this.basicWidth = gameArea.canvas.width/this.numColumns;
    this.basicHeight = gameArea.canvas.height/this.numRows;
    this.basicColor = "green"; //color pared, no lo veo porque pongo textura
    this.wall = new Image();
    this.wall.src = wallSrc;
    this.coco = new Image();
    this.coco.src = cocoSrc;
    this.cocoStyle = "white"; //color puntos
    this.floor = new Image();
    this.floor.src = floorSrc;
    this.fruit = new Image();
    this.fruit.src = fruitSrc;
    this.updateMap = function(ctx) {
        ctx.drawImage(this.floor, j*Math.floor(this.basicWidth), i*Math.floor(this.basicHeight), this.basicWidth, this.basicHeight);
        for(var i=0; i<this.numRows; i++){
            for(var j=0; j<this.numColumns; j++){
                //Aquí tamaño objetos
                if(this.gameAreaMatrix[i][j]==1){ //dibujamos pared
                    ctx.fillStyle = this.basicColor;
                    ctx.drawImage(this.wall, j*Math.floor(this.basicWidth), i*Math.floor(this.basicHeight), this.basicWidth, this.basicHeight);
                    //Mete el color, si quiero textura no lo pongo
                    //ctx.fillRect(j*Math.floor(this.basicWidth), i*Math.floor(this.basicHeight), this.basicWidth, this.basicHeight);
                }else if (this.gameAreaMatrix[i][j]==2) {//coco pequeño
                    ctx.fillStyle =this.cocoStyle;
                    ctx.fillRect(j*Math.floor(this.basicWidth)+8, i*Math.floor(this.basicHeight)+8, this.basicWidth/4, this.basicHeight/4);
                }else if (this.gameAreaMatrix[i][j]==3) {//coco grande
                    ctx.fillStyle =this.cocoStyle;
                    ctx.fillRect(j*Math.floor(this.basicWidth)+4, i*Math.floor(this.basicHeight)+4, this.basicWidth/2, this.basicHeight/2);
                }else if (this.gameAreaMatrix[i][j]==4) {//sandiita rica
                    ctx.fillStyle =this.cocoStyle;
                    ctx.drawImage(this.fruit, j*Math.floor(this.basicWidth), i*Math.floor(this.basicHeight), 30, 30);
                }
            }
        }
    }
}

function Sound(src) {
    this.Sound = document.createElement("audio");
    this.Sound.src = src;
    this.Sound.setAttribute("preload", "auto");
    this.Sound.setAttribute("controls", "none");
    this.Sound.style.display = "none";
    document.body.appendChild(this.Sound);
    this.play = function(){
        this.Sound.play();
    }
    this.stop = function(){
        this.Sound.pause();
    }
}

function start_counting(){
  totaltime = seconds + 60*minutes + 3600*hours;
  var counter = hours + ":" + minutes + ":" + seconds;
	seconds += 1;
	if (seconds == 60) {
		minutes += 1;
		seconds = 0;
		if (minutes == 60){
			hours += 1;
			minutes = 0;
		}
	}
	document.getElementById("counter").innerHTML = counter;
};

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

//LA LETRA DE LAS PUNTUACIONES
function TextComponent(size, font, x , y, color) {
    this.size = size; // en pixeles
    this.font = font;
    this.x = x;
    this.y = y;
    this.text = "";
    this.update = function() {
        gameArea.ctx.font = this.size + " " + this.font;
        gameArea.ctx.fillStyle = color;
        gameArea.ctx.fillText(this.text, this.x, this.y);
    }
}

function DynamicElemt(width, height, x , y) {
    this.gameElement = new Image();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.acceleration = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.maxSpeed = 6;
    this.minSpeed = -6;
    this.angle = 0;
    this.viewAngle = 0;
    this.vectorX = Math.cos(this.angle);
    this.vectorY = Math.sin(-this.angle);
    this.update = function() {
        gameArea.ctx.save();
        gameArea.ctx.translate(this.x, this.y);
        gameArea.ctx.rotate(this.viewAngle);
        gameArea.ctx.drawImage(this.gameElement, this.width / -2, this.height / -2, this.width, this.height);
        gameArea.ctx.restore();
    }
    this.move = function() {
        this.x += this.speed * this.vectorX;
        this.y += this.speed * this.vectorY;
    }
    this.rote = function() {
        this.vectorX = Math.cos(this.angle);
        this.vectorY = Math.sin(-this.angle); //seno es impar
    }
}

var gameArea = {
    canvas:  document.getElementById("game"),
    start: function() {
        //Contexto, control movimiento player, y creacion de objeto para mapa del juego
        this.ctx = this.canvas.getContext('2d');
        //Escucha teclado
        window.addEventListener("keydown", function(event){keyHandler(event, pacman)}, false);
        //Creamos pacman con Dynamic element y algunas funciones específicas
        var gameMatrix = new GameMapConstructor("vaporWall.jpg", "cocoNeon.png", "vaporFloor.jpg", "manzana.png");
        //A DynamicElemt le paso tamaño y posicion
        pacman = new DynamicElemt(32, 32, 100, 100);//27, 27
        pacman.gameElement.src = "yellowpacman.png";
        pacman.fruit = false; //control poder de fruta. Si está a false no te la has comido
        //Tiempo en abrir y cerrar boca
        pacman.closeMouth = function() {
            pacman.gameElement.src = "yellowpacman2.png"
            if (change!=""){
              pacman.gameElement.src = change + "2.png";
            }
            setTimeout(pacman.openMouth, 300)
        }
        pacman.openMouth = function() {
            pacman.gameElement.src = "yellowpacman.png"
            if (change!=""){
              pacman.gameElement.src = change+ ".png";
            }
            setTimeout(pacman.closeMouth, 300)
        }
        pacman.closeMouth();

        //Creamos los fantasmas con DynamicElemt
        //Tomamos posición central mapa
        var mapWidthCenter = gameMatrix.numColumns*gameMatrix.basicWidth/2;
        var mapHeightCenter = gameMatrix.numRows*gameMatrix.basicHeight/2;
        //Fantasmas y su imagen
        var blueGhost = new DynamicElemt(35, 35, 250, 328);//32, 32
        blueGhost.gameElement.src = "blueGhost.png";
        var redGhost = new DynamicElemt(32, 32, 100, 200);
        redGhost.angle = Math.PI/2; //Math.PI/2 para movimiento hacia arriba y abajo
        redGhost.gameElement.src = "redGhost.png";
        var pinkGhost = new DynamicElemt(32, 32, 150, 154);
        pinkGhost.gameElement.src = "pinkGhost.png";
        var clydeGhost = new DynamicElemt(32, 32, 500, 50);
        clydeGhost.angle = Math.PI/2;
        clydeGhost.gameElement.src = "clydeGhost.png";
        //Los guardo en un array e inicializo
        var ghostsArray = [blueGhost, redGhost, pinkGhost, clydeGhost];
        ghostsArray.forEach(function(element){
            element.speed = 1.5;
            element.weak = false; //control de debilidad
            element.alive = true; // ¿se lo comieron?
        });

        //Contador de la puntuación, tipo de letra, etc..
        var score = new TextComponent("30px", "Arial", 0, 27, "pink");
        pacman.scoreCount = 0; //añadimos scoreCount a pacman, facilidad posterior en choques
        score.text = "SCORE: " + pacman.scoreCount;

        //Canción de fondo del juego
        soundtrack = new Sound("soundtrack1.mp3");
        //soundtrack.loop = true; por si es corta y quiero que se repita
        soundtrack.play();

        this.updateGamupdateGameeInterval = setInterval(function(){if (!pause){updateGame(gameMatrix, pacman, ghostsArray, score)}}, 20);//else{soundtrack.stop();}
        countingInterval = setInterval(function(){if (!pause){start_counting()}}, 1000);
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop : function() {
        clearInterval(this.updateGameInterval);
        clearInterval(countingInterval);
        totaltime = 0;
        seconds = 0;
      	hours = 0;
      	minutes = 0;
    }
}

function buttonStart (){
  leerpuntuaciones();
    if (prueba>0){//para que solo lo inicie la primera vez
      location.reload(true);

    }else{
      gameArea.stop();
      gameArea.start();
    }
    prueba+=1;
}

//Control de botón de pause/restart
function buttonPause (){
    if (!pause){
      pause = true;
      soundtrack.stop();
    }else{
      pause = false;
      soundtrack.play();
    }
}

//Control de teclado para mvto
function keyHandler(event, pacman) {
    //Selecionar otras teclas: case "Escape":, case "a":,
    switch(event.key) {
        case "ArrowUp":
            pacman.speed = 5;
            pacman.angle = Math.PI/2;
            pacman.viewAngle = -Math.PI/2;
            pacman.rote();
            break;
        case "ArrowDown":
            pacman.speed = 5;
            pacman.angle = -Math.PI/2;
            pacman.viewAngle = Math.PI/2;
            pacman.rote()
            break;
        case "ArrowLeft":
            pacman.speed = 5;
            pacman.angle = Math.PI;
            pacman.viewAngle = Math.PI;
            pacman.rote()
            break;
        case "ArrowRight":
            pacman.speed = 5;
            pacman.angle = 0;
            pacman.viewAngle = 0;
            pacman.rote()
            break;
        case "ñ":
            localStorage.clear();
            sessionStorage.clear();
        case " ":
            break;
        default:
            console.log("Key not handled");
    }
}

function crash(whoCrash, theCrashed) {
    // left-izq, right-der, top-arriba, bottom-abajo
    var myleft = whoCrash.x;
    var myright = whoCrash.x + (whoCrash.width/1.35);
    var mytop = whoCrash.y;
    var mybottom = whoCrash.y + (whoCrash.height/1.35);
    var otherleft = theCrashed.x;
    var otherright = theCrashed.x + (theCrashed.width/1.35);
    var othertop = theCrashed.y;
    var otherbottom = theCrashed.y + (theCrashed.height/1.35);
    var crash = true;
    if ((mybottom < othertop) ||
           (mytop > otherbottom) ||
           (myright < otherleft) ||
           (myleft > otherright)) {
       crash = false;
    }
    return crash;
}

function crashWithMapControl(mapa, obj, isPlayer) {
    /*
    Controla si el objeto pasado por parámetro ha colisionado con mapa y reacciona.
    Devuelve boolean para indicar si se produjo choque y poder tomar otras acciones extra.
    */
    var crashed = false;
    var mapValue = mapa.gameAreaMatrix[Math.floor((obj.y+5)/mapa.basicHeight)][Math.floor((obj.x)/mapa.basicWidth)];
    if(mapValue == 1){
        obj.speed *= -1;
        obj.move();
        obj.speed *= -1;
        crashed = true;
    }else if((mapValue == 2 || mapValue == 3) && isPlayer) {
        mapa.gameAreaMatrix[Math.floor((obj.y+5)/mapa.basicHeight)][Math.floor((obj.x)/mapa.basicWidth)] = 0;
        //Segun si es coco grande o pequeño suma puntuación conrresponidente
        if (mapValue == 2){
            obj.scoreCount += 1;
        }else if (mapValue == 3) {
          obj.scoreCount += 3;
        }
        var points = new TextComponent("45px", "italic", obj.x, obj.y, "yellow");
        for (var i=0; i<1550; i++){
            points.update();
        }
    }
    if(mapValue == 4 && isPlayer) {
        var altura = [Math.floor((obj.y+5)/mapa.basicHeight)];
        var anchura = [Math.floor((obj.x)/mapa.basicWidth)];
        mapa.gameAreaMatrix[Math.floor((obj.y+5)/mapa.basicHeight)][Math.floor((obj.x)/mapa.basicWidth)] = 0;
        obj.fruit = true;

        var sonidoFruta = new Sound("soundfruit.mp3");
        sonidoFruta.play();

        random = Math.round(Math.random() * 5);//10
        setTimeout(function (){mapa.gameAreaMatrix[altura][anchura] = 4;}, (1000 * random))
    }
    return crashed;
}

function returnGhost (a){
  setTimeout(function (){
    a[0].gameElement.src = "./blueGhost.png";
    a[1].gameElement.src = "./redGhost.png";
    a[2].gameElement.src = "./pinkGhost.png";
    a[3].gameElement.src = "./clydeGhost.png";
    a[0].weak = false;
    a[1].weak = false;
    a[2].weak = false;
    a[3].weak = false;
  },returnGhosts);
}

function endGame(src){
  var win = document.createElement("img");
  win.src = src;
  win.id = "winner";
  win.width = window.innerWidth;
  win.height = window.innerHeight;
  document.getElementById("slider").appendChild(win);
  win.setAttribute("onclick", "acabar()");
}

function acabar(){
  if(window.confirm(message) == true){
    location.reload(true);
  }
}

function updateGame(mapa, pacman, ghostsArray, score, obj) {

    //Actualizamos fondo, mapa y score
    var fondo = new component(gameArea.canvas.width, gameArea.canvas.height, "black", 0,0);
    fondo.update(gameArea.ctx);
    gameArea.ctx.drawImage(mapa.floor, 0,0, gameArea.canvas.width, gameArea.canvas.height);
    mapa.updateMap(gameArea.ctx);
    score.text = "SCORE: " + pacman.scoreCount;
    score.update()

    //movimiento y dibujado pacman
    pacman.move();
    crashWithMapControl(mapa, pacman, true)
    pacman.update();
    //control y dibujado de los fantasmas
    ghostsArray.forEach(function(element){
        element.move();

        if (crashWithMapControl(mapa, element, false)) {
            var direction = Math.floor(Math.random() * 4)
            element.angle += Math.PI/2 * direction;
            element.rote();
        }
        //come fruta y fantasmas débiles. !element.weak = false : fuertes
        if (pacman.fruit && !element.weak){
            element.angle += Math.PI; // cambio de sentido fantasmas
            element.rote();
            element.gameElement.src = "oldGhost.gif";
            element.weak = true;
            returnGhost(ghostsArray);
        }
        //Si chocan dos elementos
        if (crash(element, pacman)){
            if (element.weak){//si están debiles me los como
                element.alive = false;
            }else if (element.alive){//si no están debiles y están vivos me muero
                gameArea.stop();
                soundtrack.stop();
                src = "loser.gif";
                message = "";
                message = "Te atrapó un fantasma!, ¿juegas maś?"
                endGame(src)
            }
        }
        //Si sigo vivo sigue juego
        if (element.alive){
            element.update();
        }
    });
    pacman.fruit = false;//para que vuelva a false después del true de comerlas

    //Gano todos los puntos
    if (pacman.scoreCount == maxScore){//SON LAS PUNTUACIONES MAXIMAS 216

      var puntuacionextra = maxTime - totaltime;
      pacman.scoreCount += puntuacionextra;
      var nickname = prompt("Write your name", "Your Name");

      if (localStorage.getItem(localStorage.key(0)) < pacman.scoreCount){
        localStorage.setItem(nickname, pacman.scoreCount);
        document.getElementById("highscore_local").innerHTML = localStorage.key(0) + "->" + localStorage.getItem(nickname);
      }
      sessionStorage.setItem(nickname, pacman.scoreCount);
      document.getElementById("highscore_sesion").innerHTML = sessionStorage.key(0) + "->" + sessionStorage.getItem(nickname);

      gameArea.stop();
      soundtrack.stop();
      src = "winner.gif";
      message = "";
      message = "Ganaste! ¿Quieres volver a jugar?"
      endGame(src)
    }

    //Se acaba el tiempo
    if (totaltime >= maxTime){
      gameArea.stop();
      soundtrack.stop();
      src = "loser.gif";
      message = "";
      message = "Se ha acabado el tiempo, ¿juegas maś?"
      endGame(src)
    }
}

function leerpuntuaciones(){
  if (typeof(Storage) !== "undefined"){
    if (sessionStorage.key(0)!= null ){
      document.getElementById("highscore_sesion").innerHTML = sessionStorage.key(0) + "->" + sessionStorage.getItem(sessionStorage.key(0));
    }else{
      document.getElementById("highscore_sesion").innerHTML = "No hay datos";
    }

    if (localStorage.key(0)!= null ){
      document.getElementById("highscore_local").innerHTML = localStorage.key(0) + "->" + localStorage.getItem(localStorage.key(0));
    }else{
      document.getElementById("highscore_local").innerHTML = "No hay datos";
    }

  }else{
    document.getElementById("highscore_total").innerHTML = "Tu navegador no lo soporta";
  }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    var anterior = document.getElementById("drag4").src;
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    change = ev.target.appendChild(document.getElementById(data)).src;
    document.getElementById("drag4").src = change;
    change = change.split("/");
  	change = change[change.length-1].split(".")[0];
    document.getElementById(data).src = anterior;//Añadido

    var input = document.createElement("img");
    input.setAttribute("id", data);
    input.setAttribute("draggable", "true");
    input.setAttribute("ondragstart", "drag(event)");
    input.setAttribute("src", anterior);
    input.setAttribute("width", "100px");
    input.setAttribute("height", "100px");
    $(".añadidos").appendChild(input);
    function $ (selector){
      return document.querySelector(selector);
    }
}

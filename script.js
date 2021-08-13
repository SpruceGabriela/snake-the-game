let canvas = document.getElementById("cobra"); 
let context = canvas.getContext("2d"); 
let box = 32;
let cobra = []; 
var pontuacao = document.getElementById('score');

cobra[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let comida ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criar_BG(){
    context.fillStyle = "Indigo";
    context.fillRect(0, 0, 16 * box, 16 * box); 
}

function criar_cobra (){
    for(i = 0; i < cobra.length; i++){
        context.fillStyle = "WhiteSmoke";
        context.fillRect(cobra[i].x, cobra[i].y, box, box);
    }
}

function criar_comida (){
    context.fillStyle = "black";
    context.fillRect(comida.x, comida.y, box, box);
}

function pontuou() {
    pontuacao.innerHTML = (cobra.length);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciar_jogo(){    

    if(cobra[0].x > 15 * box && direction == "right") cobra[0].x = 0;
    if(cobra[0].x > 15 * box && direction == "up") cobra[0].x = 0;
    if(cobra[0].x > 15 * box && direction == "down") cobra[0].x = 0;

    if(cobra[0].x < 0  && direction == "left") cobra[0].x = 15 * box;
    if(cobra[0].x < 0  && direction == "up") cobra[0].x = 15 * box;
    if(cobra[0].x < 0  && direction == "down") cobra[0].x = 15 * box;

    if(cobra[0].y > 15 * box && direction == 'down') cobra[0].y = 0;
    if(cobra[0].y > 15 * box && direction == 'right') cobra[0].y = 0;
    if(cobra[0].y > 15 * box && direction == 'left') cobra[0].y = 0;

    if(cobra[0].y < 0 && direction == 'up') cobra[0].y = 15 * box;
    if(cobra[0].y < 0 && direction == 'right') cobra[0].y = 15 * box;
    if(cobra[0].y < 0 && direction == 'left') cobra[0].y = 15 * box;
    
    for(i = 1; i < cobra.length; i++){
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
            clearInterval(jogo);
            alert('Fim do Jogo! Você obteve ' + (cobra.length) + ' pontos! Até a próxima!')
        }
    }

    criar_BG();
    criar_cobra();
    criar_comida();

    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    if(direction == "right") cobraX += box;
    if(direction == "left") cobraX -= box;
    if (direction == "up") cobraY -= box;
    if(direction == "down") cobraY += box;

    if(cobraX != comida.x || cobraY != comida.y){
        cobra.pop(); 
    }else{
        comida.x = Math.floor(Math.random() * 15 +1) * box;
        comida.y = Math.floor(Math.random() * 15 +1) * box;
        pontuou()
    }
    
    let nova_cabeca ={
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(nova_cabeca);
}

let jogo = setInterval(iniciar_jogo, 100);
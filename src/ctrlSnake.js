const seo    = require("./seo.json");
const db     = require("./sqlite.js");
const Base64 = require("js-base64");

  let dom_replay = document.querySelector("#replay");
        let dom_score = document.querySelector("#score");
        let snake,
        isGameOver = false,
        score = 1,
        maxScore = window.localStorage.getItem("maxScore") || undefined;
        
        window.onload = function (){
            var stage = document.getElementById('stage');
            var ctx = stage.getContext("2d");
            document.addEventListener("keydown",keyPush);

            setInterval(game, 60);

            

           /*  vel é a quantidade de casas que a cobra vai andar */
            const vel = 1;
            
            /* velocidade x e y */
            var vx =0; 
            var vy = 0;

            /* ponto x e y */
            var px = 10;
            var py = 15;

            /* tamanho dos quadrados */
            var tp = 30;

            /* quantidade de quadrados */
            var qp = 20;

            /* posição da maçã */
            var ax=15; 
            var ay=15;
     
            /* corpo da cobra */
            var trail = [];
            var tail = 5;

            function incrementScore() {
                score++;
                dom_score.innerText = score.toString().padStart(2, "0");
                                    }
 
            function game(){
                px += vx;
                py += vy;
                if (px <0) {
                    px = qp-1;
                }
                if (px > qp-1) {
                    px = 0;
                }
                if (py < 0) {
                    py = qp-1;
                }
                if (py > qp-1) {
                    py = 0;
                }
 
                ctx.fillStyle = "black";
                ctx.fillRect(0,0, stage.width, stage.height);
 
                ctx.fillStyle = "red";
                ctx.fillRect(ax*tp, ay*tp, tp,tp);
 
                ctx.fillStyle = "gray";
                for (var i = 0; i < trail.length; i++) {
                    ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1,tp-1);
                    if (trail[i].x == px && trail[i].y == py)
                    {
                    
                        clear() 

                        //game over
                    }
                }
 
                trail.push({x:px,y:py })
                while (trail.length > tail) {
                    trail.shift();
                }
 
                if (ax==px && ay==py){
                    tail++;
                    ax = Math.floor(Math.random()*qp);
                    ay = Math.floor(Math.random()*qp);
                    score2(score++);
                    console.log(score)
                    
                }
                
            }
            function keyPush(event){

                switch (event.keyCode){
                    case 37: //left
                        vx = -vel;
                        vy = 0;
                        break;
                     case 38: //up
                        vx = 0;
                        vy = -vel;
                        break;
                    case 39: //right
                        vx = vel;
                        vy = 0;
                        break;
                    case 40: //down
                        vx = 0;
                        vy = vel;
                         break;
                    default:

                    break

                }
            } 

function initialize() {
  dom_replay.addEventListener("click", clear, false);

}


function clear() {
    dom_score.innerText = "00";
    score = "1";
       vx = vy=0;
       px = 10;
       py = 15;
       ax=ay=15
      tail =5;
     }
function score2(score){
    let dom_score = document.querySelector("#score");
    dom_score.innerHTML=score;
    
}


initialize();
          
        }


  

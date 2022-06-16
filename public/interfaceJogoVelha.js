document.addEventListener('DOMContentLoaded',()=>{


    let squares = document.querySelectorAll(".square");
    
    squares.forEach((square)=>{
        square.addEventListener("click", handleClick);
        })
    })
    
    function handleClick(event){
        console.log(event.target);
    
        let square = event.target;
        let position = square.id;
    
      if( handleMove(position)){

        setTimeout(()=>{
            alert(" O jogo Acabou - O Vencedor foi " + playernome)
        }, 10);
    
          
      };
        updeteSquares(position);
    
    }
    function updeteSquares(position){
        let square = document.getElementById(position,toString());
        let symbols = board[position];
        square.innerHTML = `<div class='${symbols}'></div>`
       
    
    }


    function resetar(){

        for (let i in board){
         let square = document.getElementById(i,toString());

             board[i] = "";
             square.innerHTML = `<div id='${i}' class='square'></div>`
        }
        
         playertime = 0; 
        gameOver= false;
         
         document.getElementById('bt1').innerText = 'Resetar';
     
  
    }
// iniciar as variaveis
let board =['','','','','','','','','',];
let playertime = 0;
let playernome =['Grifinória','Sonserina'];
let symbols = ['o','x'];
let gameOver = false;
let winstate = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]



function handleMove(position) {

    if(gameOver){
        return;
    }

if(board[position]==''){
    board[position] = symbols[playertime];

    gameOver = isWin();

        if(gameOver == false){
         if(playertime==0){
             playertime=1;
             
         }else{
            playertime=0;
        
         }
         playernome = (playertime==0)?'Grifinória':'Sonserina';
            
        }
   
    }
    

    return gameOver;
}

function isWin(){

    for( let i =0; i<winstate.length;i++){
      
        let seq = winstate[i];

        let pos1 = seq[0];
        let pos2 = seq[1];
        let pos3 = seq[2];

        if(board[pos1] ==  board[pos2] &&
            board[pos1] == board[pos3]&&
            board[pos1] != ''){

                return true;
            }

    }
    return false;
  

}
 viewJogos: async(request, reply) => {
    console.log("Pagina Inicial GET /jogos");
    let params = { seo: seo };
    let valido = await cookie.validacao(request.cookies.Autenticacao);
    if( !valido ){
      params.error = "Usuário deve se autenticar";
      reply.view("/src/Paginas/index.hbs", params);
      return;
    }
    
    reply.view("/src/Paginas/jogosVelha.hbs", params);
  },

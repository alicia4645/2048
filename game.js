const rows = 4;
const columns = 4;

const board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

function startGame(){
    // <div id="x-y" class="tile t2">2</div>
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns; c++){
            const num = board[r][c]
            let tile = document.createElement("div")
            tile.id = `${r}-${c}`
            tile.classList.add('tile', `t${num}`)
            if(num>0) tile.innerText = num
            document.getElementById('board').append(tile)
        }
    }
}

startGame()
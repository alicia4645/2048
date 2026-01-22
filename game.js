const rows = 4;
const columns = 4;

const board = [
    [2,0,0,0],
    [0,8,0,0],
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
            updateTile(tile,num)
            document.getElementById('board').append(tile)
        }
    }
}

function updateTile(tile, num){
    tile.classList.remove(...tile.classList)
    tile.classList.add('tile', `t${num}`)
    if(num>0) tile.innerText = num
}

startGame()
const rows = 4;
const columns = 4;
let score = 0;

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
    tile.className = "tile"
    if(num>0) {
        tile.classList.add(`t${num}`)
        tile.innerText = num
    }
}

addEventListener('keyup', (e) => {
    switch (e.key){
        case 'ArrowUp':
            console.log("up")
            break
        case 'ArrowDown':
            console.log("down")
            break
        case  'ArrowLeft':
            console.log("left")
            break
        case 'ArrowRight':
            console.log("right")
            break   
        default : 
            break
    }
})

function slideTiles(row){
    let nRow = row.filter(num => num > 0 )
    
    for( let i=0; i<nRow.length; i++){
        if(nRow[i] === nRow[i+1]){
            nRow[i] *= 2
            nRow[i+1] = 0
            score += nRow[i]
            console.log(nRow)
            console.log(score)
        }
    }

    nRow = nRow.filter(num => num > 0 )
    const diff = 4 - nRow.length
    for(let i=0; i<diff; i++){
        nRow.push(0)
    }

    return nRow
}

startGame()
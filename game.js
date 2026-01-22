const rows = 4;
const columns = 4;
let score = 0;

let board = [
    [2,2,0,0],
    [8,8,4,0],
    [8,0,4,0],
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
    tile.innerText = ""
    if(num>0) {
        tile.classList.add(`t${num}`)
        tile.innerText = num
    }
}

addEventListener('keyup', (e) => {
    switch (e.key){
        case 'ArrowUp':
            slideUp()
            break
        case 'ArrowDown':
            slideDown()
            break
        case  'ArrowLeft':
            slideLeft()
            break
        case 'ArrowRight':
            slideRight()
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
        }
    }

    nRow = nRow.filter(num => num > 0 )
    const diff = 4 - nRow.length
    for(let i=0; i<diff; i++){
        nRow.push(0)
    }

    return nRow
}

function slideLeft(){
    for(let r=0; r<rows; r++){
        const row = slideTiles(board[r])
        board[r] = row

        for(let c=0; c<columns; c++){
            const tile = document.getElementById(`${r}-${c}`)
            const num = board[r][c]
            updateTile(tile,num)
        }
    }
}

function slideRight(){
    for(let r=0; r<rows; r++){
        const row = slideTiles(board[r].reverse())
        board[r] = row.reverse()

        for(let c=0; c<columns; c++){
            const tile = document.getElementById(`${r}-${c}`)
            const num = board[r][c]
            updateTile(tile,num)
        }
    }
}

function slideUp(){
    for(let c=0; c<columns; c++){
        const col = [board[0][c],board[1][c],board[2][c],board[3][c]]
        const row = slideTiles(col)

        for(let r=0; r<rows; r++){
            board[r][c] = row[r]
            const tile = document.getElementById(`${r}-${c}`)
            const num = board[r][c]
            updateTile(tile,num)
        }   
    }
}

function slideDown(){
    for(let c=0; c<columns; c++){
        const col = [board[0][c],board[1][c],board[2][c],board[3][c]]
        const row = slideTiles(col.reverse()).reverse()

        for(let r=0; r<rows; r++){
            board[r][c] = row[r]
            const tile = document.getElementById(`${r}-${c}`)
            const num = board[r][c]
            updateTile(tile,num)
        }   
    }
}


startGame()
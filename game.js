const rows = 4
const columns = 4
let score = 0

let board = [
    [2,0,0,0],
    [1024,0,0,0],
    [1024,0,0,0],
    [0,0,0,0]
]

let newTile = false
let hasWon = false

function startGame(){
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

function handleKeyUp(e){
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
}

window.addEventListener('keyup', handleKeyUp)

function slideTiles(row){
    let nRow = row.filter(num => num > 0 )
    
    for( let i=0; i<nRow.length; i++){
        if(nRow[i] === nRow[i+1]){
            nRow[i] *= 2
            nRow[i+1] = 0
            score += nRow[i]
            updateScore()
            if (nRow[i] === 2048) hasWon = true
        }
    }

    nRow = nRow.filter(num => num > 0 )
    const diff =  4 - nRow.length
    for(let i=0; i<diff; i++){
        nRow.push(0)
    }

    if(nRow.join() != row.join()) newTile = true

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
    addTile()
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
    addTile()
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
    addTile()
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
    addTile()
}

function addTile(){
    if(hasWon){
        winner()
        return
    }

    if(newTile){
        let found = false

        while(!found){
            const row = Math.floor(Math.random() * rows)
            const col = Math.floor(Math.random() * columns)

            if(board[row][col] === 0){
                const tile = document.getElementById(`${row}-${col}`)
                board[row][col] = 2
                updateTile(tile, 2)
                found = true
            }
        }

        newTile = false
    }
}

function updateScore(){
    let scoreDiv = document.getElementById("score")
    scoreDiv.innerText = `Score: ${score}`
}

function winner(){
    let msg = document.createElement('div')
    msg.id = 'winner'
    msg.innerText = 'You Win!'
    const body = document.getElementsByTagName('body')[0]
    body.append(msg)
    window.removeEventListener('keyup', handleKeyUp)
}


startGame()
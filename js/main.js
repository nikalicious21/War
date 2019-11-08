//========CONSTANTS========//

let cards = [1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,8,8,8,8,8,8,9,9,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,11,12,12,12,12,12,12,13,13,13,13,13,13,14,14,14,14,14,14,15,15,15,15,15,15,16,16,16,16,16,16,17,17,17,17,17,17,18,18,18,18,18,18,19,19,19,19,19,19]


//========STATE VARIABLES========//

var playerSideDeck = [];
var compSideDeck = [];
var playerDeck = [];
var compDeck = [];
var warField = [];
var playerVal = null; 
var compVal = null;
var playerWarCards =[];
var compWarCards=[];


//========CACHED ELEMENTS========//
//this is where the elements would be grabbed from the HTML to be used in JS

let startGame = document.getElementById('start')
let cardFlip = document.getElementById("draw")
let playAgain = document.getElementById('replay')
let messageEl = document.getElementById('steps')
let messageEl2 = document.getElementById('whowins')
let PcardImage = document.querySelector('.PcardImage')
let CcardImage = document.querySelector('.CcardImage')
let YourCount = document.getElementById('playerScore')
let CompCount = document.getElementById('compScore')
let PdeckCount = document.getElementById('PlayerDeckCount')
let CdeckCount = document.getElementById('CompDeckCount')

// let ashFace = document.querySelector('.ashFace');


function init() {
        cards = [1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,8,8,8,8,8,8,9,9,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,11,12,12,12,12,12,12,13,13,13,13,13,13,14,14,14,14,14,14,15,15,15,15,15,15,16,16,16,16,16,16,17,17,17,17,17,17,18,18,18,18,18,18,19,19,19,19,19,19];
        playerDeck = [];
        compDeck = [];
        playerVal = null;
        compVal = null;
        playerSideDeck = [];
        compSideDeck = [];
        warField = [];
        messageEl.textContent = 'HIT PLAY';
        messageEl2.textContent = '';
        PcardImage.innerHTML = '';
        CcardImage.innerHTML = '';
        YourCount.innerHTML = '';
        CompCount.innerHTML = '';
        PdeckCount.innerHTML = 'Deck Count:';
        CdeckCount.innerHTML = 'Deck Count:';
        startGame.style.display = 'inline-block';
        cardFlip.addEventListener('click', handleDraw)
        // ashFace.className = 'ashFace';
}

//========EVENT LISTENERS========//
        // this will be where I will state the event listener for the player and also at the end of the game, I will state an event listener for the "play again" button.

startGame.addEventListener('click', handleStart)

cardFlip.addEventListener('click', handleDraw)

playAgain.addEventListener('click', init)



// playAgain.addEventListener('click', init);

//========FUNCTIONS========//

function handleStart(evt) {
        if(evt.target.tagName !== 'BUTTON') {
                return;
        }

        dealCards(cards)
        function dealCards(cards) {
                let count = 0
                while(cards.length) {
                        let randomCard = Math.floor(Math.random() * (cards.length))
                        let card = cards.splice(randomCard,1)[0]
                if(count % 2) {
                        playerDeck.push(card)
                } else {
                        compDeck.push(card)
                }
                count++
                }
                messageEl.textContent = 'Who do you choose?';
        }
        evt.target.style.display = 'none';
}



// function handleResetGame(evt){
//         if(evt.target.tagName === 'BUTTON') 


function drawCard() {
        let playerDraw = playerDeck.splice(0,1);
        playerVal = playerDraw[0]
        let compDraw = compDeck.splice(0,1);
        compVal = compDraw[0]
        compareCards();
        PcardImage.innerHTML = `<img id='cardsize' src="images/${playerVal}.png"></img>`
        CcardImage.innerHTML = `<img id='cardsize' src="images/${compVal}.png"></img>`
   
        PdeckCount.innerHTML = `Deck Count: ${playerDeck.length}`
        CdeckCount.innerHTML = `Deck Count: ${compDeck.length}`

        }
function handleDraw(evt) {
        if (evt.target.tagName === 'BUTTON') 
        drawCard()

}

function compareCards() {
       
        if (playerVal > compVal) {
                messageEl.textContent = "You win Battle!"
                playerSideDeck.push(playerVal , compVal)

        if (warField.length !== 0) {
                warField.forEach( v => {
                playerSideDeck.push(v);
        })
        
                warField = [];    
        } 
                YourCount.innerHTML = `TOTAL CARDS WON: ${playerSideDeck.length}`

                if (compDeck.length  === 0 && playerSideDeck.length > compSideDeck.length) {
                messageEl.textContent = '';
                messageEl2.textContent = "You are the PokeWar Master!"
                // ashFace.classList.add('happy');
                cardFlip.removeEventListener('click', handleDraw)
                return;
               }
               if (playerDeck.length === 0 && compSideDeck.length > playerSideDeck.length) {
                messageEl.textContent = '';
                messageEl2.textContent = "Ash Ketchum is the PokeWar Master!"
                // ashFace.classList.add('sad');
                cardFlip.removeEventListener('click', handleDraw)
                return;
                }
        
           

       } else if (compVal > playerVal) {
                messageEl.textContent = "Ash Ketchum wins Battle!"
                compSideDeck.push(playerVal, compVal)
               
                if (warField.length !== 0) {
                        warField.forEach( v => {
                                compSideDeck.push(v);
                })
                        
                        warField = [];
                }
                
                CompCount.innerHTML = `TOTAL CARDS WON: ${compSideDeck.length}`

               if (playerDeck.length === 0 && compSideDeck.length > playerSideDeck.length) {
                messageEl.textContent = '';
                messageEl2.textContent = "Ash Ketchum is the PokeWar Master!"
                // ashFace.classList.add('happy');

                cardFlip.removeEventListener('click', handleDraw)
                return;
               }
               if (compDeck.length  === 0 && playerSideDeck.length > compSideDeck.length) {
                messageEl.textContent = '';
                messageEl2.textContent = "You are the PokeWar Master!"
                // ashFace.classList.add('sad');
                cardFlip.removeEventListener('click', handleDraw)
                return;
               }


       } else if (playerVal === compVal) {
                messageEl.textContent = "WAR!"

                tie()
        }      
    
}
        
// create the tie function 
function tie() {

        warField.push(playerVal, compVal)
console.log('HIT')
        if (playerDeck.length <= 4 && playerDeck.length > 0){
                console.log('Hit2')
                drawCard();
                compareCards();
                return;

        }

        if (playerDeck.length === 0 && compSideDeck.length > playerSideDeck.length){
                console.log('Hit3')
                        messageEl.textContent = '';
                        messageEl2.textContent = "Ash Ketchum is the PokeWar Master!"
                        // ashFace.classList.add('happy');
                        cardFlip.removeEventListener('click', handleDraw)
                        return;
                }
                else if (playerDeck.length === 0  && playerSideDeck.length > compSideDeck.length) {
                        console.log('Hit4')
                        messageEl.textContent = '';
                        messageEl2.textContent = "You are the PokeWar Master!"
                        // ashFace.classList.add('sad');
                        cardFlip.removeEventListener('click', handleDraw)
                        return;
                }
        
         else if (playerDeck.length >= 5){
                console.log('Hit5')
                playerWarCards = playerDeck.splice(0,4)
                compWarCards = compDeck.splice(0,4)
                
                playerWarCards.forEach(v => {
                warField.push(v)
                })
                compWarCards.forEach(v => {
                warField.push(v)
                        return;
                })
} else {
        console.log('Hit6')
        return; 
        }
        
}



        //if playerCard > compCard, player takes both cards and places them face up next to his/her current playing deck which is faced down.
        //if playerCard < compCard, comp takes bith cards and they are placed next to it's current playing deck which is faced down.

        //if playerCard == compCard,  top 5 cards from each deck will be placed face down on the play field and the 6th card will be faced up to declare winner.

//========DISPLAYED MESSAGES========//

        // this is where the massage will be displayed of who won the card battle, or   the whole game


//========DISPLAY IMAGES========//
        //if I have some images, I will include them during the game.
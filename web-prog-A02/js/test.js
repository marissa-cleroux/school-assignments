//var newUser = new User("Marissa", "Cleroux", "awesomePossum", "123-1234", "J8Y6A1", 5000);
var bet = new Bet(104);

var showFaceUp = function () {
    for (let i = 0; i < 7; i++) {
        if (playingCards.canPlay[i] == 'Empty')
            console.log(playingCards.canPlay[i][0]);
        else
            for (let j = 0; j < playingCards.canPlay[i].length; j++)
                console.log(`Face up cards in col ${i + 1}: ${playingCards.canPlay[i][j].card()}`);
    }
    console.log(`Face up card in waste pile: ${gameWaste.pile[gameWaste.pile.length - 1].card()}`);
};

function showGameWastePile() {
    console.log(`The game waste pile now contains: `);
    for (let i = 0; i < gameWaste.pile.length; i++)
        console.log(gameWaste.pile[i].card())
}

function newDeck() {

    gameDeck = new Deck();
    gameTableau = new Tableau();
    gameStock = new Stock();
    gameFoundation = new Foundation();

    gameDeck.deck = shuffle(gameDeck.deck);

    console.assert(gameDeck != unshuffledDeck, "Deck has not been shuffled");
    deal(gameDeck.deck);
    console.assert(gameTableau.colOne.length == 1, "Column one on the tableau does not have the right amount of cards");
    console.assert(gameTableau.colTwo.length == 2, "Column two on the tableau does not have the right amount of cards");
    console.assert(gameTableau.colThree.length == 3, "Column three on the tableau does not have the right amount of cards");
    console.assert(gameTableau.colFour.length == 4, "Column four on the tableau does not have the right amount of cards");
    console.assert(gameTableau.colFive.length == 5, "Column five on the tableau does not have the right amount of cards");
    console.assert(gameTableau.colSix.length == 6, "Column six on the tableau does not have the right amount of cards");
    console.assert(gameTableau.colSeven.length == 7, "Column seven on the tableau does not have the right amount of cards");
    console.assert(gameStock.pile.length == 24, "The stock does not have the right amount of cards");
    console.assert(gameDeck.deck != 0, "There are still cards in the deck after the deal");
    console.log("new deal");
    gameWaste = new Waste();
    playingCards = new PlayableCards();
    gameStock.draw();
    playingCards.updatePlayingCards();
    showFaceUp();
}
//newWasteAndCards();
//demonstrating draw from stock
console.log(`Face up cards after one draw:`);
newDeck();
showGameWastePile();

console.log(`-------------------------------------------`);
var unshuffledDeck = new Deck();
console.log(`Unshuffled deck: `, unshuffledDeck.deck);

var shuffledDeckExample = new Deck();
shuffle(shuffledDeckExample.deck);
console.log(`Shuffled deck:`, shuffledDeckExample.deck);


// test play
console.log(`---------------------------------------`);
console.log(`Valid plays on foundation:`);
playingCards.canPlay[3].push(new Card('A', 'Diamond', 'red', 'N/A', '2'));
moveCard(1, playingCards.canPlay[3], gameFoundation.diamonds);
console.log(`Foundation now contains: ${gameFoundation.diamonds[0].card()}`);
playingCards.canPlay[4].push(new Card('2', 'Diamond', 'red', 'A', '3'));
moveCard(1, playingCards.canPlay[4], gameFoundation.diamonds);
console.log(`Foundation now contains: ${gameFoundation.diamonds[0].card()} and ${gameFoundation.diamonds[1].card()}`);


console.log('-----------------------------------');
console.log('Invalid plays on the foundation from the tableau: ');
playingCards.canPlay[3].push(new Card('5', 'Diamond', 'red', '4', '6'));
moveCard(1, playingCards.canPlay[3], gameFoundation.diamonds);
playingCards.updatePlayingCards();
playingCards.canPlay[0].push(new Card('3', 'Spade', 'black', '2', '4'));
moveCard(1, playingCards.canPlay[0], gameFoundation.spades);

// demonstrating playing on the tableau, valid and invalid plays
console.log(`---------------------------------------------`);
console.log(`Invalid play on the tableau from the tableau, not the correct colours: `);
newDeck();
playingCards.canPlay[6].push(new Card('3', 'Spade', 'black', '2', '4'));
playingCards.canPlay[5].push(new Card('4', 'Spade', 'black', '3', '5'));
playingCards.updatePlayingCards();
moveCard(1, playingCards.canPlay[6], playingCards.canPlay[5]);

console.log(`---------------------------------------------`);
console.log(`Invalid play on the tableau from the tableau, not the correct rank`);
newDeck();
playingCards.canPlay[3].push(new Card('K', 'Spade', 'black', 'Q', 'N/A'));
playingCards.canPlay[4].push(new Card('J', 'Diamond', 'red', '10', 'Q'));
moveCard(1, playingCards.canPlay[4], playingCards.canPlay[3]);

console.log(`---------------------------------------------`);
console.log(`Invalid play on the tableau from the waste pile: `);
gameWaste.pile.push(new Card('10', 'Diamond', 'red', '9', 'J'));
gameWaste.pile.shift();
moveCard(1, gameWaste.pile, playingCards.canPlay[3]);
showGameWastePile();
showFaceUp();

console.log(`---------------------------------------------`);
console.log(`Invalid play on the tableau from the tableau, not a king on empty: `);
newDeck();
playingCards.canPlay[0] = ['Empty'];
playingCards.canPlay[4].push(new Card('10', 'Heart', 'red', '9', 'J'));
moveCard(1, playingCards.canPlay[4], playingCards.canPlay[0]);
showFaceUp();

console.log(`---------------------------------------------`);
console.log(`Valid play on the tableau from the tableau, king on empty:`);
playingCards.canPlay[6].push(new Card('K', 'Club', 'black', 'Q', 'N/A'));
moveCard(1, playingCards.canPlay[6], playingCards.canPlay[0]);
showFaceUp();

console.log(`---------------------------------------------`);
console.log(`Valid play on the tableau from the tableau, one Card:`);
newDeck();
playingCards.canPlay[3].push(new Card('5', 'Spade', 'black', '4', '6'));
playingCards.canPlay[4].push(new Card('6', 'Heart', 'red', '5', '7'));
moveCard(1, playingCards.canPlay[3], playingCards.canPlay[4]);
showFaceUp();

console.log(`---------------------------------------------`);
console.log(`Valid play on the tableau from the tableau with more than one Card:`);
playingCards.canPlay[2].push(new Card('7', 'Club', 'black', '6', '8'));
moveCard(2, playingCards.canPlay[4], playingCards.canPlay[2]);
showFaceUp();

console.log(`---------------------------------------------`);
console.log(`Valid play on the tableau from the waste pile:`);
playingCards.canPlay[4].push(new Card('Q', 'Spade', 'black', 'J', 'K'));
gameWaste.pile.push(new Card('J', 'Diamond', 'red', '10', 'Q'));
showFaceUp();
gameWaste.pile.shift();
moveCard(1, gameWaste.pile, playingCards.canPlay[4]);
showGameWastePile();

console.log(`--------------------------------------------------------`);
console.log(`Winning:`)
gameFoundation.onFoundation[1] = unshuffledDeck.deck.slice(0, 13);
gameFoundation.onFoundation[2] = unshuffledDeck.deck.slice(13, 26);
gameFoundation.onFoundation[0] = unshuffledDeck.deck.slice(26, 39);
gameFoundation.onFoundation[3] = unshuffledDeck.deck.slice(39, 52);
gameStock.pile = [];
checkForWin();

console.log(`---------------------------------------------------------------`);
console.log(`Losing/Quitting no cards on the foundation: `);
newDeck();
quit();

console.log(`----------------------------------------------------------------`);
console.log(`Losing/Quitting, cards on the foundation: `);
gameFoundation.clubs.push(new Card('A', 'Club', 'black', 'N/A', '2'));
gameFoundation.clubs.push(new Card('2', 'Club', 'black', 'A', '3'));
gameFoundation.clubs.push(new Card('3', 'Club', 'black', '2', '4'));
quit();
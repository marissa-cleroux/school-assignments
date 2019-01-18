$$('testWin').addEventListener('click', () => {
        var unshuffledDeck = new Deck();
        unshuffledDeck.createDeck();
        for (let i = 0; i < gameFoundation.onFoundation.length; i++) {
                gameFoundation.onFoundation[i] += 'Empty'
        }
        gameFoundation.onFoundation[1] = unshuffledDeck.deck.slice(0, 13);
        gameFoundation.onFoundation[2] = unshuffledDeck.deck.slice(13, 26);
        gameFoundation.onFoundation[0] = unshuffledDeck.deck.slice(26, 39);
        gameFoundation.onFoundation[3] = unshuffledDeck.deck.slice(39, 52);
        gameStock.pile = [];

        for (let i = 0; i < gameTableau.canPlay.length; i++) {
                gameTableau.canPlay[i] = ['Empty'];
        }

        dealToTheDOM();
        checkForWin();
});
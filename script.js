(() => {
  const cards = document.querySelectorAll('#field div');

  const shuffle = arr => arr.map(a => [Math.random(), a])
                            .sort((a, b) => a[0] - b[0])
                            .map(a => a[1]);

  let numbers = shuffle(['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8']),
      selectedCards = [],
      openedCards = [];

  // Fill cards with numbers
  for (let i = 0; i < cards.length; i++) {
    cards[i].dataset.value = numbers[i];
  }

  cards.forEach(card => {
    card.addEventListener('click', e => {
      selectedCards.push(document.querySelector(`#${e.target.id}`));

      card.style.backgroundColor = '#8396a5';
      card.innerText = card.dataset.value;

      if (selectedCards.length === 2) {
        // Block all cards to check if selected cards are equal
        cards.forEach(card => {
          card.style.pointerEvents = 'none';
        });

        setTimeout(() => {
          if (selectedCards[0].dataset.value === selectedCards[1].dataset.value) {
            selectedCards.forEach(card => {
              openedCards.push(card);
            });
          } else {
            selectedCards.forEach(card => {
              card.style.backgroundColor = '#e2e2e2';
              card.innerText = '';
            });
          }

          selectedCards = [];
          cards.forEach(card => {
            // Unblock all cards
            card.style.pointerEvents = 'auto';
          });
          openedCards.forEach(card => {
            // Block all opened matching cards
            card.style.pointerEvents = 'none';
          });

          // Restart game
          if (openedCards.length === cards.length) {
            numbers = shuffle(['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8']);
            selectedCards = [];
            openedCards = [];

            for (let i = 0; i < cards.length; ++i) {
              cards[i].style.backgroundColor = '#e2e2e2';
              cards[i].style.pointerEvents = 'auto';
              cards[i].dataset.value = numbers[i];
            }
          }
        }, 500);
      }
    });
  });
})();

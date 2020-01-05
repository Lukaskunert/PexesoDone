const cards = document.querySelectorAll('.pexeso-karta');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('otoc');


    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;

        if(firstCard.dataset.framework === secondCard.dataset.framework) {
            firstCard.removeEventListener('click', flipCard)
            secondCard.removeEventListener('click', flipCard)

            resetBoard();
        } else {
            lockBoard = true;
            
            setTimeout(() => {
            firstCard.classList.remove('otoc');
            secondCard.classList.remove('otoc');

            resetBoard();
            }, 1500)
        }
    }
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


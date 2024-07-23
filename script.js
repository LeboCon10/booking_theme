document.addEventListener('DOMContentLoaded', (event) => {
    const cards = [
        { id: 1, order: 1, videoSrc: 'https://www.youtube.com/embed/5bLEDd-PSTQ?si=V1ncW2RQbIFsOhSv' },
        { id: 2, order: 2, videoSrc: 'video2.mp4' },
        { id: 3, order: 3, videoSrc: 'video3.mp4' },
        { id: 4, order: 4, videoSrc: 'video4.mp4' }
    ];

    let shuffledCards = shuffle(cards);
    const cardContainer = document.getElementById('card-container');

    shuffledCards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.order = card.order;
        cardElement.draggable = true;

        let videoElement = document.createElement('video');
        videoElement.src = card.videoSrc;
        videoElement.controls = true;

        cardElement.appendChild(videoElement);
        cardContainer.appendChild(cardElement);

        cardElement.addEventListener('click', () => {
            cardElement.classList.toggle('flipped');
        });

        cardElement.addEventListener('dragstart', handleDragStart);
        cardElement.addEventListener('dragover', handleDragOver);
        cardElement.addEventListener('drop', handleDrop);
    });

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    let dragged;

    function handleDragStart(e) {
        dragged = this;
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        if (dragged !== this) {
            let allCards = [...document.querySelectorAll('.card')];
            let draggedIndex = allCards.indexOf(dragged);
            let targetIndex = allCards.indexOf(this);

            if (draggedIndex < targetIndex) {
                this.parentNode.insertBefore(dragged, this.nextSibling);
            } else {
                this.parentNode.insertBefore(dragged, this);
            }
        }
        checkOrder();
    }

    function checkOrder() {
        let correct = true;
        document.querySelectorAll('.card').forEach((card, index) => {
            if (parseInt(card.dataset.order) !== index + 1) {
                correct = false;
            }
        });
        let feedbackText = document.getElementById('feedback-text');
        if (correct) {
            feedbackText.textContent = "Correct Order!";
        } else {
            feedbackText.textContent = "Incorrect Order. Keep Trying!";
        }
    }

    document.getElementById('reset-btn').addEventListener('click', () => {
        cardContainer.innerHTML = '';
        shuffledCards = shuffle(cards);
        shuffledCards.forEach(card => {
            let cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.order = card.order;
            cardElement.draggable = true;

            let videoElement = document.createElement('video');
            videoElement.src = card.videoSrc;
            videoElement.controls = true;

            cardElement.appendChild(videoElement);
            cardContainer.appendChild(cardElement);

            cardElement.addEventListener('click', () => {
                cardElement.classList.toggle('flipped');
            });

            cardElement.addEventListener('dragstart', handleDragStart);
            cardElement.addEventListener('dragover', handleDragOver);
            cardElement.addEventListener('drop', handleDrop);
        });
    });

    new QRCode(document.getElementById("qrcode"), window.location.href);
});

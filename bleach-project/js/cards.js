const cards = document.querySelector('.cards');

const API = 'https://jsonplaceholder.typicode.com/posts';

async function fetchCardsData() {
    try {
        const response = await fetch(`${API}?_limit=4`);
        const data = await response.json();

        data.forEach((card) => {
            const cardBlock = document.createElement('div');
            cardBlock.setAttribute('class', 'card');
            cardBlock.innerHTML = `
                <h2 class="title">${card.title}</h2>
                <div class="cardImg">
                    <img src="../images/cards.jpeg" alt="">
                </div?
                <p class="body">${card.body}</p>
            `;
            cards.append(cardBlock);
        });
    } catch (error) {
        console.log('Fetch error:', error);
    }
}

fetchCardsData();

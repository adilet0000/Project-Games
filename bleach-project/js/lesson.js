//TAB SLIDER  

const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParent = document.querySelector('.tab_content_items');
let intervalId;

const hideTabsContentCards = () => {
    tabsContentCards.forEach((tabContentCard) => {
        tabContentCard.style.display = 'none';
    });
    tabsItems.forEach((tabItem) => {
        tabItem.classList.remove('tab_content_item_active');
    });
};

const showTabsContentCards = (indexElement = 0) => {
    tabsContentCards[indexElement].style.display = 'block';
    tabsItems[indexElement].classList.add('tab_content_item_active');
};

hideTabsContentCards();
showTabsContentCards();

tabsItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                clearInterval(intervalId); 
                hideTabsContentCards();
                showTabsContentCards(tabItemIndex);
                intervalId = setInterval(() => { 
                    tabItemIndex++; 
                    if (tabItemIndex > tabsItems.length - 1) {
                        tabItemIndex = 0;
                    }
                    hideTabsContentCards();
                    showTabsContentCards(tabItemIndex);
                }, 3000);
            }
        });
    }
};

let index = 0;

intervalId = setInterval(() => {

    index++;
    if (index > tabsItems.length - 1) {
        index = 0;
    }
    hideTabsContentCards();
    showTabsContentCards(index);
}, 3000);



//HW 1 part 2

//MOVE BLOCK

const moveBlock = (angle) => {
    const parentBlock = document.querySelector('.parent_block');
    const childBlock = document.querySelector('.child_block');

    const parentRect = parentBlock.getBoundingClientRect();
    const parentWidth = parentRect.width;
    const parentHeight = parentRect.height;
    const parentLeft = parentRect.left;
    const parentTop = parentRect.top;

    const radiusX = parentWidth / 2;
    const radiusY = parentHeight / 2;
    const centerX = parentLeft + radiusX;
    const centerY = parentTop + radiusY;
    const speed = 0.8;

    const radians = (angle * Math.PI) / 180;
    const x = centerX + radiusX * Math.cos(radians);
    const y = centerY + radiusY * Math.sin(radians);

    childBlock.style.left = `${x - parentLeft - childBlock.clientWidth / 2}px`;
    childBlock.style.top = `${y - parentTop - childBlock.clientHeight / 2}px`;

    angle += speed;

    if (angle >= 360) {
        angle = 0;
    }

    requestAnimationFrame(() => {
        moveBlock(angle);
    });
};

moveBlock(90); 




//CARD SWITCHER 

const card = document.querySelector('.card'),
    btnPrev = document.querySelector("#btn-prev"),
    btnNext = document.querySelector('#btn-next');

let count = 1;

async function loadData(count) {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`);
        const data = await response.json();
        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? "green" : "red" }">${data.completed}</p>
            <span>${data.id}</span>
        `
    }
    catch(e){
        console.log('Fetch error:', error);
    }
}

function updateCount(operation) {
    if (operation === 'next') {
        count = count < 200 ? count + 1 : 1;
    } else if (operation === 'prev') {
        count = count > 1 ? count - 1 : 200;
    }
    loadData(count);
}

btnNext.onclick = () => updateCount('next');

btnPrev.onclick = () => updateCount('prev');

loadData(count);


//hw 6 part 2

async function asyncLoadPosts() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        console.log(data);
    }
    catch(e){
        console.log('Fetch error:', error);
    }
}

asyncLoadPosts()



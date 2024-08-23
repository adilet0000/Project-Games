// !HEADER!
const $header = document.querySelector('.header');
const defaultOffset = 100;
let lastScroll = 0;

const scrollPosition = () => window.scrollY || document.documentElement.scrollTop;
const isHidden = () => $header.classList.contains('hide');

window.addEventListener('scroll', () => {

    if(scrollPosition() > lastScroll && !isHidden() && scrollPosition() > defaultOffset) {
        $header.classList.add('hide');
    } else if (scrollPosition() < lastScroll && isHidden()){
        $header.classList.remove('hide')
    }
    lastScroll = scrollPosition();
});

// !TYPING GAME!

// LOREM GENERATOR
const generateLoremIpsum = (length) => {
    const loremWords = "Lorem ipsum dolor sit amet consectetur adipiscing elit".split(" ");
    let lorem = "";
    for (let i = 0; i < length; i++) {
        lorem += loremWords[Math.floor(Math.random() * loremWords.length)] + " ";
    }
    return lorem.trim();
};


let lorem = generateLoremIpsum(25);
let numOfSymbols = lorem.length;

// VARIABLES DOM
const $textInput = document.querySelector('#text-input');
const $textField = document.querySelector('.text-field');
const $start_btn = document.querySelector('#start-button');
const $typing_result = document.querySelector('#typing_result');

let strings = [lorem];


$textInput.oninput = () => {
    strings[1] = $textInput.value;
};

// VARIABLES TIMER
let timer = document.querySelector('#seconds');
let num = 0;
let interval = null;
let currentState = 'start';

$start_btn.addEventListener('click', () => {
    if (currentState === 'start') {
        // Начало
        $textField.innerHTML = lorem;
        interval = setInterval(() => {
            timer.textContent = num++;
        }, 1000);
        $start_btn.textContent = 'FINISH';
        currentState = 'finish';

    } else if (currentState === 'finish') {
        // Остановка
        clearInterval(interval);
        interval = null;
        if (areAllEqual(strings)) {
            $typing_result.innerHTML = `Correct! The length is (☞ﾟヮﾟ)☞${numOfSymbols}☜(ﾟヮﾟ☜) symbols.`;
        } else {
            $typing_result.innerHTML = "You made a mistake! ಠ_ಠ";
        }
        $start_btn.textContent = 'RESET';
        currentState = 'reset';

    } else if (currentState === 'reset') {
        // Сброс
        clearInterval(interval);
        interval = null;
        num = 0;
        timer.textContent = num;
        lorem = generateLoremIpsum(25);
        numOfSymbols = lorem.length;
        strings = [lorem];
        $textField.innerHTML = "lorem20";
        $textInput.value = "";
        $typing_result.innerHTML = "(▀̿Ĺ̯▀̿ ̿)";
        $start_btn.textContent = 'START';
        currentState = 'start';
    }
});

const areAllEqual = (strings) => {
    const regex = new RegExp(`^${strings[0]}$`); // создание регулярного выражения по строке (лорем строке)
    return regex.test(strings[1]);
};


// !CLICK GAME!

const $parentBlock = document.querySelector('.parent_block');
const $childBlock = document.querySelector('.child_block');

const $playAgain = document.querySelector('.play-again');
const $congrats = document.querySelector('.congrats');

const $offsetWidth = $parentBlock.offsetWidth - $childBlock.offsetWidth;
const $offsetHeight = $parentBlock.offsetHeight - $childBlock.offsetHeight;

let targetX = Math.random() * $offsetWidth;
let targetY = Math.random() * $offsetHeight;
let currentX = 0;
let currentY = 0;

const moveBlockRandomly = () => {
    const speed = 0.12;


    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;

    $childBlock.style.transform = `translate(${currentX}px, ${currentY}px)`;


    if (Math.abs(targetX - currentX) < 1 && Math.abs(targetY - currentY) < 1) {
        targetX = Math.random() * $offsetWidth;
        targetY = Math.random() * $offsetHeight;
    }

    requestAnimationFrame(moveBlockRandomly);
};


$congrats.style.display = 'none';
$playAgain.style.display = 'none';

$childBlock.addEventListener('click', () => {
    $childBlock.style.display = 'none';
    $congrats.style.display = 'inline';
    $playAgain.style.display = 'inline';
});

$playAgain.onclick = () => {
    $playAgain.style.display = 'none';
    $congrats.style.display = 'none';
    $childBlock.style.display = 'inline';
}; // лучше придерживаться одного типа написания

moveBlockRandomly();
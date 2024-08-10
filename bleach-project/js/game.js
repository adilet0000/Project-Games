//TIMER

const characters = [
    {
      name: "Ичиго Куросаки",
      image: "../images/1-ichigo.jpg",
      options: ["Ичиго Куросаки", "Рукия Кучики", "Бьякуя Кучики", "Тоширо Хитсугай"]
    },
    {
      name: "Рукия Кучики",
      image: "../images/2-rukiya.jpg",
      options: ["Ичиго Куросаки", "Бьякуя Кучики", "Улькиорра Шиффер","Рукия Кучики"]
    },
    {
      name: "Бьякуя Кучики",
      image: "../images/3-byakuya.jpg",
      options: ["Ичиго Куросаки", "Бьякуя Кучики", "Улькиорра Шиффер", "Тоширо Хитсугай"]
    },
    {
      name: "Тоширо Хитсугай",
      image: "../images/4-toshiro.jpg",
      options: ["Рукия Кучики", "Бьякуя Кучики", "Тоширо Хитсугай", "Улькиорра Шиффер"]
    },
    {
      name: "Улькиорра Шиффер",
      image: "../images/5-ulkiora.jpg",
      options: ["Ичиго Куросаки", "Рукия Кучики", "Улькиорра Шиффер", "Тоширо Хитсугай"]
    }
  ];
  

    let currentCharacterIndex = 0;
    let stopwatchValue = 0;
    let stopwatchInterval;
    let gameCompleted = false;
    let gameStopped = true;
    let correctGuess = false;
    let stopwatchSeconds = 0;
    let stopwatchMinutes = 0;
  
  function startGame() {
    displayCharacter();
    gameCompleted = false;
    enableStartButton(); 
  }
  
  function displayCharacter() {
    const character = characters[currentCharacterIndex];
    const characterImage = document.getElementById('characterImage');
    characterImage.src = character.image;
    displayOptions(); 
  }
  
  function displayOptions() {
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
  
    const character = characters[currentCharacterIndex];
    character.options.forEach(option => {
      const optionButton = document.createElement('button');
      optionButton.textContent = option;
      optionButton.classList.add('option');
      optionButton.onclick = () => {
        if (!gameStopped) {
          checkGuess(option);
        }
      };
      optionsDiv.appendChild(optionButton);
    });
  }
  function checkGuess(guess) {
    if (correctGuess) {
      return;
    }
  
    const character = characters[currentCharacterIndex];
    const optionsDiv = document.getElementById('options');
    const optionButtons = optionsDiv.querySelectorAll('.option');
  
    optionButtons.forEach(button => {
      button.disabled = true; 
    });
  
    if (guess === character.name) {
      optionButtons.forEach(button => {
        if (button.textContent === guess) {
          button.classList.add('ok');
        } else {
          button.classList.add('disabled');
        }
      });
      correctGuess = true; 
      setTimeout(() => {
        nextCharacter();
        optionButtons.forEach(button => {
          button.classList.remove('ok', 'disabled');
          button.disabled = false; 
        });
        correctGuess = false; 
      }, 1000);
    } else {
      optionButtons.forEach(button => {
        if (button.textContent === guess) {
          button.classList.add('error');
        } else {
          button.classList.add('disabled');
        }
      });
      setTimeout(() => {
        optionButtons.forEach(button => {
          button.classList.remove('error', 'disabled');
          button.disabled = false; 
        });
      }, 1000);
    }
  }
  function nextCharacter() {
    currentCharacterIndex++;
  
    if (currentCharacterIndex < characters.length) {
      displayCharacter();
    } else {
      stopStopwatch();
  
      const totalSeconds = stopwatchMinutes * 60 + stopwatchSeconds;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
      document.getElementById('result').innerText = `Вы прошли игру за ${formattedTime}!`;
      gameCompleted = true;
      disableStartButton();
    }
  }
  
  function startStopwatch() {
    if (!gameCompleted && !stopwatchInterval) {
      stopwatchInterval = setInterval(updateStopwatch, 1000);
      gameStopped = false;
    }
  }
  
  function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    gameStopped = true;
  }
  
  function resetStopwatch() {
    stopStopwatch();
    stopwatchSeconds = 0;
    stopwatchMinutes = 0;
    document.getElementById('timer').textContent = '00:00';
    currentCharacterIndex = 0;
    displayCharacter();
    document.getElementById('result').innerText = '';
    document.getElementById('timer').textContent = '00:00';
    stopwatchValue = 0;
    gameCompleted = false;
    gameStopped = true; 
    enableStartButton(); 
  }
  
  function updateStopwatch() {
    stopwatchSeconds++;
  
    if (stopwatchSeconds === 60) {
      stopwatchSeconds = 0;
      stopwatchMinutes++;
    }
  
    const secondsDisplay = stopwatchSeconds < 10 ? `0${stopwatchSeconds}` : stopwatchSeconds;
    const minutesDisplay = stopwatchMinutes < 10 ? `0${stopwatchMinutes}` : stopwatchMinutes;
  
    document.getElementById('timer').textContent = `${minutesDisplay}:${secondsDisplay}`;
  }
  
  function disableStartButton() {
    const startButton = document.getElementById('start');
    startButton.disabled = true;
  }
  
  function enableStartButton() {
    const startButton = document.getElementById('start');
    startButton.disabled = false;
  }
  
  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');
  const resetButton = document.getElementById('reset');
  
  startButton.addEventListener('click', startStopwatch);
  stopButton.addEventListener('click', stopStopwatch);
  resetButton.addEventListener('click', resetStopwatch);
  
  window.onload = startGame;
  
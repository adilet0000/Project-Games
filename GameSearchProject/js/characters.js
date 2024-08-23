const loadCharactersData = async () => {
   const response = await fetch('../data/characterCard.json');
   const characters = await response.json();
   return characters;
}

const populateCards = (characters) => {
   const cards = document.querySelectorAll('.card');
   
   cards.forEach((card, index) => {
       const backContent = card.querySelector('.back-content');
       
       if (characters[index]) {
           backContent.querySelector('h2').innerHTML = characters[index].name_age;
           backContent.querySelector('span:nth-child(2)').innerHTML = characters[index].game;
           backContent.querySelector('span:nth-child(3)').innerHTML = characters[index].bio;
       }
   });
}
loadCharactersData().then(characters => {
   populateCards(characters);
});

// GSAP
window.onload = () => {
   
   setTimeout(() => {
      document.body.classList.add('loaded');

      Draggable.create('.gallery', {
         bounds: 'body',
         inertia: true,
      })
      
   }, 222);
};
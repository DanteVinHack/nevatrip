const cardItems = document.querySelectorAll('#card__item-js');
let cardButtons = [];

cardItems.forEach(cardItem => {
  const buttonMore = document.createElement('span');
  buttonMore.classList.add('card__more')
  buttonMore.append('еще...');
  const buttons = cardItem.querySelectorAll('.button');

  
  if (cardItem.offsetHeight > 30) {
    const appendButtons = ({ target }) => {
      buttons.forEach(button => cardItem.insertAdjacentElement('afterend', button));
      
      target.remove()
    }
    
    
    buttonMore.addEventListener('click', appendButtons);

    buttons.forEach(button => button.remove())
    cardItem.append(buttonMore)
  }
})

console.log(cardItems)
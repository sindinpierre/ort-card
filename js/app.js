

let NB_CARDS = prompt("Combien de carte ?");


if(NB_CARDS % 2){
  NB_CARDS++;
}
let pair=NB_CARDS/2;
const cards = [];
const tabRandomNB = [];
let lastCard=null;

function init() {
  for (let i = 0; i < NB_CARDS/2; i++) {
    createCard();
    copyCard(i*2);
  }
  shuffle(cards);
  document.querySelector('.wrapper').innerText="";
  for (let i = 0; i < NB_CARDS; i++) {
    document.querySelector('.wrapper').appendChild(cards[i]);
    cards[i].addEventListener('click', game,false);
  }
}
function game() {
  if (lastCard == null) {
    retournerCarte(this);
    lastCard=this;
  } else if(lastCard.textContent == this.textContent){
    retournerCarte(this);
    lastCard.removeEventListener('click', game,false);
    this.removeEventListener('click',game,false);
    lastCard=null;
    pair--;
  }
  else{
    retournerCarte(this);
   
    setTimeout(() => {
      retournerCarte(this);
      retournerCarte(lastCard);
      lastCard=null;  
    }, 500);
  }
  if (pair==0) {
    setTimeout(()=>{alert('you win !')},1000);
  }
  
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function copyCard(index) {
  const card = document.createElement('div');
  const backCard = document.createElement('div');
  const frontCard = document.createElement('div');
  
  card.appendChild(backCard);
  card.appendChild(frontCard);
  
  card.classList.add('card', 'flipped'/*TMP*/);
  backCard.classList.add('back');
  frontCard.classList.add('front');
  retournerCarte(card);
  cards.push(card);
  card.querySelector('.front').textContent = cards[index].textContent;

  document.querySelector('.wrapper').appendChild(card);
}

function createCard() {
  const card = document.createElement('div');
  const backCard = document.createElement('div');
  const frontCard = document.createElement('div');
  
  card.appendChild(backCard);
  card.appendChild(frontCard);
  
  card.classList.add('card', 'flipped'/*TMP*/);
  backCard.classList.add('back');
  frontCard.classList.add('front');
  retournerCarte(card);
  cards.push(card);
  handleCard(cards[cards.length-1]);

  document.querySelector('.wrapper').appendChild(card);
}

function handleCard(card) {
  let randomNB;
  let table;

  do {
    randomNB =Math.ceil(Math.random()*52);
    
  }
  while (tabRandomNB.includes(randomNB));
  tabRandomNB.push(randomNB);
  card.querySelector('.front').textContent = randomNB;
}

function retournerCarte(card){
  card.classList.toggle('flipped');
}

init();


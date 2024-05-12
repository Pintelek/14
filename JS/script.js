import Basket from "../Class/Basket.js";
let dataBasket = {};

if(localStorage.getItem('basket')){
  dataBasket = JSON.parse(localStorage.getItem('basket'));
}


const basket = new Basket(dataBasket);

let blockBasket = document.querySelector('.basket')

blockBasket.append(basket.render());

blockBasket.addEventListener('click', (e) => {
  if(e.target.hasAttribute('data-articul')){
    let art =  e.target.getAttribute('data-articul');
    if(e.target.classList.contains('minus')){
      blockBasket.innerHTML = '';
      basket.pushMinus(art);
      localStorage.setItem('basket', JSON.stringify(dataBasket));
      blockBasket.append(basket.render());
    }
    else if(e.target.classList.contains('plus')){
      blockBasket.innerHTML = '';
      basket.pushPlus(art);
      localStorage.setItem('basket', JSON.stringify(dataBasket));
      blockBasket.append(basket.render());
    }
    else if(e.target.classList.contains('delete')){
      blockBasket.innerHTML = '';
      basket.deleteGoods(art);
      localStorage.setItem('basket', JSON.stringify(dataBasket));
      blockBasket.append(basket.render());
  }
}
})


class Basket {
  constructor(
    items, 
    basketClass = ['basket'],
    plusClass = ['plus'],
    minusClass = ['minus'],
    deleteClass = ['delete'],
    currency = 'RUB'
  ){
    this.items = items;
    this.basketClass = basketClass;
    this.plusClass = plusClass;
    this.minusClass = minusClass;
    this.deleteClass = deleteClass;
    this.currency = currency;
  }
  /**
   * 
   * @param {string} element 
   * @param {Array} cssClasses 
   * @param {string} content 
   * @returns 
   */
  createElement(element, cssClasses, content){
      let elem = document.createElement(element);
      cssClasses.forEach(cssClass => {
        elem.classList.add(cssClass);
      })
      if(content){
        elem.textContent = content;
      }
      return elem;
    }

    updateLocalStorage(){
      localStorage.setItem('basket', this.items)
    }

    pushPlus(article){
      this.items[article]['count']++;
    }

    pushMinus(article){
      if(this.items[article]['count'] - 1 === 0){
        this.deleteGoods(article);
      }
      else {
        this.items[article]['count']--;
      }
    }

    deleteGoods(article){
      delete this.items[article];
    }

    getTotal(){
      let total = 0;
      for(let key in this.items){
        total += this.items[key].count * this.items[key].price;
      }
      return total;
    }

    render(){
      let table = this.createElement('table', this.basketClass);
      for(let key in this.items){
        let item = this.items[key];
        let tr = this.createElement('tr', []);
        // делаем кнопку удалить
        let td = this.createElement('td', []);
        let button = this.createElement('button', [...this.deleteClass, 'btn' , 'btn-danger'], 'x' );
            button.setAttribute('data-articul', key);
            td.append(button);
            tr.append(td);
        // делаем картинку 
        td = this.createElement('td', []);
        let img =  this.createElement('img', []);
        img.src = item.image;
        td.append(img);
        tr.append(td);
        // делаем описание
        td = this.createElement('td', []);
        let nameGoods =  this.createElement('h4', ['text-center'],item.name);
        td.append(nameGoods);
        tr.append(td);
        // делаем кнопку минус
        td = this.createElement('td', []);
        button = this.createElement('button', [...this.minusClass, 'btn' , 'btn-secondary'], '-' );
        button.setAttribute('data-articul', key);
        td.append(button);
        tr.append(td);
        
        // делаем количество
        td = this.createElement('td', []);
        let count =  this.createElement('h4', ['text-center'],item.count);
        img.src = item.image;
        td.append(count);
        tr.append(td);
        // делаем кнопку плюс
        td = this.createElement('td', []);
        button = this.createElement('button', [...this.plusClass, 'btn' , 'btn-success'], '+' );
        button.setAttribute('data-articul', key);
        td.append(button);
        tr.append(td);
        table.append(tr);
        // делаем вывод цены
        td = this.createElement('td', []);
        let price =  this.createElement('h4', ['text-center'],`${item.price} ${this.currency}`);
        td.append(price);
        tr.append(td);
        table.append(tr);
      }
      // делаем сумму
      let tr = this.createElement('tr', []);
      let td = this.createElement('td', []);
        td.setAttribute('colspan', 7); // merge 7 td
        td.style.textAlign = 'right';
      let total = this.createElement('span', ['total'], `${this.getTotal()} ${this.currency}`);
      td.append(total);
      tr.append(td);
      table.append(tr);
      return table;
    }
  }

 export default Basket;
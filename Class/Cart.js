class Cart {
  constructor() {
    this._data = {};
    this._attribute = [];
    this._header = '';
    this._headerClasses = []
    this._element = 'body';
  }

  /**
   * set header Title
   * @param {string} header - Текст Header
   */
  setHeader(header) {
    if (typeof (header) === 'string' && header.trim() !== '') {
      this._header = header.trim();
      return true;
    }
    return false;
  }

  /**
   * set header Classes
   */

  setHeaderClass(headerClass) {
    if (typeof (headerClass) === 'object') {
      this._headerClasses = headerClass;
      return true;
    }
    return false;
  }

  /**
   * set Parent element
   * @param {string} element 
   */
  setElement(element) {
    
    if (document.querySelector(element)) {
      this._element = element;
      return true;
    }
    return false;
  }

  /**
   * set Attribute from Date
   * @param {object} attribute 
   */

  setAttribute(attribute) {
    if (typeof (attribute) === 'object') {
      this._attribute = attribute;
      return true;
    }
    return false;
  }

  createElement(element, arrayClasses, content){
    let elem = document.createElement(element);
    arrayClasses.forEach(cssClass => {
      elem.classList.add(cssClass);
    })
    if(content){
      elem.textContent = content;
    }
    return elem;
  }

  /**
   * create cart 
   * @param {array} dataCart 
   */
  createCart(){
    let cartRow = this.createElement('div', ['row']);
    for(let key in this._data){
      let cartCol = this.createElement('li', ['col-4', 'cart-item', 'row', 'd-flex','flex-column', 'align-items-center']);
      cartRow.append(cartCol);
      let cartTitle = this.createElement('h3', ['cart-title','text-center' ,'col-12', 'mb-3'], this._data[key].name);
     
      let cartImageBlock = this.createElement('div',['img-cart-block', 'col-4','mb-3']);
      let cartImage = this.createElement('img',['img-cart']);
      cartImage.src = this._data[key].image;
      cartImageBlock.append(cartImage)
      let cartPrice = this.createElement('p',['cart-price', 'text-bold', 'text-center', 'col-10','mb-3'], ` ${this._data[key].price} ${this._attribute.currency}`)
      let cartBtn = this.createElement('button', ['btn', 'btn-success', 'col-3',], 'Добавить в корзину');
      cartBtn.setAttribute('data-articles', `${key}`);
      cartCol.append(cartTitle, cartImageBlock,cartPrice, cartBtn)
    }
    return cartRow
    
  }
  /**
   * method show 
   */


  render(data){
    this.setHeader(data.header);
    this.setHeaderClass(data.headerClasses);
    this.setElement(data.element);
    this.setAttribute(data.attribute);
    this._data = data.data;
    const parent = document.querySelector(this._element);
    /**
     * show Header
     */
    if (this._header) {
      const header = this.createElement('h1', this._headerClasses, this._header) 
      parent.append(header);
    }
    parent.append(this.createCart());
  }
}

export default Cart;
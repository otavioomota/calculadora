
class CalcCalculator {

  constructor(){
    this._operation = [];
    this._locale = 'pt-BR';
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");

    this._currentDate;
    this.initialize();
    this.initButtonsEvents();
    this.initKeyBoard();
  }

  initialize(){

    this.setDisplayDateTime();

    setInterval(()=> {

      this.setDisplayDateTime();

    }, 1000)
    this.setLastNumberToDisplay();
    this.pasteFromClipBoard();
  }


  pasteFromClipBoard(){
    document.addEventListener('paste', event => {
      let text = event.clipboardData.getData('Text');

      this.displayCalc = parseFloat(text);
      console.log(text);
    })
  }
  initKeyBoard(){

    document.addEventListener('keyup', event => {

    let value = event.key;

      switch(value){

        case 'Escape':
          this.clearAll();
          break;

      case 'Backspace':
        this.cancelEntry();
        break;

      case '+':
      case '-':
      case '*':
      case '/':
        this.addOperation(value);
        break;

      case ',':
      case '.':
        this.addDot();
        break;

      case '%':
          this.addOperation('%');
          break;

      case 'Enter':
      case '=':
        this.calc();
        break;

      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.addOperation(parseInt(value));
        break;

      case 'c':
        if(event.crtlKey)
          this.copyToClipyBoard();
          break;

      // default:
      //   this.setError();
      //   break;
      }
    })
  }

  addEventListenerAll(element, events, fn){

    events.split(" ").forEach(event => {

      element.addEventListener(event,fn,false);

    })
  }

  clearAll(){

    this._operation = [];
    this._lastNumber ="";
    this._lastOperator = "";

    this.setLastNumberToDisplay();

  }
  cancelEntry(){

    this._operation.pop();

  }


  setError(){

    this.displayCalc = "Error";

  }

  isOperator(value){

    return (['+','-','*','/','%'].indexOf(value) > -1);

  }

  getLastOperation(){

    return this._operation[this._operation.length - 1];

  }

  setLastOperation(value){

    this._operation[this._operation.length - 1] = value;

  }

  pushOperation(value){

    this._operation.push(value);

    if (this._operation.length > 3){

        this.calc();

    }

  }

  calc(){

    let last  =  '';

    if( this._operation.length > 3){
      last = this._operation.pop();
    }

    let result = eval(this._operation.join(" "));

    if( last == '%'){

      result /= 100;

    } else {

        this._operation = [result];
        if(last) this._operation.push(last);
    }

    this.setLastNumberToDisplay();

  }

  copyToClipyBoard(){

    let input = document.createElement('input');
    input.value = this.displayCalc;

    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    input.remove();
  }
  setLastNumberToDisplay(){

    let lastNumber;

    for(let i = this._operation.length - 1; i >=  0; i--){

        if(!this.isOperator(this._operation[i])){

          lastNumber  = this._operation[i];

          break;
        }
    }
    if(!lastNumber ) lastNumber  = 0;
    this.displayCalc = lastNumber;
  }

  addDot(){
    let lastOperation = this.getLastOperation();

    if( typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;
    if(this.isOperator(lastOperation) || !lastOperation){
      this.pushOperation('0.');
    } else {
      this.setLastOperation(lastOperation.toString() + '.');
    }
    this.setLastNumberToDisplay();
  }
  addOperation(value){

    console.log(value);

    if(isNaN(this.getLastOperation())) {

      if(this.isOperator(value)) {

        this.setLastOperation(value);

      } else if(isNaN(value)) {

      } else {

        this.pushOperation(value);
        this.setLastNumberToDisplay();
      }
    } else {

      if(this.isOperator(value)){

        this.pushOperation(value);

      } else {

        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(newValue);

        this.setLastNumberToDisplay();
      }
    }
    console.log(this._operation);
  }


  execBtn(value){

    switch(value){

      case 'ac':
        this.clearAll();
        break;

    case 'ce':
      this.cancelEntry();
      break;

    case 'soma':
      this.addOperation('+');
      break;

    case 'subtracao':
      this.addOperation('-');
      break;

    case 'multiplicacao':
      this.addOperation('*');
      break;

    case 'divisao':
      this.addOperation('/');
      break;

    case 'ponto':
      this.addDot();
      break;

    case 'porcento':
        this.addOperation('%');
        break;

    case 'igual':
      this.calc();
      break;

    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':

      this.addOperation(parseInt(value));

      break;

    default:

      this.setError();

      break;

    }
  }
  initButtonsEvents() {

    let buttons = document.querySelectorAll('#buttons >g, #parts> g');

    buttons.forEach(btn => {

      this.addEventListenerAll(btn,'click drag', event => {

        let textBtn = btn.className.baseVal.replace("btn-","");

        this.execBtn(textBtn);
      })
    })

    buttons.forEach(btn => {

      this.addEventListenerAll(btn, 'mouseover mouseup mousedown', event => {

        btn.style.cursor = 'pointer';

      })
    })


  }

  setDisplayDateTime(){

    this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
      day:"2-digit",
      month:"long",
      year:"numeric"
    });

    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

  }
  get displayTime(){

    return this._timeEl.innerHTML;

  }
  set displayTime(value){

    this._timeEl.innerHTML = value

  }
  get displayDate(){

    return this._dateEl.innerHTML

  }
  set displayDate(value){

    this._dateEl.innerHTML = value

  }
  get displayCalc(){

    return this._displayCalcEl.innerHTML;

  }

  set displayCalc(value){

    this._displayCalcEl.innerHTML = value;

  }

  get currentDate(){

    return new Date();

  }

  set currentDate(date){

    this._currentDate = date

  }


}

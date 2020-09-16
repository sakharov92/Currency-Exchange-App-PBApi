import React from 'react';
import './App.css';
import CurrencyTable from "./Components/currencyTable/CurrencyTable"
import InputBlock from "./Components/InputBlock/InputBlock"

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

    this.resolveChange = this.resolveChange.bind(this);
    this.rejectChange = this.rejectChange.bind(this);
    this.changeRates = this.changeRates.bind(this);
    this.calculate = this.calculate.bind(this);

    this.exchangeRate = {
      usdBuy: 0,
      usdSale: 0,
      eurBuy: 0,
      eurSale: 0,
      btcBuy: 0,
      btcSale: 0
    }
    this.state = this.exchangeRate;
  }

  componentDidMount() {
    this.getCurrency();
    if (localStorage.count) {
      localStorage.count = parseInt(localStorage.count) + 1;
    } else {
      localStorage.count = 1;
    }
  }

  //getting current exchange rate from Privat API and save into state of this component
  async getCurrency() {
    try {
      let response = await fetch(this.url);
      if (response.ok) {
        let json = await response.json();
        this.exchangeRate = {
          usdBuy: parseFloat(json[0].buy).toFixed(2),
          usdSale: parseFloat(json[0].sale).toFixed(2),
          eurBuy: parseFloat(json[1].buy).toFixed(2),
          eurSale: parseFloat(json[1].sale).toFixed(2),
          btcBuy: parseFloat(json[3].buy).toFixed(2),
          btcSale: parseFloat(json[3].sale).toFixed(2),
          uahBuy: 1,
          uahSale: 1
        };
        this.customRate = this.exchangeRate;
        this.setState(this.exchangeRate);
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
    } catch (error) {
      alert("PrivatBank API is currently unavailable. Please wait a couple of minutes and try again")
      // alert('Ошибка ' + error.name + ":" + error.message + "\n" + error.stack);
    }
  }

  // cancel changes in the current cell
  rejectChange(e) {
    let currentInput = e.target.closest("div.wrapper").querySelector("input");
    this.setState({
      [currentInput.name]: this.customRate[currentInput.name]
    })
    e.target.closest("div.wrapper").querySelector(".submitBclock").classList.remove("showSubmitBlock");

  }

  // setUp new value into the current cell
  resolveChange(e) {
    let currentInput = e.target.closest("div.wrapper").querySelector("input");
    if (e.target.parentElement.classList.contains("disabled")) {
      return
    } else {
      let newValue = parseFloat(currentInput.value).toFixed(2);
      if (!isNaN(newValue)) {
        this.setState({
          [currentInput.name]: newValue
        })
        this.customRate[currentInput.name] = newValue;
        e.target.closest("div.wrapper").querySelector(".submitBclock").classList.remove("showSubmitBlock");
      } else {
        this.setState({
          [currentInput.name]: this.customRate[currentInput.name]
        })
        e.target.closest("div.wrapper").querySelector(".submitBclock").classList.remove("showSubmitBlock");
      }
    }
  }

  //onChange hadler on input cell in the table
  changeRates(e) {

    let curentTarget = e.target;

    let newRate = parseFloat(curentTarget.value).toFixed(2);
    let resolveButton = curentTarget.closest(".wrapper").querySelector(".resolve");

    let maxRate = parseFloat((this.exchangeRate[curentTarget.name] * 1.1).toFixed(2));
    let minRate = parseFloat((this.exchangeRate[curentTarget.name] * 0.9).toFixed(2));

    if (newRate > maxRate || newRate < minRate || curentTarget.value.length === 0) {
      resolveButton.classList.add("disabled");
    } else {
      resolveButton.classList.remove("disabled");
    }
    this.setState({
      [curentTarget.name]: curentTarget.value
    })
  }

  // calculate your changing according to table rates
  calculate() {
    let changeValue = document.querySelector(".changeValue");
    let getValue = document.querySelector(".getValue");
    let changeCurrency = document.querySelector(".changeValue").nextSibling;
    let getCurrency = document.querySelector(".getValue").nextSibling;
    let changeCurrencyKey = changeCurrency.value.toLowerCase() + "Buy";
    let getCurrencyKey = getCurrency.value.toLowerCase() + "Sale";

    if (changeCurrency.value === getCurrency.value) {
      getValue.value = (parseFloat(changeValue.value)).toFixed(2);
      return;
    } else {
      if (changeCurrency.value === "BTC") {
        getValue.value = ((parseFloat(changeValue.value) * this.customRate[changeCurrencyKey] * this.customRate["usdBuy"]) / this.customRate[getCurrencyKey]).toFixed(2);
        if (getCurrency.value === "USD") {
          getValue.value = ((parseFloat(changeValue.value) * this.customRate[changeCurrencyKey])).toFixed(2);
        }
        return;
      } if (getCurrency.value === "BTC") {
        switch (changeCurrency.value) {
          case "USD": getValue.value = (parseFloat(changeValue.value) / this.customRate[getCurrencyKey]).toFixed(4);
            break;
          case "UAH": getValue.value = ((parseFloat(changeValue.value) / this.customRate["usdSale"]) / this.customRate[getCurrencyKey]).toFixed(4);
            break;
          case "EUR": getValue.value = (((parseFloat(changeValue.value) * this.customRate[changeCurrencyKey]) / this.customRate["usdSale"]) / this.customRate[getCurrencyKey]).toFixed(4);
            break;
          default:
        }
      } else {
        getValue.value = ((parseFloat(changeValue.value) * this.customRate[changeCurrencyKey]) / this.customRate[getCurrencyKey]).toFixed(2);
      }
    }
  }

  render() {
    if (localStorage.count === "6") {
      localStorage.count = 1
    }
    let data = null;
    if (localStorage.count === "5") {
      data = <div className="errorMessage">Error message</div>
    } else {
      data = <main>
        <CurrencyTable formatDate={this.formatDate} resolveChange={this.resolveChange} rejectChange={this.rejectChange} changeRates={this.changeRates}
          usdBuy={this.state.usdBuy} usdSale={this.state.usdSale} eurBuy={this.state.eurBuy} eurSale={this.state.eurSale}
          btcBuy={this.state.btcBuy} btcSale={this.state.btcSale} />
        <InputBlock calculate={this.calculate} />
      </main>
    }

    return (
      <div className="App">
        <header>
          <div className="logo"><i className="far fa-money-bill-alt"></i></div>
        </header>
        {data}
        <footer>2020 all right reserved</footer>
      </div>
    );
  }
}
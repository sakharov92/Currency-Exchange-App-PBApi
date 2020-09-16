import React from "react";
import "./CurrencyTable.css";
import Cell from "../Cell/Cell"

export default function CurrencyTable(props) {

    //date formating into dd:mm:yy format
    function formatDate() {
        let date = new Date();
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let yy = date.getFullYear();
        return dd + '.' + mm + '.' + yy;
    }

    // switch on the submit pannel of the current cell
    function changeValue(e) {
        let targetClassList = e.target.parentElement.previousSibling.classList;
        targetClassList.add("showSubmitBlock");
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td>Currency / {formatDate()}</td>
                    <td>Buy</td>
                    <td>Sell</td>
                </tr>
                <tr>
                    <td>USD/UAH</td>
                    <Cell name="usdBuy" min={0} max={100} step={0.01} resolveChange={props.resolveChange} rejectChange={props.rejectChange} changeValue={changeValue} val={props.usdBuy} change={props.changeRates} />
                    <Cell className="usdSell" name="usdSale" min={0} max={100} step={0.01} resolveChange={props.resolveChange} rejectChange={props.rejectChange} changeValue={changeValue} val={props.usdSale} change={props.changeRates} />
                </tr>
                <tr>
                    <td>EUR/UAH</td>
                    <Cell name="eurBuy" min={0} max={100} step={0.01} resolveChange={props.resolveChange} rejectChange={props.rejectChange} changeValue={changeValue} val={props.eurBuy} change={props.changeRates} />
                    <Cell className="eurSell" name="eurSale" min={0} max={100} step={0.01} resolveChange={props.resolveChange} rejectChange={props.rejectChange} changeValue={changeValue} val={props.eurSale} change={props.changeRates} />
                </tr>
                <tr>
                    <td>BTC/USD</td>
                    <Cell name="btcBuy" min={0} max={10000} step={0.001} resolveChange={props.resolveChange} rejectChange={props.rejectChange} changeValue={changeValue} val={props.btcBuy} change={props.changeRates} />
                    <Cell className="btcSell" name="btcSale" min={0} max={10000} step={0.001} resolveChange={props.resolveChange} rejectChange={props.rejectChange} changeValue={changeValue} val={props.btcSale} change={props.changeRates} />
                </tr>
            </tbody>
        </table>
    )
}
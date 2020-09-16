import React from "react";
import "./InputBlock.css";




export default function InputBlock(props) {

    //swap input fields
    function swap() {
        let changeInput = document.querySelector(".changeValue");
        let getInput = document.querySelector(".getValue");
        [changeInput.value, getInput.value] = [getInput.value, changeInput.value];
    }
    return (
        <div className="inputBlockWrapper">
            <div className="inputBlock">
                <div className="change">
                    <div className="title">Change</div>
                    <div className="valueBlock">
                        <input className="changeValue" type="number"></input>
                        <select>
                            <option>UAH</option>
                            <option>USD</option>
                            <option>EUR</option>
                            <option>BTC</option>
                        </select>
                    </div>
                </div>
                <div className="arrows" onClick={swap}>
                    <i className="fas fa-exchange-alt"></i>
                </div>
                <div className="get">
                    <div className="title">Get</div>
                    <div className="valueBlock">
                        <input type="number" className="getValue"></input>
                        <select>
                            <option>UAH</option>
                            <option>USD</option>
                            <option>EUR</option>
                            <option>BTC</option>
                        </select>
                    </div>
                </div>
            </div>
            <button className="calculateButton" onClick={props.calculate}>CALCULATE</button>
        </div>
    )
}
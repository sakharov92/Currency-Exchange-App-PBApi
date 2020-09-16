import React from "react";
import "./Cell.css";
import SubmitBlock from "../submitBlock/SubmitBlock"

export default function Cell(props) {
    return (
        <td className={props.className}>
            <div className="wrapper">
                <SubmitBlock resolveChange={props.resolveChange} rejectChange={props.rejectChange} />
                <div className="inputBlockCell">
                    <input type="number" max={props.max} min={props.min} step={props.step} name={props.name} onClick={props.changeValue} value={(props.val)} onChange={props.change} />
                    <div className="edit"><i className="fas fa-pencil-alt"></i></div>
                </div>
            </div>
        </td>
    )
} 
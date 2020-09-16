import React from "react";
import "./SabmitBlock.css";


export default function SubmitBlock(props) {
    return (
        <div className="submitBclock">
            <div className="resolve" onClick={props.resolveChange}><i className="fas fa-check"></i></div>
            <div className="reject" onClick={props.rejectChange}><i className="fas fa-times"></i></div>
        </div>
    )
}

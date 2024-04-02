import React from "react";
import "./ParametersBar.css"; 

/**
 * Displays a bar with key parameters of a backtest, including start and end dates, symbols, and capital.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.parameters - The parameters to display in the bar.
 * @param {string} props.parameters.start_date - The start date of the backtest.
 * @param {string} props.parameters.end_date - The end date of the backtest.
 * @param {Array<string>} props.parameters.tickers - The symbols used in the backtest.
 * @param {number|string} props.parameters.capital - The initial capital for the backtest.
 */

function ParametersBar({ parameters }) {
    return (
        <div className="parameters-bar">
            <div className="parameters-item">
                <div className="parameters-value">
                    {parameters.tickers.map((symbol, index) => (
                        <span key={index}>{symbol}</span>
                    ))}
                </div>
                <div className="parameters-header">SYMBOLS</div>
            </div>
            <div className="parameters-item">
                <div className="parameters-value">{parameters?.capital}</div>
                <div className="parameters-header">CAPITAL</div>
            </div>
            <div className="parameters-item">
                <div className="parameters-value">{parameters.test_start}</div>
                <div className="parameters-header">START</div>
            </div>
            <div className="parameters-item">
                <div className="parameters-value">{parameters.test_end}</div>
                <div className="parameters-header">END</div>
            </div>
        </div>
    );
}

export default ParametersBar;

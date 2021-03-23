import React from 'react'
import "../styles/Result.css"
export interface ResultProps {
    link: string;
    reciever: string;
    message: string;
    sender: string;
}
const Result: React.FC<ResultProps> = ({ link, reciever, message, sender }) => {
    return (
        <div className="result">
            <h4>Share lolly with this link:</h4>
            <h3>{`https://djc04p48fmmci.cloudfront.net/lolly/${link}`}</h3>
            <div className="result__details">
                <p className="reciever">{reciever}</p>
                <p className="message">{message}</p>
                <p className="sender">____{sender}</p>
            </div>
        </div>
    )
}

export default Result

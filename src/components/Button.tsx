import React from 'react'
import "../styles/Button.css"
interface Button {
    value?: string
    type?: "button" | "reset" | "submit"
    onClick?: () => void
    style?: {}
    className?: string
    padding?: string
}

const Button: React.FC<Button> = ({value, type, onClick, style, className, padding}) => {

    const typeVal = type? type: "button";
    const classNameVal = className? className: '';
    const paddingVal = padding? padding: '1em 2em';

    return (
        <button className={`SBbutton ${classNameVal}`} type={typeVal} onClick={onClick} style={{padding: paddingVal,...style}}>
            {value}
        </button>
    )
}

export default Button



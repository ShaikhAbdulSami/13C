import React from 'react'
import Header from '../components/Header'
import { Lolly } from '../components/Lolly'
import Result from '../components/Result'

const Template = ({ pageContext: { color1, color2, color3, reciever, sender, message, link } }) => {

    return (
        <div>
            <Header />
            <div className="lollyFormDiv">

                <div>
                    <Lolly top={color1} middle={color2} bottom={color3} />
                </div>

                <Result link={link} reciever={reciever} sender={sender} message={message} />
            </div>
        </div>
    )
}

export default Template

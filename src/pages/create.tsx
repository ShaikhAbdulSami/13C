import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { Lolly } from "../components/Lolly"
import "../styles/Create.css"
import * as Yup from "yup"
import { useMutation } from '@apollo/client'
import gql from "graphql-tag"
import * as shortid from 'shortid'
import Result from "../components/Result"
import { navigate } from "gatsby"

// import {  c } from "@reach/router"


const Create = () => {
const ADD_LOLLY = gql`
    mutation AddLolly($addlolly: LollyInput!){
            AddLolly(addlolly : $addlolly){
                sender
                reciever
                message
                link
            }
    }
`
const DisplayingErrorMessagesSchema = Yup.object().shape({
    reciever: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    sender: Yup.string().required("Required").min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    message: Yup.string().required('Required').min(2, 'Too Short')
});

   
    const [color1, setColor1] = useState("#d52358")
    const [color2, setColor2] = useState("#e95946")
    const [color3, setColor3] = useState("#deaa43")
    const [AddLolly, { data }] = useMutation(ADD_LOLLY);
    const [ refetch ] = useMutation(ADD_LOLLY)

    const formik = useFormik({
        initialValues: {
            reciever: '',
            sender: '',
            message: '',
        },
        validationSchema: DisplayingErrorMessagesSchema,
        onSubmit: values => {
            const id = shortid.generate()
      
            const submitLollyForm = async () => {
              const result = await AddLolly({
                  variables: {
                      addlolly: {
                         reciever: values.reciever,
                         sender: values.sender,
                         message: values.message,
                          color1: color1,
                          color2: color2,
                          color3: color3,
                          link: id, 
                      }
                  },
                  refetchQueries: [{ query: ADD_LOLLY }],
              })
            }
            submitLollyForm()
            refetch()
            navigate(`/lolly/${id}`)


        },
    });
    // useEffect(() => {
    //     async function runHook() {
    //         const response = await fetch("https://api.netlify.com/build_hooks/5f9a99467867c005d354dcb7", {
    //             method: "POST",
    //         });

    //     }
    //     runHook();

    // }, [data])

    return (
        <div className="create">
            <Header />
            {/* <Create path="/create" /> */}
            <div className="lollyFormDiv">
                <div>
                    <Lolly top={color1} middle={color2} bottom={color3} />
                </div>
                {!data ? <> <div className="lollyFlavourDiv">
                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input
                            type="color"
                            value={color1}
                            className="colorPicker"
                            name="flavourTop"
                            id="flavourTop"
                            onChange={e => {
                                setColor1(e.target.value)
                            }}
                        />
                    </label>

                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input
                            type="color"
                            value={color2}
                            className="colorPicker"
                            name="flavourTop"
                            id="flavourTop"
                            onChange={e => {
                                setColor2(e.target.value)
                            }}
                        />
                    </label>
                    <label htmlFor="flavourTop" className="colorPickerLabel">
                        <input
                            type="color"
                            value={color3}
                            className="colorPicker"
                            name="flavourTop"
                            id="flavourTop"
                            onChange={e => {
                                setColor3(e.target.value)
                            }}
                        />
                    </label>
                </div>

                    <form className="form-container" onSubmit={formik.handleSubmit}>
                        <label htmlFor="firstName">To</label>
                        <br /> <input
                            id="reciever"
                            name="reciever"
                            type="text"
                            placeholder="A lolly for..."
                            onChange={formik.handleChange}
                            value={formik.values.reciever}
                        />

                        {formik.errors.reciever ? <div className="error">{formik.errors.reciever}</div> : null}
                        <br /> <label htmlFor="message">Message</label>
                        <br /> <textarea
                            id="message"
                            name="message"
                            placeholder="Say something nice..."

                            onChange={formik.handleChange}
                            value={formik.values.message}
                        />
                        <br />
                        {formik.errors.message ? <div className="error">{formik.errors.message}</div> : null}
                        <label htmlFor="sender">From</label>
                        <br />
                        <input
                            id="sender"
                            name="sender"
                            type="sender"
                            onChange={formik.handleChange}
                            value={formik.values.sender}
                            placeholder="From your friend.."
                        />
                        {formik.errors.sender ? <div className="error">{formik.errors.sender}</div> : null}
                        <div className="space-mob">

                        </div>
                        <button type="submit">Freeze this lolly and get a link</button>
                    </form></> : <Result link={data?.AddLolly?.link} reciever={data?.AddLolly?.reciever} sender={data?.AddLolly?.sender} message={data?.AddLolly?.message} />}
            </div>
        </div >
    )
}
export default Create
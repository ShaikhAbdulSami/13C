import React, { useEffect, useState } from "react"
import { Formik, Field, Form } from 'formik';
import Header from "../components/Header"
import { Lolly } from "../components/Lolly"
import "../styles/Create.css"
import { InputBase, TextField } from '@material-ui/core';
import * as Yup from "yup"
import { useMutation } from '@apollo/client'
import gql from "graphql-tag"
import * as shortid from 'shortid'
import Button from '../components/Button'
import { navigate } from "gatsby"

// import {  c } from "@reach/router"


const ADD_LOLLY = gql`
    mutation AddLolly($addlolly: LollyInput!){
            AddLolly(addlolly : $addlolly){
                sender
                reciever
                message
                link
                color1
                color2
                color3
            }
    }
`


const Create = () => {

// const DisplayingErrorMessagesSchema = Yup.object().shape({
//     reciever: Yup.string()
//         .min(2, 'Too Short!')
//         .max(50, 'Too Long!')
//         .required('Required'),
//     sender: Yup.string().required("Required").min(2, 'Too Short!')
//         .max(50, 'Too Long!'),
//     message: Yup.string().required('Required').min(2, 'Too Short')
// });

   
    // const [color1, setColor1] = useState("#d52358")
    // const [color2, setColor2] = useState("#e95946")
    // const [color3, setColor3] = useState("#deaa43")
    const [AddLolly, { loading }] = useMutation(ADD_LOLLY);


    const initialValues = {
        color1: '#d52358',
        color2: "#e95946",
        color3: "#deaa43",
        reciever: '',
        sender: '',
        message: '',
        link: shortid.generate()
    }

    const schema = Yup.object({
        color1: Yup.string(),
        color2: Yup.string(),
        color3: Yup.string(),
        sender: Yup.string()
            .required('Sender name is Required'),
            reciever: Yup.string()
            .required('Reciever name is Required'),
        message: Yup.string()
            .required('Message is Required'),
    });

    const submitLollyForm = async(color1: string, color2: string, color3: string, message: string, sender: string, reciever: string, link:string) => {
        await AddLolly({
            variables: {
                addlolly: {
                    color1, color2, color3, message, sender, reciever, link
                }
            }
        }).then((response)=> {
            navigate(`/lolly/${response.data.addlolly.link}`);
        });
    }
    
    return (
        <div className="create">
            <Header />
            {/* <Create path="/create" /> */}
            <Formik
                initialValues={
                    initialValues
                }
                validationSchema={
                    schema
                }
                onSubmit={
                    (values, { resetForm }) => {
                        resetForm({
                            values: initialValues
                        });
                        submitLollyForm(values.color1, values.color2, values.color3, values.message, values.sender, values.reciever, values.link);
                    }
                }
            >
                {(formik) => (
                <Form>
                    <div className="lollyFormDiv">
                        <div>
                            <Lolly top={formik.values.color1} middle={formik.values.color2} bottom={formik.values.color3} />
                        </div>
                        <div className="lollyFlavourDiv">
                            <Field as={InputBase} className="colorPick" type="color" name="color1" label="flavour Top" />
                            <Field as={InputBase} className="colorPick" type="color" name="color2" label="flavour Middle" />
                            <Field as={InputBase} className="colorPick" type="color" name="color3" label="flavour Bottom" />
                        </div>
                        <div className="form-container">
                            <Field className="inputs" helperText={formik.touched.reciever ? formik.errors.reciever : ""} error={formik.touched.reciever && Boolean(formik.errors.reciever)} name="reciever" type="text" as={TextField} label="To" variant="outlined" />
                            <br />
                            <Field className="inputs" multiline={true} rows={4} helperText={formik.touched.message ? formik.errors.message : ""} error={formik.touched.message && Boolean(formik.errors.message)} name="message" type="text" as={TextField} label="Say Something..." variant="outlined" />
                            <br />
                            <Field className="inputs" helperText={formik.touched.sender ? formik.errors.sender : ""} error={formik.touched.sender && Boolean(formik.errors.sender)} name="sender" type="text" as={TextField} label="From" variant="outlined" />
                            <br />
                            <Button type="submit" value="Create" padding='.8em 2em' />
                        </div>
                    </div>
                </Form>
                )}
            </Formik>
        </div >
    )
}
export default Create
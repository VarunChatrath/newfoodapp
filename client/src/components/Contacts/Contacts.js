import React, { useState } from 'react'
import classes from './Contacts.module.css'
import { AiOutlineSend } from 'react-icons/ai'
import newsletterIllustration from '../../assets/get-newsletter-updates.svg'
import { login } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'


const Contacts = () => {
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const newslettersubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            toast.error("Please enter an email") // Display toast message for missing email
            return
        }

        try {
            const res = await fetch(`http://localhost:9000/newsLetter/usermail`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ email })
            })

            const data = await res.json()
            console.log(data)
            dispatch(login(data)) // {userInfo, token}

            toast.success("Subscribed Successfully")
        } catch (error) {

        }
    }

    return (
        <section id='contacts' className={classes.container}>
            <div className={classes.wrapper}>
                <h4 className={classes.subtitle}>Get our latest offers</h4>
                <h2 className={classes.title}>Newsletter</h2>
                <div className={classes.inputContainer}>
                    <input type="text" placeholder='Enter email...' onChange={(e) => setEmail(e.target.value)} />
                    <AiOutlineSend
                        className={classes.sendIcon}
                        onClick={newslettersubmit}
                        disabled={!email} // Disable the button if email is not entered
                    />
                </div>
                <img src={newsletterIllustration} className={classes.illustration} alt="" />
            </div>
        </section>
    )
}

export default Contacts
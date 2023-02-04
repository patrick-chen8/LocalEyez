import { useState, useEffect, Fragment } from "react";
import {Link, useParams} from 'react-router-dom';
import styles from "./styles.module.css";
import axios from 'axios';

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async() => {
            try {
                const url = `http://localhost:3000/users/${param.id}/verify/${param.token}`;
                const {data} = await axios.get(url);
                console.log(data);
                setValidUrl(true)
            } catch (error) {
                console.log(error)
                setValidUrl(false)
            }
        };
        verifyEmailUrl()
    }, [param])

    const Button = () => {
        <button>Login</button>
    }

    return (
        <Fragment>
            {validUrl ? (
                <div className={styles.container}>
                    <h1>Email verified successfully</h1>
                    <Link to ="/login">
                        <Button />
                    </Link>
                </div>
            ): (
                <h1>404 Not Found</h1>
            )}
        </Fragment>
    )
};

export default EmailVerify;
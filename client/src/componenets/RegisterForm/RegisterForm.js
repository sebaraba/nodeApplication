
import React, {useState} from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiConstants.js';
import { withRouter } from "react-router-dom";

function RegisterForm(props) {
    const [state, setState] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirmPassword: "",
        role: "",
        token: "",
        successMessage: ""
    })
    const handleChange = (error) => {
        const { id, value } = error.target
        setState(pervState => ({
            ...pervState,
            [id]: value
        }))
    }
    const handleSubmitClick = (error) => {
        error.preventDefault()
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            props.showError('Passwords do not match')
        }
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const sendDetailsToServer = (error) => {
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "email": state.email,
                "first_name": state.first_name,
                "last_name": state.last_name,
                "password": state.password,
            }
            axios.post(API_BASE_URL + 'register', payload)
                .then((res) => {
                    console.log('BASE URL', res.data)
                    if(res.data.code === 200) {
                        console.log('success')
                        setState(pervState => ({
                            ...pervState,
                            'successMessage': 'Registration successfull'
                        }))
                        redirectToHome();
                        props.showError(null)
                    } else {
                        console.log(error)
                        props.showError("Some error ocurred")
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            props.showError('Please enter a valid username and password')
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center" >
            <form>
                <div className="form-group text-left">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" 
                        className="form-control" 
                        id="first_name" 
                        placeholder="First Name"
                        value={state.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" 
                        className="form-control" 
                        id="last_name" 
                        placeholder="Last Name"
                        value={state.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email"
                       value={state.email}
                       onChange={handleChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"                       
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}>
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
        </div>
    );
};

export default withRouter(RegisterForm);
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Footer from './Footer';
import { signUp } from './actions';
import './App.css';

const Secondview = ({ successLogin }) => {
    return (
        <div className="view-container registrations new">
            <main>
                <header> 
                    <div className="logo"></div>
                </header>
                {
                    successLogin && <Redirect to="/boards" />
                }
                <form id="sign_up_form"
                    onSubmit={e => {
                        e.preventDefault();
                        signUp(this.fullNameRef.value, this.lastNameRef.value, this.emailRef.value, this.passwordRef.value)
                    }}
                >
                    <div className="field">
                        <input id="user_first_name" type="text" ref={e => this.fullNameRef = e} placeholder="Name" required />
                    </div>
                    <div className="field">
                        <input id="user_last_name" type="text" ref={e => this.lastNameRef = e} placeholder="Surname" required  />
                    </div>
                    <div className="field">
                        <input id="user_email" type="email" ref={e => this.emailRef = e} placeholder="Email" required />
                    </div>
                    <div className="field">
                        <input id="user_password" type="password" ref={e => this.passwordRef = e} placeholder="Password" required />
                    </div>
                    <button type="submit">Sign up</button>
                </form>
                <div className='second_view'>
                    <NavLink to={"/signin"}>Sign in</NavLink>
                </div>
            </main>
        </div>
    )
}

const Signup = ({ successLogin }) => {
    return (
        <div id='main_container'>
            <div>
                <Secondview successLogin={successLogin}/>
            </div>
            <Footer/>
        </div>
        
        )
}

export default Signup;
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { signIn } from './actions';
import Footer from './Footer';
import './App.css';

const Signin = ({ successLogin }) => {
    return (
        <div className='view-container sessions new'> 
            {
                successLogin && <Redirect to="/boards" />
            }
            <main>
                <header>
                    <div className='logo'></div>
                </header>
                <form id='sign_in_form'
                    onSubmit={
                        e => {
                            e.preventDefault();
                            signIn(this.emailInputRef.value, this.passwordInputRef.value)
                        }
                    }
                >
                    <div className='field'>
                        <input type="email" id='user_email' ref={e => this.emailInputRef = e} placeholder="Email" required />
                    </div>
                    <div className='field'>
                        <input type="password" id='user_password' ref={e => this.passwordInputRef = e} placeholder="Password"  required />
                    </div>
                    <button type='submit'>Sign in</button>
                    <div className='second_view'>
                        <NavLink to={"/signup"}>Create new account</NavLink>
                    </div>
                </form>
            </main> 
        </div>
    )
}

const Home = ({ successLogin }) => {
    return (
        <div id='main_container'>
            <div>
                <Signin successLogin={successLogin}/>
            </div>
            <Footer />
        </div>
        )
}

export default Home;
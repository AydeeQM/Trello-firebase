import React from 'react';
import './App.css';
import Header from './Header'
import Footer from './Footer'
import { NavLink, Redirect } from 'react-router-dom';
import { nextTitle, addBoard, handleLoginClick, handleLogoutClick} from './actions';

const User = ({name, ide, index}) => {
	return (
    <div id={ide} className="board">
		<div className="inner">
        <h4><NavLink onClick={()=>{nextTitle(index)}} to={"/details"}>{name}</NavLink></h4>
		</div>
    </div>
	);
}

const Usertwo = ({tboard}) => {
    return (
    <section>
        <header className="view-header">
            <h3><i className="fa fa-users"></i><span> Other boards</span>
            </h3>
        </header>
        <div className='boards-wrapper'>
            {
                tboard.map((list, index) => {
                    return (
                        <div key={index} className='board'>
                            <div className='inner'>
                                <h4>{list.name}</h4>
                            </div>
                        </div>
                    );
                })
            }

        </div>
    </section>)
}

const LogoutButton = ({showReply}) => {
    return(
            !showReply && <div className="board add-new">
                <div className="inner">
                    <a id="add_new_board" onClick={() => handleLoginClick()}>Add new board...</a>
                </div>
            </div>
    )
}

const LoginButton = ({ showReply }) => {
    const onSubmit = e => {
        e.preventDefault();
        if (this.refNewInput.value) {
            addBoard(this.refNewInput.value);
            this.refNewInput.value = '';
        }

    };
    return(
            showReply && <div className='board form'>
                <div className='inner'>
                    <h4>New board</h4>
                    <form onSubmit={onSubmit} id='new_board_form'>
                        <div className="inner-wrap">
                            <input
                                type="text"
                                id="board_name"
                                name="name"
                                placeholder="User"
                                ref={e => (this.refNewInput = e)}
                            />
                            <button type="submit" name="submit">Create board</button>
                            <span> or </span>
                            <a onClick={() => handleLogoutClick()}>Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
    )
        
}

const Boards = ({ successLogin, user, tboard, showReply }) => {
    let boardComponent;
    console.log("user", user);
    console.log(user.boards.length);
    if (user.boards.length) {
        boardComponent = user.boards.map((item, index) => {
            const count = (item.id).toString();
            const tall = item.name;
            const guion = "-";
            const res = count.concat(guion, tall);
            return <User key={index} name={item.name} index={index} ide={res} />
        });
    }

   return (
       <div id='main_container'>
           {
               !successLogin && <Redirect to="/signin" />
           }
        <div>
                <div id='authentication_container' className='application-container'>
                    <Header />
                    <div className='main-container'>
                            <div className="view-container boards index">
                                <section>
                                <header className="view-header" >
                                    <h3><i className="fa fa-user"></i><span> My boards</span></h3>
                                    </header>
                                    <div className="boards-wrapper">
                                        {boardComponent}
                                        <LogoutButton showReply={showReply} />
                                        <LoginButton showReply={showReply} /> 
                                    </div>
                                </section>
                                <Usertwo tboard={tboard} />
                            </div>
                    </div>
                </div>
            </div>
            <Footer />
       </div>
   );
};

export default Boards;
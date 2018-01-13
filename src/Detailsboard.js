import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { Redirect } from 'react-router-dom';
import { addList, handleShowClick, handleHideClick, addCard, TodoHideClick, TodoShowClick} from './actions';

const TodoHide = ({ selectedBoard, index }) => {
    return (
        <a className="add-new" onClick={() => TodoHideClick(selectedBoard, index)} > Add a new card...</a>
    )
}

const TodoShow = ({ selectedBoard, index, list}) => {
    const onSubmit = e => {
        e.preventDefault();
        if (this.refInput.value) {
            addCard(this.refInput.value, selectedBoard, list.id, index);
            this.refInput.value = '';
        }

    };
    return (
        <div className="list form">
            <div className='inner'>
                <h4>New board</h4>
                <div className="card form">
                    <form onSubmit={onSubmit} id="new_card_form">
                        <textarea type="text" required="" ref={e => (this.refInput = e)}></textarea>
                        <button type="submit">Add</button><span> or </span><a onClick={() => TodoShowClick(selectedBoard, index)}>cancel</a>
                    </form>
                </div>
            </div>
        </div>
    )

}

/* --------------------------------------------**---------------------------------------------------------------- */

const User = ({ title, boards, index, selectedBoard, list}) => {
    return (
        <div key={index} className="list">
            <div className="inner">
                <header><h4>{title}</h4></header>
                <div className="cards-wrapper">
                    {boards.cards.map((comment, i) => {
                        return <div key={i}  className="card">
                            <div className="card-content">
                                <div className="tags-wrapper" >
                                    <span>{comment.name}</span>
                                </div>
                                <footer>
                                    <small>
                                        <i className="fa fa-comment-o"></i><span></span><span>1</span>
                                    </small>
                                    <img alt="Gravata" src="//www.gravatar.com/avatar/6a88cfcf7b76267b129b8dc477c4105e?d=retro&amp;r=g&amp;s=50" height="50" width="50" className="react-gravatar react-gravatar" />
                                </footer>
                            </div>
                        </div>
                    })}
                </div>
                <footer>
                    {boards.evalue=== false && <TodoHide selectedBoard={selectedBoard} index={index} />}
                    {boards.evalue === true && <TodoShow selectedBoard={selectedBoard} index={index} list={list}/> }
                </footer>
            </div>
        </div>
    );
}

/* ***************************Agregar lista de tareas****************************** */
const LogoutButton = ({ selectedBoard }) => {
    return (
        <div className="list add-new"><div className="inner" onClick={() => handleHideClick(selectedBoard)}>Add new list...</div></div>
    )
}
const LoginButton = ({ user, selectedBoard }) => {
    const onSubmit = e => {
        e.preventDefault();
        if (this.inputNewList.value) {
            addList(this.inputNewList.value, user.boards[selectedBoard].id, selectedBoard);
            this.inputNewList.value= '';
        }

    };
    return (
        <div className="list form">
            <div className='inner'>
                <h4>New board</h4>
                <form onSubmit={onSubmit} id='new_list_form'>
                    <div className="inner-wrap">
                        <input
                            type="text"
                            id="list_name"
                            name="name"
                            placeholder="Add a new list..." 
                            required="" 
                            ref={e => (this.inputNewList = e)}
                        />
                        <button type="submit">Save list</button>
                        <span> or </span>
                        <a onClick={() => handleShowClick(selectedBoard)}>Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    )

}

const DetaBoards = ({ user, selectedBoard, successLogin}) => {

    let boardComponent;
    if (user.boards[selectedBoard]) {
        if (user.boards[selectedBoard].lists) {
            boardComponent = user.boards[selectedBoard].lists.map((item, index) => {
                return <User
                    key={index}
                    title={item.name}
                    boards={item}
                    index={index}
                    selectedBoard={selectedBoard}
                    list={item}
                />
            })
        }
    }

    return (
        !successLogin ? <Redirect to="/signin" /> :
        <div id='main_container'>
            <div>
                <div id='authentication_container' className='application-container'>
                    <Header />
                    <div className='main-container'>
                        <div className="view-container boards show">
                            <header className="view-header" >
                                <h3>{user.boards[selectedBoard].name}</h3>
                            </header>
                            <div className="canvas-wrapper">
                                <div className="canvas">
                                    <div className="lists-wrapper">
                                        {boardComponent}
                                        {
                                            user.boards[selectedBoard].toggle === false && <LogoutButton selectedBoard={selectedBoard} />
                                        }
                                        {
                                            user.boards[selectedBoard].toggle === true && <LoginButton user={user} selectedBoard={selectedBoard} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetaBoards; 



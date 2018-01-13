import store from './store';
import { auth, database } from './firebase';

export function signUp(firstName, lastName, email, password) {
    console.log('signUp' + firstName + lastName + email + password);
    auth.createUserWithEmailAndPassword(email, password).then(user => {
        let newUser =
            {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
            }
        database.ref('users/' + user.uid).set(newUser);

        database.ref('users/' + user.uid).once('value').then(res => {
            let fullUserInfo = res.val();
            fullUserInfo.boards = [];
            console.log('full info ', fullUserInfo);
            store.setState({
                user:
                    {
                        id: user.uid,
                        email: fullUserInfo.email,
                        firstName: fullUserInfo.firstName,
                        lastName: fullUserInfo.lastName,
                        boards: fullUserInfo.boards,
                    }
            })          
        })
    })
}

export function signOut() {
    auth.signOut();
    store.setState({
        successLogin: false,
        user:
            {
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                boards: [],
            }
    })
}

export function signIn(user, password) {
    auth.signInWithEmailAndPassword(user, password).then(userObj => {
        database.ref('users/' + userObj.uid).once('value').then(res => {
            const fullUserInfo = res.val();
            if (!fullUserInfo.boards)
                fullUserInfo.boards = [];
            store.setState({
                user:
                    {
                        id: userObj.uid,
                        email: fullUserInfo.email,
                        firstName: fullUserInfo.firstName,
                        lastName: fullUserInfo.lastName,
                        boards: fullUserInfo.boards,
                    }
            })
            //console.log("user", store.getState().user);
            readAllBoards();
        })
    })
}

auth.onAuthStateChanged(user => {
    if (user) {
        //console.log('user', user);
        //let usersRef = database.ref('users');
        //let userRef = usersRef.child(user.uid);
        store.setState({
            successLogin: true
        })
    }
});

async function snapshotToArray(snapshot) {
    let user = store.getState().user;
    let boards = [];
    snapshot.forEach(childSnapshot => {
        console.log("childSnapshot", childSnapshot);
        let item = childSnapshot.val();
        console.log("item", item);
        let key = childSnapshot.key;
        item.id = key;
        console.log("item.lists", item.lists);
        database.ref('users/' + user.id + '/boards/' + key + '/lists').once('value').then(res => {
            console.log("res", res);
            const lists = res;
            let listObjs = [];
            lists.forEach(item => {
                let obj = item.val();
                console.log("obj", obj)
                let objKey = item.key
                obj.id = objKey;
                database.ref('users/' + user.id + '/boards/' + key + '/lists/' + objKey + '/cards').once('value').then(res => {
                    const cards = res;
                    let cardsObjs = [];
                    cards.forEach(item => {
                        let array = item.val();
                        console.log("array", array);
                        cardsObjs.push(array);
                    });
                    obj.cards = cardsObjs;
                });
                listObjs.push(obj);
            })
            console.log("listObjs", listObjs);
            item.lists = listObjs;
            console.log("item.lists3", item.lists);
            item.lists.map((list, index) => {
                list.cards = [];
            })
            console.log("boards all", store.getState().user.boards);
        });
        boards.push(item);
    });
    store.setState({
        user:
            {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                boards: boards
            }
    })
}

export const nextTitle = (index) => {
    store.setState({
        selectedBoard: index
    })
}

export const readAllBoards = () => {
    let user = store.getState().user;
    console.log("user readAllBoards", user)
    database
        .ref('users/' + user.id + '/boards')
        .on('value', (res) => {
            snapshotToArray(res)
        });
}

export async function addBoard (name) {
    let user = store.getState().user;
    let newBoards = {
        name: name,
        lists: [],
        toggle: false
    };
    const res = database.ref('users').child(user.id).child('boards').push(newBoards);
    newBoards = user.boards.concat(newBoards);
    const change = store.getState().showReply;
    const newState = !change;
    store.setState({
        user:
            {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                boards: newBoards,
            },
        showReply: newState
    });
    readAllBoards();
}

export const handleLoginClick = () => {
    const change = store.getState().showReply;
    const newState = !change;
    store.setState({ showReply: newState });
}

export const handleLogoutClick = () => {
    let bolean = store.getState().showReply ? false : true;
    store.setState({ showReply: bolean });
} 

export async function addList(name, id, selectedBoard) {
    let user = store.getState().user;
    user.boards[selectedBoard].toggle = false;
    let newList = {
        name: name,
        cards: [],
        evalue: false
    };
    const res = database.ref('users').child(user.id).child('boards/').child(id).child('lists/').push(newList);
    newList.id = res.key;
    newList = user.boards[selectedBoard].lists.push(newList);
    store.setState({
        user:
            {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                boards: user.boards,
            }
    });
}

export const handleHideClick = (selectedBoard) => {
    let newUser = store.getState().user;
    newUser.boards[selectedBoard].toggle = true;
    store.setState({
        user: 
            {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                boards: newUser.boards
            }
    })
}

export const handleShowClick = (selectedBoard) => {
    let newUser = store.getState().user;
    newUser.boards[selectedBoard].toggle = false;
    store.setState({
        user: 
        {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            boards: newUser.boards
        }
    })
}

export async function addCard(name, selectedBoard, listId, index) {
    let user = store.getState().user;
    let id = user.boards[selectedBoard].id;

    user.boards[selectedBoard].lists[index].evalue = false;

    let newCard = {
        name: name,
    };
    console.log("parametros", name, selectedBoard, listId, index);
    const res = database.ref('users/').child(user.id).child('boards/').child(id).child('lists/').child(listId).child('cards/').push(newCard);

    newCard = user.boards[selectedBoard].lists[index].cards.push(newCard);
    console.log("boards11", user.boards[selectedBoard]);
    store.setState({
        user:
            {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                boards: user.boards,
            },
    });
}

export const TodoHideClick = (selectedBoard, index) => {
    let newBoards = store.getState().user;
    newBoards.boards[selectedBoard].lists[index].evalue = true;
    store.setState({
        user:
            {
                id: newBoards.id,
                email: newBoards.email,
                firstName: newBoards.firstName,
                lastName: newBoards.lastName,
                boards: newBoards.boards,
            },
    })

}

export const TodoShowClick = (selectedBoard, index) => {
    let newBoards = store.getState().user;
    newBoards.boards[selectedBoard].lists[index].evalue = false;
    store.setState({
        user:
            {
                id: newBoards.id,
                email: newBoards.email,
                firstName: newBoards.firstName,
                lastName: newBoards.lastName,
                boards: newBoards.boards,
            },
    })
}

export const inputNewCardChange = (e) => {
    store.setState({
        inputNewCard: e.target.value,
    });
}


















/* export function readBoard() {
    firebase.database().ref('stages').on('value', res => {
        let stages = []
        res.forEach(snap => {
            const stage = snap.val();
            stages.push(stage);
        })
        store.setState({
            stages: stages
        })
    });

    firebase.database().ref('tasks').on('value', res => {
        let tasks = [];
        res.forEach(snap => {
            const task = snap.val();
            tasks.push(task)
        })
        store.setState({
            tasks: tasks
        })
    });
}

export const addComment = (name) => {
    let oldList = [...store.getState().board];
    const change = store.getState().showReply;
    const newState = !change;
    const newlist = {
        id: oldList.length,
        name: name,
    }; 
    const newList= oldList.concat(newlist);

    store.setState({
        board: newList,
        showReply: newState
    });

    console.log(newList);
};

export const nextTitle = (index) => {
    store.setState({
        idBoard: index
    })
} 

export const handleLoginClick = () => {
    const change = store.getState().showReply;
    const newState = !change;
    store.setState({ showReply: newState});
}

export const handleLogoutClick = () =>  {
    let bolean = store.getState().showReply ? false : true;
    store.setState({ showReply: bolean });
} */

/********************** Lista de board *********************************/

/* export function addList(text) {
    const change = store.getState().toggle;
    const newState = !change;
    let stages = [...store.getState().stages];
    stages.push(text)
    firebase.database().ref('stages').push(text);
    store.setState({
        toggle: newState
    });

}

export const handleHideClick = () => {
    let bolean = store.getState().toggle ? false : true;
    store.setState({ toggle: bolean });
}

export const handleShowClick = () => {
    const change = store.getState().toggle;
    const newState = !change;
    store.setState({ toggle: newState });
} */

/********************* add works Comments ******************************/

/* export function addTodo(stage, text) {
    console.log('addTodo:', stage + ' - ' + text);
    let tasks = [...store.getState().tasks];
    const change = store.getState().todostado;
    const newState = !change;
    let newTask = {
        id: store.getState().tasks.length,
        title: text,
        stage: stage,
        todostado: false
    }

    firebase.database().ref('tasks/' + newTask.id).set(newTask);
}

export const TodoHideClick = (id) => {
    firebase.database().ref('tasks/' + id).once('value').then ( res => {
        console.log (res.val())
    });

}

export const TodoShowClick = (selectedBoard) => {
} */
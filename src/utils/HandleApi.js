import axios from "axios"

const baseUrl = "https://todo-backend-va3k.onrender.com"

const getAllToDo = (setToDo)=>{
    axios.get(baseUrl).then(({data})=>{
        console.log(data);
        setToDo(data);
    }).catch((err)=>{
        console.log(err)
    })
}

const addToDo = (text, setText, setToDo, lastEdit)=>{
    text = text.charAt(0).toUpperCase() + text.slice(1);
    axios.post(baseUrl+"save", {text, lastEdit}).then(({data})=>{
        console.log(data);
        setText("");
        getAllToDo(setToDo);
    }).catch((err)=>{
        console.log(err)
    })
}

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdate, lastEdit)=>{
    text = text.charAt(0).toUpperCase() + text.slice(1);
    axios.post(baseUrl+"update", {_id:toDoId, text, lastEdit}).then(({data})=>{
        console.log(data);
        setText("");
        setIsUpdate(false);
        getAllToDo(setToDo);
    }).catch((err)=>{
        console.log(err)
    })
}

const deleteToDo = (_id, setToDo)=>{
    axios.post(baseUrl+"delete", {_id}).then(()=>{
        getAllToDo(setToDo);
    }).catch((err)=>{
        console.log(err)
    })
}

export {getAllToDo, addToDo, updateToDo, deleteToDo};
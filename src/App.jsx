import { useState, useEffect, useRef } from "react";
import "./App.css"
import Time from "./Time.jsx"
import WiseSaying from "./WiseSaying"

function App() {
    const [ todoList, setTodoList ] = useState([{
        id: 0, content: "밥 먹기"
    }])

    return (
        <div className="container">
            <header className="header-container">
                <h1>TODOLIST</h1>
            </header>
            <nav>
                <Time />
            </nav>
            <main className="main-container">
                <TodoList todoList={todoList} setTodoList={setTodoList}/>
                <TodoInput todoList={todoList} setTodoList={setTodoList}/>
            </main>
            <footer>
                <WiseSaying />
            </footer>
        </div>
    )
}

export default App;


function TodoInput({ todoList, setTodoList }) {
    const [ inputValue, setInputValue ] = useState("")
    
    return (
        <div className="add-container">
            <input 
                className="add-input" 
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            />

            <button className="add-btn" onClick={() => {
                if (inputValue !== "") {
                    const trimValue = inputValue.trim();
                    const newTodo = { id: crypto.randomUUID(), content: trimValue };
                    const newTodoList = [...todoList, newTodo];
                    setTodoList(newTodoList);
                    setInputValue("");
                }
            }}>
                Add
            </button>
        </div>
    )
}


function TodoList({ todoList, setTodoList }) {
    
    return (
        <ul className="ul">
            {todoList.map((todo) => (
                <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
            ))}
        </ul>
    )
}

function Todo({ todo, setTodoList }) {
    const [inputValue, setInputValue] = useState("");
    const [openInput, setOpenInput] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        if (!openInput) return;

        const handle = (e) => {
            if (inputRef.current?.contains(e.target)) return;
                inputRef.current?.focus()
        }
        document.addEventListener("click", handle, true)
        
        return () => {
            document.removeEventListener("click", handle, true)
        }
    }, [openInput])

    return (
        <div className="todo-container">
            <div className="todo-content">
                <input className="check-input" type="checkbox" title="완료"/>
                <li>{todo.content}</li>
            </div>

            <div className="todo-buttons">
                <button className="edit-btn" onClick={() => {
                    setOpenInput((prev) => !prev)

                }}
                >
                    Edit
                </button>

                <button className="delete-btn" onClick={() => {
                    setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
                }}
                >
                    Delete
                </button>
            </div>

            {openInput && (
                <div className="edit-input-container">
                    <div className="exit-btn" onClick={() => setOpenInput((prev) => !prev)}>
                        <span></span>
                        <span></span>
                    </div>
                    <h4>일정 수정하기</h4>
                    <input 
                        className="edit-input"
                        value={inputValue}
                        ref={inputRef}
                        onChange={(event) => setInputValue(event.target.value)}
                    />
                    <button className="save-btn" onClick={() => {
                        setTodoList((prev) => 
                            prev.map((el) => {
                                return el.id === todo.id && inputValue !== "" ? { ...el, content: inputValue } : el
                            }
                        ))
                        setInputValue("")
                        setOpenInput((prev) => !prev)

                    }}
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    )
}

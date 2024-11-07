import { useEffect, useState } from "react";

import { addTodo , fetchTodos , deleteTodo  } from "../Api/TodosApi";

const TaskList = () => {
    const [todos , setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadTodo, setLoadTodo] = useState(false);

    const toggleCheckbox = (event) => {
        const currentElement = event.target;
        const title = currentElement.nextElementSibling;
        (currentElement.checked) ? title.classList.add('line-through') : title.classList.remove('line-through') ;
    }
    

    const deleteTodoItem = async (id) => {
        const resp = await deleteTodo(id);
        if(resp.status === 200){
            setTodos(todos.filter((todo) => todo.id !== id));
            if(todos.length === 1) {
                setLoadTodo(true);
            }
        }else{
            console.log('Error while deleting itemm!!!');
        }
    }

    const addTodoItem = async () => {
        const todoTitle = document.getElementById('todo_title').value;
        if(!todoTitle.trim()) {
            alert('Please enter Title');
            return;
        }
        const formData = { "userId" : 1, "title" : todoTitle, "completed" : false };
        const response = await addTodo(formData);

        if(response.status === 201) {

            const newTodo = { id : (response.data.id ), title : todoTitle, completed : false, userId : 1 };
            setTodos([newTodo , ...todos]);
            document.getElementById('todo_title').value = ''
        }else {
           console.log('Error while adding a new task!!!!');
        }

    }

    useEffect( () => {
        const loadTodosData = async () => {
            const data = await fetchTodos();
            setTodos(data.slice(0,6));
            setLoading(false);
        }
        loadTodosData();
    }, []);

    const handleLoadTodos = async () => {
        const data = await fetchTodos();
        setTodos(data.slice(0,6));
        setLoadTodo(false);
    };

    return (
        <>
        {
            loading ? (
                <p className="text-center">Loading...</p>
            ) : (
            <div className="h-100 w-full flex items-center justify-center p-6 bg-white rounded-lg">
                <div className="bg-white rounded p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <h2 className="font-semibold mb-4 text-4xl text-center">Your todo items</h2>
                        <div className="flex mt-4">
                            <input className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4" placeholder="Add Todo" name="todo" id="todo_title"/>
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="addButton" onClick={addTodoItem}>Add</button>
                        </div>
                    </div>
                    <div>
    
                        {
                            todos.map(item => (
                                <div className="flex w-100 mb-2 items-center todo-item-wrapper" key={item.id}>
                                    <input id={item.id} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onClick={toggleCheckbox}/>
                                    <label htmlFor={item.id} className="w-full py-3 ms-2 font-medium" onClick={toggleCheckbox}>{item.title}</label>
                                    <button className="flex-no-shrink  ml-2 text-right rounded text-red border-red" onClick={() => deleteTodoItem(item.id)}>
    
                                        <svg className="h-8 w-8 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                                        </svg>
                                    </button>
    
                                </div>
                            ))
                        }

                        {loadTodo && (
                            <button 
                                 onClick={handleLoadTodos}
                                className="p-2 bg-blue-500 text-white rounded mt-4"
                            >
                                Load Todos
                            </button>
                        )}

                    </div>
                </div>
            </div>
            )
        }
        
        </>
    )
}

export default TaskList;
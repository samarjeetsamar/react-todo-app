import api from "./ApiConfig";

export const fetchTodos = async () => {
    try{
        const response = await api.get('/todos/');
        return response.data;
    }catch(error){
        throw Error(error);
    }
}

export const addTodo = async (data) => {
    try{
        const response = await api.post('/todos', data);
        return response;
    }catch(error){
        console.log(error);
    }
}


export const deleteTodo =  async (id) => {
    try{
        const response = await api.delete(`/todos/${id}`);
        console.log(`/todos/${id}`);
        return response;
    }catch(error){
        console.log(error);
    }
}



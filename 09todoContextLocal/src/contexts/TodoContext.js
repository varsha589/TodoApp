import { useContext,createContext } from "react";

export const TodoContext = createContext({
    Todos : [{
        id : 1,
        todoMsg : "Todo Msg",
        checked : false,

    }],
    AddTodo : (todo) => {},
    UpdateTodo : (id,todo) => {},
    DeleteTodo : (id) => {},
    ToggleComplete : (id) => {}
})

export const TodoContextProvider = TodoContext.Provider

export const useTodo = () => {
    return useContext(TodoContext)
}
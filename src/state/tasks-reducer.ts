import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type TRemoveTask = {
    type: 'REMOVE-TASK',
    id: string,
    todolistId: string
}
export type TAddTask = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type TChangeTaskTitle = {
    type: 'CHANGE-TASK-TITLE',
    id: string
    todolistId: string
    title: string
}
export type TChangeTaskStatus = {
    type: 'CHANGE-TASK-STATUS',
    id: string
    todolistId: string
    isDone: boolean
}

type ActionsType = TRemoveTask | TAddTask | TChangeTaskTitle | TChangeTaskStatus;

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TASK':
            return [...state, {id: v1(), title: action.title, filter: "all"}]
        case 'CHANGE-TASK-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TASK-STATUS': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
            throw new Error("I don't understand this type")
    }
}

/*export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}*/

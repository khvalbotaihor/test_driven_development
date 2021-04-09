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

export const RemoveTaskAC = ( id: string, todolistId: string): TRemoveTask => {
    return {type: 'REMOVE-TASK', id, todolistId }
}
export const AddTaskAC = (title: string,todolistId: string): TAddTask => {
    return { type: 'ADD-TASK', title, todolistId }
}
export const ChangeTaskTitleAC = (id: string, todolistId: string, title: string): TChangeTaskTitle => {
    return { type: 'CHANGE-TASK-TITLE', id, todolistId, title }
}
export const ChangeTaskStatusAC = (id: string, todolistId: string, isDone: boolean): TChangeTaskStatus => {
    return { type: 'CHANGE-TASK-STATUS', id, todolistId, isDone }
}

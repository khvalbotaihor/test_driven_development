import {FilterValuesType, TasksStateType, TodolistType} from '../App';
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

export const taskslistsReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id !== action.id)
            return {...state}
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

export const RemoveTaskAC = ( todolistId: string, id: string): TRemoveTask => {
    return {type: 'REMOVE-TASK', todolistId, id }
}
export const AddTaskAC = (todolistId: string, title: string): TAddTask => {
    return { type: 'ADD-TASK', todolistId, title }
}
export const ChangeTaskTitleAC = (id: string, todolistId: string, title: string): TChangeTaskTitle => {
    return { type: 'CHANGE-TASK-TITLE', id, todolistId, title }
}
export const ChangeTaskStatusAC = (id: string, todolistId: string, isDone: boolean): TChangeTaskStatus => {
    return { type: 'CHANGE-TASK-STATUS', id, todolistId, isDone }
}

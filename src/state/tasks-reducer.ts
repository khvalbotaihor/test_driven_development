import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType} from "./todolists-reducer";

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

type ActionsType = TRemoveTask | TAddTask | TChangeTaskTitle | TChangeTaskStatus | AddTodolistActionType;

export const taskslistsReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.id)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            let task = {id: v1(), title: action.title, isDone: false};
            let todoListTasks = state[action.todolistId]
            const newTasks = [task, ...todoListTasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let todoListTasks = stateCopy[action.todolistId]
            let task = todoListTasks.find(t => t.id === action.id)
            if (task) {
                task.title = action.title;
            }
            return {...stateCopy}
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            let todoListTasks = stateCopy[action.todolistId]
            let task = todoListTasks.find(t => t.id === action.id)
            if (task) {
                task.isDone = action.isDone;
            }
            return {...stateCopy}
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
export const ChangeTaskTitleAC = (todolistId: string, id: string, title: string): TChangeTaskTitle => {
    return { type: 'CHANGE-TASK-TITLE', todolistId, id, title }
}
export const ChangeTaskStatusAC = (todolistId: string, id: string, isDone: boolean): TChangeTaskStatus => {
    return { type: 'CHANGE-TASK-STATUS', todolistId, id, isDone }
}

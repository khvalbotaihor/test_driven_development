import {TasksStateType, TodolistType} from "../App";
import {AddTodolistAC, todolistsReducer} from "./todolists-reducer";
import {taskslistsReducer} from "./tasks-reducer";


test('ids should be equal', () => {
    const startTasksState : TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = taskslistsReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTodolists).toBe(action.todolistId)
    expect(idFromTasks).toBe(action.todolistId)

});

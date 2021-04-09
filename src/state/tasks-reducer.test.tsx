import React, {useState} from 'react';
import {
    AddTodolistAC, AddTodolistActionType,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    taskslistsReducer, TChangeTaskStatus,
    TChangeTaskTitle
} from "./tasks-reducer";

let startState:TasksStateType;
beforeEach(() => {
    startState = ({
        todolistId1: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        todolistId2: [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    });
})

test('correct task should be removed', () => {
    const action = RemoveTaskAC('todolistId2','2')
    const endState = taskslistsReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(1);
    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'][0].id).toBe('1');
    expect(endState['todolistId2'].every(t => t.id !=='2')).toBeTruthy()
});

test('correct task should be added', () => {
    const newTitle = 'newTask'
    const action = AddTaskAC('todolistId2',newTitle)
    const endState = taskslistsReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'][0].title).toBe(newTitle);
    expect(endState['todolistId2'][0].isDone).toBe(false);
    expect(endState['todolistId2'][0].id).toBeDefined();
});

test('correct task should change its name', () => {
    const newTitle = 'Samiy noviy title'
    const action:TChangeTaskTitle = ChangeTaskTitleAC('todolistId2','2', newTitle);
    const endState = taskslistsReducer(startState, action);

    expect(endState['todolistId2'][0].title).toBe("Milk");
    expect(endState['todolistId2'][1].title).toBe(newTitle);
});

test('correct tasks status should be changed', () => {
    const action: TChangeTaskStatus = ChangeTaskStatusAC('todolistId2','2',false);
    const endState = taskslistsReducer(startState, action);

    expect(endState['todolistId2'][0].isDone).toBe(true);
    expect(endState['todolistId2'][1].isDone).toBe(false);
});

test('new array should be added when new todolist is added', () => {
    const action = AddTodolistAC('newToDoList');
    const endState = taskslistsReducer(startState, action);

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k!=='todolistId2' && k!=='todolistId1')
    if(!newKey){
        throw Error('New key is not added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toBe([])
});



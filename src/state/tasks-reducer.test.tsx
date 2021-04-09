import React, {useState} from 'react';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {AddTaskAC, RemoveTaskAC, taskslistsReducer} from "./tasks-reducer";

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
    const endState = taskslistsReducer(startState, RemoveTaskAC('todolistId2', '2'))

    expect(endState['todolistId2'].length).toBe(1);
    expect(endState['todolistId2'][0].id).toBe('1');
});

test('correct task should be added', () => {
    const newTitle = 'newTask'
    const endState = taskslistsReducer(startState, AddTaskAC('todolistId2',newTitle))

    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId2'][0].title).toBe(newTitle);
    expect(endState['todolistId2'][0].isDone).toBe(false);
    expect(endState['todolistId2'][0].id).toBeDefined();
});

test('correct task should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]


    const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = taskslistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct tasks status should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = ChangeTodolistFilterAC(todolistId2, newFilter);

    const endState = taskslistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



type StateType = {
    age: number
    childrenCount: number
    name: string
}

export type TIncrementAge = {
    type: 'INCREMENT-AGE'
}
export type TIncrementChildrenCount = {
    type: 'INCREMENT-CHILDREN-COUNT'
}
export type TChangeName = {
    type: 'CHANGE-NAME'
    newName: string
}

export type ActionType = TIncrementAge | TIncrementChildrenCount | TChangeName;

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {...state};//делаем копию
            newState.age = state.age + 1;// у копии имеем право менять св-во
            return newState;//возвращаем копию
        case 'INCREMENT-CHILDREN-COUNT':
            // а можно без создания переменных промежуточных (делайте, как вам понятнее)
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            };
        case 'CHANGE-NAME':
            // а можно без  создания переменных промежуточных (делайте, как вам понятнее)
            return {
                ...state,
                name: action.newName
            };
        default:
            throw new Error("I don't understand this type")
    }
}

export const IncrementUserAC = (): TIncrementAge => {
    return { type: 'INCREMENT-AGE' }
}
export const IncrementChildrenCountAC = (): TIncrementChildrenCount => {
    return { type: 'INCREMENT-CHILDREN-COUNT'}
}
export const ChangeNameAC = (newName: string): TChangeName => {
    return { type: 'CHANGE-NAME', newName }
}

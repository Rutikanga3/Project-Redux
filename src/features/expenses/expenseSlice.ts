import {createSlice} from "@reduxjs/toolkit"

import type { PayloadAction } from "@reduxjs/toolkit"
import type { ExpenseState } from '../../types/expenses';


const initialState: ExpenseState = {
    expense: []
}

const expenseSlice = createSlice({
    name:  "Money",
    initialState,
    reducers: {
        addExpense: (
            state,
            action: PayloadAction<{title:string; description: string; amount: number; quantity: number}>
        ) =>{
            state.expense.push({ id: Date.now(), ...action.payload })
        },
        removeExpense: (
            state, action: PayloadAction<number>
        ) =>{
            state.expense = state.expense.filter(
                (Ex) => Ex.id !== action.payload
            )
        },

        updateExpense: (
            state,
            action: PayloadAction<{id:number; title:string; description: string; amount: number; quantity: number}>
        ) =>{
            state.expense = state.expense.map(
                (Ex) => {
                    if(Ex.id===action.payload.id){
                        return{
                            ...Ex,
                            title: action.payload.title,
                            description: action.payload.description,
                            amount: action.payload.amount,
                            quantity: action.payload.quantity
                        }
                    }
                    else{
                        return Ex;
                    }
                } 
            )
        }
    }
})

export const {addExpense, removeExpense,updateExpense}= expenseSlice.actions

export default expenseSlice.reducer
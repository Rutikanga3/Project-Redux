import expenseReducer from '../features/expenses/expenseSlice'

import { configureStore } from '@reduxjs/toolkit'


export const store = configureStore({
    reducer: {
        expense: expenseReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
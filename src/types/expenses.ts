interface Expense{
    id: number;
    title:string;
    description: string;
    amount: number;
    quantity: number
};


export interface ExpenseState {
    expense: Expense[];
}


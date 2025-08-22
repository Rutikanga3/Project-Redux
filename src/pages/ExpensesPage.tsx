import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, removeExpense, updateExpense } from '../features/expenses/expenseSlice';
import type { RootState } from '../store/index';


function ExpensesPage() {
    const[title, setTitle] = useState('');
    const[amount,setAmount]= useState<number>(0)
    const [expenseId, setExpenseId] = useState<number | null>(null);
    const[description, setDescription] =useState('')
    const[quantity, setQuantity]=useState<number>(0)
    const[editId,setEditId] = useState<number>(0)

    const Dispatch= useDispatch()
    const expense = useSelector((state: RootState)=>state.expense.expense)

    const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(title.trim()&& amount > 0 && description && quantity > 0){
            Dispatch(addExpense({title,amount,description,quantity}));
            setTitle('')
            setAmount(0)
            setDescription('')
            setQuantity(0)
        }
    }

    const handleUpdate =()=>(e:React.FormEvent<HTMLFormElement>)=>{
        
        if(editId !== null && title.trim()&& amount > 0 && description && quantity > 0){
            Dispatch(updateExpense({id : editId,title,amount,description,quantity}));
            setEditId(0)
            setTitle('')
            setDescription('')
            setAmount(0)
            setQuantity(0)
        }
    };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center p-5">
      <form
        action=""
        onSubmit={editId ? handleUpdate : handleSubmit}
        className="bg-white p-5 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-lg font-bold mb-4">
          {editId ? "Edit Expense" : "Add Expense"}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <h2 className='text-lg font-bold mb-4'>
            {editId ? "Update Expense" : "Add Expense"}
        </h2>
        <button className="py-2 px-4 bg-green-900 text-white" type="submit">
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </form>
      <div className="mt-5 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Expenses List</h2>
        <ul className="bg-white shadow rounded-md">
          {expense.map((expense) => (
            <li key={expense.id} className="border-b last:border-b-0">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{expense.title}</h3>
                  <p className="text-sm text-gray-600">{expense.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${expense.amount}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {expense.quantity}
                  </p>
                </div>
                <div>
                  <button
                    className="py-2 px-4 bg-red-900 text-white"
                    type="submit"
                    onClick={() => Dispatch(removeExpense(expense.id))}
                  >
                    Remove Expense
                  </button>
                  <button
                    className="py-2 px-4 bg-teal-600 text-white "
                    type="submit"
                    onClick={() => {
                      setEditId(expense.id);
                      setTitle(expense.title);
                      setDescription(expense.description);
                      setAmount(expense.amount);
                      setQuantity(expense.quantity);
                    }}
                  >
                    Update Expense
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpensesPage
document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');

    // Load expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Render expenses
    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(function (expense, index) {
            const li = document.createElement('li');
            li.innerHTML = `
          <span>${expense.name}: $${expense.amount}</span>
          <button onclick="editExpense(${index})">Edit</button>
          <button onclick="deleteExpense(${index})">Delete</button>
        `;
            expenseList.appendChild(li);
        });
        // Save expenses to localStorage
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // Add new expense
    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const expenseName = document.getElementById('expenseName').value;
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
        if (expenseName && !isNaN(expenseAmount)) {
            expenses.push({ name: expenseName, amount: expenseAmount });
            renderExpenses();
            expenseForm.reset();
        } else {
            alert('Please enter valid expense details.');
        }
    });

    // Edit expense
    window.editExpense = function (index) {
        const newName = prompt('Enter new name:');
        const newAmount = parseFloat(prompt('Enter new amount:'));
        if (newName && !isNaN(newAmount)) {
            expenses[index].name = newName;
            expenses[index].amount = newAmount;
            renderExpenses();
        } else {
            alert('Please enter valid expense details.');
        }
    };

    // Delete expense
    window.deleteExpense = function (index) {
        if (confirm('Are you sure you want to delete this expense?')) {
            expenses.splice(index, 1);
            renderExpenses();
        }
    };

    renderExpenses();
});

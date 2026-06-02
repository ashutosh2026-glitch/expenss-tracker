let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const transactionList = document.getElementById("transactionList");

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

document
.getElementById("addBtn")
.addEventListener("click", addTransaction);

function addTransaction(){

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if(title === "" || amount <= 0){
        alert("Enter valid details");
        return;
    }

    const transaction = {
        id: Date.now(),
        title,
        amount,
        type
    };

    transactions.push(transaction);

    saveData();

    titleInput.value = "";
    amountInput.value = "";

    updateUI();
}

function updateUI(){

    transactionList.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if(transaction.type === "income"){
            income += transaction.amount;
        }else{
            expense += transaction.amount;
        }

        const li = document.createElement("li");

        li.className =
        transaction.type === "income"
        ? "income-item"
        : "expense-item";

        li.innerHTML = `
            <div>
                <strong>${transaction.title}</strong>
                <br>
                ₹${transaction.amount}
            </div>

            <button
            class="delete-btn"
            onclick="deleteTransaction(${transaction.id})">
            Delete
            </button>
        `;

        transactionList.appendChild(li);
    });

    const balance = income - expense;

    incomeEl.textContent =
    "₹" + income.toLocaleString("en-IN");

    expenseEl.textContent =
    "₹" + expense.toLocaleString("en-IN");

    balanceEl.textContent =
    "₹" + balance.toLocaleString("en-IN");
}

function deleteTransaction(id){

    transactions =
    transactions.filter(
        transaction => transaction.id !== id
    );

    saveData();
    updateUI();
}

function saveData(){

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

/* Dark Theme */

const themeBtn =
document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode")
    );
});

if(localStorage.getItem("theme") === "true"){
    document.body.classList.add("dark-mode");
}

/* Initial Load */

updateUI();
document
.getElementById("clearAllBtn")
.addEventListener("click",()=>{

    if(confirm("Delete all transactions?")){

        transactions = [];

        saveData();
        updateUI();
    }
});
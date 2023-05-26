class BankAccount {
    constructor(accountNumber, accountHolder, balance) {
        this._accountNumber = accountNumber;
        this._accountHolder = accountHolder;
        this._balance = balance;
    }

    getAccountNumber() {
        return this._accountNumber;
    }

    getAccountHolder() {
        return this._accountHolder;
    }

    getBalance() {
        return this._balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this._balance += amount;
            console.log(`Deposited $${amount} into account ${this._accountNumber}`);
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this._balance) {
            this._balance -= amount;
            console.log(`Withdrawn $${amount} from account ${this._accountNumber}`);
        } else {
            console.log(`Insufficient balance in account ${this._accountNumber}`);
        }
    }
}

class SavingsAccount extends BankAccount {
    constructor(accountNumber, accountHolder, balance, interestRate) {
        super(accountNumber, accountHolder, balance);
        this._interestRate = interestRate;
    }

    calculateInterest() {
        const interestAmount = this._balance * (this._interestRate / 100);
        console.log(`Interest amount for account ${this._accountNumber}: $${interestAmount}`);
        return interestAmount;
    }
}

class CheckingAccount extends BankAccount {
    constructor(accountNumber, accountHolder, balance, overdraftLimit) {
        super(accountNumber, accountHolder, balance);
        this._overdraftLimit = overdraftLimit;
    }

    withdraw(amount) {
        const availableBalance = this._balance + this._overdraftLimit;
        if (amount > 0 && amount <= availableBalance) {
            if (amount <= this._balance) {
                this._balance -= amount;
                console.log(`Withdrawn $${amount} from account ${this._accountNumber}`);
            } else {
                const remainingAmount = amount - this._balance;
                this._balance = 0;
                console.log(`Withdrawn $${this._balance} (balance exhausted) from account ${this._accountNumber}`);
                console.log(`Withdrawn $${remainingAmount} from overdraft limit of account ${this._accountNumber}`);
            }
        } else {
            console.log(`Withdrawal amount exceeds available balance and overdraft limit in account ${this._accountNumber}`);
        }
    }
}

// Creating instances of each account type
const savingsAccount = new SavingsAccount("SAV-001", "John Doe", 5000, 2.5);
const checkingAccount = new CheckingAccount("CHK-001", "Jane Smith", 3000, 1000);

// Accessing and displaying account information
document.getElementById("savingsAccountNumber").textContent = savingsAccount.getAccountNumber();
document.getElementById("savingsAccountHolder").textContent = savingsAccount.getAccountHolder();
document.getElementById("savingsAccountBalance").textContent = savingsAccount.getBalance();

document.getElementById("checkingAccountNumber").textContent = checkingAccount.getAccountNumber();
document.getElementById("checkingAccountHolder").textContent = checkingAccount.getAccountHolder();
document.getElementById("checkingAccountBalance").textContent = checkingAccount.getBalance();

// Performing operations
savingsAccount.deposit(2000);
savingsAccount.withdraw(1500);
savingsAccount.calculateInterest();

checkingAccount.deposit(500);
checkingAccount.withdraw(4000);
checkingAccount.withdraw(500);
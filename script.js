class BankAccount {
    constructor(accountNumber, accountHolder, balance) {
        this.theAccountNumber = accountNumber;
        this.theAccountHolder = accountHolder;
        this.theBalance = balance;
    }

    getAccountNumber() {
        return this.theAccountNumber;
    }

    getAccountHolder() {
        return this.theAccountHolder;
    }

    getBalance() {
        return this.theBalance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.theBalance += amount;
            console.log(`Deposited $${amount} into account ${this.theAccountNumber}`);
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.theBalance) {
            this.theBalance -= amount;
            console.log(`Withdrawn $${amount} from account ${this.theAccountNumber}`);
        } else {
            console.log(`Insufficient balance in account ${this.theAccountNumber}`);
        }
    }
}

class SavingsAccount extends BankAccount {
    constructor(accountNumber, accountHolder, balance, interestRate) {
        super(accountNumber, accountHolder, balance);
        this._interestRate = interestRate;
    }

    calculateInterest() {
        const interestAmount = this.theBalance * (this._interestRate / 100);
        console.log(`Interest amount for account ${this.theAccountNumber}: $${interestAmount}`);
        return interestAmount;
    }
}

class CheckingAccount extends BankAccount {
    constructor(accountNumber, accountHolder, balance, overdraftLimit) {
        super(accountNumber, accountHolder, balance);
        this._overdraftLimit = overdraftLimit;
    }

    withdraw(amount) {
        const availableBalance = this.theBalance + this._overdraftLimit;
        if (amount > 0 && amount <= availableBalance) {
            if (amount <= this.theBalance) {
                this.theBalance -= amount;
                console.log(`Withdrawn $${amount} from account ${this.theAccountNumber}`);
            } else {
                const remainingAmount = amount - this.theBalance;
                this.theBalance = 0;
                console.log(`Withdrawn $${this.theBalance} (balance exhausted) from account ${this.theAccountNumber}`);
                console.log(`Withdrawn $${remainingAmount} from overdraft limit of account ${this.theAccountNumber}`);
            }
        } else {
            console.log(`Withdrawal amount exceeds available balance and overdraft limit in account ${this.theAccountNumber}`);
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
savingsAccount.deposit(302);
savingsAccount.withdraw(1216);
savingsAccount.calculateInterest();

checkingAccount.deposit(150);
checkingAccount.withdraw(37);
checkingAccount.withdraw(101010);
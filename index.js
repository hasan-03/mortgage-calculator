document.querySelectorAll('.mortgage-type').forEach(input => {
    input.addEventListener('change', function () {
        document.querySelectorAll('.radio-input').forEach(div => {
            div.classList.remove('selected')
        })
        if (this.checked) {
            this.parentElement.classList.add('selected')
        }
    })
})

document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('dblclick', function () {
        if (this.checked) {
            this.checked = false;
            this.dispatchEvent(new Event('change'));
        }
    });
    input.addEventListener('change', function () {
        if (this.checked) {
            document.querySelectorAll('input[type="radio"]').forEach(otherInput => {
                if (otherInput !== this) {
                    otherInput.checked = false;
                }
            });
        }
    });
});

const calculate = document.getElementById("calculate-btn")

calculate.addEventListener('click', (e) => {
    e.preventDefault()
    const amount = parseFloat(document.getElementById('amount').value)
    const term = parseFloat(document.getElementById('term').value)
    const rate = parseFloat(document.getElementById('rate').value) / 100
    const type = document.querySelector('input[name="mortgage-type"]:checked')

    let isValid = true

    document.querySelectorAll('.icons').forEach(el => {
        el.classList.remove('alert');
    });

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('amount-error').style.display = 'block';
        document.getElementById('amount-area').classList.add('alert')
        isValid = false
    } else {
        document.getElementById('amount-error').style.display = 'none';
        document.getElementById('amount-area').classList.remove('alert')
    }
    if (isNaN(term) || term <= 0) {
        document.getElementById('term-error').style.display = 'block';
        document.getElementById('term-area').classList.add('alert')
        isValid = false
    } else {
        document.getElementById('term-error').style.display = 'none';
        document.getElementById('term-area').classList.remove('alert')
    }
    if (isNaN(rate) || rate <= 0) {
        document.getElementById('rate-error').style.display = 'block';
        document.getElementById('rate-area').classList.add('alert')
        isValid = false
    } else {
        document.getElementById('rate-error').style.display = 'none';
        document.getElementById('rate-area').classList.remove('alert')
    }
    if (!type) {
        document.getElementById('type-error').style.display = 'block';
        isValid = false
    } else {
        document.getElementById('type-error').style.display = 'none';
    }

    if (!isValid) {
        return
    }

    document.getElementById('results-container').style.display = 'block';
    document.getElementById('default').style.display = 'none';
    
    const monthly = document.getElementById('monthly-result')
    const term_result = document.getElementById('term-result')

    let monthlyPayment;
    let totalPayment;

    if (type.value === 'repayment') {
        const monthlyRate = rate / 12
        const numberOfPayments = term * 12
        monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments))
        totalPayment = monthlyPayment * numberOfPayments
    } else {
        monthlyPayment = (amount * rate) / 12
        totalPayment = amount + (monthlyPayment * term * 12)
    }

    monthly.innerText = `$${monthlyPayment.toFixed(2)}`
    term_result.innerText = `$${totalPayment.toFixed(2)}`
})

const clear = document.getElementById('clear-btn')

clear.addEventListener('click', (e) => {
    e.preventDefault()
    const resultsContainer = document.getElementById('results-container');
    const defaultElement = document.getElementById('default');
    
    document.querySelectorAll('.for-calculation').forEach(el => {
        el.value = ''
    });
    document.querySelectorAll('.error').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.icons').forEach(el => {
        el.classList.remove('alert');
    });

    document.querySelectorAll('input[type="radio"]').forEach(el => {
        el.checked = false;
    });
    resultsContainer.style.display = 'none';
    defaultElement.style.display = 'block';
});

document.querySelectorAll('.error').forEach(el => {
    el.style.display = 'none'
})
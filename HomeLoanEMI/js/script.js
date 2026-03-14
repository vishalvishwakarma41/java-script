// const loanInput = document.getElementById("loan");
// const rateInput = document.getElementById("rate");
// const yearInput = document.getElementById("year");

// const calcBtn = document.getElementById("calcBtn");
// const printBtn = document.getElementById("printBtn");
// const nocBtn = document.getElementById("nocBtn");

// const summary = document.getElementById("summary");
// const table = document.getElementById("emiTable");
// const LIMITS = {
//     MAX_LOAN: 200000000, 
//     MIN_LOAN: 50000,

//     MAX_RATE: 20,
//     MIN_RATE: 1,

//     MAX_YEAR: 30,
//     MIN_YEAR: 1
// };


// function checkEnableButton() {

//     // Loan blur
// $("#loan").on("blur", function () {
//     let value = $(this).val().replace(/,/g, "");
//     if (value === "") {
//         showError(this, "Please fill loan amount");
//     }
// });

// // Rate blur
// $("#rate").on("blur", function () {
//     if ($(this).val() === "") {
//         showError(this, "Please fill interest rate");
//     }
// });

// // Year blur
// $("#year").on("blur", function () {
//     if ($(this).val() === "") {
//         showError(this, "Please fill year");
//     }
// });

//     let loan = loanInput.value.replace(/,/g, "");
//     let rate = rateInput.value;
//     let year = yearInput.value;

//     // calcBtn.disabled = !(loan && rate && year);
//     $("#calcBtn").prop("disabled", !(loan && rate && year));

// }


// function showError(input, message) {
//     let error = input.nextElementSibling;
//     if (!error || !error.classList.contains("error")) {
//         error = document.createElement("div");
//         error.className = "error";
//         error.style.color = "red";
//         error.style.opacity = "0";
//         error.style.transition = "0.4s";
//         input.after(error);
//     }
//     // error.innerText = message;
//     // error.style.opacity = "1";
//     $(error)
//     .hide()
//     .text(message)
//     .fadeIn(200);
//     $(input).addClass("error-border");
// }

// function hideError(input) {
// let error = input.nextElementSibling;
// if (error && error.classList.contains("error")) {
//     $(error).fadeOut(200);
// }
// $(input).removeClass("error-border");
// }

// /* ===========================
//    FORMAT NUMBER (INDIAN COMMA)
// =========================== */
// function formatNumber(value) {
//     value = value.replace(/,/g, "");
//     if (value === "") return "";
//     return Number(value).toLocaleString("en-IN");
// }

// let lastValid = "";


// loanInput.addEventListener("input", () => {


//     let raw = loanInput.value.replace(/\D/g, "");

//     if (raw === "") {
//         loanInput.value = "";
//         lastValid = "";
//         hideError(loanInput)
//         // return;
//         checkEnableButton();
//     }

//     let value = Number(raw);

//     if (value > LIMITS.MAX_LOAN) {
//         showError(loanInput, "Maximum ₹20 Crore allowed");

//         loanInput.value = lastValid;
//         return;
       
//     }
//     hideError(loanInput);

//     if (value < LIMITS.MIN_LOAN) {
//         showError(loanInput, "Minimum ₹50,000 required");
//     }

//     // else if (value < LIMITS.MIN_LOAN) {
//     //     showError(loanInput, "Minimum ₹50,000 required");
//     // }
//     //  else {
//     //     hideError(loanInput);
//     // }

//     loanInput.value = value.toLocaleString("en-IN");
//     // loanInput.value.lastValid;
//     lastValid = loanInput.value;

//        $("#loan").on("blur", function () {

//     let value = $(this).val().replace(/,/g, "");

//     if (value === "") {
//         showError(this, "Please fill loan amount");
//     }
// });

//     checkEnableButton();
// });



// rateInput.addEventListener("input", () => {


//     let value = rateInput.value.replace(/[^0-9.]/g, "");
//     rateInput.value = value;

//     let rate = Number(value);

//     if (rate > LIMITS.MAX_RATE) {
//         showError(rateInput, "Max 20% allowed");
//         rateInput.value = "";
//         return;
//     }

//     if (rate < LIMITS.MIN_RATE && rate !== 0) {
//         showError(rateInput, "Minimum 1% required");
//     } else {
//         hideError(rateInput);
//     }

//     checkEnableButton();
// });



// yearInput.addEventListener("input", () => {


//     let value = yearInput.value.replace(/\D/g, "");
//     yearInput.value = value;

//     let year = Number(value);

//     if (year > LIMITS.MAX_YEAR) {
//         showError(yearInput, "Max 30 years allowed");
//         yearInput.value = "";
//         return;
//     }

//     if (year < LIMITS.MIN_YEAR && year !== 0) {
//         showError(yearInput, "Minimum 1 year required");
//     } else {
//         hideError(yearInput);
//     }


//     checkEnableButton();
// });

// /* ===========================
//    NUMBER TO WORDS (ENGLISH)
// =========================== */
// function numberToWords(num) {
//     const a = [
//         "", "One", "Two", "Three", "Four", "Five", "Six",
//         "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
//         "Thirteen", "Fourteen", "Fifteen", "Sixteen",
//         "Seventeen", "Eighteen", "Nineteen"
//     ];
//     const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

//     if (num === 0) return "Zero";

//     function inWords(n) {
//         if (n < 20) return a[n];
//         if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10];
//         if (n < 1000) return a[Math.floor(n / 100)] + " Hundred " + inWords(n % 100);
//         if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand " + inWords(n % 1000);
//         if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh " + inWords(n % 100000);
//         return inWords(Math.floor(n / 10000000)) + " Crore " + inWords(n % 10000000);
//     }
//     return inWords(num).trim();
// }

// /* ===========================
//    FORMAT AMOUNT
// =========================== */
// function formatAmount(amount) {
//     return "₹ " + Number(amount).toLocaleString("en-IN");
// }


// function calculateEMI() {

//     let loanVal = loanInput.value.replace(/,/g, "");
//     let rateVal = rateInput.value;
//     let yearVal = yearInput.value;

//     let valid = true;

//     if (loanVal === "") {
//         showError(loanInput, "Please fill loan amount");
//         valid = false;
//     }
//     if (rateVal === "") {
//         showError(rateInput, "Please fill interest rate");
//         valid = false;
//     }
//     if (yearVal === "") {
//         showError(yearInput, "Please fill year");
//         valid = false;
//     }

//     if (!valid) return;

//     let P = parseFloat(loanVal);
//     let annualRate = parseFloat(rateVal);
//     let years = parseInt(yearVal);

//     if (
//         P > LIMITS.MAX_LOAN ||
//         annualRate > LIMITS.MAX_RATE ||
//         years > LIMITS.MAX_YEAR
//     ) {
//         alert("Entered values exceed allowed limits");
//         return;
//     }

//     let N = years * 12;
//     let R = annualRate / 12 / 100;

//     let EMI;

//     if (annualRate === 0) {
//         EMI = P / N;
//     } else {
//         EMI = (P * R * Math.pow(1 + R, N)) /
//             (Math.pow(1 + R, N) - 1);
//     }


//     EMI = Math.round(EMI);

//     let totalPayable = EMI * N;
//     let totalInterest = totalPayable - P;

//     summary.innerHTML = `
//         <p>Loan Amount: ${formatAmount(P)} 
//         (${numberToWords(P)} Rupees)</p>

//         <p>Interest Rate: ${annualRate}%</p>

//         <p>Tenure: ${years} Years</p>

//         <p>Monthly EMI: ${formatAmount(EMI)} 
//         (${numberToWords(EMI)} Rupees)</p>

//         <p>Total Interest: ${formatAmount(totalInterest)}</p>

//         <p>Total Amount Payable: ${formatAmount(totalPayable)}</p>
//     `;

//     generateEmiTable(P, EMI, R, N);

//    $('html, body').animate({
//         scrollTop: $("#summary").offset().top - 80
//     }, 500);
    

//     // printBtn.style.display = "block";
//     // nocBtn.style.display = "block";
//     $("#printBtn, #nocBtn").fadeIn(300);

// }

// /* ===========================
//    EMI TABLE
// =========================== */
// function generateEmiTable(balance, EMI, R, months) {

//     let html = `
//         <tr>
//             <th>Month</th>
//             <th>EMI</th>
//             <th>Principal</th>
//             <th>Interest</th>
//             <th>Balance</th>
//         </tr>
//     `;

//     for (let m = 1; m <= months; m++) {

//         let interest = Math.round(balance * R);
//         let principal = EMI - interest;
//         balance -= principal;
//         if (balance < 0) balance = 0;

//         html += `
//             <tr>
//                 <td>${m}</td>
//                 <td>${formatAmount(EMI)}</td>
//                 <td>${formatAmount(principal)}</td>
//                 <td>${formatAmount(interest)}</td>
//                 <td>${formatAmount(balance)}</td>
//             </tr>
//         `;
//     }

//     table.innerHTML = html;
// }


// function printSummary() {
//     window.print();
// }
// function printNOC() {
//     const nocArea = document.getElementById("nocArea");

//     nocArea.style.display = "block";

//     // browser ko repaint ka time do
//     setTimeout(() => {
//         window.print();

//         // print ke baad hide
//         setTimeout(() => {
//             nocArea.style.display = "none";
//         }, 300);

//     }, 100);
// }

// checkEnableButton();
















const loanInput = document.getElementById("loan");
const rateInput = document.getElementById("rate");
const yearInput = document.getElementById("year");

const calcBtn = document.getElementById("calcBtn");
const printBtn = document.getElementById("printBtn");
const nocBtn = document.getElementById("nocBtn");

const summary = document.getElementById("summary");
const table = document.getElementById("emiTable");

const LIMITS = {
    MAX_LOAN: 200000000, 
    MIN_LOAN: 50000,

    MAX_RATE: 20,
    MIN_RATE: 2,

    MAX_YEAR: 30,
    MIN_YEAR: 1
};


function checkEnableButton() {

    // Loan blur
$("#loan").on("blur", function () {
    let value = $(this).val().replace(/,/g, "");
    if (value === "") {
        showError(this, "Please fill loan amount");
    }
});

// Rate blur
$("#rate").on("blur", function () {
    if ($(this).val() === "") {
        showError(this, "Please fill interest rate");
    }
});

// Year blur
$("#year").on("blur", function () {
    if ($(this).val() === "") {
        showError(this, "Please fill year");
    }
});

    let loan = loanInput.value.replace(/,/g, "");
    let rate = rateInput.value;
    let year = yearInput.value;

    // calcBtn.disabled = !(loan && rate && year);
    $("#calcBtn").prop("disabled", !(loan && rate && year));

}


// function showError(input, message) {
//     let error = input.nextElementSibling;
//     if (!error || !error.classList.contains("error")) {
//         error = document.createElement("div");
//         error.className = "error";
//         error.style.color = "red";
//         error.style.opacity = "0";
//         error.style.transition = "0.4s";
//         input.after(error);
//     }
//     // error.innerText = message;
//     // error.style.opacity = "1";
//     $(error).text(message);
    
//     $(input).addClass("error-border");
// }
function showError(input, message) {
    let error = input.nextElementSibling;

    if (!error || !error.classList.contains("error")) {
        error = document.createElement("div");
        error.className = "error";
        input.after(error);
    }

    error.textContent = message;
    input.classList.add("error-border");
}
function hideError(input) {
    let error = input.nextElementSibling;

    if (error && error.classList.contains("error")) {
        error.textContent = "";
    }

    input.classList.remove("error-border");
}


// function hideError(input) {
// let error = input.nextElementSibling;
// if (error && error.classList.contains("error")) {
//     $(error).text("");
// }
// $(input).removeClass("error-border");
// }

/* ===========================
   FORMAT NUMBER (INDIAN COMMA)
=========================== */
function formatNumber(value) {
    value = value.replace(/,/g, "");
    if (value === "") return "";
    return Number(value).toLocaleString("en-IN");
}

let lastValid = "";


loanInput.addEventListener("input", () => {


    let raw = loanInput.value.replace(/\D/g, "");

    if (raw === "") {
        loanInput.value = "";
        lastValid = "";
        hideError(loanInput)
        checkEnableButton();
        return;
    }

    let value = Number(raw);
       if (isNaN(value) || value === 0) {
        return;
    }

    if (value > LIMITS.MAX_LOAN) {
        showError(loanInput, "Maximum ₹20 Crore allowed");

        loanInput.value = lastValid;
        return;
       
    }
    hideError(loanInput);
    
    if (value < LIMITS.MIN_LOAN) {
        showError(loanInput, "Minimum ₹50,000 required");
    }
   else {
        hideError(loanInput);
    }

    loanInput.value = value.toLocaleString("en-IN");
    // loanInput.value.lastValid;
    lastValid = loanInput.value;

       $("#loan").on("blur", function () {

    let value = $(this).val().replace(/,/g, "");

    if (value === "") {
        showError(this, "Please fill loan amount");
    }
});

    checkEnableButton();
});



rateInput.addEventListener("input", () => {


    let value = rateInput.value.replace(/[^0-9.]/g, "");
    rateInput.value = value;

    let rate = Number(value);

    if (rate > LIMITS.MAX_RATE) {
        showError(rateInput, "Max 20% allowed");
        rateInput.value = "";
        return;
    }

 if (rate < LIMITS.MIN_RATE) {
    showError(rateInput, "Minimum 2% required");
} else {
    hideError(rateInput);
}


    checkEnableButton();
});



yearInput.addEventListener("input", () => {


    let value = yearInput.value.replace(/\D/g, "");
    yearInput.value = value;

    let year = Number(value);

    if (year > LIMITS.MAX_YEAR) {
        showError(yearInput, "Max 30 years allowed");
        yearInput.value = "";
        return;
    }

   if (year < LIMITS.MIN_YEAR) {
    showError(yearInput, "Minimum 1 year required");
} else {
    hideError(yearInput);
}



    checkEnableButton();
});

/* ===========================
   NUMBER TO WORDS (ENGLISH)
=========================== */
function numberToWords(num) {
    const a = [
        "", "One", "Two", "Three", "Four", "Five", "Six",
        "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
        "Thirteen", "Fourteen", "Fifteen", "Sixteen",
        "Seventeen", "Eighteen", "Nineteen"
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (num === 0) return "Zero";

    function inWords(n) {
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10];
        if (n < 1000) return a[Math.floor(n / 100)] + " Hundred " + inWords(n % 100);
        if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand " + inWords(n % 1000);
        if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh " + inWords(n % 100000);
        return inWords(Math.floor(n / 10000000)) + " Crore " + inWords(n % 10000000);
    }
    return inWords(num).trim();
}

/* ===========================
   FORMAT AMOUNT
=========================== */
function formatAmount(amount) {
    return "₹ " + Number(amount).toLocaleString("en-IN");
}


function calculateEMI() {

    let loanVal = loanInput.value.replace(/,/g, "");
    let rateVal = rateInput.value;
    let yearVal = yearInput.value;

    let valid = true;

    if (loanVal === "") {
        showError(loanInput, "Please fill loan amount");
        valid = false;
    }
    if (rateVal === "") {
        showError(rateInput, "Please fill interest rate");
        valid = false;
    }
    if (yearVal === "") {
        showError(yearInput, "Please fill year");
        valid = false;
    }

    if (!valid) return;

    let P = parseFloat(loanVal);
    let annualRate = parseFloat(rateVal);
    let years = parseInt(yearVal);

    if (
        P > LIMITS.MAX_LOAN ||
        annualRate > LIMITS.MAX_RATE ||
        years > LIMITS.MAX_YEAR
    ) {
        alert("Entered values exceed allowed limits");
        return;
    }

    let N = years * 12;
    let R = annualRate / 12 / 100;

    let EMI;

    if (annualRate === 0) {
        EMI = P / N;
    } else {
        EMI = (P * R * Math.pow(1 + R, N)) /
            (Math.pow(1 + R, N) - 1);
    }


    EMI = Math.round(EMI);

    let totalPayable = EMI * N;
    let totalInterest = totalPayable - P;

    summary.innerHTML = `
        <p>Loan Amount: ${formatAmount(P)} 
        (${numberToWords(P)} Rupees)</p>

        <p>Interest Rate: ${annualRate}%</p>

        <p>Tenure: ${years} Years</p>

        <p>Monthly EMI: ${formatAmount(EMI)} 
        (${numberToWords(EMI)} Rupees)</p>

        <p>Total Interest: ${formatAmount(totalInterest)}</p>

        <p>Total Amount Payable: ${formatAmount(totalPayable)}</p>
    `;

    generateEmiTable(P, EMI, R, N);

   $('html, body').animate({
        scrollTop: $("#summary").offset().top - 80
    }, 500);
    

    // printBtn.style.display = "block";
    // nocBtn.style.display = "block";
    $("#printBtn, #nocBtn").fadeIn(300);

}

/* ===========================
   EMI TABLE
=========================== */
function generateEmiTable(balance, EMI, R, months) {

    let html = `
        <tr>
            <th>Month</th>
            <th>EMI</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Balance</th>
        </tr>
    `;

    for (let m = 1; m <= months; m++) {

        let interest = Math.round(balance * R);
        let principal = EMI - interest;
        balance -= principal;
        if (balance < 0) balance = 0;

        html += `
            <tr>
                <td>${m}</td>
                <td>${formatAmount(EMI)}</td>
                <td>${formatAmount(principal)}</td>
                <td>${formatAmount(interest)}</td>
                <td>${formatAmount(balance)}</td>
            </tr>
        `;
    }

    table.innerHTML = html;
}

// let printMode = "summary";

// function printSummary() {
//     printMode = "summary";
//     window.print();
// }

// function printNOC() {
//     printMode = "noc";

//     const nocArea = document.getElementById("nocArea");
//     nocArea.style.display = "block";

//     setTimeout(() => {
//         window.print();
//         nocArea.style.display = "none";
//     }, 100);
// }

// // window.onbeforeprint = function () {
// //     document.body.classList.remove("summary-print", "noc-print");

// //     if (printMode === "noc") {
// //         document.body.classList.add("noc-print");
// //     } else {
// //         document.body.classList.add("summary-print");
// //     }
// // };
// // let printMode = "summary";

// window.onbeforeprint = function () {

//     document.body.classList.remove("summary-print", "noc-print");

//     if (printMode === "noc") {
//         document.body.classList.add("noc-print");
//     } else {
//         document.body.classList.add("summary-print");
//     }
// };



// const printBtn = document.getElementById("printBtn");
// const nocBtn = document.getElementById("nocBtn");

/* ===== PRINT SUMMARY ===== */
printBtn.addEventListener("click", () => {

    document.body.classList.remove("print-noc");
    document.body.classList.add("print-summary");

    window.print();

    setTimeout(() => {
        document.body.classList.remove("print-summary");
    }, 500);
});


/* ===== PRINT NOC ===== */
nocBtn.addEventListener("click", () => {

    document.body.classList.remove("print-summary");
    document.body.classList.add("print-noc");

    document.getElementById("nocArea").style.display = "block";

    window.print();

    setTimeout(() => {
        document.body.classList.remove("print-noc");
        document.getElementById("nocArea").style.display = "none";
    }, 500);
});

checkEnableButton();


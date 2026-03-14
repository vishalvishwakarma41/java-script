/* ================= RESET FUNCTIONS ================= */

function resetAllBelowMonth() {
    document.getElementById("totalDays").value = "";

    document.getElementById("perDay").value = "";
    document.getElementById("perDay").disabled = true;

    resetAfterPerDay();
}

function resetAfterPerDay() {

    document.getElementById("present").value = "";
    document.getElementById("present").disabled = true;

    document.getElementById("absent").value = "";
    document.getElementById("basic").value = "";

    // CL reset
    document.getElementById("clBox").style.display = "none";
    document.getElementById("clDays").value = "";
    document.getElementById("clDays").disabled = true;

    document.getElementById("totalPresentCL").value = "";
    document.getElementById("totalAbsentCL").value = "";

    // Allowances reset (but NOT disabled)
    document.getElementById("hr").value = "";
    document.getElementById("travel").value = "";
    document.getElementById("food").value = "";

    document.getElementById("hrAmt").value = "";
    document.getElementById("travelAmt").value = "";
    document.getElementById("foodAmt").value = "";

    document.getElementById("totalSalary").value = "";
}

/* ================= YEAR / MONTH ================= */

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function checkYear() {

    let yearInput = document.getElementById("year");
    let year = Number(yearInput.value);
    let month = document.getElementById("month");
    let leapText = document.getElementById("leapText");

    if (yearInput.value.length === 4) {

        leapText.innerText = isLeapYear(year)
            ? " Leap Year"
            : " Not a Leap Year";

        leapText.style.color = isLeapYear(year)
            ? "green"
            : "red";

        month.disabled = false;

    } else {
        month.disabled = true;
        month.value = "";
        resetAllBelowMonth();
    }
}

/* ================= SET DAYS ================= */

function setDays() {

    resetAllBelowMonth();

    let year = Number(document.getElementById("year").value);
    let month = document.getElementById("month").value;

    if (month !== "") {
        let days = new Date(year, month, 0).getDate();
        document.getElementById("totalDays").value = days;

        document.getElementById("perDay").disabled = false;
    }
}

/* ================= PER DAY ================= */

// function perDayChanged() {

//     let perDayInput = document.getElementById("perDay").value;
//         let perDay = Number(perDayInput);

//     let err = document.getElementById("perDayErr");
//     err.innerText = "";

//     // 🔴 If empty or 0 → clear everything
//     // if (perDayInput === "" || Number(perDayInput) <= 0)
//            if (perDayInput === "" || perDay < 100){
//             err.innerText = "Minimum per day salary is 100";


//         document.getElementById("present").disabled = true;

//         document.getElementById("present").value = "";
//         document.getElementById("absent").value = "";
//         document.getElementById("basic").value = "";

//         document.getElementById("hr").value = "";
//         document.getElementById("travel").value = "";
//         document.getElementById("food").value = "";


//         document.getElementById("hrAmt").value = "";
//         document.getElementById("travelAmt").value = "";
//         document.getElementById("foodAmt").value = "";

//         document.getElementById("totalAllowances").value = "";
//         document.getElementById("totalSalary").value = "";

//         return;
//     }

//     if (Number(perDayInput) < 100) {
//         err.innerText = "Minimum per day salary is 100";
//         document.getElementById("present").disabled = true;
//         return;
//     }

//     document.getElementById("present").disabled = false;
//     recalculateSalarySlip();
// }

function perDayChanged() {

    let perDayInput = document.getElementById("perDay").value;
    let perDay = Number(perDayInput);

    let err = document.getElementById("perDayErr");
    err.innerText = "";

    // 🔴 If empty OR less than 100
    if (perDayInput === "" || perDay < 100) {

        resetCL();

        err.innerText = "Minimum per day salary is 100";

        document.getElementById("present").disabled = true;

        // 🔴 Clear dependent fields
        document.getElementById("present").value = "";
        document.getElementById("absent").value = "";
        document.getElementById("basic").value = "";

        document.getElementById("hr").value = "";
        document.getElementById("travel").value = "";
        document.getElementById("food").value = "";

        document.getElementById("hrAmt").value = "";
        document.getElementById("travelAmt").value = "";
        document.getElementById("foodAmt").value = "";

        document.getElementById("totalAllowances").value = "";
        document.getElementById("totalSalary").value = "";

        return;
    }

    // ✅ Valid salary
    document.getElementById("present").disabled = false;
    recalculateSalarySlip();
}


function presentChanged() {
    resetCL();
    let present = Number(document.getElementById("present").value);
    let total = Number(document.getElementById("totalDays").value);
    let err = document.getElementById("presentErr");

    err.innerText = "";

    if (present < 0) {
        err.innerText = "Present days minus me nahi ho sakte";
        document.getElementById("present").value = "";
        return;
    }

    if (present > total) {
        err.innerText = "Month ke total days se zyada nahi";
        document.getElementById("present").value = total;
    }
    if (present > 0) {
    document.getElementById("hr").disabled = false;
    document.getElementById("travel").disabled = false;
    document.getElementById("food").disabled = false;
}
    recalculateSalarySlip();
}

/* ================= CL ================= */

function clYes() {
    document.getElementById("clBox").style.display = "block";
    document.getElementById("clDays").disabled = false;
}

function clNo() {
    document.getElementById("clBox").style.display = "none";
    document.getElementById("clDays").value = "";
    document.getElementById("clDays").disabled = true;

    document.getElementById("totalPresentCL").value = "";
    document.getElementById("totalAbsentCL").value = "";

    recalculateSalarySlip();
}

function clDaysChanged() {
    recalculateSalarySlip();
}
function resetCL() {

    // Hide CL box
    document.getElementById("clBox").style.display = "none";

    // Clear CL days
    document.getElementById("clDays").value = "";
    document.getElementById("clDays").disabled = true;

    document.getElementById("totalPresentCL").value = "";
    document.getElementById("totalAbsentCL").value = "";

    let radios = document.getElementsByName("cl");
    radios.forEach(r => r.checked = false);
}



// function recalculateSalarySlip() {

//     let total = Number(document.getElementById("totalDays").value);
//     let perDay = Number(document.getElementById("perDay").value);

//     let presentInput = document.getElementById("present").value;

//     // if (!total || !perDay) return;

//     // if (presentInput === "") {
//     //     document.getElementById("absent").value = "";
//     //     document.getElementById("basic").value = "";
//     //     document.getElementById("hrAmt").value = "";
//     //     document.getElementById("travelAmt").value = "";
//     //     document.getElementById("foodAmt").value = "";
//     //     document.getElementById("totalSalary").value = "";
//     //     return;
//     // }

//     if (!total || !perDay) {

//     document.getElementById("present").value = "";
//     document.getElementById("absent").value = "";
//     document.getElementById("basic").value = "";

//     document.getElementById("clDays").value = "";
//     document.getElementById("totalPresentCL").value = "";
//     document.getElementById("totalAbsentCL").value = "";

//     document.getElementById("hrAmt").value = "";
//     document.getElementById("travelAmt").value = "";
//     document.getElementById("foodAmt").value = "";

//     document.getElementById("totalAllowances").value = "";
//     document.getElementById("totalSalary").value = "";

//     return;
// }
//     if (perDayInput === "") {

//     document.getElementById("present").value = "";
//     document.getElementById("absent").value = "";
//     document.getElementById("basic").value = "";

//     document.getElementById("hrAmt").value = "";
//     document.getElementById("travelAmt").value = "";
//     document.getElementById("foodAmt").value = "";
//     document.getElementById("totalAllowances").value = "";
//     document.getElementById("totalSalary").value = "";

//     return;
// }

//     let present = Number(presentInput);
//     let cl = Number(document.getElementById("clDays").value) || 0;

//     // ORIGINAL absent
//     let absent = total - present;
//     document.getElementById("absent").value = absent;

//     // CL logic
//     let totalPresentWithCL = present + cl;
//     let totalAbsentWithCL = total - totalPresentWithCL;

//     if (totalPresentWithCL > total) {
//         document.getElementById("clDays").value = "";
//         cl = 0;
//         totalPresentWithCL = present;
//         totalAbsentWithCL = total - present;
//     }

//     if (cl > 0) {
//         document.getElementById("totalPresentCL").value = totalPresentWithCL;
//         document.getElementById("totalAbsentCL").value = totalAbsentWithCL;
//     } else {
//         document.getElementById("totalPresentCL").value = "";
//         document.getElementById("totalAbsentCL").value = "";
//     }

//     // BASIC
//     let basic = totalPresentWithCL * perDay;
//     document.getElementById("basic").value = basic;

//     // ALLOWANCES
//     // let hrP = Number(document.getElementById("hr").value) || 0;
//     // let trP = Number(document.getElementById("travel").value) || 0;
//     // let fdP = Number(document.getElementById("food").value) || 0;
//     let hrInput = document.getElementById("hr").value;
//     let trInput = document.getElementById("travel").value;
//     let fdInput = document.getElementById("food").value;

//     // let hrP = hrInput === "" ? null : Number(hrInput);
//     // let trP = trInput === "" ? null : Number(trInput);
//     // let fdP = fdInput === "" ? null : Number(fdInput);


//     // let hrAmt = basic * hrP / 100;
//     // let trAmt = basic * trP / 100;
//     // let fdAmt = basic * fdP / 100;

//     // document.getElementById("hrAmt").value = hrAmt.toFixed(2);
//     // document.getElementById("travelAmt").value = trAmt.toFixed(2);
//     // document.getElementById("foodAmt").value = fdAmt.toFixed(2);

//     let hrAmt = hrP !== null ? (basic * hrP / 100) : null;
//     let trAmt = trP !== null ? (basic * trP / 100) : null;
//     let fdAmt = fdP !== null ? (basic * fdP / 100) : null;

//     document.getElementById("hrAmt").value = hrAmt !== null ? hrAmt.toFixed(2) : "";
//     document.getElementById("travelAmt").value = trAmt !== null ? trAmt.toFixed(2) : "";
//     document.getElementById("foodAmt").value = fdAmt !== null ? fdAmt.toFixed(2) : "";

//     // let totalAllowances = hrAmt + trAmt + fdAmt;
//     // document.getElementById("totalAllowances").value = totalAllowances.toFixed(2);
//     let totalAllowances = 0;

//     if (hrAmt !== null) totalAllowances += hrAmt;
//     if (trAmt !== null) totalAllowances += trAmt;
//     if (fdAmt !== null) totalAllowances += fdAmt;

//     document.getElementById("totalAllowances").value =
//         totalAllowances > 0 ? totalAllowances.toFixed(2) : "";


//     // let finalSalary = basic + totalAllowances;
//     // document.getElementById("totalSalary").value = finalSalary.toFixed(2);
//     let finalSalary = basic + totalAllowances;

//     document.getElementById("totalSalary").value =
//     totalAllowances > 0 ? finalSalary.toFixed(2) : basic.toFixed(2);

//     }



// function recalculateSalarySlip() {

//     // let total = Number(document.getElementById("totalDays").value);
//     let perDayInput = document.getElementById("perDay").value;

//     // 🔴 If salary cleared → clear everything
//     if (perDayInput === "") {

//         document.getElementById("present").value = "";
//         document.getElementById("absent").value = "";
//         document.getElementById("basic").value = "";

//         document.getElementById("clDays").value = "";
//         document.getElementById("totalPresentCL").value = "";
//         document.getElementById("totalAbsentCL").value = "";

//         document.getElementById("hrAmt").value = "";
//         document.getElementById("travelAmt").value = "";
//         document.getElementById("foodAmt").value = "";
//         document.getElementById("totalAllowances").value = "";
//         document.getElementById("totalSalary").value = "";

//         return;
//     }

//     // let perDay = Number(perDayInput);
//     let presentInput = document.getElementById("present").value;
//       let perDay = Number(perDayInput);
//     let total = Number(document.getElementById("totalDays").value);

//     if (!total || presentInput === "") return;

//     let present = Number(presentInput);
//     let cl = Number(document.getElementById("clDays").value) || 0;

//     // ORIGINAL absent
//     document.getElementById("absent").value = total - present;

//     // CL logic
//     let totalPresentWithCL = present + cl;

//     if (totalPresentWithCL > total) {
//         document.getElementById("clDays").value = "";
//         cl = 0;
//         totalPresentWithCL = present;
//     }

//     if (cl > 0) {
//         document.getElementById("totalPresentCL").value = totalPresentWithCL;
//         document.getElementById("totalAbsentCL").value = total - totalPresentWithCL;
//     } else {
//         document.getElementById("totalPresentCL").value = "";
//         document.getElementById("totalAbsentCL").value = "";
//     }

//     // BASIC
//     let basic = totalPresentWithCL * perDay;
//     document.getElementById("basic").value = basic;

//     // ALLOWANCES (no default 0.00)
//     let hrInput = document.getElementById("hr").value;
//     let trInput = document.getElementById("travel").value;
//     let fdInput = document.getElementById("food").value;

//     let hrAmt = hrInput !== "" ? basic * Number(hrInput) / 100 : null;
//     let trAmt = trInput !== "" ? basic * Number(trInput) / 100 : null;
//     let fdAmt = fdInput !== "" ? basic * Number(fdInput) / 100 : null;

//     document.getElementById("hrAmt").value = hrAmt !== null ? hrAmt.toFixed(2) : "";
//     document.getElementById("travelAmt").value = trAmt !== null ? trAmt.toFixed(2) : "";
//     document.getElementById("foodAmt").value = fdAmt !== null ? fdAmt.toFixed(2) : "";

//     // TOTAL ALLOWANCES
//     let totalAllowances = 0;

//     if (hrAmt !== null) totalAllowances += hrAmt;
//     if (trAmt !== null) totalAllowances += trAmt;
//     if (fdAmt !== null) totalAllowances += fdAmt;

//     document.getElementById("totalAllowances").value =
//         totalAllowances > 0 ? totalAllowances.toFixed(2) : "";

//     // FINAL SALARY
//     let finalSalary = basic + totalAllowances;

//     document.getElementById("totalSalary").value =
//         totalAllowances > 0 ? finalSalary.toFixed(2) : basic.toFixed(2);
// }

function recalculateSalarySlip() {
    let presentInput = document.getElementById("present").value;

if (presentInput === "") {

    document.getElementById("absent").value = "";
    document.getElementById("basic").value = "";

    document.getElementById("hr").disabled = true;
    document.getElementById("travel").disabled = true;
    document.getElementById("food").disabled = true;
    // CL reset
    // document.getElementById("clDays").value = "";
    // document.getElementById("totalPresentCL").value = "";
    // document.getElementById("totalAbsentCL").value = "";

    // Allowance % bhi clear karo
    document.getElementById("hr").value = "";
    document.getElementById("travel").value = "";
    document.getElementById("food").value = "";

    // Allowance amount clear
    document.getElementById("hrAmt").value = "";
    document.getElementById("travelAmt").value = "";
    document.getElementById("foodAmt").value = "";

    document.getElementById("totalAllowances").value = "";
    document.getElementById("totalSalary").value = "";

    return;
}


    let perDayInput = document.getElementById("perDay").value;

    // 🔴 Safety check again
    if (perDayInput === "" || Number(perDayInput) <= 0) return;

    let perDay = Number(perDayInput);
    let total = Number(document.getElementById("totalDays").value);
    // let presentInput = document.getElementById("present").value;

    if (!total || presentInput === "") return;

    let present = Number(presentInput);
    let cl = Number(document.getElementById("clDays").value) || 0;

    document.getElementById("absent").value = total - present;

    let totalPresentWithCL = present + cl;

    if (totalPresentWithCL > total) {
        document.getElementById("clDays").value = "";
        totalPresentWithCL = present;
    }

    if (cl > 0) {
        document.getElementById("totalPresentCL").value = totalPresentWithCL;
        document.getElementById("totalAbsentCL").value = total - totalPresentWithCL;
    } else {
        document.getElementById("totalPresentCL").value = "";
        document.getElementById("totalAbsentCL").value = "";
    }

    let basic = totalPresentWithCL * perDay;
    document.getElementById("basic").value = basic;

    let hrInput = document.getElementById("hr").value;
    let trInput = document.getElementById("travel").value;
    let fdInput = document.getElementById("food").value;

    let hrAmt = hrInput !== "" ? basic * Number(hrInput) / 100 : null;
    let trAmt = trInput !== "" ? basic * Number(trInput) / 100 : null;
    let fdAmt = fdInput !== "" ? basic * Number(fdInput) / 100 : null;

    document.getElementById("hrAmt").value = hrAmt !== null ? hrAmt.toFixed(2) : "";
    document.getElementById("travelAmt").value = trAmt !== null ? trAmt.toFixed(2) : "";
    document.getElementById("foodAmt").value = fdAmt !== null ? fdAmt.toFixed(2) : "";

    let totalAllowances = 0;

    if (hrAmt !== null) totalAllowances += hrAmt;
    if (trAmt !== null) totalAllowances += trAmt;
    if (fdAmt !== null) totalAllowances += fdAmt;

    document.getElementById("totalAllowances").value =
        totalAllowances > 0 ? totalAllowances.toFixed(2) : "";

    let finalSalary = basic + totalAllowances;

    document.getElementById("totalSalary").value =
        totalAllowances > 0 ? finalSalary.toFixed(2) : basic.toFixed(2);
}

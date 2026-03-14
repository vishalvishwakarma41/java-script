let detailsBox = document.getElementById("detailsBox");
let summaryBox = document.getElementById("summaryBox");

let cname = document.getElementById("cname");
let mobile = document.getElementById("mobile");
let plan = document.getElementById("plan");
let amount = document.getElementById("amount");

let payMethodBtn = document.getElementById("payMethodBtn");
let payBtn = document.getElementById("payBtn");

let payMode = document.getElementById("payMode");

let upiBox = document.getElementById("upiBox");
let cardBox = document.getElementById("cardBox");
let netBankBox = document.getElementById("netBankBox");
let bankDetails = document.getElementById("bankDetails");

let upiId = document.getElementById("upiId");
let bankSelect = document.getElementById("bankSelect");
let accName = document.getElementById("accName");
let accNo = document.getElementById("accNo");
let ifsc = document.getElementById("ifsc");

let nameErr = document.getElementById("nameErr");
let mobErr = document.getElementById("mobErr");
let upiErr = document.getElementById("upiErr");
let accErr = document.getElementById("accErr");
let ifscErr = document.getElementById("ifscErr");

let dMobile = document.getElementById("dMobile");
let dAmount = document.getElementById("dAmount");

let sName = document.getElementById("sName");
let sMobile = document.getElementById("sMobile");
let sPlan = document.getElementById("sPlan");
let sAmount = document.getElementById("sAmount");
let sValidity = document.getElementById("sValidity");
let sBenefits = document.getElementById("sBenefits");
let sRechargeDate = document.getElementById("sRechargeDate");
let sRechargeTime = document.getElementById("sRechargeTime");
let sExpiryDate = document.getElementById("sExpiryDate");
let sExpiryTime = document.getElementById("sExpiryTime");
let sPay = document.getElementById("sPay");
let sExtra = document.getElementById("sExtra");

let ifscValid = false;
let accValid = false;
let cardValid = false;
let cvvValid = false;
let expValid = false;


function checkPayButton() {

    if (payMode.value === "UPI") {
        payBtn.disabled = !upiValid;
    }

    else if (payMode.value === "NetBanking") {
        payBtn.disabled = !(accValid && ifscValid);
    }

    else if (payMode.value === "Card") {
        payBtn.disabled = !(cardValid && cvvValid && expValid);
    }

    else {
        payBtn.disabled = true;
    }
}


/* ===== RESET ALL ===== */
function resetAll() {
    // detailsBox.style.display = "none";
    // summaryBox.style.display = "none";
    $("#detailsBox").fadeOut(300);
    $("#summaryBox").fadeOut(300);

    cname.readOnly = false;
    mobile.readOnly = false;
    plan.disabled = false;
    payMode.value = "";
    upiBox.style.display = "none";
    cardBox.style.display = "none";

    upiId.value = "";
    upiErr.innerText = "";

    payBtn.disabled = true;
    payMethodBtn.disabled = true;
}

/* ===== NAME VALIDATION ===== */
function validateName() {
    detailsBox.classList.remove("show");
    summaryBox.style.display = "none";

    let name = cname.value;

    if (name == "") {
        nameErr.innerText = "Enter customer name";
        return false;
    }

    for (let i = 0; i < name.length; i++) {
        let c = name[i];
        if (!((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == ' ')) {
            nameErr.innerText = "Only letters allowed";
            return false;
        }
    }

    nameErr.innerText = "";
    checkTop();
    return true;
}


/* ===== MOBILE VALIDATION ===== */
function validateMobile() {
    resetAll();
    let m = mobile.value;

    if (m == "") {
        mobErr.innerText = "Enter mobile number";
        return false;
    }

    if (m.length != 10) {
        mobErr.innerText = "Enter 10 digit number";
        return false;
    }

    for (let i = 0; i < m.length; i++) {
        if (m[i] < '0' || m[i] > '9') {
            mobErr.innerText = "Only digits allowed";
            return false;
        }
    }

    mobErr.innerText = "";
    checkTop();
    return true;
}
function clearMobileError() {
    if (mobile.value.length === 10) return;

    mobErr.textContent = "";
    mobErr.className = "";
}



let activeField = "";

/* ===== NAME ===== */
function allowOnlyLetters(input) {
    if (activeField !== "name") return;

    let oldVal = input.value;
    let newVal = oldVal.replace(/[^a-zA-Z ]/g, '');

    input.value = newVal;

    if (oldVal !== newVal) {
        nameErr.innerText = "Only letters allowed";
    }
    else if (newVal === "") {
        nameErr.innerText = "Enter customer name";
    }
    else {
        nameErr.innerText = "";
    }
}

function clearNameError() {
    let name = cname.value.trim();

    if (name.length >= 3) return;

    nameErr.textContent = "";
    nameErr.className = "";
}


/* ===== MOBILE ===== */
function allowOnlyDigits(input) {

    if (activeField !== "mobile") return;

    let originalValue = input.value;

    input.value = input.value.replace(/[^0-9]/g, '');

    let len = input.value.length;

    mobErr.textContent = "";
    mobErr.className = "";

    if (originalValue !== input.value) {
        mobErr.textContent = "Only digits are allowed";
        mobErr.className = "err";
        return;
    }

    if (len === 0) {
        mobErr.textContent = "Enter mobile number";
        mobErr.className = "err";
    }
    else if (len < 10) {
        mobErr.textContent = "Enter 10 digit number";
        mobErr.className = "err";
    }
    else if (len === 10) {
        mobErr.textContent = "✓ Valid Mobile Number";
        mobErr.className = "valid";
    }

    if (len > 10) {
        input.value = input.value.slice(0, 10);
    }
}



/* ===== CHECK TOP FORM ===== */
function checkTop() {
    if (cname.value != "" && mobile.value.length == 10 && plan.value != "") {
        payMethodBtn.disabled = false;
        amount.value = "";
    } else {
        payMethodBtn.disabled = true;
        amount.value = "";
        detailsBox.style.display = "none";
        summaryBox.style.display = "none";


    }
}


/* ===== CALCULATE GST ===== */
function calculateAmount() {
    if (plan.value == "" || mobile.value.length != 10) {
        amount.value = "";
        dMobile.innerText = "";
        dAmount.innerText = "";
        return;
    }

    let planAmt = parseInt(plan.value);
    let gst = planAmt * 18 / 100;
    let total = (planAmt + gst);

    total = total.toFixed(2);

    amount.value = total;
    dMobile.innerText = mobile.value;
    dAmount.innerText = total;
}

/* PAYMENT METHOD BUTTON */
function openPaymentBox() {
    calculateAmount();

    // detailsBox.style.display = "block";
    $("#detailsBox").slideDown(400);

    cname.readOnly = true;
    mobile.readOnly = true;
    plan.disabled = true;
    payMethodBtn.disabled = true;
}



function paymentMode() {

    resetPaymentFields();

    // upiBox.classList.add("hidden");
    // cardBox.classList.add("hidden");
    // netBankBox.classList.add("hidden");
    $(".hidden").hide();

    bankDetails.classList.add("hidden");
    summaryBox.style.display = "none";

    payBtn.disabled = true;

    if (payMode.value === "") return;


    if (payMode.value === "UPI") {
        // upiBox.classList.remove("hidden");
        $("#upiBox").slideDown();
        checkPayButton();
        return;
    }


    if (payMode.value === "Cash") {
        payBtn.disabled = false;
        return;
    }


    if (payMode.value === "Card") {
        // cardBox.classList.remove("hidden");
        $("#cardBox").slideDown();
        checkPayButton();
        return;
    }


    if (payMode.value === "NetBanking") {
        // netBankBox.classList.remove("hidden");
        $("#netBankBox").slideDown();

        checkPayButton();
        return;
    }
}

function bankChange() {

    if (bankSelect.value == "") {
        // bankDetails.style.display = "none";
        $("#bankDetails").slideUp();

        accName.value = "";
        accNo.value = "";
        ifsc.value = "";
        payBtn.disabled = true;
    }
    else {
        // bankDetails.style.display = "block";
        $("#bankDetails").slideDown();

        payBtn.disabled = false;
    }
}



function validateUPI() {

    let u = upiId.value.trim();
    let pattern = /^[a-zA-Z]{4,}@[a-zA-Z]{3,}$/;

    if (!pattern.test(u)) {
        upiErr.innerText = "✗ UPI must start with 4 letters example: abcd@ybl";
        upiErr.className = "err";
        upiValid = false;
        checkPayButton();
        return;
    }

    // let domain = u.split("@")[1];

    // if (domain.length < 3) {
    //     upiErr.innerText = "✗ @ ke baad minimum 3 letters";
    //     upiErr.className = "err";
    //     upiValid = false;
    //     checkPayButton();
    //     return;
    // }

    upiErr.innerText = "✓ Valid UPI ID";
    upiErr.className = "valid";
    upiValid = true;
    checkPayButton();
}

function validateAccName(input) {

    let value = input.value;
    let error = document.getElementById("acNameErr");
    let validValue = "";
    let hasNumber = false;

    for (let ch of value) {
        if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z') || ch === " ") {
            validValue += ch;
        } else if (ch >= '0' && ch <= '9') {
            hasNumber = true;
        }
    }

    input.value = validValue;

    if (hasNumber) {
        error.innerText = "Name only, no number allowed";
    } else {
        error.innerText = "";
    }
}

function validateAccountNumber() {

    let acc = accNo.value.replace(/[^0-9]/g, '');
    if (acc.length > 16) {
        acc = acc.slice(0, 16);
    }

    accNo.value = acc;

    if (acc === "") {
        accErr.innerText = "✗ Account number required";
        accErr.className = "err";
        accValid = false;
        checkPayButton();
        return;
    }

    if (acc.length < 13 || acc.length > 16) {
        accErr.innerText = "✗ Account number must be 13–16 digits";
        accErr.className = "err";
        accValid = false;
        checkPayButton();
        return;
    }

    accErr.innerText = "✓ Valid account number";
    accErr.className = "valid";
    accValid = true;
    checkPayButton();
}





function validateIFSC() {

    ifsc.value = ifsc.value.toUpperCase();

    if (ifsc.value.length > 11) {
        ifsc.value = ifsc.value.slice(0, 11);
    }
    let code = ifsc.value;

    if (code === "") {
        ifscErr.innerText = "✗ Please fill IFSC code";
        ifscErr.className = "err";
        ifscValid = false;
        checkPayButton();
        return false;
    }

    if (code.length !== 11) {
        ifscErr.innerText = "✗ IFSC must be exactly 11 characters";
        ifscErr.className = "err";
        ifscValid = false;
        checkPayButton();
        return false;
    }

    if (!/^[A-Z]{4}0[0-9]{6}$/.test(code)) {
        ifscErr.innerText = "✗ Invalid IFSC format";
        ifscErr.className = "err";
        ifscValid = false;
        checkPayButton();
        return false;
    }

    let bank = bankSelect.value;

    let bankCodes = {
        SBI: "SBIN",
        HDFC: "HDFC",
        ICICI: "ICIC",
        PNB: "PUNB"
    };

    if (bank !== "" && code.substring(0, 4) !== bankCodes[bank]) {
        ifscErr.innerText = "✗ " + bank + " IFSC must start with " + bankCodes[bank];

        ifscErr.className = "err";
        ifscValid = false;
        checkPayButton();
        return false;
    }

    // valid
    ifscErr.innerText = "✓ Valid IFSC Code";
    ifscErr.className = "valid";
    ifscValid = true;
    checkPayButton();
    return true;
}



function validateCardNo(input) {

    let err = document.getElementById("cardNoErr");

    // remove non digits
    input.value = input.value.replace(/[^0-9]/g, '');

    if (input.value.length < 16) {
        err.innerText = "Card number must be 16 digits";
        err.className = "err";
        cardValid = false;
        checkPayButton();
        return;
    }

    if (input.value.length > 16) {
        input.value = input.value.slice(0, 16);
    }

    err.innerText = "✓ Valid Card Number";
    err.className = "valid";
    cardValid = true;
    checkPayButton();
}


/* ===========CVV VALIDATION============ */
function validateCVV(input) {

    let err = document.getElementById("cvvErr");

    input.value = input.value.replace(/[^0-9]/g, '');

    if (input.value.length > 3) {
        input.value = input.value.slice(0, 3);
    }

    if (input.value.length < 3) {
        err.innerText = "✗ CVV must be 3 digits";
        err.className = "err";
        cvvValid = false;
        checkPayButton();
        return;
    }

    err.innerText = "✓ Valid CVV";
    err.className = "valid";
    cvvValid = true;
    checkPayButton();
}

function validateExpiry() {

    let exp = document.getElementById("expMonth").value;
    let err = document.getElementById("expErr");

    if (exp === "") {
        err.innerText = "✗ Please select expiry month & year";
        err.className = "err";
        expValid = false;
        checkPayButton();
        return;
    }

    err.innerText = "✓ Valid Expiry Date";
    err.className = "valid";
    expValid = true;
    checkPayButton();
}


function maskNumber(number) {
    let len = number.length;
    if (len <= 4) return number;

    let masked = "";
    for (let i = 0; i < len - 4; i++) {
        masked += "X";
    }
    return masked + number.slice(len - 4);
}



function showSummary() {

    let payErr = document.getElementById("payErr");
    payErr.innerText = "";
    payErr.className = "err";

   
    if (payMode.value === "") {
        payErr.innerText = "✗ Please select payment mode";
        return;
    }

    if (payMode.value === "UPI") {

        if (!upiValid) {
            payErr.innerText = "✗ Please enter valid UPI ID";
            return;
        }
    }

    if (payMode.value === "NetBanking") {

        if (bankSelect.value === "") {
            payErr.innerText = "✗ Please select bank";
            return;
        }

        if (!accValid) {
            payErr.innerText = "✗ Please fill valid account number";
            return;
        }

        if (!ifscValid) {
            payErr.innerText = "✗ Please fill valid IFSC code";
            return;
        }
    }

    /* ===============CARD CHECK=============== */
    if (payMode.value === "Card") {

        payErr.innerText = "";
        document.getElementById("cvvErr").innerText = "";
        document.getElementById("expErr").innerText = "";

        if (!cardValid) {
            payErr.innerText = "✗ Please fill valid card number";
            return;
        }

        if (!cvvValid) {
            document.getElementById("cvvErr").innerText = "✗ Please fill valid CVV";
            document.getElementById("cvvErr").className = "err";
            return;
        }

        if (!expValid) {
            document.getElementById("expErr").innerText =
                "✗ Please select expiry month & year";
            document.getElementById("expErr").className = "err";
            return;
        }
    }


    /* ==============ALL VALID  PAYMENT================ */


    $("<div>Recharge Successful</div>")
        .appendTo("body")
        .css({
            background: "#28a745",
            color: "#fff",
            padding: "15px",
            position: "fixed",
            top: "20px",
            right: "20px"
        })
        .fadeIn()
        .delay(2000)
        .fadeOut();

    setTimeout(function () {
        fillSummary();
        disableAllInputs();
        // summaryBox.style.display = "block";
        $("#summaryBox").fadeIn(500);

        $('html, body').animate({
            scrollTop: $("#summaryBox").offset().top
        }, 600);

    }, 2000);


    const plans = {
        "199": {
            data: "1GB Data / Day",
            calls: "Unlimited Calls",
            sms: "100 SMS / Day",
            days: 14
        },
        "299": {
            data: "1.5GB Data / Day",
            calls: "Unlimited Calls",
            sms: "100 SMS / Day",
            days: 28
        },
        "399": {
            data: "2GB Data / Day",
            calls: "Unlimited Calls",
            sms: "100 SMS / Day",
            days: 56
        },
        "599": {
            data: "2.5GB Data / Day",
            calls: "Unlimited Calls",
            sms: "100 SMS / Day",
            days: 84
        }
    };
    function fillSummary() {

        let now = new Date();

        sName.innerText = cname.value;
        sMobile.innerText = mobile.value;
        sPlan.innerText = plan.options[plan.selectedIndex].text;
        sAmount.innerText = amount.value;

        // Plan Data Fetch
        let selectedPlan = plans[plan.value];

        if (selectedPlan) {

            sBenefits.innerHTML =
                selectedPlan.data + "<br>" +
                selectedPlan.calls + "<br>" +
                selectedPlan.sms + "<br>" +
                selectedPlan.days + " Days Validity";

            sValidity.innerText = selectedPlan.days + " Days";

            let exp = new Date();
            exp.setDate(now.getDate() + selectedPlan.days);

            sExpiryDate.innerText = exp.toLocaleDateString("en-IN");
            sExpiryTime.innerText = exp.toLocaleTimeString("en-IN");
        }

        // Recharge Date/Time
        sRechargeDate.innerText = now.toLocaleDateString("en-IN");
        sRechargeTime.innerText = now.toLocaleTimeString("en-IN");

        sPay.innerText = payMode.value;

        if (payMode.value === "UPI") {
            sExtra.innerText = "UPI ID : " + upiId.value;
        }

        else if (payMode.value === "NetBanking") {
            sExtra.innerHTML =
                "Bank: " + bankSelect.value + "<br>" +
                "A/C Holder: " + accName.value + "<br>" +
                "A/C No: " + maskNumber(accNo.value) + "<br>" +
                "IFSC: " + ifsc.value;
        }

        else if (payMode.value === "Card") {
            let cardNo = document.getElementById("cardNo");

            sExtra.innerHTML =
                "Card Type: Debit / Credit<br>" +
                "Card No: " + maskNumber(cardNo.value) + "<br>" +
                "CVV: XXX";
        }
    }
}



function disableAllInputs() {

    cname.readOnly = true;
    mobile.readOnly = true;
    plan.disabled = true;
    payMode.disabled = true;
    payMethodBtn.disabled = true;


    upiId.readOnly = true;

    bankSelect.disabled = true;
    accName.readOnly = true;
    accNo.readOnly = true;
    ifsc.readOnly = true;

    // Card
    let cardNo = document.getElementById("cardNo");
    let cvv = document.getElementById("cvv");
    let exp = document.getElementById("expMonth");

    if (cardNo) cardNo.readOnly = true;
    if (cvv) cvv.readOnly = true;
    if (exp) exp.disabled = true;

    $("#payBtn").prop("disabled", true);

}


//fun reset all
function resetPaymentFields() {


    upiId.value = "";
    upiErr.innerText = "";
    upiErr.className = "";
    upiValid = false;

    // ===== NET BANKING RESET =====
    bankSelect.value = "";
    accName.value = "";
    accNo.value = "";
    ifsc.value = "";

    accErr.innerText = "";
    ifscErr.innerText = "";

    accValid = false;
    ifscValid = false;

    bankDetails.style.display = "none";

    // ===== CARD RESET =====
    let cardNo = document.getElementById("cardNo");
    let cvv = document.getElementById("cvv");
    let exp = document.getElementById("expMonth");

    if (cardNo) cardNo.value = "";
    if (cvv) cvv.value = "";
    if (exp) exp.value = "";

    document.getElementById("cardNoErr").innerText = "";
    document.getElementById("cvvErr").innerText = "";
    document.getElementById("expErr").innerText = "";

    cardValid = false;
    cvvValid = false;
    expValid = false;

    // Disable Pay button
    // payBtn.disabled = true;
    $("#payBtn").prop("disabled", false);

}

function printReceipt() {
    window.print();
}

$("#mobile, #cname, #upiId, #accNo").on("input", function () {

    if ($(this).val() !== "") {
        $(this).css("border", "2px solid #28a745");
    } else {
        $(this).css("border", "2px solid red");
    }

});


let discountApplied = false;
let discountPercent = 0;
let discountedFees = 0;
let originalFees = 0;


function validateName(input) {
    input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
}

/* =====================
   COURSE SELECT
===================== */
// function courseSelected() {
//     let course = document.getElementById("course").value;

//     if (course === "") {
//         resetAll();
//         document.getElementById("fees").disabled = true;
//     } else {
//         resetAll();
//         document.getElementById("fees").disabled = false;
//     }
// }
function enableCourseIfValid() {

    let name = document.getElementById("name").value.trim();
    let date = document.getElementById("date").value;

    if (name !== "" && date !== "") {
        document.getElementById("course").disabled = false;
    } else {
        document.getElementById("course").disabled = true;
    }
}


// function courseSelected() {

//     let name = document.getElementById("name").value.trim();
//     let date = document.getElementById("date").value;
//     let course = document.getElementById("course").value;

//     // Validation check
//     if (name === "") {
//         alert("Please fill Name first");
//         document.getElementById("course").value = "";
//         return;
//     }

//     if (date === "") {
//         alert("Please select Date first");
//         document.getElementById("course").value = "";
//         return;
//     }

//     // If both filled
//     if (course === "") {
//         resetAll();
//         document.getElementById("fees").disabled = true;
//     } else {
//         resetAll();
//         document.getElementById("fees").disabled = false;
//     }
// }


function courseSelected() {

    let name = document.getElementById("name").value.trim();
    let date = document.getElementById("date").value;
    let courseError = document.getElementById("courseError");

    courseError.innerText = "";

    if (name === "") {
    courseError.innerText = "Please fill name first";
    $("#course").addClass("input-error");   // ADD
    document.getElementById("course").value = "";
    return;
}


    if (date === "") {
        courseError.innerText = "Please select date first";
        document.getElementById("course").value = "";
        return;
    }

    let course = document.getElementById("course").value;

    if (course === "") {
        resetAll();
        document.getElementById("fees").disabled = true;
    } else {
        $("#course").removeClass("input-error");   // REMOVE ERROR BORDER

        resetAll();
        document.getElementById("fees").disabled = false;
    }
}

// NEW ADD
$("#name, #date").on("input change", function () {

    let name = $("#name").val().trim();
    let date = $("#date").val();

    if (name === "" || date === "") {

        resetAll();

        $("#course").val("").prop("disabled", true);
        $("#gst").prop("disabled", true);
        $("#discountBtn").hide();
    }
});



/* =====================
   RESET
===================== */
// function resetAll() {
//     document.getElementById("fees").value = "";
//     document.getElementById("fees").disabled = true; 

//     document.getElementById("gst").value = "";
//     document.getElementById("gst").disabled = true;

//     document.getElementById("gstAmount").value = "";
//     document.getElementById("cgst").value = "";
//     document.getElementById("sgst").value = "";
//     document.getElementById("total").value = "";

//     // document.getElementById("discountBox").style.display = "none";
//     $("#discountBox").hide();
//     document.getElementById("discountBtn").disabled = true;
//     document.getElementById("printBtn").disabled = true;

//     discountApplied = false;
//     discountPercent = 0;
//     discountedFees = 0;
// }


function resetAll() {

    document.getElementById("fees").value = "";
    document.getElementById("fees").disabled = true; 

    document.getElementById("gst").value = "";
    document.getElementById("gst").disabled = true;

    document.getElementById("gstAmount").value = "";
    document.getElementById("cgst").value = "";
    document.getElementById("sgst").value = "";
    document.getElementById("total").value = "";

    $("#discountBox").hide();

    $("#discountBtn")
        .hide()                 
        .prop("disabled", true); 

    $("#printBtn").prop("disabled", true);

    discountApplied = false;
    discountPercent = 0;
    discountedFees = 0;
}

function allowOnlyNumbers(input) {

    input.value = input.value.replace(/[^0-9]/g, "");

}
function getFeesValue() {
    let raw = document.getElementById("fees").value;
    return raw === "" ? 0 : Number(raw);
}
function feesEntered() {

    let feesInput = document.getElementById("fees");
    let raw = feesInput.value.replace(/,/g, "");

    if (raw === "") {
        $("#discountBtn").hide().prop("disabled", true);
        return;
    }

    let fees = Number(raw);

    if (fees > 1000000) {
        feesInput.value = "";
        $("#feesErr").text("Maximum fees allowed is ₹10,00,000");
        $("#discountBtn").hide().prop("disabled", true);
        return;
    }

    if (fees < 500) {
        $("#feesErr")
            .hide()
            .text("Minimum fees should be ₹500")
            .fadeIn(200);

        $("#discountBtn").hide().prop("disabled", true);
        return;
    }

    $("#feesErr").fadeOut(200);

    feesInput.value = fees.toLocaleString("en-IN");

    $("#discountBtn")
        .fadeIn(200)
        .prop("disabled", false);
}

// function feesEntered() {
//     // $("#discountBtn").hide();   // ADD THIS
// // $("#discountBtn").fadeIn(200);


//     let feesInput = document.getElementById("fees");
//     let err = document.getElementById("feesErr");
//     let discountBtn = document.getElementById("discountBtn");

//     let raw = feesInput.value;

//     // If empty
//     if (raw === "") {
//         err.innerText = "";
//         // discountBtn.disabled = true;
//          $("#discountBtn").hide();
//         return;
//     }

//     let fees = Number(raw);

//     // Max 10 lakh
//     if (fees > 1000000) {
//         feesInput.value = "";
//         err.innerText = "Maximum fees allowed is ₹10,00,000";
//         // discountBtn.disabled = true;
//          $("#discountBtn").hide();
//         return;
//     }

//     // Min 500
//     if (fees < 500) {
//         // err.innerText = "Minimum fees should be ₹500";
//                 $("#feesErr")
//                 .hide()
//                 .text("Minimum fees should be ₹500")
//                 .fadeIn(200);
//                 $("#discountBtn").hide();
//         // discountBtn.disabled = true;
//         return;
//     }
// $("#feesErr").fadeOut(200);

//     // Valid case
// err.innerText = "";
// $("#feesErr").fadeOut(200);   // ADD THIS
// // $("#discountBtn").prop("disabled", false);
// $("#discountBtn").fadeIn(200);

//     // Apply Indian comma format
//     feesInput.value = fees.toLocaleString("en-IN");
    
// }

/* =====================
   FEES INPUT
===================== */
// function feesEntered() {

//     let feesInput = document.getElementById("fees");
//     let err = document.getElementById("feesErr");
//     let discountBtn = document.getElementById("discountBtn");

//     // let rawValue = feesInput.value.replace(/[^0-9]/g, "");
//     // rawValue = Number(rawValue.replace(/[^0-9]/g, "") );
//     let raw = feesInput.value;


//     // let raw = document.getElementById("fees").value;

//     // if (!/^\d+$/.test(raw.replace(/,/g,""))) {
//     //     return; // invalid input, stop calculation
//     // }

//     if (rawValue === "") {
//         feesInput.value = "";
//         err.innerText = "";
//         discountBtn.disabled = true;
//         return;
//     }

//     let fees = Number(rawValue);

//     if (fees >= 1000000) {

//         feesInput.value = "0";
//         err.innerText = "Maximum fees allowed is ₹10,00,000";
//         discountBtn.disabled = true;
//         return;
//     }

//     if (fees < 500) {
//         err.innerText = "Minimum fees should be ₹500";
//         discountBtn.disabled = true;
//     }

//     // Valid
//     else {
//         err.innerText = "";
//         discountBtn.disabled = false;
//     }

//     // Format properly
//     feesInput.value = Number(feesInput.value.replace(/,/g, "")).toLocaleString("en-IN");
// }

/* =====================
   DISCOUNT 
===================== */
// function applyDiscount() {
//     if (discountApplied) {
//         // alert("Discount already applied");
//         return;
//     }
//     let feesInput = document.getElementById("fees");
//     let fees = Number(document.getElementById("fees").value) ;
//     if (fees <= 0) {
//         alert("Enter fees first");
//         return;
//     }

//     originalFees = fees;

//     let arr = [4.5, 5.7, 6.3, 7.5, 8.5, 9.2,3.7];
//     discountPercent = arr[Math.floor(Math.random() * arr.length)];

//     let discountAmt = (fees * discountPercent) / 100;
//     discountedFees = fees - discountAmt;

//     feesInput.value = discountedFees.toFixed(2); 

//     document.getElementById("fees").disabled = true;

//     discountApplied = true;

//     document.getElementById("discountBox").style.display = "block";
//     document.getElementById("discountBox").innerHTML =
//         "Original Fees : " + fees +
//         "<br>Discount % : " + discountPercent +
//         "<br>Fees After Discount : " + discountedFees.toFixed(2);

//     document.getElementById("gst").disabled = false;

// }

function applyDiscount() {

    if (discountApplied) return;

    let feesInput = document.getElementById("fees");

    //  REMOVE COMMAS FIRST
    let rawValue = feesInput.value.replace(/,/g, "");

    let fees = Number(rawValue) || 0;

    if (fees <= 0) {
        // alert("Enter valid fees first");
        return;
    }

    originalFees = fees;

    let arr = [4.5, 5.7, 6.3, 7.5, 8.5, 9.2, 3.7];
    discountPercent = arr[Math.floor(Math.random() * arr.length)];

    let discountAmt = (fees * discountPercent) / 100;
    discountedFees = fees - discountAmt;

    //  Format output properly
    feesInput.value = discountedFees.toLocaleString("en-IN");

    document.getElementById("fees").disabled = true;

    discountApplied = true;
    $("#discountBtn").fadeOut(200);
    // document.getElementById("discountBox").style.display = "block";
    $("#discountBox").slideDown(300);

    document.getElementById("discountBox").innerHTML =
        "Original Fees : ₹" + originalFees.toLocaleString("en-IN") +
        "<br>Discount % : " + discountPercent +
        "<br>Fees After Discount : ₹" + discountedFees.toLocaleString("en-IN");

    document.getElementById("gst").disabled = false;
}

/* =====================
   GST
===================== */
function calculateGST() {

    document.getElementById("gstAmount").value = "";
    document.getElementById("cgst").value = "";
    document.getElementById("sgst").value = "";
    document.getElementById("total").value = "";
    // document.getElementById("printBtn").disabled = true;
    $("#printBtn").prop("disabled", true);

    let gst = Number(document.getElementById("gst").value);

    if (!discountApplied || gst <= 0)
    {
         return;
    }

    let gstAmount = (discountedFees * gst) / 100;
    let half = gstAmount / 2;
    let finalPay = discountedFees + gstAmount;

    document.getElementById("gstAmount").value = gstAmount.toFixed(2);
    document.getElementById("cgst").value = half.toFixed(2);
    document.getElementById("sgst").value = half.toFixed(2);
    // document.getElementById("total").value = finalPay.toFixed(2);
    document.getElementById("total").value = finalPay.toFixed(2);

    $('html, body').animate({
        scrollTop: $("#total").offset().top - 100
    }, 500);

    checkPrintEnable();

    // document.getElementById("discountBox").innerHTML +=
        // "<br>GST Amount : " + gstAmount.toFixed(2) +
        // "<br>Pay Fees : " + finalPay.toFixed(2);

        checkPrintEnable();
    }


function checkPrintEnable() {

    let course = document.getElementById("course").value;
    let fees = document.getElementById("fees").value;
    let gst = document.getElementById("gst").value;
    let total = document.getElementById("total").value;

    if (
        course !== "" &&
        fees !== "" &&
        discountApplied === true &&
        gst !== "" &&
        total !== ""
    ) {
        // document.getElementById("printBtn").disabled = false;
        $("#printBtn").prop("disabled", false);

    } else {
        // document.getElementById("printBtn").disabled = true;
        $("#printBtn").prop("disabled", true);

    }
}



function validateStep1() {

    let name = document.getElementById("name").value.trim();
    let date = document.getElementById("date").value;

    let nameError = document.getElementById("nameError");
    let dateError = document.getElementById("dateError");
    let course = document.getElementById("course");

    nameError.innerText = "";
    dateError.innerText = "";

    let valid = true;

    if (name === "") {
        nameError.innerText = "Please fill name";
        valid = false;
    }

    if (date === "") {
        dateError.innerText = "Please select date";
        valid = false;
    }

    if (valid) {
        course.disabled = false;
    } else {
        course.disabled = true;
        course.value = "";
    }
}


$(window).on("beforeprint", function () {
    let course = $("#course option:selected").text();
    $("#coursePrint").text(course);
});


$("#fees").on("input", function () {

    if ($(this).val() !== "") {
        $(this).css("border", "2px solid #2e7d32");
    } else {
        $(this).css("border", "2px solid #555");
    }

});




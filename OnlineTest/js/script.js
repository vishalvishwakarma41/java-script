$(document).ready(function () {

    // ========== SET INITIAL TEXT ==========
    document.getElementById('squareText').innerText = 'No Image';
    document.getElementById('circleText').innerText = 'Welcome';

    document.getElementById('nameHint').innerText = 'Please fill name';
    document.getElementById('emailHint').innerText = 'Please fill email';
    document.getElementById('passHint').innerText = 'Please fill password';
    document.getElementById('dateHint').innerText = 'Please select DOB';
    document.getElementById('genderHint').innerText = 'Please select gender';
    document.getElementById('imageHint').innerText = 'Please select image';

    document.getElementById('nameError').innerText = 'Only letters allowed';
    document.getElementById('emailError').innerText = 'Enter valid email';
    document.getElementById('passError').innerText = 'Password must be strong';
    document.getElementById('dateError').innerText = 'Select Date of Birth';
    document.getElementById('genderError').innerText = 'Select Gender';
    document.getElementById('imageError').innerText = 'Select Image';

    // Simple validation
    const nameRegex = /^[A-Za-z ]+$/;
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    // ========== NAME FIELD ==========
    $("#name").on("focus", function () {
        if ($(this).val().trim() === "") {

            $("#nameHint").fadeIn(200);
        }
    });

    $("#name").on("input", function () {
        $("#nameHint").fadeOut(200);
        this.value = this.value.replace(/[0-9]/g, '');
        if (!nameRegex.test(this.value) || this.value.trim() === "") {
            $(this).addClass("fail").removeClass("success");
            $("#nameError").fadeIn(200);
        }
        else {
            $(this).addClass("success").removeClass("fail");
            $("#nameError").fadeOut(200);
        }
    });

    $("#name").on("blur", function () {
        $("#nameHint").fadeOut(200);
    });


   
    
    // ========== EMAIL FIELD ==========

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
$("#email").on("focus", function () {
    if ($(this).val().trim() === "") {
        $("#emailHint").fadeIn(200);
    }
});

$("#email").on("input", function () {

    let value = $(this).val();

    $("#emailHint").fadeOut(200);

    if ((value.match(/@/g) || []).length > 1) {
        value = value.slice(0, value.lastIndexOf("@"));
    }

    if ((value.match(/\./g) || []).length > 1) {
        value = value.slice(0, value.lastIndexOf("."));
    }

    $(this).val(value);

    if (!emailRegex.test(value)) {
        $(this).addClass("fail").removeClass("success");
        $("#emailError").fadeIn(200);
    } 
    else {
        $(this).addClass("success").removeClass("fail");
        $("#emailError").fadeOut(200);
    }

});

$("#email").on("blur", function () {
    $("#emailHint").fadeOut(200);
});
    $("#password").on("focus", function () {
        if ($(this).val().trim() === "") {
            $("#passHint").fadeIn(200);
        }
    });

    $("#password").on("input", function () {
        $("#passHint").fadeOut(200);
        let val = this.value;

        if (val.length < 6) {
            $("#strength").text("Weak").css("color", "red");
        } else if (strongRegex.test(val)) {
            $("#strength").text("Strong").css("color", "green");
        } else {
            $("#strength").text("Medium").css("color", "orange");
        }

        if (!strongRegex.test(val) && val.length > 0) {
            $(this).addClass("fail").removeClass("success");
            $("#passError").fadeIn(200);
        } else if (val.length > 0) {
            $(this).addClass("success").removeClass("fail");
            $("#passError").fadeOut(200);
        }
    });

    $("#password").on("blur", function () {
        $("#passHint").fadeOut(200);
    });

    // ========== DATE FIELD ==========
    $("#date").on("focus", function () {
        if ($(this).val() === "") {
            $("#dateHint").fadeIn(200);
        }
    });

    $("#date").on("change", function () {
        $("#dateHint").fadeOut(200);
        if (this.value === "") {
            $(this).addClass("fail");
            $("#dateError").fadeIn(200);
        } else {
            $(this).addClass("success").removeClass("fail");
            $("#dateError").fadeOut(200);
        }
    });

    $("#date").on("blur", function () {
        $("#dateHint").fadeOut(200);
    });

    // ========== GENDER FIELD ==========
    $("input[name='gender']").on("focus", function () {
        if (!$("input[name='gender']:checked").val()) {
            $("#genderHint").fadeIn(200);
        }
    });

    $("input[name='gender']").on("change", function () {
        $("#genderHint").fadeOut(200);
        $("#genderError").fadeOut(200);
    });

    // ========== IMAGE FIELD ==========
    $("#image").on("focus", function () {
        if ($("#image")[0].files.length === 0) {
            $("#imageHint").fadeIn(200);
        }
    });

    $("#image").on("change", function () {
        $("#imageHint").fadeOut(200);
        let file = this.files[0];

        if (!file) {
            $(this).addClass("fail");
            $("#imageError").fadeIn(200);
            return;
        }

        if (!file.type.startsWith('image/')) {
            $("#imageError").text("Please select image file").fadeIn(200);
            $(this).addClass("fail");
            return;
        }

        $(this).addClass("success").removeClass("fail");
        $("#imageError").fadeOut(200);

        let reader = new FileReader();
        reader.onload = function (e) {
            $("#preview").attr("src", e.target.result).fadeIn(200);
            $("#squareText").fadeOut(200);
        };
        reader.readAsDataURL(file);
    });

    $("#image").on("blur", function () {
        $("#imageHint").fadeOut(200);
    });

    // ========== TOGGLE PASSWORD ==========
    $("#togglePassword").click(function () {
        let input = $("#password");
        if (input.attr("type") === "password") {
            input.attr("type", "text");
            $(this).find("i").removeClass("bi-eye").addClass("bi-eye-slash");
        } else {
            input.attr("type", "password");
            $(this).find("i").removeClass("bi-eye-slash").addClass("bi-eye");
        }
    });

});

// ========== REGISTER FUNCTION ==========
function register() {
    let gender = $("input[name='gender']:checked").val();

    if ($("#name").val().trim() === "" || !/^[A-Za-z ]+$/.test($("#name").val())) {
        $("#name").addClass("fail");
        $("#nameError").fadeIn(200);
        return;
    }

    if ($("#email").val().trim() === "" || !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test($("#email").val())) {
        $("#email").addClass("fail");
        $("#emailError").fadeIn(200);
        return;
    }

    if ($("#password").val().trim() === "" || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test($("#password").val())) {
        $("#password").addClass("fail");
        $("#passError").fadeIn(200);
        return;
    }

    if ($("#date").val() === "") {
        $("#date").addClass("fail");
        $("#dateError").fadeIn(200);
        return;
    }

    if (!gender) {
        $("#genderError").fadeIn(200);
        return;
    }

    if ($("#image")[0].files.length === 0) {
        $("#image").addClass("fail");
        $("#imageError").fadeIn(200);
        return;
    }

    $("#registerSection").fadeOut(300, function () {
        $(this).addClass("d-none");
        $("#rulesSection").removeClass("d-none").hide().fadeIn(300);
        $("#welcome").text("Welcome, " + $("#name").val());

        let userImage = $("#preview").attr("src");
        if (userImage) {
            $("#ruleImage").attr("src", userImage).fadeIn(200);
            $("#circleText").fadeOut(200);
        }
    });
}

const questions = [
    {
        q: "Which number is a prime number?",
        o: ["9", "15", "17", "21"],
        a: 2
    },

    {
        q: "What is the square root of 144?",
        o: ["10", "11", "12", "13"],
        a: 2

    },

    {
        q: "Which planet is known as Red Planet?",
        o: ["Earth", "Mars", "Venus", "Jupiter"],
        a: 1
    },
    {
        q: "Binary of decimal 5 is?",
        o: ["101", "110", "111", "100"],
        a: 0
    },
    {
        q: "Which is an even number?",
        o: ["13", "17", "19", "24"],
        a: 3
    },
    {
        q: "Which language runs in browser?",
        o: ["Python", "Java", "JavaScript", "C"],
        a: 2
    },
    {
        q: "What comes next: 2,4,8,16, ?",
        o: ["18", "20", "24", "32"],
        a: 3
    },
    {
        q: "Which is smallest? 0.5, 0.05, 0.005, 0.0005",
        o: ["0.5", "0.05", "0.005", "0.0005"],
        a: 3
    },
    {
        q: "Which device is input device?",
        o: ["Monitor", "Printer", "Keyboard", "Speaker"],
        a: 2
    },
    {
        q: "HTML is used for?",
        o: ["Styling", "Structure", "Database", "Server"],
        a: 1
    },
    {
        q: "Which is odd number?",
        o: ["22", "34", "45", "60"],
        a: 2
    },
    {
        q: "Which gas do plants use?",
        o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        a: 2
    },
    {
        q: "1 byte = ?",
        o: ["4 bits", "8 bits", "16 bits", "32 bits"],
        a: 1
    },
    {
        q: "Which is not a programming language?",
        o: ["Java", "HTML", "Python", "C++"],
        a: 1
    },
    {
        q: "What is 2^3 ?",
        o: ["6", "8", "9", "12"],
        a: 1
    },
    {
        q: "Which country has Taj Mahal?",
        o: ["Nepal", "India", "China", "USA"],
        a: 1
    },
    {
        q: "Which number divisible by 5?",
        o: ["42", "55", "63", "77"],
        a: 1
    },
    {
        q: "Which is largest ocean?",
        o: ["Indian", "Pacific", "Atlantic", "Arctic"],
        a: 1
    },
    {
        q: "Which is not a web browser?",
        o: ["Chrome", "Firefox", "Edge", "Oracle"],
        a: 3
    },
    {
        q: "What is capital of India?",
        o: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        a: 1
    }
];

let timeLeft = 600; 
let timer;
function startTimer() {

    timer = setInterval(function () {

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        if (seconds < 10) seconds = "0" + seconds;

        $("#timer").text(minutes + ":" + seconds);

        timeLeft--;

        if (timeLeft < 0) {

            clearInterval(timer);
            showResult();

        }

    }, 1000);

}




let index = 0;
let score = 0;
let selected = null;

function startTest() {
    $("#rulesSection").fadeOut(300, function () {
        $(this).addClass("d-none");
        $("#quizSection").removeClass("d-none").hide().fadeIn(300);
        showQuestion();
        startTimer();
    });
}

function showResult() {

    $("#quizSection").fadeOut(300, function () {

        $(this).addClass("d-none");
        $("#resultSection").removeClass("d-none").hide().fadeIn(300);

        $("#score").text(score + "/20");
        $("#correctCount").text("Correct: " + score);

    });

}

function showQuestion() {
    let q = questions[index];
    $("#qNo").text(index + 1);
    $("#question").text(q.q);
    $("#options").html("");
    selected = null;

    $.each(q.o, function (i, opt) {
        let btn = $('<button class="btn btn-outline-primary w-100 option-btn">' + opt + '</button>');
        btn.click(function () {
            $(".option-btn").removeClass("btn-primary").addClass("btn-outline-primary");
            $(this).removeClass("btn-outline-primary").addClass("btn-primary");
            selected = i;
        });
        $("#options").append(btn);
    });

    if (index === 19) {
        $("#nextBtn").text("Submit");
    } else {
        $("#nextBtn").text("Next");
    }
}

function nextQuestion() {
    if (selected !== null && selected === questions[index].a) {
        score++;
    }

    if (index < 19) {
        index++;
        showQuestion();
    } else {
        // $("#quizSection").fadeOut(300, function () {
        //     $(this).addClass("d-none");
        //     $("#resultSection").removeClass("d-none").hide().fadeIn(300);
        //     $("#score").text(score + "/20");
        //     $("#correctCount").text("Correct: " + score);
        // });
        showResult();
    }
}

// function restart() {
//     index = 0;
//     score = 0;
//     selected = null;

//     $("#resultSection").fadeOut(300, function () {
//         $(this).addClass("d-none");
//         $("#registerSection").removeClass("d-none").hide().fadeIn(300);

//         $("#name").val('').removeClass("success fail");
//         $("#email").val('').removeClass("success fail");
//         $("#password").val('').removeClass("success fail");
//         $("#date").val('').removeClass("success fail");
//         $("input[name='gender']").prop('checked', false);
//         $("#image").val('');

//         $("#preview").fadeOut(200);
//         $("#ruleImage").fadeOut(200);
//         $("#squareText").fadeIn(200);
//         $("#circleText").fadeIn(200);
//         $("#strength").text('');

//         $(".error").fadeOut(200);
//         $(".hint-text").fadeOut(200);
//     });
// }
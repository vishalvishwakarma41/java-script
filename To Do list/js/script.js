
let inputs;
let textareas;
let selects;
let assigned;
let task;
let desc;
let date;
let priority;
let btn;
let taskBody;
let taskTable;
let taskTitle;



let isEditing = false;
let editRow = null;

function validateText(input) {

       if (input.id === "desc") {
        document.getElementById(input.id + "Err").innerText = "";
        checkForm();
        return;
    }
    let text = input.value;

    let err = document.getElementById(input.id + "Err");

    let valid = true;

    for (let i = 0; i < text.length; i++) {

        let ch = text[i];

        let isUpper = (ch >= 'A' && ch <= 'Z');

        let isLower = (ch >= 'a' && ch <= 'z');


        let isSpace = (ch === ' ');

        if (!(isUpper || isLower || isSpace)) {
            valid = false;
            break;
        }
    }

    if (valid === false) {

        err.innerText = "Only alphabets allowed";

       
        input.value = text.substring(0, text.length - 1);

        return;
    }
    err.innerText = "";

   
    checkForm();
}

function clearError(input) {

    let value = input.value;
    let err = document.getElementById(input.id + "Err");

    for (let i = 0; i < value.length; i++) {
        let ch = value[i];

        if (!((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z') || ch === ' ')) {
            return; 
        }
    }

    err.innerText = "";
}

function checkForm() {

     if (isEditing) 
        {
            return;
        } 
        if (
        !assigned || !task || !desc || !date || !priority || !btn
    ) 
    {
        return;
    }

    if (assigned.value == "") {
        btn.disabled = true;
        return;
    }

    if (task.value == "") {
        btn.disabled = true;
        return;
    }

    if (desc.value == "") {
        btn.disabled = true;
        return;
    }

    if (date.value == "") {
        btn.disabled = true;
        return;
    }

    if (priority.value == "") {
        btn.disabled = true;
        return;
    }

    // deadline
    let deadlineOk = false;
    let radios = document.getElementsByName("deadline");
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            deadlineOk = true;
            break;
        }
    }
    if (!deadlineOk) {
        btn.disabled = true;
        return;
    }

    // status
    let statusOk = false;
    let checks = document.getElementsByClassName("status");
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            statusOk = true;
            break;
        }
    }
    if (!statusOk) {
        btn.disabled = true;
        return;
    }

    btn.disabled = false;
}


function addTask() {

    let status = "";
    let boxes = document.getElementsByClassName("status");
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            status += boxes[i].value + " ";
        }
    }


    let deadlineVal = "";
    let radios = document.getElementsByName("deadline");

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            deadlineVal = radios[i].value;
            break;
        }
    }


    if (editRow == null) {

        let row = document.createElement("tr");
        row.innerHTML =
            "<td>" + assigned.value + "</td>" +
            "<td>" + task.value + "</td>" +
            "<td>" + desc.value + "</td>" +
            "<td>" + date.value + "</td>" +
            "<td>" + priority.value + "</td>" +
            "<td>" + deadlineVal + "</td>" +
            "<td>" + status + "</td>" +
            "<td><button type='button' onclick='editTask(this)'>Edit</button></td>" +
            "<td><button type='button' onclick='deleteTask(this)'>Delete</button></td>"+
            "<td><input type='checkbox' onchange='markComplete(this)'></td>";

            

        taskBody.appendChild(row);
        swal("Task Added", "Task Added Successfully", "success");
        
        clearForm();
        disableForm();

    } 
    else {
       
        editRow.cells[0].innerText = assigned.value;
        editRow.cells[1].innerText = task.value;
        editRow.cells[2].innerText = desc.value;
        editRow.cells[3].innerText = date.value;
        editRow.cells[4].innerText = priority.value;
        editRow.cells[5].innerText = deadlineVal;
        editRow.cells[6].innerText = status;

        swal("Task Updated", "Task Updated Successfully", "success");
        editRow = null;
        isEditing = false;

        
    btn.innerText = "Add Task";
    btn.disabled = true;

        disableForm();
        document.getElementById("cancelBtn").style.display = "none";

    }

    taskTable.style.display = "table";
    document.getElementById("taskTitle").style.display = "block";

    // clearForm();             
}




function deleteTask(btn) {

    let row = btn.parentNode.parentNode;

    swal({
        title: "Are you sure?",
        text: "This task will be deleted permanently",
        icon: "warning",
        buttons: ["Cancel", "Delete"]
    }).then(function (ok) {

        if (!ok) return;

      
        taskBody.removeChild(row);

        editRow = null;
        isEditing = false;
        clearForm();
        enableForm();
        document.getElementById("cancelBtn").style.display = "none";
        swal("Deleted!", "Task deleted successfully", "success");

    
    });
}


/* =====================
   CLEAR FORM
===================== */
function clearForm() {

    assigned.value = "";
    task.value = "";
    desc.value = "";
    date.value = "";
    priority.value = "";

    let radios = document.getElementsByName("deadline");
    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    let checks = document.getElementsByClassName("status");
    for (let i = 0; i < checks.length; i++) {
        checks[i].checked = false;
    }

    btn.disabled = true;
    btn.innerText = "Add Task";
    // disableForm();
    checkForm();
}


function markComplete(chk) {

    let row = chk.parentNode.parentNode;
    let editBtn = row.querySelector("button");

    if (chk.checked) {
        row.style.backgroundColor = "lightgreen";
        editBtn.disabled = true;     // completed task edit lock
    } else {
        row.style.backgroundColor = "";
        editBtn.disabled = false;
    }
}


function editTask(btnEdit) {

    isEditing = true;
    editRow = btnEdit.parentNode.parentNode;
    enableForm();

    // form 
    assigned.value = editRow.cells[0].innerText;
    task.value = editRow.cells[1].innerText;
    desc.value = editRow.cells[2].innerText;
    date.value = editRow.cells[3].innerText;
    priority.value = editRow.cells[4].innerText;


    // deadline 
    let deadlineValue = editRow.cells[5].innerText;
    let radios = document.getElementsByName("deadline");

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].value == deadlineValue) {
            radios[i].checked = true;
        } else {
            radios[i].checked = false;
        }
    }

    // status 
    let statusText = editRow.cells[6].innerText;
    let statusBoxes = document.getElementsByClassName("status");

    for (let i = 0; i < statusBoxes.length; i++) {
        if (statusText.indexOf(statusBoxes[i].value) != -1) {
            statusBoxes[i].checked = true;
        } else {
            statusBoxes[i].checked = false;
        }
    }

    btn.innerText = "Update Task";
    btn.disabled = false;
    document.getElementById("cancelBtn").style.display = "inline-block";

    // isEditing = false;
}



document.addEventListener("DOMContentLoaded", function () {

    assigned  = document.getElementById("assigned");
    task      = document.getElementById("task");
    desc      = document.getElementById("desc");
    date      = document.getElementById("date");
    priority  = document.getElementById("priority");
    btn       = document.getElementById("btn");

    taskBody  = document.getElementById("taskBody");
    taskTable = document.getElementById("taskTable");
    taskTitle = document.getElementById("taskTitle");

    let form = document.getElementById("taskForm");
    inputs    = form.getElementsByTagName("input");
    textareas = form.getElementsByTagName("textarea");
    selects   = form.getElementsByTagName("select");

    // disableForm();
});


function disableForm() {

    for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].type === "checkbox" &&
            inputs[i].closest("#taskTable")) {
            continue;
        }

        inputs[i].disabled = true;
    }

    for (let i = 0; i < textareas.length; i++) {
        textareas[i].disabled = true;
    }

    for (let i = 0; i < selects.length; i++) {
        selects[i].disabled = true;
    }
}


function enableForm() {

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
    }

    for (let i = 0; i < textareas.length; i++) {
        textareas[i].disabled = false;
    }

    for (let i = 0; i < selects.length; i++) {
        selects[i].disabled = false;
    }
}

// function cancelEdit() {

//     editRow = null;
//     isEditing = false;

//     clearForm();
//     disableForm();

//     btn.innerText = "Add Task";
//     btn.disabled = true;

//     document.getElementById("cancelBtn").style.display = "none";
// }

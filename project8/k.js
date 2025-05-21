let x = document.getElementById("input");

function appendtodisplay(value) {
    x.value += value;

}

function cleard() {
    x.value = "";
}

function calculatedisplay() {
    try {
        x.value = eval(x.value);

    } catch (error) {
        alert("Invalid Input");
        x.value = " TRY AGAIN";
        onclick = x.value = "";

    }


}
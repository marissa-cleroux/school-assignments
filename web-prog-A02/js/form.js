let $$ = function (id) {
    return document.getElementById(id)
};

$$("errorMsg").addEventListener("click", () => $$("errorMsg").style.display = "none");
addEventListener("load", () => {
    if (localStorage.getItem("firstName") && localStorage.getItem("lastName") && localStorage.getItem("username") &&
        localStorage.getItem("phoneNum") && localStorage.getItem("pCode") && localStorage.getItem("bankRoll") &&
        localStorage.getItem("lastVisit")) {
        location.href = 'game.html';
    }
});

$(function () {

    $('#moneySlider').slider({
        min: 5,
        max: 5000
    });
    $('#moneySlider').on('slide', function (event, ui) {
        (ui.value < 52) ? $('#moneyAmt').css('color', 'red'): $('#moneyAmt').css('color', '#fff');
        $('#moneyAmt').text(`$${ui.value}`);
    });

    $('#playerForm').validate({
        rules: {
            fName: {
                required: true,
                pattern: /^([A-Za-z]+[\s\'\-]?|[A-Za-z]+)+$/,
                maxlength: 20
            },
            lName: {
                required: true,
                pattern: /^([A-Za-z]+[\s\'\-]?|[A-Za-z]+)+$/,
                maxlength: 30
            },
            uName: {
                required: true,
                pattern: /^[a-z][0-9]{3}[AB]$/
            },
            pNum: {
                required: true,
                pattern: /^(\(\d{3}\)\s\d{3}\-\d{4}|(\d{3}\.){2}\d{4})$/
            },
            postal: {
                required: true,
                pattern: /^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/
            }
        },
        submitHandler: function (form) {
            localStorage.setItem("lastName", form.lName.value);
            localStorage.setItem("firstName", form.fName.value);
            localStorage.setItem("phoneNum", form.pNum.value);
            localStorage.setItem("pCode", form.postal.value.toUpperCase());
            localStorage.setItem("username", form.uName.value);
            localStorage.setItem("bankRoll", $('#moneySlider').slider('value').toString());
            form.submit();
        }
    });
});
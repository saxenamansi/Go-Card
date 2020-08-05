var db;
$(document).ready(function () {
    db = window.openDatabase('mydbNew', '1.0', 'mydbNew', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS CCInformation (FirstName, LastName, CCNumber, CVV, Month, Year, Street, State, ZipCode, Country)');
    });
});

function Submit(){
    if ($("#fname").val() == "") {
        alert("Please enter First Name");
        return false;
    }
    else if ($("#lname").val() == "") {
        alert("Please enter Last Name");
        return false;
    }
    else if ($("#ccnum").val() == "") {
        alert("Please enter Credit Card number");
        return false;
    }
    else if ($("#cvv").val() == ""){
        alert("Please enter your CVV");
    return false;
    }
    else if ($("#street").val() == ""){
        alert("Please enter Street");
    return false;
    }
    else if ($("#state").val() == ""){
        alert("Please enter your State");
    return false;
    }
    else if ($("#zip").val() == ""){
        alert("Please enter zipcode");
    return false;
    }
    else if ($("#country").val() == ""){
        alert("Please enter your Country");
    return false;
    }

    db.transaction(function (tx) {
        var query = 'INSERT INTO CCInformation(FirstName, LastName, CCNumber, CVV, Month, Year, Street, State, ZipCode, Country) VALUES ("' + $("#fname").val() + '","' + $("#lname").val() + '","' + $("#ccnum").val() + '","' + $("#cvv").val() + '","' + $("#expirationmonth").val() + '","' + $("#expirationyear").val() + '","' + $("#street").val() + '","' + $("#state").val() + '","' + $("#zip").val() + '","' + $("#country").val() + '")'
        alert(query)
        tx.executeSql(query);
        window.location="display.html"
    });
}

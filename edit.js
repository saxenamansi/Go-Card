var db;
$(document).ready(function () {
    db = window.openDatabase('mydbNew', '1.0', 'mydbNew', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS CCInformation (FirstName, LastName, CCNumber, CVV, Month, Year, Street, State, ZipCode, Country)', [], function (tx1, results) {
            showUser(tx);
        }, function () { });
    });
});


function showUser(tx) {
    tx.executeSql('select * from CCInformation WHERE rowid = ' + localStorage.rowid, [], function (tx1, results) {
        $("#fname").val(results.rows.item(0).FirstName);
        $("#lname").val(results.rows.item(0).LastName);
        $("#ccnum").val(results.rows.item(0).CCNumber);
        $("#cvv").val(results.rows.item(0).CVV);
        $("#expirationmonth").val(results.rows.item(0).Month);
        $("#expirationyear").val(results.rows.item(0).Year);
        $("#street").val(results.rows.item(0).Street);
        $("#state").val(results.rows.item(0).State);
        $("#zip").val(results.rows.item(0).ZipCode);
        $("#country").val(results.rows.item(0).Country);
    }, function () { })
}


function Submit() {
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
    else if ($("#cvv").val() == "") {
        alert("Please enter your CVV");
        return false;
    }
    else if ($("#street").val() == "") {
        alert("Please enter Street");
        return false;
    }
    else if ($("#state").val() == "") {
        alert("Please enter your State");
        return false;
    }
    else if ($("#zip").val() == "") {
        alert("Please enter zipcode");
        return false;
    }
    else if ($("#country").val() == "") {
        alert("Please enter your Country");
        return false;
    }

    db.transaction(function (tx) {
        var query = 'UPDATE CCInformation SET FirstName = "' + $("#fname").val() + '", LastName = "' + $("#lname").val() + '", CCNumber = "' + $("#ccnum").val() + '", CVV = "' + $("#cvv").val() + '", Month = "' + $("#expirationmonth").val() + '", Year = "' + $("#expirationyear").val() + '", Street = "' + $("#street").val() + '", State = "' + $("#state").val() + '", Zipcode = "' + $("#zip").val() + '", Country = "' + $("#country").val() + '" WHERE rowid = ' + localStorage.rowid;
        alert(query)
        tx.executeSql(query, [], function (tx1, results) {
            window.location = "display.html"
        }, function (tx1, error) { });
    });
}

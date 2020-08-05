function GoToCCForm() {
  window.location = "form.html";
}

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
  tx.executeSql('select rowid,* from CCInformation', [], function (tx1, results) {
    var htmlData = "";
    for (var i = 0; i < results.rows.length; i++) {
      htmlData = htmlData + "<tr>"
        + "<td>" + results.rows.item(i).FirstName + "</td>"
        + "<td>" + results.rows.item(i).LastName + "</td>"
        + "<td>" + results.rows.item(i).CCNumber + "</td>"
        + "<td>" + results.rows.item(i).CVV + "</td>"
        + "<td>" + results.rows.item(i).Month + "</td>"
        + "<td>" + results.rows.item(i).Year + "</td>"
        + "<td>" + results.rows.item(i).Street + "</td>"
        + "<td>" + results.rows.item(i).State + "</td>"
        + "<td>" + results.rows.item(i).ZipCode + "</td>"
        + "<td>" + results.rows.item(i).Country + "</td>"
        + "<td><button onclick='editDetails(" + results.rows.item(i).rowid + ")'>Edit</button><button onclick='deleteDetails(" + results.rows.item(i).rowid + ")'>Delete</button></td>"
        + "</tr>";
    }
    $("#datatable").html(htmlData);
  }, function () { });
}

function editDetails(rowid) {
  localStorage.setItem("rowid", rowid);
  window.location = "edit.html";
}

function deleteDetails(rowid) {
  db.transaction(function (tx) {
    tx.executeSql('delete from CCInformation where rowid="' + rowid + '"', [], function () {
      alert("Record Deleted");
      showUser(tx);
    }, function () { });
  }, function () { })
} 
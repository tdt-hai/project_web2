function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
 return [year, month, day].join('-');
}

function addedDate(days){
    var d = new Date();
    d.setDate(d.getDate() + days*30);
    return d;
}


function formatDateToShow(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
 return [day, month, year].join('-');
}
function formattingCurrency(money){
     return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function formattingCurrencyToDatabase(money){
    money = money.replace(/\,/g,'');
    money = Number(money);
    return money;
}

function getDateNow(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = [yyyy, mm, dd].join('-');
    return today;
}
function getFullDayNow(){
   var today = new Date();
   var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   var dateTime = date+' '+time;
   return dateTime;
}
module.exports= { formatDate, getDateNow,formattingCurrency,formatDateToShow,addedDate,formattingCurrencyToDatabase };

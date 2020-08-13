function getInfo() {
    var x = document.getElementById("term").value;
    var mTktk = document.getElementById("money").value;
    var showmTktk = mTktk;
        mTktk = formattingCurrency(mTktk);
    //Lấy giá trị số tiền hiện tại ở tài khoản thanh toán
    var mCurrent = document.getElementById("moneycurrent").innerHTML;
        mCurrent = formattingCurrency(mCurrent);

    if(mTktk >= 100000 && mTktk < Number(mCurrent) && x>=1){
        document.getElementById("showTerm").innerHTML = x;
        document.getElementById("showMoney").innerHTML =showmTktk;
        var d = new Date();
        d.setDate(d.getDate() + x*30);
        const getDate = d;
        const date = formatDateToShow(d);
        document.getElementById("showDate").innerHTML = date;
        //hien thi lai suat
        const rate = x *0.2;
        document.getElementById("interestRate").innerHTML = rate;
        document.getElementById("confirm").disabled = false;
        document.getElementById("checkmoney").innerHTML = "";
    }
    else{
        //Xoa thông tin khi nhập mới
        document.getElementById("confirm").disabled = true;
        document.getElementById("checkmoney").innerHTML ="Số tiền nhập vào không hợp lệ <br> (Vui lòng nhập số tiền tối thiểu 100,000 VND và nhỏ hơn số dư hiện tại) <br>" ;
         document.getElementById("interestRate").innerHTML = "";
         document.getElementById("showTerm").innerHTML = " ";
         document.getElementById("showMoney").innerHTML =" ";
         document.getElementById("showDate").innerHTML = " ";
    }
}
function formattingCurrency(money){
    var m = money.replace(/\,/g,'');
    m = Number(m);
    return m;
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
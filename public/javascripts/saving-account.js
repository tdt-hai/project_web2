function getInfo() {
    var x = document.getElementById("term").value;
    var mTktk = document.getElementById("money").value;
    var showmTktk = mTktk;
        mTktk = formattingCurrency(mTktk);
    //Lấy giá trị số tiền hiện tại ở tài khoản thanh toán
    var mCurrent = document.getElementById("moneycurrent").innerHTML;
        mCurrent = formattingCurrency(mCurrent);

    if(mTktk >= 100000 && mTktk < Number(mCurrent) && x>=1){
        //Tính tiền vào tài khoản tiết kiệm
        const rate = (x *(7 / 12)).toFixed(2);
        var sMoney =mTktk+(mTktk * (rate/100));
        showmTktk = sMoney.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        document.getElementById("showTerm").innerHTML = x;
        document.getElementById("showMoney").innerHTML =showmTktk;
        var d = new Date();
        d.setDate(d.getDate() + x*30);
        const getDate = d;
        const date = formatDateToShow(d);
        document.getElementById("showDate").innerHTML = date;
        //hien thi lai suat
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
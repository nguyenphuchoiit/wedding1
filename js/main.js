// document.addEventListener("DOMContentloades",()=>{
//     const name = document.getElementById("Name");
//     const Contactnumber = document.getElementById("Contactnumber");
//     const Emailaddress = document.getElementById("Emailaddress");
//     const attendiesDetails = document.getElementById("attendiesDetails");
//     const guestDetails = document.getElementById("guestDetails");
//     const message = document.getElementById("message");
//     const submit = document.getElementById("submit");
//     submit.addEventListener("click",(e) =>{
//         e.defaultPrevented();
//         // console.log(name.value);
//         // console.log(Contactnumber.value);
//         // console.log(Emailaddress.value);
//         // console.log(attendiesDetails.value);
//         // console.log(guestDetails.value);
//         // console.log(message.value);
//         const data = {
//             name: name.value,
//             Contactnumber: Contactnumber.value,
//             Emailaddress: Emailaddress.value,
//             attendiesDetails: attendiesDetails.value,
//             guestDetails: guestDetails.value,
//             message: message.value,
//         };
//         postGoogle(data);
//     });
//     async function postGoogle(data){
//         const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSfz4_6yP9nq4ob-KspoL48JhCLba662qIchCmwK5Dxbtcv1Ag/formResponse";
//         const FormData = new FormData();
//         FormData.append("entry.305389101",data.name);
//         FormData.append("entry.1654842579",data.Contactnumber);
//         FormData.append("entry.8453355",data.Emailaddress);
//         FormData.append("entry.1320266645",data.attendiesDetails);
//         FormData.append("entry.1782017543",data.guestDetails);
//         FormData.append("entry.1913127945",data.message);
//         await fetch(FormData,{
//             method: "POST",
//             body: FormData,
//         })
//     }
// });

// 
document.querySelector('#frm').onsubmit = function(e){
    e.preventDefault();
    //try cap vao message
    let message_Oj = document.querySelector('.message_Oj');

    //reset message
    message_Oj.innerText = '';

    //try cap vao thanh phan html tuong ung
    let fullNameOj =document.querySelector('input[name="Name"]');
    let ContactnumberOj =document.querySelector('input[name="Contactnumber"]');
    let EmailaddressOj =document.querySelector('input[name="Emailaddress"]');
    let attendiesDetailsOj =document.querySelector('input[name="attendiesDetails"]');
    let guestDetailsOj =document.querySelector('input[name="guestDetails"]');
    let messageOj =document.querySelector('textarea[name="message"]');
    // console.log(fullNameOj);
    //lấy giá trị người dùng nhập vào
    let fullName = fullNameOj.value;
    let Contactnumber = ContactnumberOj.value;
    let Emailaddress = EmailaddressOj.value;
    let attendiesDetails = attendiesDetailsOj.value;
    let guestDetails = guestDetailsOj.value;
    let message = messageOj.value;
    // console.log(fullName);   
  
    //validate form
    //reset message
    let requiredOj = document.querySelectorAll('.required');
    // console.log(requiredOj);
    if (requiredOj.length > 0) {
        requiredOj.forEach(function(item){
            // console.log(item);
            item.innerText = '';
        })
    }


    let Error = {};
    if (fullName.trim()=='') {
        Error['fullName'] = 'Họ và tên không được để trống';
        fullNameOj.parentElement.querySelector('.required').innerText= Error['fullName'];
    }
    if (Contactnumber.trim()=='') {
        Error['Contactnumber'] = 'Không được để trống số điện thoại';
        ContactnumberOj.parentElement.querySelector('.required').innerText= Error['Contactnumber'];
    }
    if (Emailaddress.trim()=='') {
        Error['Emailaddress'] = 'Email không được để trống';
        EmailaddressOj.parentElement.querySelector('.required').innerText= Error['Emailaddress'];
    }
    if (attendiesDetails.trim()=='') {
        Error['attendiesDetails'] = 'Vui lòng điền tham dự hoặc không tham dự được';
        attendiesDetailsOj.parentElement.querySelector('.required').innerText= Error['attendiesDetails'];
    }
    if (guestDetails.trim()=='') {
        Error['guestDetails'] = 'Vui lòng điền số lượng người cùng tham dự';
        guestDetailsOj.parentElement.querySelector('.required').innerText= Error['guestDetails'];
    }
    if (message.trim()=='') {
        Error['message'] = 'Vui lòng điền lời chúc đến cô dâu chú rễ';
        messageOj.parentElement.querySelector('.required').innerText= Error['message'];
    }

    // console.log(Error);
    //kiểm tra dữ liệu 
    if (Object.keys(Error).length == 0) {
        //không có lỗi gì cả
        let data = {
            'entry.1131974982' : fullName,
            'entry.170806861' : Contactnumber,
            'entry.1358777725' : Emailaddress,
            'entry.1796226542' : attendiesDetails,
            'entry.1723134': guestDetails,
            'entry.836959806' : message
        }
        // console.log(data);
        let queryString = new URLSearchParams(data);
        queryString = queryString.toString();
        message_Oj.innerHTML = '<div class="alert alert-success text-center ">Đang gửi bạn hãy vui lòng đợi...</div>';
        console.log(queryString);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://docs.google.com/forms/u/0/d/e/1FAIpQLSckCOVLJU66tzFRKHOMGa5rIhDjKtW4cp_OhlOq4Z2UYUyXSg/formResponse", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        message_Oj.innerHTML = '<div class="alert alert-success text-center ">Cảm ơn quan khách đã gửi thành công</div>';
        //reset field sau khi submit
        fullNameOj.value ='';
        ContactnumberOj.value ='';
        EmailaddressOj.value ='';
        attendiesDetailsOj.value ='';
        guestDetailsOj.value ='';
        messageOj.value ='';
        xhr.send(queryString);
    }else{
        message_Oj.innerHTML = '<div class="alert alert-danger text-center ">Vui lòng kiểm tra dữ liệu </div>';
    }


}
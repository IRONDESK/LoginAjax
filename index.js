 // let id = prompt('아이디를 입력해주세요.');
// let pw = prompt('패스워드를 입력해주세요.');
let loaddata;
let id;
let pw;

$('.dataLoadButton').click(function () {
    $.ajax({
        url: 'https://raw.githubusercontent.com/IRONDESK/LoginTest/main/userdata.json',
        async: true,
        dataType: 'JSON',
        success: function (result) {
            loaddata = result;
            // 이렇게 써도 괜찮을까?  response = JSON.parse(response);
            id = $('#valueID').val();
            pw = $('#valuePW').val();

            const idfind = loaddata.find(el => (el.id === id) && (el.pw === pw));
            if (idfind !== undefined) {
                /// 로그인 완료시
                $('.login-form').css("display", "none");
                $('.sayHello').css("display", "block");
                $(".sayHello").html(`
                <h1>안녕하세요, ${idfind.name} 님!</h1>
                <p>회원님이 보유하신 멋사코인은 🪙<strong>${idfind.phone.split("-")[1]}억 원</strong>입니다.</p>
                <h2>회원님은 현재 <span class="user-grade">${idfind.grade}</span> 등급입니다.</h2>
                <div class="option">
                    <a id="logout">로그아웃</a>
                    <a id="withdraw">멋사코인 인출</a>
                </div>
                `);

                /// 멋사코인 인출
                $('#logout').click(function () {
                    let logoutQuestion = confirm("로그아웃 하시겠습니까?");
                    if (logoutQuestion) {
                        $('.login-form').css("display", "flex");
                        $('.sayHello').css("display", "none");
                        $('#valueID').val() = "";
                        $('#valuePW').val() = "";
                        /// 로그아웃 해도 input이 비워지지 않음
                    } else {
                        alert("로그아웃 안됨")
                    }
                })

                /// 로그아웃 버튼
                $('#withdraw').click(function () {
                    let accountNum = prompt("입금 받을 계좌번호를 입력해주세요.");
                    if (accountNum !== null && accountNum !== "") {
                        alert("입금 신청이 완료되었습니다. 입금까지 최대 3시간이 소요됩니다.")
                    } else {
                        alert("계좌번호가 입력되지 않았거나 취소되었습니다.")
                    }
                })
            } else if (idfind === undefined) {
                /// 로그인 실패시
                $('.errorMsg').css("display", "inline-block").fadeOut(1100);
            }

        }
    });

});
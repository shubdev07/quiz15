/*
'use strict';

function create() {
    var $form = document.querySelector('#form');
    console.log("hrllo");
    $form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("inside submit");
        fetch('/api/v1/user/create', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: {fName: this.elements.fName.value, lName: this.elements.fName.value},
                age: this.elements.age.value,
                email: this.elements.email.value,
                gender: this.elements.gender.value,
                country: this.elements.country.value,
                userId: this.elements.userId.value,
                password: this.elements.password.value,
                //confirmPass: this.elements.confPassword.value
            })
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (d) {
                $("#response").html(d.message);
            });

    });
}
function  login() {
    

    var $login = document.querySelector('#login');

    $login.addEventListener('submit', function (e) {
        e.preventDefault();

        fetch('/api/v1/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: this.elements.logemail.value, password: this.elements.logpass.value})
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (d) {
                $("#response").html(d.message);
                window.location.href = 'http://localhost:3000/admin.html'
            })


    });
}
function question() {
    var $admin = document.querySelector('#question');
    $admin.addEventListener('submit', function (e) {
        e.preventDefault();

        fetch('/api/v1/question/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({category: this.elements.category.value, q: this.elements.question.value,options:{option1 : this.elements.option1.value, option2 : this.elements.option2.value, option3 : this.elements.option3.value, option4 : this.elements.option4.value}, ans: this.elements.answer.value, level:this.elements.level.value })
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (d) {
                $("#response").html(d.message);
            })


    });
    $("#showQuestion").click(function (e) {
        e.preventDefault();
        fetch('/api/v1/question/read', {
            method: 'GET'
        }) .then(function (res) {
            return res.json();
        }) .then(function (data) {
            console.log(data.data);
            data.data.forEach(function (q) {
               /!* var res = q;
                for (var key in res) {
                    if (res.hasOwnProperty(key)) {
                        var options = res['options'];
                        console.log(options);


                        //console.log(key + " -> " + res[key]);
                        $("#questions").append(`${key + " -> " + res[key]} <br>`);
                        for(var i in options){
                            console.log(i);
                            ///console.log(i + " -> " + options[i]);
                            $("#questions").append(`${i + " -> " + options[i]} <br>`);
                        }
                    }
                }
*!/
               $("#q").append(` Q: ${q.q} <br> Category : ${q.category} <br> Option: ${q.options.option1} &nbsp ${q.options.option2} &nbsp ${q.options.option3} &nbsp ${q.options.option4} <br> Ans: ${q.ans} <br> Level: ${q.level} <br><br><br><br>`);
                //$("#cat").append(`Category : ${q.category} <br>`);
            });

                //console.log(test);
            });

           //console.log(data.data);
        });

}*/

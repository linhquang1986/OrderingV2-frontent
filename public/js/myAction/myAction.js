
"use strict"
var menuDrink = null;
var drinksData = null;
var billData = [];
function speak(msg) {
    responsiveVoice.speak(msg, "Vietnamese Male");
    botChat(msg);
}
function _startorder() {
    $('.listmenu').show();
    $('.drinks').show();
    get('/drink/getAllMenu', data => {
        menuDrink = data;
        renderMenu(data)
    })
    speak('Chào bạn, mình là nhân viên order. Bạn muốn dùng gì?')
}
_startorder();

function _free() {
    stopRecording();
    start();
}

function updateBill(_drink) {
    let dr = drinksData.find(drink => { return drink.name.toLowerCase() == _drink.toLowerCase() })
    if (dr) {
        let drinkInBill = $('.ordersDrinks').find(`[drinkId=${dr._id}]`);
        drinkInBill.remove();
        billData.filter(drink => drink.name.toLowerCase() !== _drink.name.toLowerCase())
    }
}
function addBill(drinkObj) {
    console.log(drinkObj)
    drinkObj.quanlity = drinkObj.quanlity || 1;
    speak(drinkObj.quanlity + ' ' + drinkObj.name);
    drinksData.forEach(drink => {
        if (drinkObj.name.replace(/\s/g, '').toLowerCase() == drink.name.replace(/\s/g, '').toLowerCase()) {
            drinkObj.price = drink.price;
            drinkObj.id = drink._id;
            horverDrink(drink._id)
            let findD = billData.find(dr => {
                return dr.name.toLowerCase() == drinkObj.name.toLowerCase();
            })
            if (findD) {
                billData.forEach((dr) => {
                    if (dr.name.toLowerCase() == drinkObj.name.toLowerCase()) {
                        dr.quanlity = parseInt(dr.quanlity) + parseInt(drinkObj.quanlity);
                    }
                })
            } else {
                billData.push(drinkObj);
            }
            renderBill(billData)
        }
    })
}

function renderBill(data) {
    let bill = $('.orders').find('.ordersDrinks');
    bill.empty();
    data.forEach(d => {
        let price = d.quanlity * d.price;
        let drinkIntent = '<li class="list-group-item drink-item" drinkId="' + d.id + '"><p class="quanlity">' + d.quanlity + '</p>' + d.name + '<span class="badge">' + price + ' Đ</span></li>';
        bill.append(drinkIntent)
    })
}

function horverDrink(id) {
    let li = $('.drinks').find(`[drinkId=${id}]`)
    li.addClass('animate-flicker');
    setTimeout(() => {
        li.removeClass('animate-flicker');
    }, 2000)
}

function getDrink(menuId) {
    get('/drink/getDrinkByMenu/' + menuId, data => {
        renderDrink(data);
    })
}

function getAllDrink(callback) {
    get('/drink/getAllDrink', data => {
        drinksData = data;
        callback(data);
    })
}

$('#btn-chat').on('click', (e) => {
    let msg = $('#btn-input').val();
    if (msg != '') {
        userChat(msg);
        sendWitAi(msg);
        $('#btn-input').val('');
    }
})
$('#btn-input').on("keypress", function (e) {
    if (e.which === 13) {
        let msg = $('#btn-input').val();
        if (msg != '') {
            userChat(msg);
            sendWitAi(msg);
            $('#btn-input').val('');
        }
    }
});
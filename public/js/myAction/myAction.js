
"use strict"
var menuDrink = null;
var drinksData = null;
var billData = [];
var noteBill = false;
var noteText = [];

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
    speak(dic.welcome)
}
_startorder();

function _free() {
    stopRecording();
    start();
}

function updateBill(_drink) {
    let dr = drinksData.find(drink => { return drink._id == _drink })
    if (dr) {
        let drinkInBill = $('.ordersDrinks').find(`[drinkId=${dr._id}]`);
        drinkInBill.remove();
        billData = billData.filter(drink => { return drink.id !== _drink })
    }
}

function addBill(drinkObj) {
    drinkObj.quanlity = drinkObj.quanlity || 1;
    speak(drinkObj.quanlity + ' ' + drinkObj.name);
    drinksData.forEach(drink => {
        if (drinkObj.name.replace(/\s/g, '').toLowerCase() == drink.name.replace(/\s/g, '').toLowerCase()) {
            drinkObj.price = drink.price;
            drinkObj.id = drink._id;
            horverDrink(drink._id)
            let findD = billData.find(dr => {
                return dr._id == drinkObj.id;
            })
            if (findD) {
                billData.forEach((dr) => {
                    if (dr.id == drinkObj.id) {
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
function addNoteBill(text) {
    noteText.push(text);
    let noteBill = $('.orders').find('.notebill');
    noteBill.append(`<li class="list-group-item"> - ${text}</li>`)
}
function renderBill(data) {
    let bill = $('.orders').find('.ordersDrinks');
    bill.empty();
    data.forEach(d => {
        let price = d.quanlity * d.price;
        let drinkIntent = '<li class="list-group-item drink-item" drinkId="' + d.id + '"><p class="quanlity">' + d.quanlity + '</p>' + d.name + '<span class="badge">' + price + ' Đ</span><span class="remove_item glyphicon glyphicon-remove"></span></li>';
        bill.append(drinkIntent)
    })
    $('.remove_item').click(e => {
        let id = $(e.currentTarget).parent().get(0).attributes[1].value;
        updateBill(id);
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
        if (!noteBill) {
            userChat(msg);
            sendWitAi(msg)
        } else {
            addNoteBill(msg)
        }
        $('#btn-input').val('');
    }
})
$('#btn-input').on("keypress", function (e) {
    if (e.which === 13) {
        let msg = $('#btn-input').val();
        if (msg != '') {
            if (!noteBill) {
                userChat(msg);
                sendWitAi(msg)
            } else {
                addNoteBill(msg)
            }
            $('#btn-input').val('');
        }
    }
});
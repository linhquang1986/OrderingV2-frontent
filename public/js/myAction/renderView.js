
"use strict"
var renderById = (content, domId) => {
    let dom = $('#' + domId);
    dom.append(content);
}
var renderByClass = (content, domClass) => {
    let dom = $('.' + domClass);
    dom.append(content);
}
var renderMenu = (data) => {
    new Promise((resolve, reject) => {
        $('.listmenu').empty();
        data.forEach(function (item) {
            let menuIntent;
            let drinks = item.drinks;
            menuIntent = "<div class='col-md-4 panel panel-success'>"
                + '<div class="panel-heading text-center menu-heading">'
                + item.name
                + "</div>"
                + "<div class='panel-body' menu='" + item._id + "'>"
                + `<ul class="list-group drinks">`
                + `</ul>`
                + "</div>"
                + '</div>';
            renderByClass(menuIntent, 'listmenu')
        }, this);
        resolve(true)
    }).then(success => {
        renderDrink()
    })
}
var renderDrink = () => {
    getAllDrink(data => {
        data.forEach(drink => {
            let drinkContent = $(`[menu=${drink.menu}]`).children('.drinks');
            let drinkIntent = '<li class="list-group-item drink-item" drinkId="' + drink._id + '">' + drink.name + '<span class="badge">' + drink.price + ' Đ</span></li>';
            drinkContent.append(drinkIntent);
        })
    })
}

var botChat = (msg) => {
    let chatContent = $('.chat');
    let item = `<li class="left clearfix">
                    <span class="chat-img pull-left">
                        <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />
                    </span>
                    <div class="chat-body clearfix">
                        <p class="msg-bot">
                            ${msg}
                        </p>
                    </div>
                </li>`;
    chatContent.append(item);
    $(".panel-chatbox").scrollTop($(".panel-chatbox").prop("scrollHeight"));
}
var userChat = (msg) => {
    userAs = false;
    let chatContent = $('.chat');
    let item = `<li class="right clearfix">
                    <span class="chat-img pull-right">
                        <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />
                    </span>
                    <div class="chat-body clearfix">
                        <p class="msg-user">
                            ${msg}
                        </p>
                    </div>
                </li>`;
    chatContent.append(item);
    $(".panel-chatbox").scrollTop($(".panel-chatbox").prop("scrollHeight"));
}
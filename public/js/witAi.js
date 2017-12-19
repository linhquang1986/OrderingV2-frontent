"use strict"
let recognition = null;
let inAction = null;
let saveDrink = null;
let saveEntities = null;
function sendWitAi(msg) {
    // let entities = {
    //     _abort: null,
    //     _quanlity: null,
    //     _drink: null,
    //     _menu: null
    // }
    let data = { message: msg }
    postWit('/wit/message', data, (res) => {
        console.log(res)
        let entities = res.entities;
        let type_action = null;
        // kiem tra va gan du lieu vao entities
        if(entities.drinks) {
            entities._drink = entities.drinks[0].value;
            entities._quanlity  = entities.numbers ? entities.numbers[0].value : 1
        }
            // kiem tra thuoc hanh dong nao?
        if(entities._add) {
            type_action = "add"
        }
        else if (entities._remove) {
             type_action = "xoa"
        }
        else {
            type_action = entities.option ? entities.option[0].value : 'add';
        }
       
        switch (type_action){
            case "add":
                handleOrder(entities);
                break;
            case "xoa":
                changeOrder(entities)
                break;
            case "no": // tu choi 1 hanh dong
                console.log('du roi', type_action);
                showBillAndNote()//show bill and hoi chu thich gi them khong?
                break;    
        }
  
        




        // add order khi co so luong va ten nuoc
        // if (res.entities.abort) {
        //     entities._abort = true;
        // }
        // if (res.entities.quanlity) {
        //     entities._quanlity = res.entities.quanlity[0].value;
        //     if (saveEntities) {
        //         saveEntities._quanlity = entities._quanlity;
        //         handleOrder(saveEntities);
        //         saveEntities = null;
        //     }
        // }
        // if (res.entities.drinks) {
        //     entities._drink = res.entities.drinks[0].value;
        // }
        // if (res.entities.menus) {
        //     entities._menu = res.entities.menus[0].value;
        // }
        // if (res.entities.have && res.entities.y_n) {
        //     if (entities._drink)
        //         quesDrink(entities)
        //     if (entities._menu)
        //         handleMenu(entities._menu)
        //     if (!entities._drink && !entities._menu)
        //         speak('Hiện bên mình chưa có bạn vui lòng chọn nước khác nha.');
        // }
        // if (!res.entities.have || !res.entities.y_n && !res.entities.listed) {
        //     if (entities._drink && !saveEntities) {
        //         handleOrder(entities)
        //     }
        //     if (entities._menu && !saveEntities)
        //         handleMenu(entities._menu)
        // }
        // if (res.entities.have && res.entities.listed) {
        //     //show list drink in menu
        // }
        // if (res.entities.Billing && billData.length > 0) {
        //     speak('Bạn có muốn ghi chú gì không?')
        //     noteBill = true;
        // }
    })
}
var quesDrink = (entities) => {
    speak('Có bạn');
    saveEntities = entities;
}


var handleMenu = (menu) => {
    let exist = menuDrink.find(m => {
        return m.name.toLowerCase() == menu.toLowerCase();
    })
    if (exist) {
        speak('Bạn muốn dùng loại ' + menu + ' nào?')
    } else {
        speak('Hiện bên mình chưa có bạn vui lòng chọn nước khác nha.')
    }
}
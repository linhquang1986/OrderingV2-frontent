var userAs = true;
var userSubmit = false;

// check loai action
function typeOfAction(entities) {
    if (entities.option) {
        return entities.option[0].metadata;
    }
    return "ss"
}

// them vao order neu co thuoc tinh so luong va ten nuoc
function handleOrder(entities) {
    let drinkOder = {
        name: entities._drink,
        quanlity: entities._quanlity
    }
    if (drinkOder.name) {
        console.log(123, drinkOder);
        let exist = drinksData.find(d => {
            return d.name.toLowerCase() === drinkOder.name.toLowerCase()
        })
        if (exist)
            addBill(drinkOder)
        else
            speak(dic.outofdrink)
    }
}
// xoa hay thay doi nuoc
function changeOrder(entities) {
    // let drinkOder = {
    //     name: entities._drink,
    //     quanlity: entities._quanlity
    // }
    updateBill(entities._drink)
}

function showBillAndNote() {
    speak(dic.note)
}

function submitOrder() {
    if (noteText.length > 0) {
        Order();
    } else {
        userSubmit = true;
        speak(dic.note);
    }
}

function Order() {
    speak(dic.order)
    userSubmit = false;
    noteText = [];
    billData = [];
    $('.ordersDrinks').empty();
    $('.notebill').empty();
}

function showListSpecial() {
    drinksData.forEach(d => {
        if (d.best)
            horverDrink(d._id);
    })
}
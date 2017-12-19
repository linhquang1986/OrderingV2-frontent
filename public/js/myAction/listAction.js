var userAs = true;

// check loai action
function typeOfAction (entities) {
	if(entities.option) {
		return entities.option[0].metadata;
	}
	return "ss"
}

// them vao order neu co thuoc tinh so luong va ten nuoc
function handleOrder (entities) {
    let drinkOder = {
        name: entities._drink,
        quanlity: entities._quanlity
    }
    console.log(123, drinkOder);
    // if (!entities._abort) {
         addBill(drinkOder)
    // } else {
    //     updateBill(entities._drink)
    // }
}
// xoa hay thay doi nuoc
function changeOrder (entities) {
    // let drinkOder = {
    //     name: entities._drink,
    //     quanlity: entities._quanlity
    // }
    updateBill(entities._drink)
}

function showBillAndNote() {
	speak(dic.note)
}
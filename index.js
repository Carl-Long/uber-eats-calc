
let orderDetails = {};
let finalTotals = {};
let uberOne = false;

function toggleUberOne() {
    uberOne = !uberOne;
    if (uberOne === true) {
        document.getElementById('delivery').disabled = true;
    }
    else {
        document.getElementById('delivery').disabled = false;
    }
}

function handleSubmit(name, orderAmount) {
    if(name == "" || orderAmount == ""){
        alert("Entries cannot be blank")
        return -1;
    }
    console.log('button presseed');
    orderDetails[name] = orderAmount;
    displayInfo(orderDetails);
}

function displayInfo(orderDetails) {
    clearDisplay();

    let title = document.createElement("h3");
    title.setAttribute("class", "subTitle");
    let titleNode = document.createTextNode("Order Breakdown");
    title.appendChild(titleNode);
    let element = document.getElementById("entries");
    element.appendChild(title);


    let subTotal = 0;
    for (key in orderDetails) {
        let entry = document.createElement("p");
        entry.setAttribute("class", "entry");
        let node = document.createTextNode(key + ": £" + orderDetails[key]);
        entry.appendChild(node);
        let element = document.getElementById('entries');
        element.appendChild(entry);
        subTotal += parseFloat(orderDetails[key]);
    }

    let result = document.createElement("p");
    result.setAttribute("class", "totalDisplay");
    let node = document.createTextNode('Subtotal: £' + subTotal.toFixed(2));
    result.appendChild(node);
    element = document.getElementById('entries');
    element.appendChild(result);
}

function clearDisplay() {
    clearTotals();
    let element = document.getElementById("entries");
    element.remove();
    let entry = document.createElement("div");
    entry.setAttribute("id", "entries");
    let node = document.getElementById("orderInfo");
    node.appendChild(entry)
}

function clearOrder() {
    orderDetails = {};
    clearDisplay();
}

function clearTotals(){
    finalTotals = {};
    let element = document.getElementById("totals");
    element.remove();
    let entry = document.createElement("div");
    entry.setAttribute("id", "totals");
    let node = document.getElementById("results");
    node.appendChild(entry)
}

function calculate() {
    clearTotals();
    let deliveryFee = splitDelivery();
    let serviceFee = 10;
    if(uberOne){
        serviceFee = 5;
    }
    console.log(deliveryFee, serviceFee)
    let discount = document.getElementById("discount").value;
   if(discount === 'NaN' || discount === ""){
        discount = 0;
   }

   let newTotals = {};
   for (key in orderDetails){
   newTotals[key] = getNewTotal(orderDetails[key], deliveryFee, serviceFee, discount)
   }
   displayFinalTotals(newTotals);
}

function splitDelivery(){
    let numberOfPeople = Object.keys(orderDetails).length;
    if(numberOfPeople > 0){
    let deliveryFee = parseFloat(document.getElementById("delivery").value).toFixed(2);
    if(deliveryFee === 'NaN' || uberOne === true){
        console.log('no delivery')
         return 0;
    }
    else{
        console.log(deliveryFee / numberOfPeople);
        return deliveryFee / numberOfPeople;
    }
}
return null;
}

function getNewTotal(orderValue, deliveryFee, serviceFee, discount){
    discountMultiplier = (100 - discount) / 100;
    serviceFeeMultiplier = (100 + serviceFee) / 100;
    serviceFee = orderValue * serviceFeeMultiplier - orderValue; 
    let newValue = orderValue * discountMultiplier;
    newValue = newValue + serviceFee + deliveryFee;
    console.log(discount, serviceFee, newValue);
    return newValue.toFixed(2);
}

function displayFinalTotals(finalTotals){
    console.log(finalTotals);
    let total = 0;
    let title = document.createElement("h2");
    title.setAttribute("class", "subTitle");
    let titleNode = document.createTextNode("Total Cost Breakdown");
    title.appendChild(titleNode);
    let element = document.getElementById("totals");
    element.appendChild(title);

    for (key in finalTotals){
        let entry = document.createElement("p");
        entry.setAttribute("class", "entry");
        let node = document.createTextNode(key + ": £" + finalTotals[key]);
        entry.appendChild(node);
        let element = document.getElementById('totals');
        element.appendChild(entry);
        total += parseFloat(finalTotals[key]);
        }

    let result = document.createElement("p");
    result.setAttribute("class", "totalDisplay");
    let node = document.createTextNode('Total: £' + total.toFixed(2));
    result.appendChild(node);
    element = document.getElementById('totals');
    element.appendChild(result);
}






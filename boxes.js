//counter and box array defined globally
var boxCounter = 0;
var boxes = [];
 
window.onload = init;
//box constructor object
function Box(id, name, color, x, y) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
//display was used as a method instead of an independent function
    this.display = function() {
      alert("Box ID: " + id + "\nName: " + name + "\nColor: " + color + "\nCoordinates: " + x + ", " + y);
    };
}

function init() {
//generateButton assigned to preliminary formHandler()
  var generateButton = document.getElementById("generateButton");
  generateButton.onclick = formHandler;
//clear() handler
  var clearButton = document.getElementById("clearButton");
  clearButton.onclick = clear;
}
//this function was created validate name input
function validateName() {
  var nameInput = document.getElementById("name");
  var name = nameInput.value;
    if (name == null || name == "") {
        alert("Don't forget to give these Amazing Boxes a name.");
        return false;
    } 
    else {
       return true;
    }
}    
//function created to validate selected radio input
function validateNumber () {
  var isChecked = getBoxCount() != 0;
  if (!isChecked){
    alert("Don't forget to select the number of boxes to create.");
  }
  return isChecked;
}
/*This function is called which acts as a safety valve for 
 *the form; if the prior two functions collect a null value,
 *then generate() will not be called.
 */
function formHandler() {
  if (validateName() && validateNumber()){
     generate();
  }
}
//this function procures the value of the selected radio input.
function getBoxCount() {
  var boxCount = 0;
  var data = document.forms.data;
  var amountArray = data.elements.amount;
  for (var i = 0; i < amountArray.length; i++){
     if (amountArray[i].checked) {
       boxCount = amountArray[i].value;
       break;
     }
  }
  return boxCount;
}   
//this function creates the boxes, assigns them certain attributes, and adds them to the DOM.
function addBox(scene, box){
  var div = document.createElement("div");
  boxes.push(box);
  div.style.left = box.x + "px";
  div.style.top = box.y + "px";
  div.style.backgroundColor = box.color;
  div.setAttribute("class", "box");
  div.innerHTML = box.name;
  div.onclick = box.display;
  scene.appendChild(div); 
}
//calling for form data
function generate() {
  var name = document.getElementById("name").value;
  var colorSelect = document.getElementById("color");
  var colorOption = colorSelect.options[colorSelect.selectedIndex];
  var color = colorOption.value;
  var sceneDiv = document.getElementById("scene");
  var scene = sceneDiv;
//procuring number of boxes to create based on input.
  var boxNum = getBoxCount();
  for(var i = 0; i < boxNum; i++){
//counting for box ids and assigning random coordinates    
       var id = boxCounter++;
       var x = Math.floor(Math.random() * (scene.offsetWidth-101));
       var y = Math.floor(Math.random() * (scene.offsetHeight-101));
 //new box objects generated      
       var boxObject = new Box(id, name, color, x, y);
       addBox(sceneDiv, boxObject);
  }
//resetting the form each time the generate button is clicked  
  var formData = document.getElementById("data");
  formData.reset();
}
//removing all div#scene div elements; counter to reset to zero as well.
function clear() {
  var sceneDiv = document.getElementById("scene");
  var selectedItems = document.querySelectorAll(".box");
  for (var i = 0; i < selectedItems.length; i++) {
     sceneDiv.removeChild(selectedItems[i]);
     boxCounter = 0;
  }
}
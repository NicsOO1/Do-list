let items=[];

const itemsDiv=document.getElementById("items");
const input=document.getElementById("itemInput")
const storageKey="items"


function renderItems(){
  itemsDiv.innerHTML=null;

  items.forEach((item,index)=>{               //for (const [index,item] of Object.entries(items))
    const container=document.createElement("div");
    container.style.marginBottom="20px";

    const text=document.createElement("p");
    text.style.display="inline";

    text.textContent=item; 

    const removeButton=document.createElement("button");
    removeButton.style.marginLeft="10px";
    removeButton.style.fontSize="20px";
    removeButton.style.fontWeight="700";
    removeButton.style.width="35px";
    removeButton.style.height="35px";
    removeButton.style.verticalAlign="middle";
    removeButton.style.border="solid 3px";
    removeButton.style.borderRadius="5px";
    //removeButton.style.backgroundColor = "#82ca69"; // Green color
    removeButton.style.color ="#77b761";
    removeButton.innerHTML = "";
    removeButton.style.cursor = "pointer";

    removeButton.onclick = () => {
      if (removeButton.innerHTML === "") {  //check mark
        removeButton.innerHTML = "&#10003;"; // Unicode for checkmark
        text.classList.toggle("strike");
      }
      removeItems(index);
    };

    container.appendChild(text);
    container.appendChild(removeButton);

    itemsDiv.appendChild(container)

    
    
  });
}



function addItems(){
const value=input.value;
if(!value){
  alert("You cannot enter an empty item");
  return;
}
items.push(value);

//clear value
input.value='';

renderItems();
saveItems();
}


function removeItems(index){

  setTimeout(() => {
    items.splice(index,1);
    renderItems();
    saveItems();
  }, 700);
  

  
}


function saveItems(){
const stringItems=JSON.stringify(items);
localStorage.setItem(storageKey,stringItems);
}


function loadItems(){
const oldItems=localStorage.getItem(storageKey);
if(oldItems){
  items=JSON.parse(oldItems);
  renderItems();
}
}

document.addEventListener("DOMContentLoaded",loadItems);

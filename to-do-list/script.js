// const input = document.querySelector('#input-box');
const list = document.getElementById("list");

function onFormSubmit(e) {
  e.preventDefault();
//   untuk menangkap inputan
  const inputValue = e.target.children[0].value;
// console.log(inputValue)

// untuk menampilkan mengirim kan sebuah item
  list.appendChild(createListItem(inputValue))
}

function createListItem(inputValue){
    const item = document.createElement("div")
    item.innerHTML=`
    <div>
    <input type="checkbox"/>
    <span>${inputValue}</span>
    </div>
    <button>x</button>
   `
   
    return item
}

const draggable_list = document.getElementById('draggable-list')
const check = document.getElementById('check')

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
]
// store list items
const listItems = []
let dragStartIndex

createList()
// Insert list items into DOM
function createList() {
  ;[...richestPeople] // we just copy the above arry without disturbing that
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      console.log(person)
      const listItem = document.createElement('li')
      listItem.setAttribute('data-index', index)

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `
      listItems.push(listItem)
      draggable_list.appendChild(listItem)
    
    })
    addEventListeners()
}
function dragStart(){
  //console.log('drag start')
  dragStartIndex=+this.closest('li').getAttribute('data-index')// we add + to make this data type as number
  console.log(typeof dragStartIndex)
}
function dragEnter(){
  //console.log('drag enter')
  this.classList.add('over')
}
function dragOver(e){
  //console.log('drag over')
  // to allow drop we have to set preventdefault on dragover
  e.preventDefault()
}
function dragDrop(){
  //console.log('drag drop')
  const dragEndIndex= +this.getAttribute('data-index')
  swapItems(dragStartIndex,dragEndIndex)
  this.classList.remove('over')
}
function dragLeave(){
 // console.log('drag leave')
 this.classList.remove('over')
}
//swap list items that are drag and drop
function swapItems(fromIndex,toIndex){
 const itemOne=listItems[fromIndex].querySelector('.draggable')
 const itemTwo=listItems[toIndex].querySelector('.draggable')
 //console.log(itemOne,'.....',itemTwo)
 listItems[fromIndex].appendChild(itemTwo);
 listItems[toIndex].appendChild(itemOne);

}
//check the order of the list items
function checkOrder(){
  listItems.forEach((listitem,index)=>{
    const personName=listitem.querySelector('.draggable').innerText.trim()
    //console.log(personName)
    if(personName !== richestPeople[index]){
      listitem.classList.add('wrong')
    }else{
      listitem.classList.remove('wrong')
      listitem.classList.add('right')
    }
  })
}
function addEventListeners(){
  const draggables=document.querySelectorAll('.draggable')
  const dragListItems=document.querySelectorAll('.draggable-list li')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart',dragStart)
  })
  dragListItems.forEach(item =>{
    item.addEventListener('dragover',dragOver)
    item.addEventListener('drop',dragDrop)
    item.addEventListener('dragenter',dragEnter)
    item.addEventListener('dragleave',dragLeave)
  })
}
check.addEventListener('click',checkOrder)
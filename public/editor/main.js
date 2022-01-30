class Node {
    constructor(element){
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
 
    // adds an element at the end
    // of list
    add(element) {
        // creates a new node
        var node = new Node(element);
 
        // to store current node
        var current;
 
        // if list is Empty add the
        // element and make it head
        if (this.head == null)
            this.head = node;
        else {
            current = this.head;
 
            // iterate to the end of the
            // list
            while (current.next) {
                current = current.next;
            }
 
            // add node
            current.next = node;
        }
        this.size++;
    }
 
    // insert element at the position index
    // of the list
    insertAt(element, index) {
        if (index < 0 || index > this.size)
            return console.log("Please enter a valid index.");
        else {
            // creates a new node
            var node = new Node(element);
            var curr, prev;
 
            curr = this.head;
 
            // add the element to the
            // first index
            if (index == 0) {
                node.next = this.head;
                this.head = node;
            } else {
                curr = this.head;
                var it = 0;
 
                // iterate over the list to find
                // the position to insert
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
 
                // adding an element
                node.next = curr;
                prev.next = node;
            }
            this.size++;
        }
    }
 
    // removes an element from the
    // specified location
    removeFrom(index) {
        if (index < 0 || index >= this.size)
            return console.log("Please Enter a valid index");
        else {
            var curr, prev, it = 0;
            curr = this.head;
            prev = curr;
 
            // deleting first element
            if (index === 0) {
                this.head = curr.next;
            } else {
                // iterate over the list to the
                // position to removce an element
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
 
                // remove the element
                prev.next = curr.next;
            }
            this.size--;
 
            // return the remove element
            return curr.element;
        }
    }
 
    // removes a given element from the
    // list
    removeElement(element) {
        var current = this.head;
        var prev = null;
 
        // iterate over the list
        while (current != null) {
            // comparing element with current
            // element if found then remove the
            // and return true
            if (current.element === element) {
                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.size--;
                return current.element;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }
 
 
    // finds the index of element
    indexOf(element) {
        var count = 0;
        var current = this.head;
 
        // iterate over the list
        while (current != null) {
            // compare each element of the list
            // with given element
            if (current.element === element)
                return count;
            count++;
            current = current.next;
        }
 
        // not found
        return -1;
    }
 
    // checks the list for empty
    isEmpty() {
        return this.size == 0;
    }
 
    // gives the size of the list
    size_of_list() {
        return this.size;
    }
 
 
    // prints the list items
    printList() {
        var curr = this.head;
        var str = "";
        while (curr) {
            str += curr.element ;
            curr = curr.next;
        }
        return str;
    }
 
}

let editor = document.getElementById("editor_area");
let position =  editor.getBoundingClientRect();
let x = position.left;
let y = position.top;
let width = editor.offsetWidth;
let height = editor.offsetHeight;

let state = {
    position: {
        x: 0,
        y: 0
    },
    focus: false,
    data: [new LinkedList()],
    row: 0,
    charHeight: 19.2,
    keywords: ["main", "String", "void", "public"]
}

function changeFocus(focusValue){
    if(focusValue)state.focus=true;
    else state.focus = false;
    if(state.focus){
        editor.style.borderColor = "blue";
    }
    else{
        editor.style.borderColor = "black";
    }
}

function render(){
    text = "";
    for(var i = 0; i < state.data.length ; i++){
        text += "<div class=\"line-number\" style=\"background-color: grey;  \">"+(i+1)+"</div>"
        text += "<div class=\"column\" onClick=\"onRowClick("+i+")\">"
        var fullRow =  state.data[i].printList().split(" ");
        for(var j=0;j < fullRow.length;j++){
            if(state.keywords.includes(fullRow[j])){
                text += "<span style=\"color: red;\">"
                text += fullRow[j];
                text += "</span>"
            }
            else{
                text += fullRow[j];
            }
            if(j+1 < fullRow.length){
                text += " ";
            }
        }
        text += "</div>"
        if(i + 1 < state.data.length)text += "<br/>";
    }

    editor.innerHTML = text;
}

function backspace(){
    if(!state.data[state.row].isEmpty()){
        state.data[state.row].removeFrom(state.data[state.row].size_of_list() - 1);
    }
    else{
        if(state.row > 0){
            state.data.pop();
            state.row--;
        }
    }
}

function newLine(){
    state.data.push(new LinkedList());
    state.row++;
}

function recomputeCurrentPointer(){
    //update row
    let clickedRow = Math.floor(state.position.y / state.charHeight);
    if(clickedRow >= state.data.length){
        state.row = state.data.length - 1;
    }
    console.log("row: ", clickedRow);
}

function onRowClick(clickedRow){
    if(Number.isInteger(clickedRow)){
        let temp  = Number(clickedRow);
        if(temp < state.data.length){
            state.row = temp;
        }
        else{
            state.row = state.data.length - 1;
        }
    }
    else{
        state.row = state.data.length - 1;
    }
    console.log("row: ", clickedRow);
}


window.addEventListener("click", function(e){
    if(editor.contains(e.target)){
        changeFocus(true);
        state.position.x = e.clientX - x;
        state.position.y = e.clientY - y;
        recomputeCurrentPointer();
    }else{
        changeFocus(false);
    }
    
});


window.addEventListener("keydown", function(e){
    if(state.focus){
        if(e.key.length == 1){
            state.data[state.row].add(e.key);
        }
        else{
            if(e.key === "Backspace" || e.key === "Delete"){
                backspace();
            }
            else if(e.key === "Enter"){
                newLine();
            }

        }
        
        render();
    }
});

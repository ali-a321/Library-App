const addBook = document.querySelector(".addBook")
const closeForm = document.querySelector(".closeForm")
const bookDisplay = document.querySelector(".bookDisplay")
const submit = document.querySelector(".btnSubmit")
const errorz = document.querySelector(".error") 
const errorA = document.querySelector(".errorA") 
const errorT = document.querySelector(".errorT")
const formContainer = document.querySelector(".formContainer");


class Book{
 
    constructor(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
    }
}

let myLibrary = [];


addBook.addEventListener("click", () => {
    document.querySelector(".popup").style.display = "flex"
    document.querySelector(".book-heading").textContent = "Add Book"
    submit.textContent = "Add"
})

submit.addEventListener("click", (e) => {
    e.preventDefault();
    errorForm();
})

function errorForm(){

const pageInput = document.getElementById("pages")
const bookTitle = document.getElementById("title")
const authorName = document.getElementById("author")

    if (pageInput.value <= 99999 && pageInput.value >= 1 && bookTitle.value !== "" && authorName.value !== "") {
       
        addBookToList()
        formContainer.reset()
        closeForms()
        errorz.innerHTML = ""
        errorA.innerHTML = ""
        errorT.innerHTML = ""
    }
    else if (pageInput.value >= 99999 || pageInput <=1){
    errorz.innerHTML = "Please input a number between 1 and 99999"
    console.log("Error")
    }
    else if (bookTitle.value == "" && authorName.value == ""){
    errorT.innerHTML = "Please type in the title of the book"
        errorA.innerHTML = "Please type in the author of the book"
    }
    else if (bookTitle.value == ""){
    errorT.innerHTML = "Please type in the title of the book"
    }
    else if (authorName.value == ""){
    errorA.innerHTML = "Please type in the author of the book"
    }
}

//Helper function
function createBookElement(el,content,className){
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute("class", className);
    return element;
  }
//

  const getBookFromInput = () => {
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let pages = document.getElementById("pages").value
    let read = document.getElementById("read").checked
    return new Book(title,author,pages,read);
  }

 
function addBookToList(){
    const newBook = getBookFromInput();
    myLibrary.push(newBook);
   saveAndRenderBooks();
  } 
function renderBook(){
  bookDisplay.textContent = ""
    myLibrary.map((book,index) => {
    createBookItem(book,index);
  });  
}
function addLocalStorage(){
    myLibrary = JSON.parse(localStorage.getItem('library')) || []
    saveAndRenderBooks()
}

function createReadElement(bookItem,book){
 const read = document.createElement("div")
 read.setAttribute("class", 'book-read')
 read.appendChild(createBookElement('p','Read?', 'book-read-title'))
 const input = document.createElement("input")
 input.type = "checkbox"
 input.addEventListener('click', (e) => {
    if (e.target.checked ) {
        bookItem.setAttribute("class", "book-card read-yes")
        book.read = true ;
        saveAndRenderBooks()
    } else {
        bookItem.setAttribute("class", "book-card read-no") 
        book.read = false ;
        saveAndRenderBooks() 
    }
});
    if (book.read){
        input.checked = true ;
        bookItem.setAttribute("class", "book-card read-yes")
    }
    read.appendChild(input);
    return read;
}

function getFormInfo(book){
    document.querySelector(".popup").style.display = "flex"  
    document.querySelector(".book-heading").textContent = "Edit Book"
    submit.textContent = "Edit"
    document.querySelector(".formContainer").setAttribute('id',book.id)
    document.getElementById("title").value = book.title || ""
    document.getElementById("author").value = book.author || ""
    document.getElementById("pages").value = book.pages || ""
    document.getElementById("read").checked = book.read;
 

}



function createBookItem(book,index){
    bookDisplay.style.display = "flex";
    const bookItem = document.createElement("div");
    bookItem.setAttribute("class", "book-card");
    bookItem.setAttribute("key", index)
    bookItem.setAttribute("id", index)
  
  
    bookItem.appendChild(createBookElement("h3","Title: " +`${book.title}`, "book-title"))
    bookItem.appendChild(createBookElement("p","Author: "+ `${book.author}`, "book-author"))
    bookItem.appendChild(createBookElement("p","Pages: "+ `${book.pages}`, "book-pages"))
   
    bookItem.appendChild(createReadElement(bookItem,book))    
    bookItem.appendChild(createBookElement("button", "X", "delete"));
    bookItem.appendChild(createEditElement(book));

  
    bookDisplay.appendChild(bookItem)
    function createEditElement(book){
        const editBtn = document.createElement("button")
        editBtn.setAttribute("class", "editBtn")
        editBtn.textContent = "Edit"
        editBtn.addEventListener("click", () => {
            getFormInfo(book)
            deleteBook(index)
        });
        return editBtn
    }
  
    bookItem.querySelector(".delete").addEventListener("click", () => {
      deleteBook(index);
    });

   
  }
  function deleteBook(index){
    myLibrary.splice(index,1);
    console.log("Delete Btn Pressed")
    saveAndRenderBooks();
  }

  function saveAndRenderBooks() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    renderBook();
  }

  closeForm.addEventListener('click', closeForms) 
  function closeForms() {    
      document.querySelector(".popup").style.display = "none"
      errorz.innerHTML = ""
      errorA.innerHTML = ""
      errorT.innerHTML = ""
      formContainer.reset()
      
       }
      
  window.addEventListener("click", (e) => {
      const popup = document.querySelector(".popup")
      if (e.target == popup) {
        popup.style.display = "none";
        formContainer.reset()
      }
      
    }); 

addLocalStorage()

/* OLD WAY I DID IT
function addBookToLibrary(){
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let pages = document.getElementById("pages").value
    let read = document.getElementById("read").checked
    myLibrary.push(title,author,pages,read)
    

    let  list = document.getElementById('demo');
    let bookEntry = document.createElement('li');
    let btnEntry = document.createElement('button');
    
    bookEntry.appendChild(document.createTextNode(myLibrary));
    list.appendChild(bookEntry);


    btnEntry.appendChild(document.createTextNode("Remove"));
    list.appendChild(btnEntry);
    btnEntry.setAttribute('id', "btnEntry");
    let buttonToEdit = document.getElementById('btnEntry');
    buttonToEdit.style.color = "blue"
    btnEntry.addEventListener("click", undo)

    bookEntry.setAttribute("id", "bookEntry")

}


function undo() {
    console.log(myLibrary)
    document.getElementById("bookEntry").remove(bookEntry);
    document.getElementById("btnEntry").remove(btnEntry);
    // should be but need to modify the list(check freecodecamp classes tutorial): this.bookEntry.splice(index,1)
}

function displayBookToLibrary(){
    for (let i = 0; i < myLibrary.length; i++) {
    
    
}
}

*/
const $ = document;
const openModalBtn = $.querySelector('.modal_btn');
const closeModalBtn = $.querySelector('.close_modal');
const modal = $.querySelector('.modal');
const addBookBtn = $.querySelector('#add_book');
const deleteBtn = $.querySelector('.delete_btn');
const archiveBtn = $.querySelector('.archive_btn');
const titleInput = $.getElementById('book_title');
const authorInput = $.getElementById('book_author');
const yearInput = $.getElementById('book_year');
const booksContainer = $.querySelector('.book_list');

let books = [];

//Open Modal
openModalBtn.addEventListener('click', function() {
    //Opens Modal
    modal.style.display = 'block';
    $.querySelector('.container').style.filter = 'blur(7px)';

    //Closes Modal
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        $.querySelector('.container').style.filter = 'blur(0px)';
    });
});

//Add Book
addBookBtn.addEventListener('click' , () =>{
    let bookTitle = titleInput.value;
    let bookAuthor = authorInput.value;
    let bookYear = yearInput.value;

    let newBookObj = {
        id: books.length + 1,
        title: bookTitle,
        author: bookAuthor,
        year: bookYear
    };

    books.push(newBookObj);
    setLocalStorage(books)
    modal.style.display = 'none';
    $.querySelector('.container').style.filter = 'blur(0px)';
    titleInput.value = '';
    authorInput.value = '';
    yearInput.value = '';
}); 

//Delete Book
function removeBook(bookId){
    let localStorageEl = JSON.parse(localStorage.getItem('books'));
    
    books = localStorageEl;

    let mainTodoIndex = books.findIndex((book) =>{
        return book.id === bookId;
    });

    books.splice(mainTodoIndex, 1);

    setLocalStorage(books);
    bookBoxGenerator(books);
    
};

//Book Container generator
function bookBoxGenerator(booksArray) {
    booksContainer.innerHTML = '';

    booksArray.forEach(book => {
        let newBookDiv = $.createElement('div');
        newBookDiv.className = 'book flex';

        let newBookInfoDiv = $.createElement('div');
        newBookInfoDiv.className = 'book_info';

        let newBookTitle = $.createElement('h2');
        newBookTitle.className = 'bookTitle';
        newBookTitle.innerHTML = book.title;

        let newBookAuthor = $.createElement('span');
        newBookAuthor.className = 'bookAuthor';
        newBookAuthor.innerHTML = book.author;

        let newBookYear = $.createElement('bookYear');
        newBookYear.className = 'bookYear';
        newBookYear.innerHTML = book.year;

        let bookDeleteEl = $.createElement('button');
        bookDeleteEl.className = 'btn_delete'
        bookDeleteEl.innerHTML = 'Delete';
        bookDeleteEl.setAttribute('onclick', 'removeBook(' + book.id + ')');

        
        newBookInfoDiv.append(newBookTitle, newBookAuthor, newBookYear);
        newBookDiv.append(newBookInfoDiv, bookDeleteEl);

        booksContainer.append(newBookDiv);
    });
};

//Save to local storage data
function setLocalStorage(booksArray){
    localStorage.setItem('books', JSON.stringify(booksArray));
    bookBoxGenerator(booksArray);
};

//Get local storage data
function getLocalStorage() {
    let getLocalData = localStorage.getItem('books');
    
    if (getLocalData) {
        books = JSON.parse(getLocalData);
        bookBoxGenerator(books);
    }
};

window.addEventListener('load', getLocalStorage);
//a class for enableing a filterable array of all the books in the local storage and returning a match.
let searchbook=document.querySelector('#searchbook');
    searchbook.addEventListener('keyup',(e)=>{
        if(e.keyCode===8 && searchbook.value==''){
            let rows=document.querySelectorAll('.row');
            rows.forEach((line,index)=>{
                rows[index].style.display='';
            })   
        }
        else{
        let searchwords= document.querySelector('#searchbook').value;
        let rows=document.querySelectorAll('.row');
        rows.forEach((line,index)=>{
            if(line.innerHTML.toUpperCase().indexOf(searchwords.toUpperCase())>1){
                rows[index].style.display='';
            }
            else{
                rows[index].style.display='none';  
            }
        })
        }
           
    })

    


//creating the book class, that will add in new books to be displayed.
class Book{
    constructor(author, title, isbn){
        this.author=author;
        this.title=title;
        this.isbn=isbn;
    }
}

//store
class Store{ 
    static addBookToStore(book){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
            books.push(book);
            localStorage.setItem('books',JSON.stringify(books));

        }
        else{ 
            books=JSON.parse(localStorage.getItem('books'));
            books.push(book);
            localStorage.setItem('books',JSON.stringify(books));
        }
    }
    static getBookFromStore(){
     let books= JSON.parse(localStorage.getItem('books'));
       
        return books;
    }
    static removeBookFromStore(isbn){
        let books=Store.getBookFromStore();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        })
        
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//class user interface that will be responsibe for all thed displays inthe screen including, list of book in the table, clearing of input form and clearing book from the list
class UI{
    static bookStore(){
        let books=Store.getBookFromStore();
        if(books==null){
            console.log('no books in store');
        }else{

            books.forEach(book=>{
            UI.displayBook(book);
            })
        }

    }

    static displayBook(book){
        let author=book.author;
        let title=book.title;
        let isbn=book.isbn;
        let booklist=document.querySelector('.booklist');

        let row=document.createElement('tr');
        row.className='row';
        row.innerHTML=
            ` 
            <td>${author}</td>
            <td>${title}</td>
            <td>${isbn}</td>
            <td><a class= 'delete'href="#">X</a></td>
            `
            ;
            
        booklist.appendChild(row);
        }

//remove book frm the list of the books i the table row
    static removeBook(el){
        el.parentElement.parentElement.remove();
    }

 //dispaly alertt when the book is added to the list   
    static displayAlert(message,clas){
        let form= document.querySelector('.form');
        let container=document.querySelector('.container');
        let div=document.createElement('div');
        div.setAttribute('id','alert');
        div.setAttribute('class',clas)
        div.innerHTML= `<p>${message}</p>`;
        container.insertBefore(div,form);


        setTimeout(()=>{
            document.querySelector('#alert').remove();
            },3000);
    }
//clear the table input form after submission   
    static clearInput(){
        document.querySelector('.authorinput').value='';
        document.querySelector('.titleinput').value='';
        document.querySelector('.isbninput').value='';
    }
}

// event listener for  adding books int the locaol storage after the dOm loads
document.addEventListener('load',UI.bookStore());
//Event listener for displaying the book in the table
document.querySelector('.form').addEventListener('submit',(e)=>{
    let author=document.querySelector('.authorinput').value;
    let title=document.querySelector('.titleinput').value;
    let isbn=document.querySelector('.isbninput').value;
    let book= {'author':author,'title': title,'isbn':isbn};
    
  
    if(author==''||title==''||isbn==''){
        UI.displayAlert('Please fill out the whole form motherfucker','danger');
                
    }else{
          // add book to book store
    Store.addBookToStore(book);
      // add book to display list 
      UI.displayBook(book);
        //display alert and cleart the input form
        
        UI.displayAlert('delivered successfully','success');
        //add eventListener to Remove book from the local storage
    document.querySelectorAll('.delete').forEach((el,index)=>{
        el.addEventListener('click',(e)=>{ 
            Store.removeBookFromStore(e.target.parentElement.previousElementSibling.textContent);
        })

    })


    }


    //cleart the texts
    UI.clearInput();

e.preventDefault();
})




//add event listner for removing dummy books
 document.querySelector('.table').addEventListener("click",(e)=>{
    if(e.target.classList.contains('delete')){
        UI.removeBook(e.target);
    } 
 })
















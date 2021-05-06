showNotes();
let addBtn=document.getElementById('addBtn');



addBtn.addEventListener('click',function(e){
        let addTxt = document.getElementById("addTxt");
        let addTitle = document.getElementById("addTitle");
        let notes =localStorage.getItem("notes");
        if(notes==null)
        {
                notesObj=[] ;
        }
        else{
                notesObj=JSON.parse(notes);
        }
        let myObj={
                title:addTitle.value,
                text:addTxt.value
        }
  
        notesObj.push(myObj);
        localStorage.setItem("notes",JSON.stringify(notesObj));
        addTxt.value="";
        addTitle.value="";
       showNotes();
});

function showNotes()
{
        let notes =localStorage.getItem("notes");
         if (notes == null) 
         {
		notesObj = [];
	} 
        else 
        {
	        notesObj = JSON.parse(notes);
	}
        let html="";
        notesObj.forEach(function(element,index) {
                html += `   <div class=" noteCard my-2 mx-2 card " style="width: 18rem;">
                                               
                                                <div class="card-body">
                                                        <h5 class="card-title"> ${element.title}</h5>
                                                        <p class="card-text">${element.text}</p>
                                                        <div class="d-flex flex-row justify-content-between">
                                                                <button id="${index}" onclick="deleteNote(this.id)" class=" btn btn-primary">Delete</button>
                                                                <button id="${index}" onclick="bookmarkNote(this.id)"class=" btn btn-primary"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi       bi-bookmarks" viewBox="0 0 16 16">
                                                                <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"/>
                                                                <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"/>
                                                                </svg></i></span></button>
                                                        </div>
                                                </div>
                                        </div>`;
        });
        let notesElm=document.getElementById('notes');
        if(notesObj.length!=0)
        {
                notesElm.innerHTML=html;
        }
        else
        {
                notesElm.innerHTML=`Nothing to Show!`
        }
}

function deleteNote(index)
{
       let notes = localStorage.getItem("notes");
			if (notes == null) {
				notesObj = [];
			} else {
				notesObj = JSON.parse(notes);
			}
                notesObj.splice(index,1);
                 localStorage.setItem("notes", JSON.stringify(notesObj));
                showNotes(); 
}

function bookmarkNote(impNum)
{
       
        let noteCards = document.querySelectorAll(".noteCard");
        noteCards[impNum].classList.toggle("changeBg");
       

        
}

let search = document.getElementById("searchTxt");
search.addEventListener("input",function()
{
        let inputVal=search.value;
       
        let noteCards=document.getElementsByClassName('noteCard');
      
        Array.from(noteCards).forEach(function(element)
        {
                        let cardTxt=element.getElementsByTagName("p")[0].innerText;
                        let cardTitle=element.getElementsByTagName("h5")[0].innerText;
                        
                        if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal))
                        {
                                element.style.display="block";
                        }
                        else
                        {
                                element.style.display ="none";
                        }
        })
})
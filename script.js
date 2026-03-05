const notesContainer = document.querySelector(".notes-container");
const createBtn  = document.querySelector(".btn");

// Load notes from localStorage
function showNotes(){
    let notes = JSON.parse(localStorage.getItem("notes") || "[]"); // get array or empty
    notesContainer.innerHTML = ""; // clear container

    notes.forEach(text => {
        const inputBox = document.createElement("p");
        inputBox.className = "input-box";
        inputBox.setAttribute("contenteditable","true");
        inputBox.textContent = text;

        const img = document.createElement("img");
        img.src = "bin.png";
        img.alt = "delete";

        inputBox.appendChild(img);
        notesContainer.appendChild(inputBox);
    });

    addKeyupListeners(); // attach keyup events
}

// Update localStorage
function updateStorage() {
    const notes = [];
    document.querySelectorAll(".input-box").forEach(p => {
        notes.push(p.textContent);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Add new note
createBtn.addEventListener("click", ()=>{
    const inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable","true");

    const img = document.createElement("img");
    img.src = "bin.png";
    img.alt = "delete";

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    addKeyupListeners(); // attach keyup events for the new note
    updateStorage();
});

// Delete note and handle keyup for updates
notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Attach keyup event to update storage when typing
function addKeyupListeners(){
    document.querySelectorAll(".input-box").forEach(nt => {
        nt.onkeyup = function(){
            updateStorage();
        }
    });
}

// Initial load
showNotes();
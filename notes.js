const fs=require('fs')
const chalk = require('chalk')

const addNote=(title, body)=>{
    const notes=loadNotes()
    //check if same title using the filter fn
    //const duplicateNotes = notes.filter((note)=> note.title === title)
    // if(duplicateNotes.length===0){
    //     notes.push({
    //         title: title,
    //         body : body
    //     })
    //     saveNotes(notes)
    //     console.log(chalk.green.inverse("New note added"))    
    // }
    // else{
    //     console.log(chalk.red.inverse("Note title taken"))
    // }

    //check if same title using the find fn. stops after finding same title and returns the note
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote) //if not found, add the new note
    {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
    }
    else{
        console.log(chalk.red.inverse("Note title taken"))
    }
}

const removeNote=(title)=>{
    //load all the notes
    const notes = loadNotes()
    //filter out all the notes which do not have the same title
    const notesToKeep = notes.filter((note)=> note.title !== title)
    //if a note with the same title is not found
    if(notes.length === notesToKeep.length){
        console.log(chalk.white.bgRed.bold("Note not found"))
    }
    //if a note with the same title is found
    else if(notes.length > notesToKeep.length){
        //rewrite the notes array
        saveNotes(notesToKeep)
        console.log(chalk.white.bgGreen.bold("Note removed"))
    }
}
const listNotes = () =>{
    const notes = loadNotes()
    console.log(chalk.yellow.inverse("Your notes"))
    var counter = 1
    notes.forEach((note) => {
        console.log(chalk.green.inverse(counter) +"."+chalk.blue.inverse("Title") + " : "+ chalk.white.inverse(note.title))
        counter=counter+1
    })   
}

const readNote = (title) => {
    const notes = loadNotes()
    const selectedNote = notes.find((note) => note.title === title)
    if(selectedNote){
            console.log(chalk.white.inverse("Your note says..."))
            console.log(chalk.yellow.inverse(selectedNote.title))
            console.log(selectedNote.body)
    }
    else{
        console.log(chalk.red.inverse("Note not found"))
    }
}

const saveNotes=(notes)=>{
    const notesJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const loadNotes = () => {
    try{
    const dataBuffer=fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    const data=JSON.parse(dataJSON)
    return data
        }
    catch(e){
        return []
    }
    
}
module.exports={
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
    }
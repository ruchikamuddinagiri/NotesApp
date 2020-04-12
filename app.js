const fs = require('fs')
const notes = require('./notes.js')


//******Yargs package*/
const yargs= require('yargs')
//add, read, remove, list commands 
//add command
yargs.command(
    {
        command: 'add',
        describe: 'add a new note',
        builder: {
                title: {
                    describe:'Note title',
                    demandOption: true,
                    type: 'string'
                },
                body:{
                    describe:'Body of the note',
                    demandOption:true,
                    type:'string'

                }
        },
        handler(argv){
            notes.addNote(argv.title, argv.body)
        }
    }
)
//remove command
yargs.command({
    command:'remove',
    describe:'remove a note',
    builder:{
        title: {
            describe:'title of the note',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//read command
yargs.command({
    command:'read',
    describe:'reading a note',
    builder:{
        title:{
            describe: 'title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
        //console.log('Reading a note')
    }

})

//list command
yargs.command({
    command:'list',
    describe:'List the notes',
    handler(){
        notes.listNotes()
    }
})
yargs.parse()

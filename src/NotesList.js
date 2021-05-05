import { faSync, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './NotesList.css';
import { apiUrl } from './strings';
import Note from './Note';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState(new Set());
    const [refreshNotes, setRefreshNotes] = useState(true);
    const [openedNote, setOpenedNote] = useState(null);

    useEffect(() => {
        if (refreshNotes) {
            fetch(`${apiUrl}/notes`)
                .then(res => res.json())
                .then(data => setNotes(data))
                .finally(() => setRefreshNotes(false));
        }

    }, [refreshNotes]);

    return (
        <>
            <div className="notes-list-container">
                <button className="icon-button" onClick={() => setRefreshNotes(true)}>
                    <FontAwesomeIcon icon={faSync} color="white" spin={refreshNotes} />
                </button>
                <div className="notes-list">
                    {
                        notes.map((note, i) =>
                            <div className="note-row" key={i}
                            onClick={e => {
                                console.log();
                                if (e.target.closest('#delete-note-button') !== null) {
                                    console.log('Delete Note Here');
                                } else {
                                    setOpenedNote({title: note.title, body: note.body});
                                }
                            }}>
                                <input id={`selected-note-${i}`} type="checkbox" checked={selectedNotes.has(i)} onChange={e => {
                                    const setCopy = new Set(selectedNotes);
                                    if (setCopy.has(i))
                                        setCopy.delete(i);
                                    else
                                        setCopy.add(i);
                                    setSelectedNotes(setCopy);
                                }} />
                                <span>{note.title}</span>
                                <button id="delete-note-button" className="icon-button end-button">
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                </button>
                            </div>)
                    }
                </div>
            </div>
            {
                openedNote ? <Note title={openedNote.title} body={openedNote.body} /> : null
            }
        </>
    );
};

export default NotesList;
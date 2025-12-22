import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [searchNote, setSearchNote] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8001/notes")
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data");
          }
          return res.json();
        })
        .then((data) => {
          setNotes(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, []);

  const handleDelete = (noteId) => {
    fetch("http://localhost:8001/notes/" + noteId, {
      method: "DELETE",
    })
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const searchedNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchNote.toLowerCase()) ||
      note.text.toLowerCase().includes(searchNote.toLowerCase())
  );

  const filteredNotes = searchedNotes.filter((note) => {
    if (selectedTag === "all") return true;
    return note.tag === selectedTag;
  });

  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      <div className="search-bar">
        <input
          type="text"
          value={searchNote}
          onChange={(e) => setSearchNote(e.target.value)}
        />
      </div>
      <div className="filters-btn">
        <button onClick={() => setSelectedTag("all")}>All</button>
        <button onClick={() => setSelectedTag("private")}>Personal</button>
        <button onClick={() => setSelectedTag("job")}>Job</button>
      </div>
      <div className="notes-list">
        {filteredNotes.map((note) => (
          <div className="note-preview" key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.text}</p>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="btn">
        <Link to="/add-note">
          <button className="add-note-btn">+</button>
        </Link>
      </div>
    </div>
  );
};

export default NotesList;

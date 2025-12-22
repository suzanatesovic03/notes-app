import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tag, setTag] = useState("private");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = { title, text, tag };
    setIsPending(true);
    fetch("http://localhost:8001/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    }).then(()=>{
        setIsPending(false);
        history.push('/');
    })
  };

  return (
    <div className="add">
      <h2>Add a New Note</h2>
      <form onSubmit={handleSubmit}>
        <label>Note title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Note text:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <label>Note tag:</label>
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="private">Personal</option>
          <option value="job">Job</option>
        </select>
        {!isPending && <button>Add note</button>}
        {isPending && <button disabled>Adding note...</button>}
      </form>
    </div>
  );
};

export default AddNote;

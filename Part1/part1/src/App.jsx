import { useEffect, useState } from "react";
import noteService from "./services/notes";
import './index.css'

const App = () => {

  const [phonebook, setPhonebook] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStyle, setErrorStyle] = useState("");

  let timeout

  useEffect(() => {
    noteService.getAll().then(response => {
      setPhonebook(response);
    });
  }, []);

  const Notification = ({message, style}) => {

    if (message === "")
      return;

      return (
          <div className={style}>
              {message}
          </div>
      )
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingEntry = phonebook.find(entry => entry.name === newName);
    if (existingEntry) {
      const updatedEntry = { ...existingEntry, number: newNumber };
      noteService.update(existingEntry.id, updatedEntry).then(response => {
        setPhonebook(phonebook.map(entry => 
          entry.id !== existingEntry.id ? entry : response))
        setNewName("")
        setNewNumber("")

        setErrorMessage("User successfully added!")
        setErrorStyle("success") 

        timeout = setTimeout(() => {
          setErrorMessage("")
          setErrorStyle("")  
        }, 2000)

      }).catch(error => {

        setErrorMessage("Error!")
        setErrorStyle("error") 

        timeout = setTimeout(() => {
          setErrorMessage("")
          setErrorStyle("")  
        }, 2000)
	  });

    clearTimeout(timeout)
	  
    } else {
      const entry = { name: newName, number: newNumber };
      noteService.create(entry).then(response => {
        setPhonebook([...phonebook, response]);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDelete = (id) => {
    //if (!window.confirm("Do you want to delete this phone?")) return;

    noteService.remove(id).then(() => {
      setPhonebook(phonebook.filter(phone => phone.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification message={errorMessage} style={errorStyle}/>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            value={newName} 
            onChange={handleNameChange} 
            placeholder="Name"
          />
        </div>
        <div>
          <input 
            value={newNumber} 
            onChange={handleNumberChange} 
            placeholder="Number"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {Array.isArray(phonebook) && phonebook.map((phone, index) => (
          <li key={index} className="note">
            {phone.name} {phone.number}
            <button className="deleteButton" onClick={() => handleDelete(phone.id)}>delete</button>
          </li>
        ))}
      </ul> 
    </div>
  );
};

export default App;

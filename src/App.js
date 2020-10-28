import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const data = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS " + Date.now(),
      techs: ["React", "Node.js", repositories.length],
    }
    api.post('repositories', data).then(res => {
      setRepositories([...repositories, res.data])
    })
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(r => r.id === id)

    if (repositoryIndex < 0) {
      alert('Not found')
    }

    api.delete(`repositories/${id}`).then(res => {
      repositories.splice(repositoryIndex, 1)

      setRepositories([...repositories])
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

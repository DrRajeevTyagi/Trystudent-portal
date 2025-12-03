import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GreetingCard from './GreetingCard'
import StudentList from './StudentList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Welcome to Student Portal!</h1>
      <p style={{ fontSize: '1.2em', color: '#61dafb' }}>
        Built by a Physics Principal learning to code! 🎓
      </p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          You've clicked {count} times!
        </button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '10px' }}>
          Reset
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
        <GreetingCard 
          name="Principal"
          role="School Leader & Learner"
          message="Excited to build amazing web applications!"
        />
        <GreetingCard 
          name="Student"
          role="Future Innovator"
          message="Ready to learn and explore new technologies!"
        />
        <GreetingCard 
          name="Teacher"
          role="Knowledge Guide"
          message="Empowering students through education!"
        />
      </div>

      <hr style={{ margin: '40px 0', border: '1px solid #646cff' }} />
      
      {/* This component fetches data from backend! */}
      <StudentList />
    </>
  )
}

export default App


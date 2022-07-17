import { useState } from 'react'
import Header from './components/header'
import Card from './components/card'

function App() {

  return (
    <>
      <Header></Header>
      <main>
        <section id="sales">
          <div className="dsmeta-container">
              <Card/>
          </div>
        </section>
      </main>
    </>
  )
}

export default App

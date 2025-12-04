import { Button } from '../src/components/Button'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>UIForge Component Library</h1>
        <p>A rich user interface library for ReactJS developers</p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>Button Component</h2>
          
          <div className="demo-group">
            <h3>Variants</h3>
            <div className="button-group">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
            </div>
          </div>

          <div className="demo-group">
            <h3>Sizes</h3>
            <div className="button-group">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </div>

          <div className="demo-group">
            <h3>States</h3>
            <div className="button-group">
              <Button>Enabled</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <div className="demo-group">
            <h3>Interactive</h3>
            <div className="button-group">
              <Button onClick={() => alert('Button clicked!')}>
                Click Me!
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Open Source • MIT License • Made with ❤️</p>
      </footer>
    </div>
  )
}

export default App

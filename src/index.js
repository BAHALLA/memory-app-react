import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import RegisterServiceWorker from "./RegisterServiceWorker";

ReactDOM.render(<App />, document.getElementById('root'))
RegisterServiceWorker()

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { createStore } from './store/createStore'
import { Provider } from 'react-redux'
import history from './utils/history'
const root = ReactDOM.createRoot(document.getElementById('root'))
const store = createStore()

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// )

root.render(
  <Router history={history} >
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
)

reportWebVitals()

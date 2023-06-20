import React from 'react'
import ReactDOM from 'react-dom/client'
import './tailwind.css'
import './style.css'
import AppRoutes from './AppRoutes.tsx'
import { Provider } from 'react-redux'
import store from './store/index.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>

        <AppRoutes />

    </Provider>
)

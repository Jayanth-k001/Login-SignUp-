import {Header} from './components/header.js'
import {Login} from './components/login.js'
import {Routes,Route} from 'react-router-dom'
import {Signup} from './components/signup.js'
import {Dashboard} from './components/Dashboard.js'
import { Error } from './components/error.js'


function App() {
  return (
    <>
       
       <Header/>
       <Routes>
        <Route path='/' element={ <Login/>}/> 
        <Route path='/register' element={<Signup/>}/>
        <Route path='/dash'element={<Dashboard/>}/>
        <Route path='/*'element={<Error/>}/>
       </Routes>
    

    </>
  );
}

export default App;

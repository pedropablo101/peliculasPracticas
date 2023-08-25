import { useState } from 'react'
import './Appe.css'
import usePeticionPelis from './custom/usePeticionPelis'
import { Movies } from './components/Movies';
const App = ()=> {
const {handleSubmit,peliculas,loading,error,handleChange}=usePeticionPelis();

  return(
    <div className='page'>
      <header>
        <form className='form' onSubmit={handleSubmit}>
            <input type='text' onChange={handleChange} name='buscar' placeholder='Movie Name'/>
            <button type='submit' className='btn btn-success'>Enviar</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>
      <main>
        {loading ? <p>Cargando...</p>:<Movies movies={ peliculas}/> }
      </main>
    </div>
  )
}

export default App

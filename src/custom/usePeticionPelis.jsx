import React, { useCallback, useState,useEffect,useRef } from 'react';
import GeturlPelis from '../services/GeturlPelis';
import debounce from 'just-debounce-it'

 export default function usePeticionPelis() {
    const [movies,setMovies]  =useState();
    const {search,updateSearch,error}= useSearch();
    const {getMovies,loading,peliculas } = useMovies({search})
    // const handleChange = useCallback(async(event)=>{
    //    // setLoading(true)
    //     event.preventDefault();
    //     const send = event.target.value;
    //     updateSearch(send);
    //     const pelis = await GeturlPelis(send);
    //     setMovies(pelis)
    //     //setLoading(false)
    //   },[]);
    const handleSubmit = (event) => {
        event.preventDefault()
        getMovies({ search })
      }
      const handleChange = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        const newSearch = event.target.value
        updateSearch(newSearch)
        debouncedGetMovies(newSearch)
      }
      const debouncedGetMovies = useCallback(
        debounce(search => {
          console.log('search', search)
          getMovies({ search })
          //setMovies(peliculas)
        }, 500)
        , [getMovies]
      )

return {handleSubmit,peliculas,loading,error,handleChange}
}


export function useSearch(){
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)
  
    useEffect(() => {
      if (isFirstInput.current) {
        isFirstInput.current = search === ''
        return
      }
  
      if (search === '') {
        setError('No se puede buscar una película vacía')
        return
      }
  
      if (search.match(/^\d+$/)) {
        setError('No se puede buscar una película con un número')
        return
      }
  
      if (search.length < 3) {
        setError('La búsqueda debe tener al menos 3 caracteres')
        return
      }
  
      setError(null)
    }, [search])
  
    return { search, updateSearch, error }
  }
  
  function useMovies ({search}) {
    const previousSearch = useRef(search)
    const {updateSearch,error}= useSearch();
    const [loading,setLoading] = useState(false);
    const [peliculas,setpeliculas] = useState()
    const getMovies = useCallback(async ({ search }) => {

      try {
        console.log('**buscando**',search)
        const newMovies = await GeturlPelis( {search} )
        setpeliculas(newMovies)
      } catch (e) {
        //setError(e.message)
        console.error(e.message)
      } finally {
        // tanto en el try como en el catch
        //setLoading(false)
      }
    }, [])
  
    // const sortedMovies = useMemo(() => {
    //   return sort
    //     ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    //     : movies
    // }, [sort, movies])
  
    return { getMovies,loading,peliculas }
  }

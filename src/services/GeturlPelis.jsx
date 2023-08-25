import React from 'react';
const apikey="eb86c4b2"
export default async function GeturlPelis(props) {
    console.log(props,'properties')
    // if(props==='') return null;
    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${props.search}`);
        const data = await response.json();
        
        const movies = data.Search;
        return movies?.map( movie=> ({
            id:movie.imdbID,
            title:movie.Title,
            year:movie.Year,
            image:movie.Poster
            
        }));

    }catch (err){
        console.error('Error al hacer Fetching',err);
        return null;
    }
   
}

//xport default GeturlPelis;



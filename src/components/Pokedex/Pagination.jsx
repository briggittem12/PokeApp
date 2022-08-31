import React, {useState} from 'react'

const Pagination = ({ allPokemons, setSearchPoke, offset, limit, setOffset }) => {

    const pageNums = [];
    let pokemonsPerPage = 20;

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNums.push(i)
    }

    const section = [];
    const longitudeSection = 6;
    for (let i = 0; i < pageNums.length; i += longitudeSection) {
        let fragment = pageNums.slice(i, i + longitudeSection);
        section.push(fragment)
    }
    const firstIndexfragment = section.length;
    const [currPage, setCurrPage] = useState(0);

    const handleNext = (e) => {
        if (currPage < firstIndexfragment - 1) {
            setCurrPage(currPage + 1)
        }
    }
    const handlePrevious = (e) => {
        if (currPage > 0) {
            setCurrPage(currPage - 1)
        }
    }
    const handleOffset = (e) => {
        const pageNum = Number(e.target.innerHTML);
        for (let i = 0; i < pageNums.length; i++) {
            if (pageNums[i] === pageNum) {
                setOffset(offset = i * limit)
            }
        }
    }
    const firstpage = (e) => {
        setOffset(offset = 0)
        setCurrPage(0)
    }
    const finalPage = (e) => {
        setOffset(offset = (pageNums.length - 1) * limit)
        setCurrPage(firstIndexfragment - 1)
    }
    const handleBack = (e) => {
        setSearchPoke('')
    }
    if (allPokemons) {
        return (
            <ul>
              <button className={currPage > 0 ? "btn-firstpage": "btn-off"} onClick={firstpage}>First Page</button>
              <button className={currPage > 0 ? "btn-less": "btn-off"} onClick={handlePrevious}>...</button>
          {
              section[currPage]?.map((fragment) => (
                  <li key={fragment}><button className='btn_pag' type='submit' onClick={handleOffset}>{fragment}</button></li> 
                  ))
                  
          }
              <button className={currPage == firstIndexfragment-1 ? "btn-off": "btn-more"} onClick={handleNext}>...</button>
              <button className={currPage == firstIndexfragment-1 ? "btn-off": "btn-lastPage"} onClick={finalPage}>Last Page</button>
          </ul>
        )

    } else {
        return (
            <ul>
                <button className="btn-back" onClick={handleBack}>Go Back</button>
            </ul>
        )
    }

}

export default Pagination
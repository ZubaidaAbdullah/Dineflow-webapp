import React from 'react'
import styled from 'styled-components';
import './orders.css';


// Rest of your Search.js component


function Search() {
  return (
    <Searchbar>
      <div className='searchbar'>
        <Magnifier src={require('../../assets/Ordersimgs/magnifier.svg').default} alt="Magnifier Icon" />
        <input placeholder='Search' />
      </div>
    </Searchbar>
  )
}

export default Search;

const Searchbar = styled.div`
width: 95%;
height: 50px;
display:flex;
border-radius: 8px;
background: #FCFCFC;
box-shadow: 0px 1px 5px 0px #0000001A;
align-items: center;
margin-left:31px;
margin-top:25px;
margin-left:10px;

`
const Magnifier = styled.img`
width: 13px;
height: 13px;
border: 1.5px;

`
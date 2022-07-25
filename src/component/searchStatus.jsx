import React from 'react'

const SearchStatus = ({number}) => {

  if(number === 0){
    return <h3>
      <span className = "badge bg-danger">Никто с тобой не тусанет</span>
    </h3>
  }

  const lastNumber = (number % 10)
  let count = ''

  if(number >= 5 && number <= 20){

    count = `${number} человек тусанет`

  }else if(lastNumber === 1 || lastNumber === 0){

    count = `${number} человек тусанет`

  }else if(lastNumber === 2 || lastNumber === 3 || lastNumber === 4){

    count = `${number} человека тусанут`
  }else{

    count = `${number} человек тусанет`
  }

  return <h3>
    <span className = "badge bg-primary">{count} с тобой сегодня</span>
  </h3>

  }

  export default SearchStatus

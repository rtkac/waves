import React from 'react';
import Card from './Card';

const CardBlockShop = (props) => {

  const renderCards = () => (
    props.list ? (
      props.list.map(item => (
        <Card
          key={item._id}
          {...item}
          grid={props.grid}
        />
      ))
    ) : (
      null
    )
  )
  
  return (
    <div className="card_block_shop">
      <div>
        <div>
          {props.list ? (
            props.list.length === 0 ? (
              <div className="no_results">
                No results
              </div>
            ) : (
              renderCards(props.list)
            )
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  )
}

export default CardBlockShop;
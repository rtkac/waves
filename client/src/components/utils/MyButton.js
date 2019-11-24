import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyButton = (props) => {

  const createButton = () => {
    let template = '';
    
    switch(props.type) {
      case 'submit':
        template = props.title;
      break;
      case 'link':
        template = (
          <Link
            to={props.to}
            style={{...props.addLinkStyles}}
          >
            {props.title}
          </Link>
        )
      break;
      case 'cart_small':
        template = (
          <FontAwesomeIcon icon="shopping-cart" className="icon" />
        )
      break;
      default:
        template = '';
    }

    return template;
  }

  return (
    <Button
      variant={props.variant}
      size={props.size}
      disabled={props.disabled}
      color={props.color}
      onClick={props.submit ? (event) => props.submit(event) : (props.runAction ? () => props.runAction() : null)}
      type={props.type === 'submit' ? 'submit' : 'button'}
      style={{...props.addStyles}}
    >
      {createButton()}
    </Button>
  )
}

export default MyButton;
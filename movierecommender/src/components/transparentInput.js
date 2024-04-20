import react from 'react';
import styles from '../styles/transparentInput.module.css';

function TransparentInput(props) {
    const { type = 'text' } = props;
  return (
    <>
    <input className={styles.transparent_input} type={props.type} name={props.name} placeholder={props.placeholder} 
    />
    </>
  );
}

export default TransparentInput;
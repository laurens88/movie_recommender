import react from 'react';
import styles from '../styles/transparentInput.module.css';

function TransparentInput(props) {
    const { type = 'text', name, placeholder, value, onChange} = props;
  return (
    <>
    <input className={styles.transparent_input}
           type={type}
           name={name}
           placeholder={placeholder}
           value={value}
           onChange={onChange}
    />
    </>
  );
}

export default TransparentInput;
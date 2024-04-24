import React from 'react';
import styles from '../styles/transparentTextArea.module.css';

function TextArea(props) {
  return (
    <textarea className={styles.transparent_area}
      style={{
        width: '100%',      // Makes the textarea full width of its container
        height: '200px',    // Sets an initial height
        padding: '10px',    // Adds some padding inside the textarea
        fontSize: '16px',   // Sets a readable font size
        lineHeight: '1.5',  // Increases line height for better readability
        border: '1px solid #ccc',  // Adds a light border
        borderRadius: '5px',       // Optionally rounds the corners
        boxSizing: 'border-box',   // Includes padding and border in the width and height
        resize: 'vertical'         // Allows resizing vertically only
      }}
      placeholder= {props.placeholder}
      onChange={props.onChange}  // Assuming you want to handle changes
      value={props.value}        // Assuming you want to display a value
    />
  );
}

export default TextArea;

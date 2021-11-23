import React from "react";
import {Field} from "redux-form";
import styles from './FormsControl.module.css';


const FormControl = ({input, meta, children, ...props}) => {
  
  const hasError = meta.touched && meta.error;

  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : "")}>
      <div>
        {children}
      </div>
      {hasError && <span>{meta.error}</span>} 
    </div>
  )
}

export const Textarea = (props) => {
  const {input, meta, children, ...restProps} = props;
  return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
  const {input, meta, children, ...restProps} = props;
  return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

// export const Textarea = (props) => {
//   return <FormControl {...props} Formtype="textarea"></FormControl>
// }

// export const Input = (props) => {
//   return <FormControl {...props} Formtype="input"></FormControl>
// }

export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
  return (
    <div>
      <Field placeholder={placeholder} 
              name={name}
              component={component} 
              validate={validators}
              {...props}
      />{text}
    </div>
  )
} 
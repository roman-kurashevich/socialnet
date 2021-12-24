import { Field, Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { FilterType } from "../../redux/usersReducer";
import { getFilter } from "../../redux/usersSelector";


const userSearchformValidate = (values: any) => {
  const errors = {};
  return errors;
}

type PropsType = {
  // setFilter: (filter: FilterType) => void
  onPageChanged: (p: number, filter: FilterType) => void
  setPortionOfPagesNumber: (portionNumber: number) => void
}

type FormType = {
  term: string
  friend: string
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

  const filter = useSelector(getFilter)

  const submit = (values: FormType, 
    { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
      const filter: FilterType = {
        term: values.term,
        friend: values.friend === 'null' ? null : values.friend === 'false' ? false : true
      }
      
      // props.setFilter(filter)
      props.setPortionOfPagesNumber(1)
      props.onPageChanged(1, filter)
      setSubmitting(false)
  }

  return (
    <Formik
    enableReinitialize={true}
       initialValues={{term: filter.term, friend: String(filter.friend)}}
       validate={userSearchformValidate}
       onSubmit={submit}
     >
           {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" />
           <Field name="friend" as="select">
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
          </Field>
           <button type="submit" disabled={isSubmitting}>
             find
           </button>
         </Form>
       )}

     </Formik>
  )
})
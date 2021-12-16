import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { createField, GetStringKeys, Textarea } from "../common/FormsControls/FormsControls";
import { NewMessageFormValuesType } from "./Dialogs";




const maxLength12 = maxLengthCreator(12)

export type MessageFormValuesTypeKeys = GetStringKeys<NewMessageFormValuesType>;
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
      {createField<MessageFormValuesTypeKeys>("write your message", "newMessageBody", [required, maxLength12], Textarea)}

      </div>
      <div>
        <button>send</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsType>({form: 'sendMessage'})(AddMessageForm)

export default AddMessageFormRedux;

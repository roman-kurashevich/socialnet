import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator } from "../../../utils/validators/validators";
import { createField, GetStringKeys, Textarea } from "../../common/FormsControls/FormsControls";


const maxLength30 = maxLengthCreator(30);

export type AddPostFormFormValuesType = {
  newPostText: string
}

export type AddPostFormFormValuesTypeKeys = GetStringKeys<AddPostFormFormValuesType>;
type PropsType = {}

let PostForm: React.FC<InjectedFormProps<AddPostFormFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddPostFormFormValuesTypeKeys>("What's new?", "newPostText", [maxLength30], Textarea)} 
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm<AddPostFormFormValuesType, PropsType>({
  form: "ProfileAddNewPostForm",
})(PostForm);

export default AddNewPostFormRedux;
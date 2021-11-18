import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true,
      // status: this.props.status // это вроде бы решало вопрос с синхронизацией
    })
    console.log(this.state)
  }
  deactivateEditMode = (e) => {
    this.setState({
      editMode: false,
    })
    this.props.updateStatus(this.state.status)
  }
  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({status: this.props.status})
    }
  }

  render() {

    return (
      <div>
        {!this.state.editMode && 
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || '--------'}</span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} onChange={this.onStatusChange} value={this.state.status}/>
          </div>
        }
      </div>
    )
  }
} 

export default ProfileStatus;
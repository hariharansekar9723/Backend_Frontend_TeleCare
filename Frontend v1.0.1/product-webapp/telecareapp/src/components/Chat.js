import React from 'react';
import './chat.css'
import axios from "axios";

export default class PatientRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Chat: [],
      messageContent: ''
    };

    //this.textInput = React.createRef();
  }

  componentDidMount() {
    this.handleGetData()
  }

  componentDidUpdate() {
    this.handleGetData()
  }

  handleGetData = () => {
    axios.get("http://localhost:8000/Chat").then(res => {
      //console.log(res.data)
      this.setState({
        ...this.state,
        Chat: res.data,
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.messageContent)

    axios.post("http://localhost:8000/Chat", {
      id: '',
      messageTime: "",
      messageContent: this.state.messageContent,
      senderEmail: localStorage.getItem('loginId'),
    })
      .then(function (response) {
        console.log(response);
        //this.textInput.current.value = "";
        //this.setState({ ...this.state, messageContent: "" })
        //this.textInput.current.value = "";
        // axios.get("http://localhost:8000/Chat").then(res => {
        //   console.log('rajat 2--', res.data)
        //   this.setState({
        //     Chat: res.data,
        //   })
        // })
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({
      messageContent: ''
    })
  }

  handleReply = (e) => {
    this.setState({
      messageContent: e.target.value,
    })
  }


  render() {
    return (
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-18">
              <div className="card card-bordered">
                <div className="card-header">
                  <img className="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." /> <h4 className="card-title" style={{ marginRight: '800px' }}>Pavan</h4> <a className="btn btn-xs btn-secondary" href="#" data-abc="true" style={{ marginLeft: '-200px' }}>{localStorage.getItem('loginId')}</a>
                </div>
                <div className="ps-container ps-theme-default ps-active-y" id="chat-content" style={{ overflowY: "scroll !important", maxHeight: "400px !important" }}>

                  <div className="media media-chat media-chat-reverse" style={{ overflowY: 'scroll', maxHeight: '300px' }}>
                    <div className="media-body" >
                      {this.state.Chat.map((msg, idx) => {
                        return (
                          <div key={idx} style={{ wordBreak: "break-word" }}>
                            <p style={msg.senderEmail == localStorage.getItem('loginId') ? { marginLeft: '50%', width: '40%', textAlign: 'center' } : { marginRight: '500px', backgroundColor: '#f5f6f7', color: 'black', width: '40%', textAlign: "center" }}>{msg.messageContent}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="media media-chat">

                  </div>
                  <div className="media media-chat media-chat-reverse">

                  </div>
                  <div className="media media-chat">

                  </div>
                </div>
                <div className="media media-chat media-chat-reverse">

                </div>
                <div className="media media-chat">

                </div>
                <div className="media media-chat media-chat-reverse">

                </div>
                <div className="ps-scrollbar-x-rail" style={{ left: "0px", bottom: "0px" }}>
                  <div className="ps-scrollbar-x" tabindex="0" style={{ left: "0px", width: "0px" }}></div>
                </div>
                <div className="ps-scrollbar-y-rail" style={{ top: "0px", height: "0px", right: "2px" }}>
                  <div className="ps-scrollbar-y" tabindex="0" style={{ top: "0px", height: "2px" }}></div>
                </div>
              </div>
              <div className="publisher bt-1 border-light" style={{ marginTop: '-30px' }}>

                {/* <img className="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." /> */}

                <input className="publisher-input" type="text" placeholder="Write something" onChange={this.handleReply} value={this.state.messageContent} />

                <span className="publisher-btn file-group"> <i className="fa fa-paperclip file-browser"></i>

                  <input type="file" /> </span>

                <a className="publisher-btn text-info" href="#" data-abc="true"><i className="fa fa-paper-plane" onClick={this.handleSubmit}></i></a> </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

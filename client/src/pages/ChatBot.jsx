import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import TypeWriter from 'typewriter-effect';
import { chatCompletion } from '../api/chat.api';
import "../components/LandingPage/static/css/chat.css"
import {
  CircularProgress
} from '@mui/material';

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const messageType = {
  answer: 'answer',
  question: 'question'
};

class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector('.chatbox__button'),
      chatBox: document.querySelector('.chatbox__support'),
    }


 
  }

  display() {
    const { openButton, chatBox } = this.args;

    openButton.addEventListener('click', () => this.toggleState(chatBox));
    

    
  }

  toggleState(chatbox) {
    this.state = !this.state;

    // show or hide the box
    if (this.state) {
      chatbox.classList.add('chatbox--active');
    } else {
      chatbox.classList.remove('chatbox--active');
    }
  }

}

const HomePage = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const inputRef = useRef();
  const chatWrapperRef = useRef();

  const [onRequest, setOnRequest] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);

  const getAnswer = async () => {
    if (onRequest) return;

    const newMessages = [
      ...messages,
      {
        type: messageType.question,
        content: question
      }
    ];

    setMessages(newMessages);
    setQuestion('');
    setOnRequest(true);

    const { response } = await chatCompletion({ prompt: question });

    if (response) {
      setMessages([
        ...newMessages,
        {
          type: messageType.answer,
          content: response.text
        }
      ]);
    }

  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) getAnswer();
  };



  useEffect(() => {
    setTimeout(() => {
      chatWrapperRef.current.addEventListener('DOMNodeInserted', (e) => {
        e.currentTarget.scroll({
          top: e.currentTarget.scrollHeight,
          behavior: 'smooth'
        });
      });
    }, 200);

    const chatbox = new Chatbox();
    chatbox.display();
  }, []);

  return (
    <div className="container">
      <div className="chatbox">
        <div className="chatbox__support">
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
            </div>
            <div className="chatbox__content--header">
              <h2 className="chatbox__description--header">Welcome to our chatbox!<br />
                We are here to help you with any questions you may have.</h2>
            </div>
          </div>
          <div ref={chatWrapperRef} className="chat-box">
            {messages.map((item, index) => (
              <div key={index} className="chatbox__message">
                <div className={`chatbox__message-content ${item.type === messageType.answer ? 'answer' : 'question'}`}>
                  {index === messages.length - 1 ? (
                    item.type === messageType.answer ? (
                      <TypeWriter
                        onInit={(writer) => {
                          writer
                            .typeString(item.content)
                            .callFunction(() => {
                              document.querySelector('.Typewriter__cursor').style.display = 'none';

                              setOnRequest(false);
                              setTimeout(() => {
                                inputRef.current.focus();
                              }, 200);
                            })
                            .changeDelay(50)
                            .start();
                        }}
                      />
                    ) : (
                      item.content
                    )
                  ) : (
                    item.content
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="chatbox__footer">
            <input
              type="text"
              placeholder="Write a message..."
              id="message-input"
              ref={inputRef}
              disabled={onRequest}
              onKeyUp={onEnterPress}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button className="chatbox__send--footer send__button" id="send-btn" onClick={getAnswer}>
              {onRequest ? <CircularProgress size="1.5rem" /> : <SendOutlinedIcon />}
            </button>
          </div>
        </div>
        <div className="chatbox__button">
          <button>
            <img src="chatbox-icon.svg" alt="chatbox-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

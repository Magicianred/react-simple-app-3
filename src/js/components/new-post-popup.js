import React from 'react';
import ReactDOM from 'react-dom';
import { emitter } from './app.js';


export var NewPostPopup = React.createClass({
    getInitialState: function() {
        return {
            popupIsHidden: true,
            agreeNotChecked: true,
            authorIsEmpty: true,
            titleIsEmpty: true,
            textIsEmpty: true
        };
    },

    componentDidMount: function() {
        var self = this;
        emitter.addListener('OpenPopupBtnClick', function() {
            self.openPopup();
        });
    },

    onFieldChange: function(fieldName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({[fieldName]: false})
        } else {
            this.setState({[fieldName]: true})
        }
    },

    onBtnClickHandler: function(e) {
        e.preventDefault();

        var authorElem = ReactDOM.findDOMNode(this.refs.author);
        var titleElem = ReactDOM.findDOMNode(this.refs.title);
        var textElem = ReactDOM.findDOMNode(this.refs.text);
        var checkElem = ReactDOM.findDOMNode(this.refs.check);

        // Изображение заметки генерируем случайно
        var img = Math.floor(Math.random() * 9) + 1;

        var item = [{
            img: img,
            author: authorElem.value,
            text: textElem.value,
            title: titleElem.value
        }];

        emitter.emit('AddPost', item);

        // Очищаем форму после добавления заметки
        authorElem.value = "";
        textElem.value = "";
        titleElem.value = "";
        checkElem.checked = false;

        this.setState({
            popupIsHidden: true,
            authorIsEmpty: true,
            titleIsEmpty: true,
            textIsEmpty: true,
            agreeNotChecked: true
        });
    },

    closePopup: function() {
        this.setState({ popupIsHidden: true });
    },

    openPopup: function() {
        this.setState({ popupIsHidden: false });
    },

    onCheckRuleClick: function(e) {
        this.setState({ agreeNotChecked: !this.state.agreeNotChecked });
    },

    render: function() {
        var popupIsHidden = this.state.popupIsHidden,
            agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            titleIsEmpty = this.state.titleIsEmpty,
            textIsEmpty = this.state.textIsEmpty;

        return (
            <div className={popupIsHidden ? "popup popup--hidden" : "popup"}>
                <div className="popup-block">
                    <form>
                        <input
                            type="text"
                            defaultValue=""
                            placeholder="Имя автора"
                            onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                            ref="author"
                        />

                        <input
                            type='text'
                            defaultValue=''
                            placeholder='Название заметки'
                            onChange={this.onFieldChange.bind(this, 'titleIsEmpty')}
                            ref='title'
                        />

                        <textarea
                            defaultValue=''
                            placeholder='Текст заметки'
                            rows="5"
                            onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                            ref='text'>
                        </textarea>

                        <div className="popup-block__submit-group">
                            <label>
                                <input
                                    type='checkbox'
                                    defaultChecked={false}
                                    onChange={this.onCheckRuleClick}
                                    ref='check' />
                                Я согласен с правилами
                            </label>

                            <button
                                onClick={this.onBtnClickHandler}
                                ref='button'
                                disabled={agreeNotChecked || authorIsEmpty || titleIsEmpty || textIsEmpty}>
                                Добавить заметку
                            </button>
                        </div>
                    </form>
                </div>
                <div className="popup-back" onClick={this.closePopup}></div>
            </div>
        );
    }
});
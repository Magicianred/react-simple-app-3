import React from 'react';


export var Post = React.createClass({

    propTypes: {
        data: React.PropTypes.shape({
            img: React.PropTypes.number.isRequired,
            author: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired
        })
    },

    render: function() {
        var img = this.props.data.img,
            author = this.props.data.author,
            title = this.props.data.title,
            text = this.props.data.text;

        return (
            <div className="post-item">
                <div className={"post-item__image post-item__image--" + img}></div>
                <div className="post-item__content">
                    <span className="post-item__author">{author}</span>
                    <h2 className="post-item__title">{title}</h2>
                    <p className="post-item__text">{text}</p>
                </div>
            </div>
        )
    }
});
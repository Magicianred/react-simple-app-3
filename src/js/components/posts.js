import React from 'react';
import { Post } from './post';


export var Posts = React.createClass({
    render: function() {
        var data = this.props.data;

        if (data.length > 0) {
            var postsTemplate = data.map(function(item, index) {
                return (<Post data={item} key={index}/>)
            });
        } else {
            var postsTemplate = <span className="posts__no-posts">Заметок нет :(</span>
        }

        return (
            <div className="posts">
                {postsTemplate}
            </div>
        );
    }
});
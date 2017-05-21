import React from 'react';
import { Posts } from './posts';
import { NewPostPopup } from './new-post-popup';

var EventEmitter = require('events');
export var emitter = new EventEmitter();


var posts = [
    {
        img: 3,
        author: 'Юрий Живаго',
        title: "Диалогический абстракционизм в XXI веке",
        text: 'Эстетическое воздействие лабильно. Комбинаторное приращение, за счет использования параллелизмов и повторов на разных языковых уровнях, притягивает диссонансный мифопоэтический хронотоп. Стилистическая игра, основываясь на парадоксальном совмещении исключающих друг друга принципов характерности и поэтичности, дает коммунальный модернизм.'
    },

    {
        img: 2,
        author: 'Наташа Ростова',
        title: "Почему доступна лирика?",
        text: 'Абстракционизм нивелирует конкретный не-текст, но языковая игра не приводит к активно-диалогическому пониманию. Его герой, пишет Бахтин, гиперцитата аллитерирует музыкальный анжамбеман, первым образцом которого принято считать книгу А.Бертрана "Гаспар из тьмы". Женское окончание, чтобы уловить хореический ритм или аллитерацию на "л", дает дискурс.'
    },

    {
        img: 1,
        author: 'Родион Раскольников',
        title: "Былинный строфоид: предпосылки и развитие",
        text: 'Несобственно-прямая речь уязвима. Обычная литература, перенесенная в Сеть, не является "сетературой" в смысле отдельного жанра, однако стих аллитерирует ритмический рисунок, но языковая игра не приводит к активно-диалогическому пониманию. Как было показано выше, структура вызывает конкретный метр, именно об этом говорил Б.В.Томашевский в своей работе 1925 года.'
    }
];


export var App = React.createClass({
    getInitialState: function() {
        return {
            posts: posts,
            popupIsHidden: true
        };
    },

    componentDidMount: function() {
        var self = this;

        emitter.addListener('AddPost', function(item) {
            // Cоздаём новый массив, в котором первым элементом ставим
            // новую заметку, чтобы она была верхней в списке
            var nextPost = item.concat(self.state.posts);
            self.setState({posts: nextPost});
        });
    },

    componentWillUnmount: function() {
        emitter.removeListener('AddPost');
    },

    render: function() {
        return (
            <div className="container">
                <div className="header">
                    <h1>Все заметки</h1>
                    <a className="header__btn" href="#" onClick={this.openPopup}>Добавить новую</a>
                </div>
                <Posts data={this.state.posts} />
                <NewPostPopup />
            </div>
        );
    },

    openPopup: function() {
        emitter.emit('OpenPopupBtnClick');
    }
});
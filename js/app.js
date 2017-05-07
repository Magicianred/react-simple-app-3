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


window.ee = new EventEmitter();


var Posts = React.createClass({
    render: function() {
        var data = this.props.data;

        if (data.length > 0) {
            var postsTemplate = data.map(function(item, index) {
                return (<Post data={item} key={index}/>)
            });
        } else {
            var postsTemplate = <p>Заметок нет</p>
        }

        return (
            <div className="posts">
                {postsTemplate}
            </div>
        );
    }
});


var Post = React.createClass({

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


var App = React.createClass({
    getInitialState: function() {
        return {
            posts: posts
        };
    },

    render: function() {
        return (
            <div className="container">
                <h1>Все заметки</h1>
                <Posts data={this.state.posts} />
            </div>
        );
    }

});


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

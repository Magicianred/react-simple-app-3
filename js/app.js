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


var NewPostPopup = React.createClass({
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
        window.ee.addListener('OpenPopupBtnClick', function() {
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

        window.ee.emit('AddPost', item);

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
        this.setState({popupIsHidden: true});
    },

    openPopup: function() {
        this.setState({popupIsHidden: false});
    },

    onCheckRuleClick: function(e) {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
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


var App = React.createClass({
    getInitialState: function() {
        return {
            posts: posts,
            popupIsHidden: true
        };
    },

    componentDidMount: function() {
        var self = this;

        window.ee.addListener('AddPost', function(item) {
            // Cоздаём новый массив, в котором первым элементом ставим
            // новую заметку, чтобы она была верхней в списке
            var nextPost = item.concat(self.state.posts);
            self.setState({posts: nextPost});
        });
    },

    componentWillUnmount: function() {
        window.ee.removeListener('AddPost');
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
        window.ee.emit('OpenPopupBtnClick');
    }
});


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

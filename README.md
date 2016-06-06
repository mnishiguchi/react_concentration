# React concentration

Sometimes just called "Memory", it's a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. If you get all the matching cards, you've won!

Configured based on [react-intro](https://github.com/ga-wdi-lessons/react-intro) tutorial by GA.


### Usage

```bash
$ npm install
```

```bash
$ npm start
$ open http://localhost:8080
```

```bash
$ git deploy # Deploying the dist directory to GitHub Pages
```

### [Deploying a subfolder to GitHub Pages](https://gist.github.com/cobyism/4730490)

```bash
# Deploying a subfolder to GitHub Pages
$ git subtree push --prefix dist origin gh-pages
```

```bash
# Delete a remote branch
$ git push origin :gh-pages
```

### User story guideline

```
As a <role>, I want to <goal>, so that <reason>
```

```
Bronze - Your Minimum Viable Product (MVP)

  The bare necessities to be functional and meet requirements.
  Does it meet the business requirements in order to start an effective feedback loop?

Silver

  Improve user experience
  What can we push to the next iteration? Where can we add value?

Gold

  Nice-to-haves
  Next steps to maximize return on investment (ROI).
```

### User stories

#### Bronze

- As a user, I want to start the game by clicking a button so that I have control over when to start it.
- As a user, I want to stop the game by clicking a button so that I can stop it whenever I want.
- As a user, I want to have a 4x4 grid of cards that are all face-down.
- As a user, I want a card to flip before the game starts.
- As a user, I want to flip only two cards at a time once the game is started.

#### Silver

- As a user, I want to change the difficulty level by clicking a button so that I can adjust the difficulty to the level that I feel comfortable with.
- As a user, I want to see instructions when I did something wrong:
  + Clicking a card before the game starts.
- As a user, I want a countdown timer which starts ticking when the game starts and stops when the game is paused.
- As a user, I want to get points every time I match two cards.
- As a user I want to get points based on the time elapsed.

#### Gold

- As a user, I want to see a beautiful animation in the screen:
  + Button click animation
  + When I matched two cards
  + When two cards did not match


### Components

```yaml
# App component
state:
  isStarted: Boolean
  score: Number
  contents: Array<String>
methods:
  handleClickGameSwitch: Function
  isMatchedPair: Function
  isTwoCardFlipped: Function
  handleTimeUp: Function

# Card component
props:
  isFlipped: Boolean
  content: String
  handleClickGameSwitch: Function

# Timer component
props:
  time: Number
methods:
  startTimer: Function
  stopTimer: Function

# Score component
props:
  score: Number
  handleTimeUp: Function

# Game switch component
props:
  isSwitchedOn: Boolean
```


### References

- [React.js Fundamentals](http://courses.reactjsprogram.com/courses/reactjsfundamentals)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [Index as a key is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318#.r0mrtt6b4)
- [Timer example](https://facebook.github.io/react/)
- [Angular Directives Mapped to React](https://daveceddia.com/angular-directives-mapped-to-react/)
- [Tools for React](https://github.com/facebook/react/wiki/Complementary-Tools)
- [React on ES6+](https://babeljs.io/blog/2015/06/07/react-on-es6-plus)
- [Deploying a subfolder to GitHub Pages](https://gist.github.com/cobyism/4730490)
- [EventEmitterバケツリレースタイル/フレームワークなしで小さくFluxするß](http://qiita.com/mizchi/items/6a3500e598ec36746509)
- [入れ子のReact.ComponentでcomponentWillMountとcomponentDidMountが呼ばれる順番。](http://qiita.com/mmmpa/items/89a8886a1e9c8df477d7)

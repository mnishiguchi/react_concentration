# React concentration

Sometimes just called "Memory", it's a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. If you get all the matching cards, you've won!

This app seems broken with latest versions of dependent npm modules so I re-made a similar app for my practice.
- [https://github.com/mnishiguchi/react-concentration-2](https://github.com/mnishiguchi/react-concentration-2)

### Usage

```bash
$ npm install
```

```bash
$ npm start
$ open http://localhost:8080
```

```bash
$ git deploy # Deploy the dist directory to GitHub Pages.
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
<div>
  <NotificationSystem ref="notificationSystem" />
  <section className="game">
    <header>
      <Score score={this.state.score} />
      <Time seconds={this.state.seconds} />
    </header>
    <Board
      data={this.state.data}
      isLocked={!this.state.isPlaying || this.state.isOnPause}
      isPlaying={this.state.isPlaying}
      emitter={this.emitter}
    />
    <GameControl
      isPlaying={this.state.isPlaying}
      isOnPause={this.state.isOnPause}
      level={this.state.level}
      emitter={this.emitter}
    />
  </section>
  <aside>
    <PastScores pastScores={this.state.pastScores} />
  </aside>
</div>
```

### Memo
#### Creating elements using loop in React

```js
function BarGraph({ score }) {
  return (
    <div className="bar-graph">
      {
        Array(16).fill(1).map( (el, i) => {
          return ( i < score )
                      ? <div className="pixel filled"></div>
                      : <div className="pixel"></div>
                      ;
          }
        )
      }
    </div>
  );
};
```

#### [Deploying a subfolder to GitHub Pages](https://gist.github.com/cobyism/4730490)

```bash
# Deploying a subfolder to GitHub Pages
$ git subtree push --prefix dist origin gh-pages
```

```bash
# Delete a remote branch
$ git push origin :gh-pages
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
- [Introduction to Webpack with practical examples](http://julienrenaux.fr/2015/03/30/introduction-to-webpack-with-practical-examples/)
- [Intro to CSS 3D transforms](https://desandro.github.io/3dtransforms/docs/card-flip.html)

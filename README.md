# React concentration

Sometimes just called "Memory", it's a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. If you get all the matching cards, you've won!

Configured based on [react-intro](https://github.com/ga-wdi-lessons/react-intro) tutorial by GA.


### Usage

```
npm install
npm start
open http://localhost:8080
```

### [Deploying a subfolder to GitHub Pages](https://gist.github.com/cobyism/4730490)

```
$ git subtree push --prefix dist origin gh-pages
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

### User stories for this project

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

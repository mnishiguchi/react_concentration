import React from 'react';
import data from './data.js';

// const Question = props => {
//   const question = props.question;
//   return (
//     <p>
//       { question }
//     </p>
//   );
// }
//
// const Answers = props => {
//   const answers = props.answers;
//   let handleAnswerClick = props.handleAnswerClick;
//   return (
//     <div className="answers">
//       {
//         answers.map( ( answer, i ) =>
//           <p key={ i }>
//             <button onClick={ ev => handleAnswerClick( ev, answer.response ) }>
//               { answer.title }
//             </button>
//           </p>
//         ) // map
//       }
//     </div>
//   );
// }


// https://facebook.github.io/react/docs/reusable-components.html
export default class App extends React.Component {
  // constructor( props ) {
  //   super( props );
  //   this.state = {
  //     recordId: 0
  //   };
  //   this.handleAnswerClick = this.handleAnswerClick.bind( this );
  // }
  // handleAnswerClick( ev, response ) {
  //   this.setState({
  //     recordId: response
  //   });
  // };
  render() {
    return (
      <div>
        <h1>React concentration app</h1>
        <section className="board">
          {
            data.map( (item, i) => <div className="card" key={ i }>{ item }</div> )
          }
        </section>
      </div>
    );
  }
}

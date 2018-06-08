import { h, Component } from 'preact';
import Autosuggest from 'react-autosuggest';

const uuidv4 = require('uuid/v4');

import base from '../../base';
import style from './style';

const statusses = [
  {
    title: 'Done',
    statusses: [
      {
        name: 'Done',
        color: '#00c875'
      },
      {
        name: 'Ready for testing',
        color: '#0086c0'
      }
    ]
  },
  {
    title: 'In process',
    statusses: [
      {
        name: 'Working on it',
        color: '#fdab3d'
      },
      {
        name: 'Work needed (rejected)',
        color: '#a25ddc'
      },
      {
        name: `Need help (I'm stuck)`,
        color: '#e2445c'
      }
    ]
  },
  {
    title: 'To do',
    statusses: [
      {
        name: 'To do',
        color: '#c4c4c4'
      },
      {
        name: 'Cancelled',
        color: '#a00037'
      }
    ]
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  // const escapedValue = escapeRegexCharacters(value.trim());

  return statusses;

  // const regex = new RegExp('^' + escapedValue, 'i');

  // return statusses
  //   .map(section => {
  //     return {
  //       title: section.title,
  //       statusses: section.statusses.filter(status => regex.test(status.name)),
  //       color: section.statusses.filter(status => regex.test(status.color))
  //     };
  //   })
  //   .filter(section => section.statusses.length > 0);
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <div class={style.suggestionWrapper}>
      <span style={`color: ${suggestion.color};`} class={style.suggestionName}>{suggestion.name}</span>
    </div>
  );
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getColor(newValue) {
  if (newValue === 'Done') {
    return '#00c875';
  }
  else if (newValue === 'Ready for testing') {
    return '#0086c0';
  }
  else if (newValue === 'Working on it') {
    return '#fdab3d';
  }
  else if (newValue === 'Work needed (rejected)') {
    return '#a25ddc';
  }
  else if (newValue === `Need help (I'm stuck)`) {
    return '#e2445c';
  }
  else if (newValue === 'To do') {
    return '#c4c4c4'
  }
  else if (newValue === 'Cancelled') {
    return '#a00037'
  }
}

function getSectionSuggestions(section) {
  return section.statusses;
}

// const renderInputComponent = inputProps => (
//   <div class={style.inputPersonAssign}>
//     <input {...inputProps} id="abc123" class={style.inputFieldPersonAssign} />
//     {/* <div class={style.wrapInputBoi}>
//     </div> */}
//     <label for="abc123" class={style.inputPersonAssignWrap}><img class={style.inputPersonAssignImg} src="https://s3.amazonaws.com/res.wixpulse.com/photos/2126905/thumb_small/2126905-yannick_frisart_photo_2017_10_05_09_47_06.png?1507196826" /></label>
//   </div>
// );

export default class SelectStatus extends Component {
  constructor(props) {
    super(props);
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.

    this.state = {
      value: '',
      color: '#c4c4c4',
      suggestions: [],
      randomKey: ''
    };
    getColor(this.state.value);
  }

  componentWillMount(nextProps) {
    base.fetch(`/items/${this.props.groupI}/${this.props.index}/status`, {
      context: this,
      then(data){
        this.setState({
          value: data,
          color: getColor(data)
        });
      }
    });
    this.setState({
      randomKey: uuidv4()
    })
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
      color: getColor(newValue)
    });
    const item = this.props.details;
    const updatedOpdracht = {
      ...item,
      [this.props.statusI]: newValue
    };
    this.props.updateItem(this.props.index, updatedOpdracht);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Asign a status',
      value,
      onChange: this.onChange
    };

    const renderInputComponent = inputProps => (
      <input {...inputProps} style={`background-color: ${this.state.color}`} />
    );

    // Finally, render it!
    return (
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps}
        alwaysRenderSuggestions={true}
        theme={style}
        id={this.state.randomKey}
        renderInputComponent={renderInputComponent}
      />
    );
  }
}
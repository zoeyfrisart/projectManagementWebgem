import { h, Component } from 'preact';
import Autosuggest from 'react-autosuggest';

const uuidv4 = require('uuid/v4');

import base from '../../base';
import style from './style';

const personen = [
  {
    title: 'MV',
    personen: [
      {
        name: 'Yannick Frisart',
        functie: 'Front-end',
        img: 'https://20578.tk/board/user-profilepics/yannick.png'
      },
      {
        name: 'Thijs van Rijn',
        functie: 'Designer',
        img: 'https://20578.tk/board/user-profilepics/thijs.png'
      }
    ]
  },
  {
    title: 'MD',
    personen: [
      {
        name: 'Rick Woltheus',
        functie: 'Back-end',
        img: 'https://20578.tk/board/user-profilepics/rick.png'
      },
      {
        name: 'Coen Filipsen',
        functie: 'Communicatie',
        img: 'https://20578.tk/board/user-profilepics/coen.png'
      }
    ]
  },
  {
    title: 'Stagiairs',
    personen: [
      {
        name: 'Maurice',
        functie: 'Stagair',
        img: 'https://20578.tk/board/user-profilepics/none.png'
      },
      {
        name: 'Patrick',
        functie: 'Stagair',
        img: 'https://20578.tk/board/user-profilepics/none.png'
      }
    ]
  },
  {
    title: 'Clear',
    personen: [
      {
        name: '',
        functie: 'reset',
        img: 'https://20578.tk/board/user-profilepics/none.png'
      }
    ]
  }
];


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return personen;
  }

  // const regex = new RegExp('^' + escapedValue, 'i');

  return personen;
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <div class={style.suggestionWrapper}>
      <img class={style.assignedOpdrachtPic} src={suggestion.img} alt={suggestion.name} />
      <span class={style.suggestionName}>{suggestion.name}</span>
      <span class={style.suggestionFunctie}>{suggestion.functie}</span>
    </div>
  );
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getImg(newValue) {
  if (newValue === 'Yannick Frisart') {
    return 'https://20578.tk/board/user-profilepics/yannick.png';
  }
  else if (newValue === 'Thijs van Rijn') {
    return 'https://20578.tk/board/user-profilepics/thijs.png';
  }
  else if (newValue === 'Rick Woltheus') {
    return 'https://20578.tk/board/user-profilepics/rick.png';
  }
  else if (newValue === 'Coen Filipsen') {
    return 'https://20578.tk/board/user-profilepics/coen.png';
  }
  else if (newValue === 'Maurice') {
    return 'https://20578.tk/board/user-profilepics/none.png';
  }
  else if (newValue === 'Patrick') {
    return 'https://20578.tk/board/user-profilepics/none.png';
  }
  return 'https://20578.tk/board/user-profilepics/none.png';
}

function getSectionSuggestions(section) {
  return section.personen;
}

// const renderInputComponent = inputProps => (
//   <div class={style.inputPersonAssign}>
//     <input {...inputProps} id="abc123" class={style.inputFieldPersonAssign} />
//     {/* <div class={style.wrapInputBoi}>
//     </div> */}
//     <label for="abc123" class={style.inputPersonAssignWrap}><img class={style.inputPersonAssignImg} src="https://s3.amazonaws.com/res.wixpulse.com/photos/2126905/thumb_small/2126905-yannick_frisart_photo_2017_10_05_09_47_06.png?1507196826" /></label>
//   </div>
// );

export default class SelectPerson extends Component {
  constructor(props) {
    super(props);
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.

    this.state = {
      value: '',
      imgProfilePic: 'https://20578.tk/board/user-profilepics/none.png',
      suggestions: [],
      randomKey: ''
    };
  }

  componentWillMount(nextProps) {
    base.fetch(`/items/${this.props.groupI}/${this.props.index}/${this.props.personI}`, {
      context: this,
      then(data){
        this.setState({
          value: data,
          imgProfilePic: getImg(data)
        });
      }
    });
    this.setState({
      randomKey: uuidv4()
    });
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
      imgProfilePic: getImg(newValue)
    });
    const item = this.props.details;
    const updatedOpdracht = {
      ...item,
      [this.props.personI]: newValue
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
      placeholder: 'Asign a person',
      value,
      onChange: this.onChange
    };

    const renderInputComponent = inputProps => (
      <div class={style.inputPersonAssign}>
        <input {...inputProps} id={this.state.randomKey} class={style.inputFieldPersonAssign} />
        {/* <div class={style.wrapInputBoi}>
        </div> */}
        <label for={this.state.randomKey} class={style.inputPersonAssignWrap}><img class={style.inputPersonAssignImg} src={this.state.imgProfilePic} /></label>
      </div>
    );

    // Finally, render it!
    return (
      <Autosuggest
        multiSection
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps}
        alwaysRenderSuggestions
        renderInputComponent={renderInputComponent}
        theme={style}
        id={this.state.randomKey}
      />
    );
  }
}
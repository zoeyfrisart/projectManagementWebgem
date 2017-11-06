const personen = [
  {
    title: 'MV',
    personen: [
      {
        name: 'Yannick Frisart',
        functie: 'Front-end',
        img: 'https://20578.tk/panel/img/test.png'
      },
      {
        name: 'Thijs van Rijn',
        functie: 'Designer',
        img: 'https://20578.tk/panel/img/test.png'
      }
    ]
  },
  {
    title: 'MD',
    personen: [
      {
        name: 'Rick Woltheus',
        functie: 'Back-end',
        img: 'https://20578.tk/panel/img/test.png'
      },
      {
        name: 'Coen Filipsen',
        functie: 'Communicatie',
        img: 'https://20578.tk/panel/img/test.png'
      }
    ]
  },
  {
    title: 'Stagiairs',
    personen: [
      {
        name: 'Maurice',
        functie: 'Stagair',
        img: 'https://20578.tk/panel/img/test.png'
      },
      {
        name: 'Patrick',
        functie: 'Stagair',
        img: 'https://20578.tk/panel/img/test.png'
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
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return personen
    .map(section => {
      return {
        title: section.title,
        personen: section.personen.filter(persoon => regex.test(persoon.name))
      };
    })
    .filter(section => section.personen.length > 0);
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.personen;
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
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
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };

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
        inputProps={inputProps} />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

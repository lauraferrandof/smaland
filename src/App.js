import React, { Component } from "react";
import Footer from "./components/Footer";
import HeaderCardCreator from "./components/HeaderCardCreator.js";
import HeaderHome from "./components/HeaderHome";
import dataBack from "./services/DataBack";
import { Route, Switch } from "react-router-dom";
import MainCardCreator from "./components/MainCardCreator";
import MainHome from "./components/MainHome";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataBack: dataBack,
      skills: [],
      colorClass: "",
      fontClass: "",
      palette: "1",
      typography: "2"
    };

    this.handleSelectInputs = this.handleSelectInputs.bind(this);
    this.handleColorClass = this.handleColorClass.bind(this);
    this.handleFontClass = this.handleFontClass.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.handleSkills = this.handleSkills.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.renderSkills = this.renderSkills.bind(this);
    this.getSkills();
  }

  handleInputs(event) {
    const { name, value } = event.target;
    this.setState(prevState => {
      return {
        dataBack: {
          ...prevState.dataBack,
          [name]: value
        }
      };
    });
  }

  handleSelectInputs(event) {
    const { name, value } = event.target;
    this.setState(prevState => {
      return {
        dataBack: {
          ...prevState.dataBack,
          [name]: value
        },
        [name]: value
      };
    });
    if (name === "palette") {
      this.handleColorClass();
    } else if (name === "typography") {
      this.handleFontClass();
    }
  }

  handleColorClass() {
    const { palette } = this.state.dataBack;
    if (palette === "1") {
      this.setState({
        colorClass: "box__card"
      });
    } else if (palette === "2") {
      this.setState({
        colorClass: "box__card--red"
      });
    } else if (palette === "3") {
      this.setState({
        colorClass: "box__card--grey"
      });
    } else if (palette === "4") {
      this.setState({
        colorClass: "box__card--purple"
      });
    } else if (palette === "5") {
      this.setState({
        colorClass: "box__card--orange"
      });
    }
  }

  handleFontClass() {
    const { typography } = this.state.dataBack;
    if (typography === "1") {
      this.setState({
        fontClass: "userInfo--ubuntu"
      });
    } else if (typography === "2") {
      this.setState({
        fontClass: "userInfo--quaternary"
      });
    } else if (typography === "3") {
      this.setState({
        fontClass: "userInfo--mont"
      });
    } else if (typography === "4") {
      this.setState({
        fontClass: "userInfo--hand"
      });
    } else if (typography === "5") {
      this.setState({
        fontClass: "userInfo-libre"
      });
    }
  }

  handleSkills(event) {
    const selectedSkill = event.target.value;
    const { skills } = this.state.dataBack;

    if (skills.includes(selectedSkill)) {
      let newSkills = skills.filter(skill => skill !== selectedSkill);
      this.setState(prevState => {
        return {
          dataBack: {
            ...prevState.dataBack,
            skills: newSkills
          }
        };
      });
    } else if (skills.length < 3) {
      this.setState(prevState => {
        return {
          dataBack: {
            ...prevState.dataBack,
            skills: skills.concat(selectedSkill)
          }
        };
      });
    }
  }

  getSkills() {
    fetch(
      "https://raw.githubusercontent.com/Adalab/dorcas-s2-proyecto-data/master/skills.json"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ skills: data.skills });
      });
  }

  isChecked(currentSkill) {
    const { skills } = this.state.dataBack;
    if (skills.includes(currentSkill)) {
      return true;
    } else {
      return false;
    }
  }

  renderSkills() {
    return this.state.skills.map(skill => {
      return (
        <label htmlFor={skill} className="checkbox-label">
          <input
            id={skill}
            type="checkbox"
            value={skill}
            name="skills"
            className="checkbox-input"
            checked={this.isChecked(skill)}
            onChange={this.handleSkills}
          />
          <p>{skill}</p>
        </label>
      );
    });
  }

  render() {
    const {
      dataBack,
      skills,
      colorClass,
      fontClass,
      palette,
      typography
    } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HeaderHome} />
          <Route path="/card-creator" component={HeaderCardCreator} />
        </Switch>
        <Switch>
          <Route exact path="/" component={MainHome} />
          <Route
            path="/card-creator"
            render={() => (
              <MainCardCreator
                dataBack={dataBack}
                colorClass={colorClass}
                fontClass={fontClass}
                skills={skills}
                palette={palette}
                typography={typography}
                handleSelectInputs={this.handleSelectInputs}
                handleInputs={this.handleInputs}
                handleSkills={this.handleSkills}
                renderSkills={this.renderSkills}
              />
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;

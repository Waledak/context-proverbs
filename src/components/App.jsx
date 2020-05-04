import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProverbsPage from './ProverbsPage';
import SettingsPage from './SettingsPage';
import ProverbsContext from '../contexts/proverbs-context';
import LanguagesContext from '../contexts/languages-context';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevLang: "en",
            currentLanguage: "en",
            proverbs: [],
        };
    }

    componentDidMount() {
        this.getResults();
    }

    componentDidUpdate() {
        if (this.state.prevLang !== this.state.currentLanguage) {
            this.getResults();
            const { currentLanguage } = this.state;
            this.setState({ prevLang: currentLanguage });
        }
    }

    getResults = () => {
        const { currentLanguage } = this.state;
        fetch(`/pretend-api/results-${currentLanguage}.json`)
            .then(res => res.json())
            .then(data => this.setState({ proverbs: data.results }));   
    }

    handleLanguage = (e) => {
        this.setState({ currentLanguage: e.target.value });
    }

    render() {
        const { proverbs, currentLanguage } = this.state;
        return (
            <Switch>
                <Route path="/" exact>
                    <ProverbsContext.Provider value={{ proverbs }}>
                        <ProverbsPage />
                    </ProverbsContext.Provider>
                </Route>
                <Route path="/settings">
                    <LanguagesContext.Provider value={{
                        handleLanguage: this.handleLanguage,
                        currentLanguage
                    }}
                    >
                        <SettingsPage />
                    </LanguagesContext.Provider>
                </Route>
            </Switch>
        );
    }
}

export default App;

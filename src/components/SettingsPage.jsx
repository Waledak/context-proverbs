import React from 'react';
import { Link } from 'react-router-dom';
import LanguagesContext from '../contexts/languages-context';

const SettingsPage = () => {
  const { handleLanguage, currentLanguage } = React.useContext(LanguagesContext);
    return (
        <>
            <Link to="/">Back</Link>
            <h1>Settings</h1>
            <select
                name="language"
                value={currentLanguage}
                onChange={handleLanguage}
            >
              <option value="en">en</option>
              <option value="pt">pt</option>
          </select>
        </>
    );
};

export default SettingsPage;

import React from 'react';
import './philipsLight.scss';
import { Link } from 'react-router-dom';

class PhilipsLight extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="philipsLight-container">
                <Link to="/lights">Lights</Link>
            </div>
        );
    }
}

export default PhilipsLight;
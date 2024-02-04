
import React from 'react';
import "./styles.css";
import { Link } from "react-router-dom";
import QuestionsManager from '../QuestionsManager/QuestionsManagerViewContainer';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="buttonContainer">
        <Link className='button' to="/QuestionsManager">Questions Manager</Link>
        <Link className='button' to="/QuestionsManager">Questions Manager</Link>
      </div>
    </div>
  );
}
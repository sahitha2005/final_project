import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActivitiesMenu.css';


export default function ActivitiesMenu() {
const navigate = useNavigate();


return (
<div className="activities-menu">
<h1 className="title">Choose an Activity</h1>
<div className="buttons">
<button className="activity-btn" onClick={() => navigate('/activities/word-match')}>Word–Image Match 🍎</button>
<button className="activity-btn" onClick={() => navigate('/activities/letter-sort')}>Build the Word 🔤</button>
</div>
</div>
);
}
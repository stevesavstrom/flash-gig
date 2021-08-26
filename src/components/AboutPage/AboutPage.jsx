import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'
import './AboutPage.css';

// Material-UI
import Typography from '@material-ui/core/Typography';

function AboutPage() {
  return (
    <div className="container">
      <div className="about">
        <h1>About Flash Gig</h1>
        <Typography>
          Flash Gig is an app that helps wedding photographers and videographers
          connect with second shooters for short-term gigs. Users post gigs that
          they need help with. Users apply for gigs that they want to work.
        </Typography>

      </div>
    </div>
  );
}

export default AboutPage;

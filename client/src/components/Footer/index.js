import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">
        <Link to="/">Waves</Link>
        </div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact informatin</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon icon="compass" className="icon" />
                <div className="nfo">
                  <div>Address</div>
                  <div>Kramer 12345</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon="phone" className="icon" />
                <div className="nfo">
                  <div>Phone</div>
                  <div>2345-22255</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon="clock" className="icon" />
                <div className="nfo">
                  <div>Working hours</div>
                  <div>Mon-Sun: 9am-7pm</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon="envelope" className="icon" />
                <div className="nfo">
                  <div>Email</div>
                  <div>nfo@waves.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>
              <div>
                Get all the latest information on events, sales and offers. You can miss out.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
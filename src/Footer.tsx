import "./Admin/Styles/Footer.css";

import twitter from "./Assets/Images/twitter-link.svg";
import youtube from "./Assets/Images/youtube-link.svg";
import webLink from "./Assets/Images/web-link.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="header">
        <div className="text-content">
          <span>See why smart marketers use Afleet</span>
          <span>Solve your tracking problems today</span>
        </div>
        <button className="start-btn">Start for free</button>
      </div>
      <div className="content">
        <div className="caption">
          <span>We obsess over tracking so</span>
          <span>you don't have to.</span>
          <span>Afleet LLC</span>
          <span>1702, Tower 1, Boulevard Plaza, Downtown Dubai,</span>
          <span>UAE</span>
          <span>
            <img src={twitter} alt="" />
            <img src={youtube} alt="" />
            <img src={webLink} alt="" />
          </span>
        </div>
        <div className="links-wrapper">
          <div className="links-container">
            <span className="links-heading">Company</span>
            <span>
              <a>Home</a>
            </span>
            <span>
              <a>User generated content</a>
            </span>
            <span>
              <a>Case Studies</a>
            </span>
            <span>
              <a>FAQs</a>
            </span>
          </div>
          <div className="links-container">
            <span className="links-heading">Important</span>

            <span>
              <a>Affliate Program</a>
            </span>
            <span>
              <a>Terms</a>
            </span>
            <span>
              <a>Privacy</a>
            </span>
            <span>
              <a>Refund Policy</a>
            </span>
          </div>
          <div className="links-container">
            <span className="links-heading">Blog Posts</span>

            <span>
              <a>
                Marketing with NFTs: Leveraging Non-fungible Tokens for
                Visibility and Growth
              </a>
            </span>
            <span>
              <a>
                Web3 Community connection: How to build your successful Web3
                army
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

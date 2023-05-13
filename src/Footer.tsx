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
          <span>1702, Tower 1, Boulevard Plaza,</span>
          <span>Downtown Dubai,</span>
          <span>UAE</span>
        </div>
        <div className="links-wrapper">
          <div className="links-container">
            <span className="links-heading">Company</span>
            <span>
              <a href="">Home</a>
            </span>
            <span>
              <a href="https://afleet.io/ugc-user-generated-content/">User generated content</a>
            </span>
            <span>
              <a href='https://afleet.io/case-studies/'>Case Studies</a>
            </span>
            <span>
              <a>FAQs</a>
            </span>
          </div>
          <div className="links-container">
            <span className="links-heading">Important</span>

            <span>
              <a href='https://afleet.io/affiliate-program'>Affliate Program</a>
            </span>
            <span>
              <a href='https://afleet.io/terms/'>Terms</a>
            </span>
            <span>
              <a href='https://afleet.io/privacy-policy/'>Privacy</a>
            </span>
            <span>
              <a href='https://afleet.io/refund-policy'>Refund Policy</a>
            </span>
          </div>
          <div className="links-container">
            <span className="links-heading">Blog Posts</span>

            <span>
              <a href='https://afleet.io/nft-marketing-leveraging-nfts-for-visibility-and-growth/'>
                Marketing with NFTs: Leveraging Non-fungible Tokens for
                Visibility and Growth
              </a>
            </span>
            <span>
              <a href='https://afleet.io/web3-community-connection-how-to-build-a-successful-web3-army/'>
                Web3 Community connection: How to build your successful Web3
                army
              </a>
            </span>
            <span>
              <a href='https://afleet.io/best-social-media-channels-for-web3-marketing/'>
              Best Social Media Channels for Web3 marketing
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

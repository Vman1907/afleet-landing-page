import pic from "./../src/Assets/Images/homeComponent.png";
import "./../src/Admin/Styles/Landing.css";

import company1 from "./../src/Assets/Images/home-company-1.svg";
import company2 from "./../src/Assets/Images/home-company-2.svg";
import company3 from "./../src/Assets/Images/home-company-3.svg";
import company4 from "./../src/Assets/Images/home-company-4.svg";

import card1 from "./../src/Assets/Images/home-card.svg";
import card2 from "./../src/Assets/Images/home-card-2.svg";
import card3 from "./../src/Assets/Images/home-card-3.svg";

import instagram from "../src/Assets/Images/instagram.svg";

import logo from "./Assets/Images/logo_3.png";

import { IonContent, IonPage } from "@ionic/react";
import NavBar from "./NavBar";

const Landing: React.FC = () => {
  return (
    <IonPage>
      <IonContent scrollY={true} scrollX={true} className="landing">
        <NavBar />
        <div className="home-container">
          <div className="row intro justify-content-center">
            <div className="col-lg-5 col-md-6 col-sm-10">
              <div className="intro-heading">
                <span>
                  <span className="primary">Turn Your</span> Customers{" "}
                  <span className="Into"></span>
                </span>
                <span>
                  Raving Fans <span className="primary">In No Time</span>
                </span>
                <span className="primary">Without Costly Ad</span>
                <span className="primary">Campaigns</span>
              </div>
              <div className="intro-info">
                <span>
                  Afleet helps you turn your customers into brand ambassadors
                </span>
                <span>and unlock ultimate organic growth for your brand</span>
              </div>
              <div className="intro-links">
                <button className="get-started">Get Started</button>
                {/* <button className="learn-more">Learn More</button> */}
              </div>
              <div className="intro-companies">
                <div className="heading">
                  Working with all types of businesses
                </div>

                <div className="companies">
                  <span>
                    <img src={company1} alt="" />
                    Instaraise
                  </span>

                  <span>
                    <img src={company2} alt="" />
                    Hypersign
                  </span>

                  <span>
                    <img src={company3} alt="" />
                    Shuttle One
                  </span>

                  <span>
                    <img src={company4} alt="" />
                    Creator
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-10">
              <img src={pic} alt="" />
            </div>
          </div>
          <div className="ad-platform">
            <span className="heading">
              Works with all ad platforms and apps you use
            </span>
            <div className="ad-company-container-filter">
              <span>
                .......and thousands of others available through Zapier
              </span>
            </div>

            <div className="ad-company-container">
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
              <span className="company-container">
                <img src={instagram} alt="" />
              </span>
            </div>
          </div>
          <div className="information">
            <div className="heading">
              <span>Your Customers Deserve More… and You too</span>
              <span>
                Afleet unlocks word-of-mouth marketing growth for your brand
              </span>
            </div>
            <div className="card-container">
              <div className="info-card">
                <img src={card1} alt="" />
                <span className="info-card-heading">Community</span>
                <span className="info-card-content">
                  Do more with your users by turning them into your brand
                  ambassador army and making them a part of your growth.
                </span>
              </div>
              <div className="info-card">
                <img src={card2} alt="" />
                <span className="info-card-heading">Marketing</span>
                <span className="info-card-content">
                  Grow user-generated content, boost social engagement, and
                  reach beyond paid advertisement through word-of-mouth.
                </span>
              </div>
              <div className="info-card">
                <img src={card3} alt="" />
                <span className="info-card-heading">Retention</span>
                <span className="info-card-content">
                  Boost customer retention by incentivizing them to support your
                  brand with points and custom rewards
                </span>
              </div>
            </div>
          </div>
          <div className="quotes-container">
            <img className="quotes-logo" src={logo} alt="" />
            <span className="quotes-heading">Internet is going premium</span>
            <span className="quotes-caption">
              More people are getting premium subscriptions for Twitter,
              YouTube, and Facebook to see No Ads
            </span>
            <span className="quotes-content">
              This radical change is turning marketing upside down as high-value
              users are becoming unreachable with Ads. But with Afleet, you
              don’t need to fear since you can whisper through these walls.
            </span>
          </div>
          <div className="usage-container">
            <span className="usage-heading">
              How companies are using Afleet
            </span>
            <div className="usage-info-wrapper">
              <div className="usage-info-card">
                <span>Reddit marketing</span>
                <span>
                  Promote your products and services in niche sub-Reddits and
                  show-up before thousands of high quality potential users
                </span>
              </div>
              <div className="usage-info-card">
                <span>Discord marketing</span>
                <span>
                  Promote your products on Discord by partnering up with niche
                  discord servers and track the performance
                </span>
              </div>
              <div className="usage-info-card">
                <span>Twitter marketing</span>
                <span>
                  Unlock organic growth and engagement on Twitter by leveraging
                  user generated content and reach more people without running
                  ads
                </span>
              </div>
              <div className="usage-info-card">
                <span>Quora marketing</span>
                <span>
                  Leverage Quora to get the word out about your products and get
                  seen by high quality audience and grow on search rankings
                </span>
              </div>
              <div className="usage-info-card">
                <span>Social Media marketing</span>
                <span>
                  Tap on to social media platforms like Instagram and YouTube to
                  give you more visibility through user generated content
                  created by your customers
                </span>
              </div>
              <div className="usage-info-card">
                <span>Ambassador marketing</span>
                <span>
                  Turn customers into your loyal brand ambassadors and boost
                  authentic reviews, testimonials and Buzz through them
                </span>
              </div>
              <div className="usage-info-card">
                <span>Community Building</span>
                <span>
                  Increase customer value and experience by creating customer
                  communities. We gamify the entire experience so your customers
                  love your products even more
                </span>
              </div>
              <div className="usage-info-card">
                <span>Product marketing</span>
                <span>
                  Ranking on product hunt is easy. Hard is to maintain the
                  momentum for long term. Create a 360 degree momentum for
                  product launch with your customised plan
                </span>
              </div>
            </div>
            <button className="try-afleet-button">Try Afleet Today</button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Landing;

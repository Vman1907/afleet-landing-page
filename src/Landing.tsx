import pic from "./../src/Assets/Images/homeComponent.png";
import "./../src/Admin/Styles/Landing.css";

import company1 from "./../src/Assets/Images/home-company-1.svg";
import company2 from "./../src/Assets/Images/home-company-2.svg";
import company3 from "./../src/Assets/Images/home-company-3.svg";
import company4 from "./../src/Assets/Images/home-company-4.svg";

import card1 from "./../src/Assets/Images/home-card.svg";
import card2 from "./../src/Assets/Images/home-card-2.svg";
import card3 from "./../src/Assets/Images/home-card-3.svg";

import ad from "../src/Assets/Images/IMAGE-10.svg";
import ad1 from "../src/Assets/Images/IMAGE-11.svg";
import ad2 from "../src/Assets/Images/IMAGE-12.svg";
import ad3 from "../src/Assets/Images/IMAGE-13.svg";
import ad4 from "../src/Assets/Images/IMAGE-14.svg";
import ad5 from "../src/Assets/Images/IMAGE-15.svg";
import ad6 from "../src/Assets/Images/IMAGE-16.svg";
import ad7 from "../src/Assets/Images/IMAGE-17.svg";
import ad8 from "../src/Assets/Images/IMAGE-18.svg";
import ad9 from "../src/Assets/Images/IMAGE-19.svg";
import ad10 from "../src/Assets/Images/IMAGE-20.svg";
import ad11 from "../src/Assets/Images/IMAGE-21.svg";
import ad12 from "../src/Assets/Images/IMAGE-22.svg";
import ad13 from "../src/Assets/Images/IMAGE-23.svg";
import ad14 from "../src/Assets/Images/IMAGE-24.svg";
import ad15 from "../src/Assets/Images/IMAGE-25.svg";
import ad16 from "../src/Assets/Images/IMAGE-26.svg";
import ad17 from "../src/Assets/Images/IMAGE-27.svg";
import ad18 from "../src/Assets/Images/IMAGE-28.svg";
import ad19 from "../src/Assets/Images/IMAGE-29.svg";
import ad20 from "../src/Assets/Images/IMAGE-30.svg";
import ad21 from "../src/Assets/Images/IMAGE-31.svg";
import ad22 from "../src/Assets/Images/IMAGE-32.svg";
import ad23 from "../src/Assets/Images/IMAGE-33.svg";
import ad24 from "../src/Assets/Images/IMAGE-34.svg";
import ad25 from "../src/Assets/Images/IMAGE.svg";
import ad26 from "../src/Assets/Images/IMAGE-1.svg";
import ad27 from "../src/Assets/Images/IMAGE-2.svg";
import ad28 from "../src/Assets/Images/IMAGE-3.svg";
import ad30 from "../src/Assets/Images/IMAGE-5.svg";
import ad31 from "../src/Assets/Images/IMAGE-6.svg";
import ad32 from "../src/Assets/Images/IMAGE-7.svg";
import ad33 from "../src/Assets/Images/IMAGE-8.svg";
import ad34 from "../src/Assets/Images/IMAGE-9.svg";

import communityPic1 from "../src/Assets/Images/community-image-1.png";
import communityPic2 from "../src/Assets/Images/community-image-2.png";
import communityPic3 from "../src/Assets/Images/community-image-3.png";

import ambassadorPic1 from "../src/Assets/Images/ambassador-image-1.svg";
import ambassadorPic2 from "../src/Assets/Images/ambassador-image-2.png";
import ambassadorPic3 from "../src/Assets/Images/ambassador-image-3.svg";

import servicePic1 from "../src/Assets/Images/service-image-1.svg";
import servicePic2 from "../src/Assets/Images/service-image-2.svg";
import servicePic3 from "../src/Assets/Images/service-image-3.svg";

import logo from "./Assets/Images/logo_3.png";

import usage1 from "../src/Assets/Images/Vector-12.svg";
import reddit from "../src/Assets/Images/reddit.svg";
import discord from "../src/Assets/Images/Vector-10.svg";
import twitter from "../src/Assets/Images/Vector-11.svg";
import quora from "../src/Assets/Images/quora.svg";
import ambassador from "../src/Assets/Images/Vector-13.svg";
import community from "../src/Assets/Images/Vector-14.svg";
import product from "../src/Assets/Images/product.svg";

import { IonContent, IonPage, IonPopover } from "@ionic/react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useState } from "react";
import { Redirect } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Landing: React.FC = () => {
  const [faq, setFaq] = useState(6);
  const [video, setVideo] = useState(false);
  const [signup, setSignup] = useState(false);

  if (signup === true) {
    return <Redirect to="user/signup"></Redirect>;
  }

  return (
    <IonPage>
      <IonContent scrollY={true} scrollX={false} className="landing">
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
                <button className="get-started">
                  <a href="#pricing">Get Started</a>
                </button>
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
              {/* <button className="watch-button">watch the video</button> */}
              <img onClick={() => setVideo(true)} src={pic} alt="" />
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
              <span>
                <a href="https://afleet.io/integrations">Learn More</a>
              </span>
            </div>

            <div className="ad-company-container">
              <span className="company-container">
                <img src={ad27} alt="" />
              </span>
              <span className="company-container">
                <img src={ad28} alt="" />
              </span>
              <span className="company-container">
                <img src={ad30} alt="" />
              </span>
              <span className="company-container">
                <img src={ad31} alt="" />
              </span>
              <span className="company-container">
                <img src={ad32} alt="" />
              </span>
              <span className="company-container">
                <img src={ad33} alt="" />
              </span>
              <span className="company-container">
                <img src={ad34} alt="" />
              </span>
              <span className="company-container">
                <img src={ad} alt="" />
              </span>
              <span className="company-container">
                <img src={ad1} alt="" />
              </span>
              <span className="company-container">
                <img src={ad2} alt="" />
              </span>
              <span className="company-container">
                <img src={ad3} alt="" />
              </span>
              <span className="company-container">
                <img src={ad4} alt="" />
              </span>
              <span className="company-container">
                <img src={ad5} alt="" />
              </span>
              <span className="company-container">
                <img src={ad6} alt="" />
              </span>
              <span className="company-container">
                <img src={ad7} alt="" />
              </span>
              <span className="company-container">
                <img src={ad8} alt="" />
              </span>
              <span className="company-container">
                <img src={ad9} alt="" />
              </span>
              <span className="company-container">
                <img src={ad10} alt="" />
              </span>
              <span className="company-container">
                <img src={ad11} alt="" />
              </span>
              <span className="company-container">
                <img src={ad12} alt="" />
              </span>
              <span className="company-container">
                <img src={ad13} alt="" />
              </span>
              <span className="company-container">
                <img src={ad14} alt="" />
              </span>
              <span className="company-container">
                <img src={ad15} alt="" />
              </span>
              <span className="company-container">
                <img src={ad16} alt="" />
              </span>
              <span className="company-container">
                <img src={ad17} alt="" />
              </span>
              <span className="company-container">
                <img src={ad18} alt="" />
              </span>
              <span className="company-container">
                <img src={ad19} alt="" />
              </span>
              <span className="company-container">
                <img src={ad20} alt="" />
              </span>
              <span className="company-container">
                <img src={ad21} alt="" />
              </span>
              <span className="company-container">
                <img src={ad22} alt="" />
              </span>
              <span className="company-container">
                <img src={ad23} alt="" />
              </span>
              <span className="company-container">
                <img src={ad24} alt="" />
              </span>
              <span className="company-container">
                <img src={ad25} alt="" />
              </span>
              <span className="company-container">
                <img src={ad26} alt="" />
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
          <div className="community-container">
            <span className="heading">Unlock Community-Driven Growth</span>
            <div className="content">
              <div className="text-content">
                <span className="text-heading">Increase social</span>
                <span className="text-heading">engagements and shares</span>
                <span>
                  With you post something on your social handle, you can quickly
                  deploy your ambassadors to engage with it fast, making the
                  most out of every post.
                </span>
              </div>
              <div className="image-content">
                <img src={communityPic1} alt="" />
              </div>
            </div>
            <div className="content">
              <div className="text-content">
                <span className="text-heading">Incentivize people for </span>
                <span className="text-heading">their contribution</span>
                <span>
                  Ask your ambassadors to create new posts, reels, tweets, and
                  more, and offer optional RP points for successfully completing
                  the tasks.
                </span>
              </div>
              <div className="image-content">
                <img src={communityPic2} alt="" />
              </div>
            </div>
            <div className="content">
              <div className="text-content">
                <span className="text-heading">Boost User-Generated </span>
                <span className="text-heading">Content</span>
                <span>
                  Create custom rewards that ambassadors can convert in exchange
                  for RP points. Everything is completely customized and in your
                  control.
                </span>
              </div>
              <div className="image-content">
                <img src={communityPic3} alt="" />
              </div>
            </div>
          </div>
          <div className="usage-container">
            <span className="usage-heading">
              How companies are using Afleet
            </span>
            <div className="usage-info-wrapper">
              <div className="usage-info-card">
                <div>
                  <img src={reddit} alt="" />
                  <span>Reddit marketing</span>
                </div>
                <span>
                  Promote your products and services in niche sub-Reddits and
                  show-up before thousands of high quality potential users
                </span>
              </div>
              <div className="usage-info-card">
                <div>
                  <img src={discord} alt="" />
                  <span>Discord marketing</span>
                </div>
                <span>
                  Promote your products on Discord by partnering up with niche
                  discord servers and track the performance
                </span>
              </div>
              <div className="usage-info-card">
                <div>
                  <img src={twitter} alt="" />
                  <span>Twitter marketing</span>
                </div>
                <span>
                  Unlock organic growth and engagement on Twitter by leveraging
                  user generated content and reach more people without running
                  ads
                </span>
              </div>
              <div className="usage-info-card">
                <div>
                  <img src={quora} alt="" />
                  <span>Quora marketing</span>
                </div>
                <span>
                  Leverage Quora to get the word out about your products and get
                  seen by high quality audience and grow on search rankings
                </span>
              </div>
              <div className="usage-info-card">
                <div>
                  <span>
                    <img src={usage1} alt="" />
                  </span>
                  <span>Social Media marketing</span>
                </div>
                <span>
                  Tap on to social media platforms like Instagram and YouTube to
                  give you more visibility through user generated content
                  created by your customers
                </span>
              </div>
              <div className="usage-info-card">
                <div>
                  <img src={ambassador} alt="" />
                  <span>Ambassador marketing</span>
                </div>
                <span>
                  Turn customers into your loyal brand ambassadors and boost
                  authentic reviews, testimonials and Buzz through them
                </span>
              </div>
              <div className="usage-info-card">
                <div>
                  <img src={community} alt="" />
                  <span>Community Building</span>
                </div>
                <span>
                  Increase customer value and experience by creating customer
                  communities. We gamify the entire experience so your customers
                  love your products even more
                </span>
              </div>
              <div className="usage-info-card">
                <div>
                  <img src={product} alt="" />
                  <span>Product marketing</span>
                </div>
                <span>
                  Ranking on product hunt is easy. Hard is to maintain the
                  momentum for long term. Create a 360 degree momentum for
                  product launch with your customised plan
                </span>
              </div>
            </div>
            <button className="try-afleet-button">
              <a href="#pricing">Try Afleet Today</a>
            </button>
          </div>
          <div className="community-container">
            <span className="heading">
              Fun and engaging ambassador marketing experience
            </span>
            <div className="content">
              <div className="text-content">
                <span className="text-heading">Performance Leaderboard</span>
                <span>
                  Boost healthy competition among ambassadors by showing a
                  performance leaderboard based on their RP points.
                </span>
              </div>
              <div className="image-content">
                <img src={ambassadorPic1} alt="" />
              </div>
            </div>
            <div className="content">
              <div className="text-content">
                <span className="text-heading">Ambassador Teams</span>
                <span>
                  Let ambassadors engage with each other through shared
                  community chat. They can post, react and comment on each
                  other’s posts.
                </span>
              </div>
              <div className="image-content">
                <img src={ambassadorPic2} alt="" />
              </div>
            </div>
            <div className="content">
              <div className="text-content">
                <span className="text-heading">Earn Referral Commissions</span>
                <span>
                  Connect your program dashboard with thousands of other apps
                  through Zapier. E.g (Highlighted): When there is a new
                  campaign in the dashboard, Add it to MS Excel.
                </span>
              </div>
              <div className="image-content">
                <img src={ambassadorPic3} alt="" />
              </div>
            </div>
          </div>
          <div id="pricing" className="pricing-container">
            <div className="heading-container">
              <span className="">Simple pricing for your business</span>
              <span>
                Plans that are carefully crafted to suit your business.
              </span>
            </div>
            <div className="price-wrapper">
              <div className="price">
                <span>Premium PRO</span>
                <span>$329</span>
                <span>billed just once</span>
                <button
                  onClick={() => {
                    setSignup(true);
                  }}
                >
                  Get Started
                </button>
              </div>
              <div className="services">
                <span>
                  Access these features when you get this pricing package for
                  your business.
                </span>
                <span>
                  <span className="list-dot"></span>International calling and
                  messaging API
                </span>
                <span>
                  <span className="list-dot"></span>Additional phone numbers
                </span>
                <span>
                  <span className="list-dot"></span>Automated messages via
                  Zapier
                </span>
                <span>
                  <span className="list-dot"></span>24/7 support and consulting
                </span>
              </div>
            </div>
            <div className="service-info">
              <div>
                <img src={servicePic1} alt="" />
                <span>14 days money back Guarantee</span>
              </div>
              <div>
                <img src={servicePic2} alt="" />
                <span>No setup fees 100% hassle-free</span>
              </div>
              <div>
                <img src={servicePic3} alt="" />
                <span>No monthly subscription Pay once and for all</span>
              </div>
            </div>
          </div>
          <div className="FAQ-container">
            <span className="heading">Frequently Asked Questions</span>
            <div className="naccs">
              <div className="grid">
                <div className="gc gc--1-of-3">
                  <div className="menu">
                    <div
                      onClick={() => setFaq(0)}
                      className={faq === 0 ? "active" : ""}
                    >
                      <span className="light"></span>
                      <span>HOW TO ASK FOR SUPPORT</span>
                      <span className="arrow">{">"}</span>
                    </div>
                    <div
                      onClick={() => setFaq(1)}
                      className={faq === 1 ? "active" : ""}
                    >
                      <span className="light"></span>
                      <span>HOW TO FIND BRAND AMBASSADORS</span>
                      <span className="arrow">{">"}</span>
                    </div>
                    <div
                      onClick={() => setFaq(2)}
                      className={faq === 2 ? "active" : ""}
                    >
                      <span className="light"></span>
                      <span>WHAT IF I WANT TO UPGRADE PACKAGE</span>
                      <span className="arrow">{">"}</span>
                    </div>
                    <div
                      onClick={() => setFaq(3)}
                      className={faq === 3 ? "active" : ""}
                    >
                      <span className="light"></span>
                      <span>
                        CAN I RECRUIT ALL OF MY CUSTOMERS AS BRAND AMBASSADORS
                      </span>
                      <span className="arrow">{">"}</span>
                    </div>
                  </div>
                </div>
                <div className="gc gc--2-of-3">
                  <ul className="nacc">
                    <li className={faq === 0 ? "active" : ""}>
                      <div>
                        <p className={faq === 0 ? "active" : ""}>
                          Afleet team is available to help you. With any package
                          you choose you will receive a community based support,
                          dedicated onboarding call if required and monthly
                          group calls. Further, you can always reach out to us
                          over Telegram and Email and our team will reply within
                          4-7 hours max, 6 days a week.
                        </p>
                      </div>
                    </li>
                    <li className={faq === 1 ? "active" : ""}>
                      <div>
                        <p className={faq === 1 ? "active" : ""}>
                          With easy-to-use drag and drop feature, it takes less
                          than 5 minutes to launch a recruitment form. You can
                          share it with your customers and other fans through
                          email or social media. As soon as the first person
                          fills the form, you will receive a notification. You
                          can easily accept and reject their application from
                          your dashboard.
                        </p>
                      </div>
                    </li>
                    <li className={faq === 2 ? "active" : ""}>
                      <div>
                        <p className={faq === 2 ? "active" : ""}>
                          From your account section, you can easily upgrade
                          limits to bring in more ambassadors, launch more
                          campaigns or unlock additional features. Complete
                          control..
                        </p>
                      </div>
                    </li>
                    <li className={faq === 3 ? "active" : ""}>
                      <div>
                        <p className={faq === 3 ? "active" : ""}>
                          Generally saying, It is not a good idea to recruit
                          everyone as your ambassador. It reduces quality and
                          increases hassle. The better idea is to focus on 80-20
                          principle. Set criteria of followers, skills and ask
                          value questions that can help you decide whether to
                          select an ambassador or not. They can always re-apply.
                          You can create filter questions through recruitment
                          form.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="faq-section">
              <div className="fix-wrap">
                <div className="faq-accordions">
                  <div className="accordion-row">
                    <div
                      onClick={() => setFaq(0)}
                      className={faq === 0 ? "title open" : "title"}
                    >
                      <span>
                      HOW TO ASK FOR SUPPORT
                      </span>
                      {
                        faq === 0 ? <span>
                        <IoIosArrowForward />
                        </span>
                        :
                        <span>
                        <IoIosArrowDown />
                        </span>
                      }
                    </div>
                    <div className="content">
                      Afleet team is available to help you. With any package you
                      choose you will receive a community based support,
                      dedicated onboarding call if required and monthly group
                      calls. Further, you can always reach out to us over
                      Telegram and Email and our team will reply within 4-7
                      hours max, 6 days a week.
                    </div>
                  </div>
                  <div className="accordion-row">
                    <div
                      onClick={() => setFaq(1)}
                      className={faq === 1 ? "title open" : "title"}
                    >
                      <span>

                      HOW TO FIND BRAND AMBASSADORS
                      </span>
                      {
                        faq === 1 ? <span>
                        <IoIosArrowForward />
                        </span>
                        :
                        <span>
                        <IoIosArrowDown />
                        </span>
                      }
                    </div>
                    <div className="content">
                      With easy-to-use drag and drop feature, it takes less than
                      5 minutes to launch a recruitment form. You can share it
                      with your customers and other fans through email or social
                      media. As soon as the first person fills the form, you
                      will receive a notification. You can easily accept and
                      reject their application from your dashboard.
                    </div>
                  </div>
                  <div className="accordion-row">
                    <div
                      onClick={() => setFaq(2)}
                      className={faq === 2 ? "title open" : "title"}
                    >
                      <span>

                      WHAT IF I WANT TO UPGRADE PACKAGE
                      </span>
                      {
                        faq === 2 ? <span>
                        <IoIosArrowForward />
                        </span>
                        :
                        <span>
                        <IoIosArrowDown />
                        </span>
                      }
                    </div>
                    <div className="content">
                      From your account section, you can easily upgrade limits
                      to bring in more ambassadors, launch more campaigns or
                      unlock additional features. Complete control.
                    </div>
                  </div>
                  <div className="accordion-row">
                    <div
                      onClick={() => setFaq(3)}
                      className={faq === 3 ? "title open" : "title"}
                    >
                      <span>

                      CAN I RECRUIT ALL OF MY CUSTOMERS AS BRAND AMBASSADORS
                      </span>
                      {
                        faq === 3 ? <span>
                        <IoIosArrowForward />
                        </span>
                        :
                        <span>
                        <IoIosArrowDown />
                        </span>
                      }
                    </div>
                    <div className="content">
                      Generally saying, It is not a good idea to recruit
                      everyone as your ambassador. It reduces quality and
                      increases hassle. The better idea is to focus on 80-20
                      principle. Set criteria of followers, skills and ask value
                      questions that can help you decide whether to select an
                      ambassador or not. They can always re-apply. You can
                      create filter questions through recruitment form.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <IonPopover
            isOpen={video}
            onDidDismiss={() => setVideo(false)}
            class="video-popover"
          >
            <iframe
              src="https://www.youtube.com/embed/O681T2-qyBo"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </IonPopover>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};
export default Landing;

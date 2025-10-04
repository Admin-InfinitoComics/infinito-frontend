import React, {useEffect} from 'react';
import LandingComponent from './LandingComponent';
import CharacterSpotlight from './CharacterSpotlight';
import TodaySpotlight from './TodaySpotlight';
import HeroSection from './Merch';
import LandingMerch from './LandingMerch';
import JoinUltimate from './JoinUltimate';
import PremiumPlans from './PremiumPlans';
import FanFavourite from './FanFavourite';
import Spotlight from '../../components/spotlight/Spotlight';
import UpcomingEvents from './UpcomingEvents';
import FoundationSection from './FoundationSection';
import ExclusiveContent from './ExclusiveContent';
import NewsletterSection from '../Footer/Newsletter';
import Comic from '../../components/Comics/Comic.jsx'
import CharacterCarousel from '../Characters/CharacterCarousel'

const Home = () => {

  const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
  return null;
};

const user = getCookie('user');

    //scroll to top feature
      useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

  return (
    <div>
      <LandingComponent />
      <CharacterCarousel/>
      <CharacterSpotlight />
      {/* <TodaySpotlight /> */}
      {/* <Comic/> */}
      {/* <HeroSection/> */}
      <LandingMerch />
      <JoinUltimate />
      <PremiumPlans />
    
      <ExclusiveContent />
      
      {user && !user.newsLetter && <NewsletterSection />}

      {/* <Otp/> */}
    </div>
  );
};

export default Home;

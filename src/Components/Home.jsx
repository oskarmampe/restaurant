import React from 'react';
import Images from '../Utils/ImageSources';
import { Welcome, HalfMap } from '../Utils/SharedComponents';

const Home = () => (
  <div>
    <Welcome
      heading="Restaurant Finder."
      text="Welcome to restaurant finder! Find the best restaurants around Yorkshire."
      firstImage={Images.restaurant1.src}
      firstAlt={Images.restaurant1.alt}
      secondImage={Images.restaurant2.src}
      secondAlt={Images.restaurant2.alt}
    />

    <HalfMap />

  </div>
);

export default Home;

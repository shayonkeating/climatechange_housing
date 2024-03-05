// about page and how to use the website to its full advantage
// what was used in this website and tools and metrics
// how the liveability score is calculated
"use client"

import React from "react";
import { TypewriterEffect } from "../../app/components/ui/typewriter-effect";
import Link from "next/link";
import Image from "next/image";


export default function About() {
    const words = [
      {
        text: "Rlty"
      },
      {
        text: "Chk"
      },
    ];
  
    return (
        <div className="flex flex-col items-center justify-start h-[40rem] mt-14">
          <p className="flex flex-col items-center text-white text-3xl mb-3" style={{ fontWeight: 550 }}>
            About
          </p>
            <Link href="/" passHref>
                <div style={{cursor: 'pointer'}}>
                    <TypewriterEffect words={words} />
                </div>
            </Link>
          <div className="mt-12">
            <p className="flex flex-col text-white text-2xl" style={{ fontWeight: 500, paddingLeft: '20px'}}>
              How it works
            </p>
            <div style={{padding: '30px'}}>
                <picture>
                    <Image src="/images/climate.png" height="800" width="1200" alt="Image_001" />
                </picture>
            </div>
            <div className="text-white text-l" style={{ fontWeight: 250, paddingLeft: '20px', paddingRight: '20px'}}>
                <p style={{marginBottom: '15px'}}>Climate change is a difficult thing to quantify and analyze. There are numerous factors that can go 
                    into building out a model and numerous data sources that can alter the perspective of a model. For 
                    this model NOAA data was utilized (because they are the 🐐) in order to train the model and build the 
                    future forecasting trends. NOAA data provides us with a perspective using six different metrics:
                </p>
                    <ul>
                    <li>- Number of heating days (how many days do we need to heat our home?)</li>
                    <li>- Number of cooling days (how many days do we need to cool our home?)</li>
                    <li>- Precipitation</li>
                    <li>- Average temperature</li>
                    <li>- Maximum temperature</li>
                    <li>- Minimum temperature</li>
                    </ul>
                <p style={{marginTop: '25px', marginBottom: '25px'}}>These six data points, per each county, over the last 134 years (data goes 
                all the way back to 1890 😱) can provide some valuable insight to where the climate is going to be going in 
                the next 25-50 years. And albeit it is not perfect, like I said, <a href="https://www.nature.com/articles/s41612-020-00148-5" style={{ 
                    fontWeight: 'bold', textDecoration: 'underline'}}>
                climate change is complex and the factors are changing every day </a>
                </p>
                <p style={{marginTop: '25px', marginBottom: '25px'}}>This model takes this data, provides Z-scores based on a county, then calculates 
                the rolling mean and rolling standard deviation of these Z-scores.  Following this, we can divide the data into a training subset and 
                a valid subset, which will allow for the Machine Learning model to be built using the time-series data. Now for the model we are using 
                a Seasonal Autoregressive Integrated Moving Average with Exogenous Regressors model. Or more kindly called: a SARIMAX model. This model 
                builds on a previous model known as ARIMA and adds seasonality to it, which is perfect for the NOAA time series data where there are 
                indeed seasons. Since we already have the data we can set a period of 12 months to it, representing the standard 1 year and really put 
                this model to work.
                </p>
                <p style={{marginTop: '25px', marginBottom: '25px'}}>This model will then use the training data and the valid data and provide a future 
                forecast of our data. Then we can use a linear regression on our predicted data to see which direction we will be going. This is all 
                ran for each and every single data point, hence why it takes a second to work!
                </p>
                <p style={{marginTop: '25px', marginBottom: '25px'}}>After this the Liveability Index can be finally calculated. The index is weighted 
                using each data point for a score of 0-100. 0 meaning it is an absolute terrible place to live and you should move out ASAP and 
                100 meaning it will be a great place to lay down some roots.
                </p>
                <p style={{marginTop: '25px', marginBottom: '80px', textAlign: 'center'}}>Climate change is freakin scary man!
                </p>
                </div>
                <p className="flex flex-col text-white text-2xl" style={{ fontWeight: 500, paddingLeft: '20px'}}>
                Climate Modeling Powered by 🛠️
                </p>
                <div style={{display: 'flex', alignItems:'center'}}>
                    <div style={{ padding: '20px' }}> {/* Add padding here */}
                    <Image src="/images/python.png" height={50} width={50} alt="Image_002" />
                    </div>
                    <div style={{ padding: '20px' }}> {/* Repeat the pattern for each image */}
                    <Image src="/images/jupyter.jpg" height={50} width={50} alt="Image_003" />
                    </div>
                    <div style={{ padding: '20px' }}>
                    <Image src="/images/postgresql.png" height={50} width={50} alt="Image_004" />
                    </div>
                    <div style={{ padding: '20px' }}>
                    <Image src="/images/nextjs.png" height={50} width={50} alt="Image_005" />
                    </div>
                    <div style={{ padding: '20px' }}>
                    <Image src="/images/nodejs.png" height={50} width={50} alt="Image_006" />
                    </div>
                    <div style={{ padding: '20px' }}>
                    <Image src="/images/ts.png" height={50} width={50} alt="Image_007" />
                    </div>  
                </div>
                <p className="flex flex-col text-white text-s" style={{ fontWeight: 200, padding: '50', textAlign: 'center'}}>
                © 2024 Made by Shayon Keating
                </p>
            </div>
        </div>
      );

}



// about page

"use client"

import React from "react";
import { TypewriterEffect } from "../../app/components/ui/typewriter-effect";
import Link from "next/link";
import Image from "next/image";
import Head from 'next/head';


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
                <p style={{marginTop: '25px', marginBottom: '25px'}}>Notice how this data does not include any ocean level or storm data, 
                this was done for simplicity sake as incorporating these metrics into the model exponentially increases its complexity.
                However, these six data points, per each county, over the last 134 years (data goes 
                all the way back to 1890 😱) can provide some valuable insight to where the climate is going to be going in 
                the next 25-50 years. And albeit it is not perfect, like I said, <a href="https://www.nature.com/articles/s41612-020-00148-5" style={{ 
                    fontWeight: 'bold', textDecoration: 'underline'}}>
                climate change is complex and the factors are changing every day </a>
                </p>
                <p style={{marginTop: '25px', marginBottom: '25px'}}>This model takes this data, provides Z-scores based on a county, then calculates 
                the rolling mean and rolling standard deviation of these Z-scores.  Following this, we can divide the data into a training subset and 
                a valid subset, which will allow for the Machine Learning model to be built using the time-series data. Now, for the model, we are using 
                a Seasonal Autoregressive Integrated Moving Average with Exogenous Regressors model. Or more kindly called: a SARIMAX model. This model 
                builds on a previous model known as ARIMA and adds seasonality to it, which is perfect for the NOAA time series data where there are 
                indeed seasons. This machine learning model calculates the moving averages with eXogenous inputs to predict future values by analyzing 
                seasonal patterns, trends, and the effects of external variables, while incorporating z-scores allows for standardizing these variables making
                this one robust model. Since we already have the data we can set a period of 12 months to it, representing the standard 1 year and really put 
                this model to work.
                </p>
                <p style={{marginTop: '25px', marginBottom: '25px'}}>This model will then use the training data and the valid data and provide a future 
                forecast of our data. Then we can use a linear regression on our predicted data to see which direction we will be going (not a perfect metric,
                but it will provide a general idea of where we are going). This is ran for each and every single data point, hence why it takes a second to work!
                </p>
                <p style={{marginTop: '25px', marginBottom: '25px'}}>After this the Liveability Index can be finally calculated. The index is weighted 
                using each data point for a score of 0-100. 0 meaning it is an absolute amazing place to live and you should move there ASAP if you 
                can find housing and 100 meaning climate change is going to directly impact you like a frieght train. Now take this number with a grain of salt.
                Because like I said earlier, it does not take into account ocean data or storm data. (ie New Oreleans scored pretty low and that does make sense 
                because of it being right on the water, hence a stable climate OVERALL, but it fails to take into account its elevation, sea level rising, and storms,
                and we all know how that affected it 😓).
                </p>
                <p style={{marginTop: '25px', marginBottom: '80px', textAlign: 'center'}}>Climate change is freakin scary man!
                </p>
                </div>
                <p className="flex flex-col text-white text-2xl" style={{ fontWeight: 500, paddingLeft: '20px'}}>
                Climate Modeling Powered by 🛠️
                </p>
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{ padding: '20px' ,  maxWidth: '100%', height: 'auto' }}>
                    <Image src="/images/python.png" height={50} width={50} alt="Image_002" />
                    </div>
                    <div style={{ padding: '20px',  maxWidth: '100%', height: 'auto' }}>
                    <Image src="/images/jupyter.jpg" height={50} width={50} alt="Image_003" />
                    </div>
                    <div style={{ padding: '20px',  maxWidth: '100%', height: 'auto' }}>
                    <Image src="/images/postgresql.png" height={50} width={50} alt="Image_004" />
                    </div>
                    <div style={{ padding: '20px',  maxWidth: '100%', height: 'auto' }}>
                    <Image src="/images/nextjs.png" height={50} width={50} alt="Image_005" />
                    </div>
                    <div style={{ padding: '20px',  maxWidth: '100%', height: 'auto' }}>
                    <Image src="/images/nodejs.png" height={50} width={50} alt="Image_006" />
                    </div>
                    <div style={{ padding: '20px',  maxWidth: '100%', height: 'auto' }}>
                    <Image src="/images/prisma.png" height={50} width={50} alt="Image_007" />
                    </div>
                    <div style={{ padding: '20px',  maxWidth: '100%', height: 'auto' }}>
                    <Image src="/images/neon.png" height={50} width={50} alt="Image_008" />
                    </div>
                    <div style={{ padding: '20px',  maxWidth: '100%', height: 'auto' }}>
                    <Image src="/images/vercel.png" height={50} width={50} alt="Image_009" />
                    </div>
                    <div style={{ padding: '20px',  maxWidth: '100%', height: 'auto' }}>
                    <Image src="/images/ts.png" height={50} width={50} alt="Image_010" />
                    </div>
                </div>
                <p className="flex flex-col text-white text-s" style={{ fontWeight: 200, padding: '50', textAlign: 'center'}}>
                © 2024 Made by Shayon Keating
                </p>
            </div>
        </div>
      );

}



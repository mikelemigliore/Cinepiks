## Cinepiks - Track Movies and Series 

#### Overview:

Cinkepiks is my first big project that allowed me to really learn a lot. The goal was to challenge myself and create a website that would allow the user to explore, track and srutinize many contents offered by many different platform all in one place. 

## Project Screen Shot(s)

Login Page:
![Image](https://github.com/user-attachments/assets/f4fdd419-c0da-46dd-81e4-ba01437fb9e3)

Home Page:


Search Page:



## Features
- Find movies and series by title, genre, platform, availability, or rating using an intuitive filter component.
- Add content to a **Watchlist** to track what you wish to see
- Mark content as Watched and keep track of what you've seen.
- Mark content as Liked to have all your likes in one place.
- Using a star rating system, you can give a score to each content you watch.
- View trailers, item info, cast information, reviews, and how-to-watch in one place.
- View ratings from multiple sources (Rotten Tomatoes, IMDb, TMDB)  
- Fully responsive design optimized for both desktop and mobile.
- See a preview effect when hovering over a poster on the home and search pages.
- Switch between grid and list views for a customized browsing experience.
- Sort by release date, popularity, rating, or alphabetical order.


## Technologies Used (NextJs Project)
#### Front-end:
- Next.js
- React 
- Tailwind CSS 
- ShadCN/UI and Material UI
#### Backend and Database:
- MongoDB
- NextAuth
- Redux Toolkit
- TMDB API
- YouTube Player API
- RapidAPI (Streaming Availability)
#### Deployment & Hosting:
- Netlify
- Squarespace (Custom Domain)

 
## Reflection

  - 
  - What did you set out to build?
  - Why was this project challenging and therefore a really good learning experience?
  - What were some unexpected obstacles?
  - What tools did you use to implement this project?
      - This might seem obvious because you are IN this codebase, but to all other humans now is the time to talk about why you chose webpack instead of create react app, or D3, or vanilla JS instead of a framework etc. Brag about your choices and justify them here.  

#### Example:  

This was a 3 week long project built during my third module at Turing School of Software and Design. Project goals included using technologies learned up until this point and familiarizing myself with documentation for new features.  

Originally I wanted to build an application that allowed users to pull data from the Twitter API based on what they were interested in, such as 'most tagged users'. I started this process by using the `create-react-app` boilerplate, then adding `react-router-4.0` and `redux`.  

One of the main challenges I ran into was Authentication. This lead me to spend a few days on a research spike into OAuth, Auth0, and two-factor authentication using Firebase or other third parties. Due to project time constraints, I had to table authentication and focus more on data visualization from parts of the API that weren't restricted to authenticated users.

At the end of the day, the technologies implemented in this project are React, React-Router 4.0, Redux, LoDash, D3, and a significant amount of VanillaJS, JSX, and CSS. I chose to use the `create-react-app` boilerplate to minimize initial setup and invest more time in diving into weird technological rabbit holes. In the next iteration I plan on handrolling a `webpack.config.js` file to more fully understand the build process.

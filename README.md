# Warframe dashboard

This project is a personal learning project to explore using React to create a dynamic UI for interacting with rich data sets.  For this project, I used the data from the [warframe-items](https://github.com/WFCD/warframe-items) project, so huge thanks to the contributors on that project for their hard work.

This project can be viewed online at [https://gabe-connolly.github.io/warframe-dashboard/](https://gabe-connolly.github.io/warframe-dashboard/)

Project goals:
- [x] Allow users to filter items by category
- [x] Allow users to sub-filter item categories with deeper data sets (e.g. Mods)
- [x] Publish project to GitHub pages
- [x] Explore [Styled Components](https://styled-components.com/)
- [ ] Use React Routing to allow category filters to apply based on URLs
- [ ] Create a fully designed project homepage
- [ ] Some of the data sets (e.g. `Misc`) have incomplete or not well formatted content.  See if the content issues can be compensated for with filters if there is a consistent pattern.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Builds the app and commits to a `deploy` branch which can be used on GitHub pages.

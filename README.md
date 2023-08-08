# Proyecto Real de Frontend - React

Proyecto construido con [Create React App](https://github.com/facebook/create-react-app). Para el bootcamp de Nucba, fullstack. El proyecto es un fork del proyecto real Costofinal, con modificaciones del backend utilizado. El proyecto original usaba Firebase Firestore para consultas y grabaciones de base de datos no relacional, y también Firebase functions para envío de emails. Para el proyecto final de Backend de Nucba, se adoptó MondoDB como base de datos usando relacciones por ID. El servidor fue creado en NodeJS con express y hospedada en Heroku para este mismo proyecto.

## Scripts usados

En este proyecto, podes usar los siguientes scripts:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Dependencias usadas:

### React - create-react-app

### Redux - estado del cliente en Cart

### React-Router - single page application con react-router

### Axios - Axios instance en requests para hooks

### React-query / tanstack - Queries y mutations por medio de hooks para estado del lado del servidor;

### Crakra-ui - Template Sidebar With Header y componentes reutilizables;

### Reack-hook-form - Formularios de Login/signup y de actualizacion de datos del usuario

### Styled-components - UI components

### React-multi-carroussel - Carroussel de Home


## API utilizada:

### API de [Costofinal_Backend_Nucba](https://costofinal-backend-810debfecaf4.herokuapp.com/api/v1/auth/reset-password) - creado en NodeJS con express, utiliza consultas y escrituras en MongoDB, por mongoose. 

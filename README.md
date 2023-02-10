# APS Web Frontend
## How to implement
* If you want to add a page, define a directory in the containers

### Package structures
Under the src directory...
* assets
  * Contains images, video, media files ...
* constants
  * Stores the constant variables
* components
    * Contains components that are small, reuseable like Header, Footer ...etc
    * These components may also have a components directory that contains even smaller components to avoid making this directory too big.
    * If the smaller components are used by another component then move it up.
* containers
    * Contains components that present the whole page like CompanyDetails ...etc
* reducers
    * Contains all the slices for the redux store
* sagas
    * Contains all the saga middlewares
* store
    * Contains the redux store, its configuration and some helper hooks
* services
    * Contains the services to make API request 
* scss
  * Stores scss files
  * Should separate scss file per view
* types
  * Contains the declarations of all interfaces
* themes
  * Contains customized theme declarations + color codes
* utils
  * Stores the utility functions

### Component structure
* Each component directory will have 3 files:
  * index.ts: import/export
  * `Component_name.tsx`: The implementation of the component
  * styles.ts(x): Define the styles
  
#### Import/Export strategy and naming convention
* Component directory should be uppercase.
* Component file name should be uppercase.
* Components should be exported and imported through a local index file for better searching experience.
  
## How to unit test
* At least, you should test for basic pass of your code at local env.

## Development
* For validation
  - We use a combination of Material-UI and react-hook-form to handle form and validation.
  - Reference the `<LoginForm>` component for a standard implementation.
  - Reference the official documentation for further information.

* For styling
  - Global Material-UI's components configuration can be changed in `/src/themes/themes.ts`.

* General rule of thumb
  - Since we configure the font-family in material-ui, use `<Typography>` will automatically have the correct font.
  - This also conforms to semantic HTML as text should be inside a `<h1..6>` or `<p>` tag.
  - `div` and `span` are form layout, position of elements.
  - `useMemo` and `useCallback` are for optimization (sacrificing some memory for faster calculation), not using them is alright as per the React's docs at the current moment.

* State management
  - There're 2 types of state: Local state and Global state.
  - Local state: only alive in the component which it's defined, is usually used to control small UI interactions like open/close a modal, toggle a checkbox, etc...
  - Global state: is stored in the global store, is usually data fetching from an external server. Redux is used for this.

* Workflow with global state
  - A global state is defined in a reducer file. This file contains the following:
    - The name of the state.
    - Initial state.
    - Reducer functions (handle logic for updating the state).
    - Actions (is dispatched to invoke a reducer function).
    - Selector function (for getting the global state on a component).
  - To update the global state, we must dispatch an action, this will invoke the reducer function with the same name.

  - A saga is a file that controls the flow to update global state with data from an external server.
  - A saga listen for an action, once that action is dispatched it executes a flow to fetch data, once done it then dispatches another action to execute a reducer function to update the global state.
  - Reference the reducer and saga for user for basic implementation.

### How to start
On local:
```
# to run frontend
yarn start:frontend

# to build frontend
yarn build:frontend

# to lint
yarn lint:frontend
```

On docker:
```
# to run frontend
docker-compose up

# to run all services
docker-compose --profile storybook up

# to build frontend
docker-compose -f ./docker/build/docker-compose.yml up
```


#### To add a lib to the root
```
yarn add <lib_name> -W
```

#### To add a lib to a specific package
```
yarn workspace <workspace_name> add <lib_name>
```

E.g:
```
yarn workspace aps-frontend add lodash
```

# Shopping List

This is a project to create a shopping list. The user can:

- Add items
- Remove items
- Re-order items
- Check off items
- See the price (although this doesn't come from an API)

The task was limited at 6 hours. I planned to complete 8 stories but only managed 6.

## Installation

### Using Docker

Ensure you have these installed:
- [docker](https://docs.docker.com/v17.09/engine/installation/#supported-platforms)
- [docker-compose](https://docs.docker.com/compose/install/)

To run this project all you need is one command in the main directory:

`docker-compose up`

You can then access the application from `http://localhost:3000`

### Manually

To run manually, without docker, you will need to install:

- java 11
- npm
- yarn

To run a MySQL database instance, either use docker or install MySQL manually. You will need to use the configuration found in the `docker-compose.yml` file under `services.database`.

To run the app server, use this command in the `./app-server` directory:

`./gradlew bootRun`

To run the app client, use this command in the `./app-client` directory:

`yarn start`

## Structure

The app uses `docker-compose`, and there are 3 containers:
- app-client: a React app
- app-server: a Java Spring Boot app
- database: a MySQL database

### React App

The app was started using `create-react-app`, and contains two components (so far) - `Header.js` and `List.js`. 

If I had more than 6 hours to improve the stories I worked on, I would have:

- added unit tests using [Jest](https://jestjs.io/)
- added error handling
- split `List.js` into multiple components e.g. `ListItem.js`
- added a price total column underneath the tasks
- moved checked-off tasks to the bottom of the list
- made button CSS more user-friendly
- added currency format to prices
- improved drag UI

### Spring Boot App

The app was started using the [Spring initialiser](https://start.spring.io/). I added a `ListItem` entity and `ListItemController` as well as a `ListItemRepository` so the items could be persisted. Annotations provide the REST API in the controller, and annotations in the entity class enable a table of items to be created in the database.

If I had more time, I would have:

- added more tests, including integration tests
- included an API lookup for the prices

## Resources

### Spring Boot App
- [Spring Initialiser](https://start.spring.io/)
- [Spring - REST service guide](https://spring.io/guides/gs/rest-service/)
- [Spring - Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
- [Spring HTTP Put test example](https://www.logicbig.com/tutorials/spring-framework/spring-web-mvc/http-put-test.html)

### Docker
- [Dockerising React app article](https://medium.com/greedygame-engineering/so-you-want-to-dockerize-your-react-app-64fbbb74c217)
- [Spring Boot, React and Docker Compose example](https://www.callicoder.com/spring-boot-mysql-react-docker-compose-example/)
- [CRUD React and Spring Boot example](https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot)
- [Gradle and Docker](https://codefresh.io/docs/docs/learn-by-example/java/gradle/)

### React App
- [Drag and drop with React](https://www.freecodecamp.org/news/how-to-make-and-test-your-own-react-drag-and-drop-list-with-0-dependencies-6fb461603780/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Reactstrap](https://reactstrap.github.io/)
- [FontAwesome](https://programmingwithmosh.com/react/font-awesome-5-with-react/)



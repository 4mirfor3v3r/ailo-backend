import { App } from './App';
import { PeopleController } from './core/controller/PeopleController';
import { ResearchPublicationController } from './core/controller/ResearchPublicationController';
import { PatentController } from './core/controller/PatentController';
import { EventController } from './core/controller/EventController';

// List of Controllers
const app = new App([
  new PeopleController(),
  new ResearchPublicationController(),
  new PatentController(),
  new EventController(),
]);

app.listen();

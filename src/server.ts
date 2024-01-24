import { App } from './App';
import { MemberController } from './core/controller/MemberController';
import { ResearchPublicationController } from './core/controller/ResearchPublicationController';
import { PatentController } from './core/controller/PatentController';
import { EventController } from './core/controller/EventController';

// List of Controllers
const app = new App([
  new MemberController(),
  new ResearchPublicationController(),
  new PatentController(),
  new EventController(),
]);

app.listen();

import { App } from './App';
import { MemberController } from './core/controller/MemberController';
import { ResearchPublicationController } from './core/controller/ResearchPublicationController';

// List of Controllers
const app = new App([
  new MemberController(),
  new ResearchPublicationController(),
]);

app.listen();

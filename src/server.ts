import { UserController } from './core/controller/UserController';
import { App } from './App'

// List of Controller
const app = new App([
    new UserController()
])
app.listen()
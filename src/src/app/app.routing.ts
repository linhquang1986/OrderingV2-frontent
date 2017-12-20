import { RouterModule, Routes } from '@angular/router';

import Components from './components';

const routes: Routes = [
  { path: '', component: Components.obj.HomeComponent }, 
  { path: 'about', component: Components.obj.AboutComponent}
];

export const routing = RouterModule.forRoot(routes);

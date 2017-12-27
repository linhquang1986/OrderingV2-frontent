import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { AppComponent } from './app.component';

import { AppConfigModule } from './app-config.module';

import { rootReducer } from './reduxStore';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { AppState, INIT_STORE } from './reduxStore/initStore';

import * as Services from './shared';
import Components from './components';
import { Directives } from './directives';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    AppConfigModule,
    NgReduxModule,
    Directives
  ],
  declarations: [
    AppComponent,
    Components.list
  ],
  providers: [
    Services.MenuService,
    Services.WitService,
    Services.HandleResultWitAi,
    Services.Broadcaster,
    Services.WebsocketService    
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    public appRef: ApplicationRef,
    ngRedux: NgRedux<AppState>
  ) {
    ngRedux.configureStore(rootReducer, INIT_STORE);
  }

  hmrOnInit(store) {
    console.log('HMR store', store);
  }

  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}

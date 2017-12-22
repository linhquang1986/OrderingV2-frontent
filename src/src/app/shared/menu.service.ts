import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Menu } from '../models/menu';
import { Drink } from '../models/drink';
import { APP_CONFIG, AppConfig } from '../app-config.module';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MenuService {
    constructor(
        private http: Http,
        @Inject(APP_CONFIG) private config: AppConfig
    ) {
    }

    getAllMenu(): Promise<Menu[]> {
        return this.http.get(`${this.config.apiEndpoint}/drink/getAllMenu`)
            .toPromise()
            .then(response => response.json() as Menu[])
            .catch(this.handleError);
    }

    getAllDrink(): Promise<Drink[]> {
        return this.http.get(`${this.config.apiEndpoint}/drink/getAllDrink`)
            .toPromise()
            .then(response => response.json() as Drink[])
            .catch(this.handleError);
    }

    getDrinkByMenu(idMenu): Promise<Drink[]> {
        return this.http.get(`${this.config.apiEndpoint}/drink/getDrinkByMenu/${idMenu}`)
            .toPromise()
            .then(response => response.json() as Drink[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
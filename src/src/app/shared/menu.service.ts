import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Menu } from '../models/menu';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class MenuService {
    constructor(private http: Http) {
    }
    getAll(): Promise<Menu[]> {
        return this.http.get('http://localhost:5000/drink/getAllMenu')
            .toPromise()
            .then(response => response.json() as Menu[])
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
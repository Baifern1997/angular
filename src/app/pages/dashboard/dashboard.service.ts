import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class dashboardService {


    constructor(private http: HttpClient) { }


    getdashboard(data) {
        return this.http.post<any>('dashboard',data)
            .toPromise()
            .then(data => {
                return data;
            });
    }

    getmenu(data) {
        return this.http.post<any>('menu',data)
            .toPromise()
            .then(data => {
                return data;
            });
    }
}
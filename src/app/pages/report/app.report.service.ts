import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private http: HttpClient) { }

    Report(data) {
        return this.http.get<any>('/report/'+data.code)
            .toPromise()
            .then(data => {
                return data;
            });
    }

}
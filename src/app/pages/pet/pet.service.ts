import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from './Pet';
import { treatment } from './treatment';
import { appointment } from './appointment';
import { Vaccine } from './vaccine';
@Injectable({
    providedIn: 'root'
})
export class PetService {


    constructor(private http: HttpClient) { }

    getdropdown(data) {
        return this.http.post<any>('dropdown',data)
            .toPromise()
            .then(data => {
                return data;
            });
    }

    getPets(data) {
        return this.http.post<any>('PetView',data)
            .toPromise()
            .then(res => <Pet[]>res.data)
            .then(data => {
                return data;
            });
    }
    insertPet(data) {
        return this.http.post<Pet>('PetInsert', data)
            .toPromise()
            .then(data => {
                return data;
            });
    }

    updatePet(data) {
        return this.http.post<Pet>('PetUpdate', data)
            .toPromise()
            .then(data => {
                return data;
            });

    }

    deletePet(data) {
        return this.http.post<any>('PetDelete', data)
            .toPromise()
            .then(data => { return data; });
    }

    gettreatment(data) {
        return this.http.post<any>('PettreatmentView',data)
            .toPromise()
            .then(res => <treatment[]>res.data)
            .then(data => {
                return data;
            });
    }

    inserttreatment(data) {
        return this.http.post<Pet>('PettreatmentInsert', data)
            .toPromise()
            .then(data => {
                return data;
            });
    }

    updatetreatment(data) {
        return this.http.post<Pet>('PettreatmentUpdate', data)
            .toPromise()
            .then(data => {
                return data;
            });

    }

    deletetreatment(data) {
        return this.http.post<any>('PettreatmentDelete', data)
            .toPromise()
            .then(data => { return data; });
    }

    getappointment(data) {
        return this.http.post<any>('PetappointmentView',data)
            .toPromise()
            .then(res => <appointment[]>res.data)
            .then(data => {
                return data;
            });
    }

    insertappointment(data) {
        return this.http.post<Pet>('PetappointmentInsert', data)
            .toPromise()
            .then(data => {
                return data;
            });
    }

    updateappointment(data) {
        return this.http.post<Pet>('PetappointmentUpdate', data)
            .toPromise()
            .then(data => {
                return data;
            });

    }

    deleteappointment(data) {
        return this.http.post<any>('PetappointmentDelete', data)
            .toPromise()
            .then(data => { return data; });
    }

    getvaccine(data) {
        return this.http.post<any>('vaccineView',data)
            .toPromise()
            .then(res => <[Vaccine]>res.data)
            .then(data => {
                return data;
            });
    }

    insertvaccine(data) {
        return this.http.post<Pet>('vaccineInsert', data)
            .toPromise()
            .then(data => {
                return data;
            });
    }

    updatevaccine(data) {
        return this.http.post<Pet>('vaccineUpdate', data)
            .toPromise()
            .then(data => {
                return data;
            });

    }

    deletevaccine(data) {
        return this.http.post<any>('vaccineDelete', data)
            .toPromise()
            .then(data => { return data; });
    }
}
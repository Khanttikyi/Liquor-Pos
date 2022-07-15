import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private headers = new HttpHeaders();
    private baseUrl = environment.apiUrl

    constructor(private httpClient: HttpClient) {

    }

    get(url: string, param?: HttpParams): Observable<any> {
        return this.httpClient.get(this.baseUrl + url, { params: param })
    }

    post(url: string, data: object) {
        console.log(url,data);
        
        return this.httpClient.post(this.baseUrl + url, data)
    }

    put(url: string, data: object) {
        return this.httpClient.put(this.baseUrl + url, data)
    }

    delete(url: string) {
        return this.httpClient.get(this.baseUrl + url)
    }
    getFile(url) {
        return this.httpClient.get(this.baseUrl + url, { responseType: 'blob' })

    }

}
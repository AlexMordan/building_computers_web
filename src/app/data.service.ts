import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../environments/environment';

interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
};
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
};
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  async getAsync<T>(resource: string, options?: HttpOptions): Promise<T> {
    options = { ...options, withCredentials: true };
    let token = window.localStorage.getItem('ACCESS_TOKEN');
    options['headers'] = {
      'ACCESS_TOKEN' : token
    }

    return this.http
      .get<T>(`${environment.API_URL}${resource}`, options)
      .toPromise();
  }

  async deleteAsync<T>(resource: string, options?: HttpOptions): Promise<T> {
    let token = window.localStorage.getItem('ACCESS_TOKEN');
    options = { ...options, withCredentials: true};
    options['headers'] = {
      'ACCESS_TOKEN' : token
    }

    return this.http
      .delete<T>(`${environment.API_URL}${resource}`, options)
      .toPromise();
  }

  async postAuth<T>(
    resource: string,
    body,
    options?: HttpOptions
  ): Promise<T> {
    options = { ...options, withCredentials: true };

    return this.http
      .post<T>(`${environment.API_URL}${resource}`, body, options)
      .toPromise();
  }

  async postAsync<T>(
    resource: string,
    body,
    options?: HttpOptions
  ): Promise<T> {
    options = { ...options, withCredentials: true };
    let token = window.localStorage.getItem('ACCESS_TOKEN');
    options['headers'] = {
      'ACCESS_TOKEN' : token
    }

    return this.http
      .post<T>(`${environment.API_URL}${resource}`, body, options)
      .toPromise();
  }

  async putAsync<T>(resource: string, body, options?: HttpOptions): Promise<T> {
    options = { ...options, withCredentials: true };
    let token = window.localStorage.getItem('ACCESS_TOKEN');
    options['headers'] = {
      'ACCESS_TOKEN' : token
    }

    return this.http
      .put<T>(`${environment.API_URL}${resource}`, body, options)
      .toPromise();
  }
}

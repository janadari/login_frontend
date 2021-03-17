import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: "root"
  })


export class services {

  

  constructor(protected httpClient: HttpClient) { }
  
//   loginUser(name : string): Observable<any> {
//     return this.httpClient.get<any>('http://127.0.0.1:9191/getuserbyname/'+name);
//   }


signIn(username,password): Observable<any> {
  return this.httpClient.post('http://localhost:8080/authenticate', {username,password},httpOptions);
}
}

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'
  
  })
  
  }
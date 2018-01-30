import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/forkjoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ErpApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ErpApiProvider {
  public resultados:any;
  baseUrl:string='https://recsolutions.tech/api/SeguridadApi';

  constructor(public http: HttpClient) {
    console.log('Hello ErpApiProvider Provider');
    //validaLogin()
  }

  validaLogin(username, password){
      return Observable.create(observer => {  this.http.get(this.baseUrl+'/Login?username='+username+'&password='+password)
      //.map(res => res.json())
      .subscribe(data => {
        this.resultados = data;
        
        if(this.resultados){          
          observer.next(true);
          observer.complete();
        }      
        else{          
          observer.next(false);
          observer.complete();
        }
        observer.complete();        
      }, err => {        
        console.log(Error.toString())
      })
    });
  }
}
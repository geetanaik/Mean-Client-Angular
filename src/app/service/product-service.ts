import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Products } from "../model/products";
import "rxjs/add/operator/map";
import { AppRes } from "../model/AppRes";
/**
 * this is class which is used to bring data from rest api and
 * this data will be used inside component class
 *   providers: [ProductService],
     bootstrap: [AppComponent]
     do not forget to mention this service class inside 
     app-module.ts as shown in above
 * 
 */
@Injectable()   //this service will support dependecy injection in App.component.ts
export class ProductService{

    constructor(private http: Http)  //product service has dependecny injection HTTP.
    {      
    }

    public loadProducts() : Observable<Products[]>   // this is method public loadProducts return type product array
    {
        //step is normal response
        let step=this.http.get("http://localhost:3000/v1/products");
        //Now we have to read response as json
        //jsonData hold arary of JavaScript object
        console.log(step);
        let jsonData=step.map((response) => response.json());
        
        //Iterating all the JavaScript Object and converting into
        //Products type & finally creating Array of Products
         jsonData.map((item) => {
                let model = new Products();
                model.pid= item.pid;
                model.name= item.name;  
                model.image= item.image;
                model.price= item.price;
                model.store= item.store;
                model.mfg= item.mfg;
                model.category= item.category;
                console.log(item);
                return model;
        });
        return jsonData;
     }



   

    /**
      * 
      * @param mid mongoid given to the added product
      * by the mongodb database
      */
     public deleteProductById(mid:string) : Observable<AppRes> {
        //step is normal response
        console.log("mid  = "+mid);
        let step=this.http.delete("http://localhost:3000/v1/products/"+mid);
        console.log(step);
        //Now we have to read response as json
        //jsonData hold arary of JavaScript object
        //var data={status:"success",message:"Hey! your profile has been deleted successfully into the database!!!!!!!!!!!!!!!"};
		//res.json(data);
        let jsonData=step.map((response) => response.json());
        return jsonData;
     }


        
    }     

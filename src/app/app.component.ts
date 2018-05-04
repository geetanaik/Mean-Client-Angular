import { Component } from '@angular/core';
import { Customer } from './model/customer';
import { Observable } from 'rxjs/Observable';
import { ProductService } from './service/product-service';
import { Products } from './model/products';
import { AppRes } from './model/AppRes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'app';
  public message: String="here is the message as well";   //instance veriable in class
  public number:Number= 1000000;
  public num:Number=1;
  public customer:Customer;  
  //declare the service instance
  public productList:Products[];

   // declare service object and declare dependecy injection
  public constructor(private productService:ProductService){
    console.log("@@constructor is called");
    console.log(productService);
  }
  //ngonInit method gets invoked automatically when you open page
  ngOnInit():void{
    console.log("@@@ init method is called")
    //this.factorial();
    this.customer=new Customer("Nagendra","nagen@gmail.com",37,true);
    //Write code to fecth data from node.js, varibale products 
      let products:Observable<Products[]>=this.productService.loadProducts();
      console.log(products);
      products.subscribe((results)=> {
        console.log(results)
        this.productList=results;
      });
      //products.subscribe(function(results){
        // console.log(results); 
      //});
  }

 public deleteProduct(delproduct:Products): void{
      console.log("deleteProdcut method call");
      console.log(delproduct);
      console.log(this.productList);
      console.log(delproduct._id);
     // console.log(Products._id);
      let responsefromserver:Observable<AppRes>=this.productService.deleteProductById(delproduct._id);
      responsefromserver.subscribe((response)=> {
        console.log(response);
        if(response.status=="success") {
              this.productList =this.productList.filter((item) =>item.pid!=delproduct.pid);
              this.message=response.message;
        }else{
          this.message=response.message;
        }
      });
       console.log(this.productList );
      
    }
  
 }


 

//  factorial(){
//   let i=5;
//   let sum=1;
  // for (let p=2;p<=i;p++){
    // sum=sum*i;
     //this.num=sum;      //instance variable be referenced always via this.
   //}

  //}
//}

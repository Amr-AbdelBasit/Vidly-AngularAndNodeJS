import { Component, OnInit } from '@angular/core';
import { RentalsService } from 'src/app/services/rentals.service';
import { CustomersService } from 'src/app/services/customers.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/models/IMovie';
import { ICustomer } from 'src/app/models/ICustomer';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-addrental',
  templateUrl: './addrental.component.html',
  styleUrls: ['./addrental.component.scss']
})
export class AddrentalComponent implements OnInit {

  constructor(private rentalsService:RentalsService,private customersService:CustomersService,private movieService:MovieService,private fb:FormBuilder,private router: Router) { }

  Movies:IMovie[];
  Customers:ICustomer[];
errorMessage:string;



  rentalForm=this.fb.group({
    movie:['',[Validators.required]],
    customer:['',[Validators.required]]
  });



  get movie()
  {
    return this.rentalForm.get('movie');
  }

  get customer()
  {
    return this.rentalForm.get('customer');
  }
  ngOnInit(): void {
    this.customersService.getAllCustomers().subscribe(
      customers =>
      {
        this.Customers = customers; ;
      },
      responseError=>
      {
        this.errorMessage=responseError;
      }
    )

    this.movieService.GetAllMovies().subscribe(
      movies =>
      {
        this.Movies = movies;
      },
      responseError=>
      {
        this.errorMessage = responseError;
      }
    )
  }


  onSubmit()
  {
    this.rentalsService.addNewRental(this.rentalForm.value).subscribe(
      response=>{
        this.router.navigate(['/rentals/showall'])
      }
    ,err=>{
    })
    console.log(this.rentalForm.value)
  }

}

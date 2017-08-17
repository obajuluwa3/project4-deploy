import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

class Equipment {
	id: number;
	equip_type: string;
	model: string;
	brand: string;
	category: string;
	condition: string;
	available: boolean;
	equip_img: string;
	hourly_rental_price: number;
	daily_rental_price: number;
	description: string;
	user_id: number;
}

@Component({
  selector: 'app-gear-detail',
  templateUrl: './gear-detail.component.html',
  styleUrls: ['./gear-detail.component.css']
})
export class GearDetailComponent {
	equipment: Equipment = new Equipment();
	date: any = new Date();

 	constructor(private route: ActivatedRoute, private router: Router, private http: Http) {
 		let id = this.route.snapshot.params.id;
    	this.getEquipment(id);
 	}

 	getEquipment(id){
	    this.http.get('http://localhost:9393/equipments/' + id + '?token=' + window.localStorage.token).subscribe(response =>{
	      this.equipment = response.json()
	    }, err => {
	      if(err.status === 403){
	        this.router.navigate(['/login'])
	      } else {
	        alert("ERROR");
	      }
	    })
	}

	createRental(price, id){
      this.http.post('http://localhost:9393/rentals/myrentals?token=' + window.localStorage.token, 
        {active: true,
         rental_date: this.date,
         cost: price,
         equipment_id: id}
        ).subscribe(response => {
        this.router.navigate(['/rentals'])
      })
    }


}

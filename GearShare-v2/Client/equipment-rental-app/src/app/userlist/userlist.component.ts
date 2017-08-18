import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router';

class Equipment {
	equip_id: number;
	equip_equip_type: string;
	equip_model: string;
	equip_brand: string;
	equip_category: string;
	equip_condition: string;
	equip_available: boolean;
	equip_img: string;
	equip_hourly_rental_price: number;
	equip_daily_rental_price: number;
	equip_description: string;
	equip_user_id: number;
	user_id: number;
	user_email: string;
	user_username: string;
	user_password_digest: string;
	user_address: string;
	user_city: string;
	user_state: string;
	user_token: string;
	rentals: string[];
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
	check: boolean = false;
	equip_info: Equipment[] = [];
  	constructor(private http: Http, private router: Router) {
	  	this.getEquipments();
  	}

  	getEquipments(){
	  	this.http.get('http://localhost:9393/equipments/userlist?token=' + window.localStorage.token).subscribe(response => {
	      this.equip_info = response.json(),
	      this.check = this.equip_info[0].equip_available
	      }, err => {
	      if(err.status === 403){
	        this.router.navigate(['/login'])
	      } else {
	        alert("ERROR");
	      }
	    })
	}

	logOut(){
	    window.localStorage.clear();
	    this.router.navigate(['/login'])
  	}

  	checkAll(info, val) {
  		this.http.patch('http://localhost:9393/equipments/toggle/' + info.equipment.id + '?token=' + window.localStorage.token, {"available":val}).subscribe(response =>
      	this.equip_info = response.json()
    	)
  		console.log(this.equip_info);
  	}

  goToEquipment(info){
    this.router.navigate(['/equipments/', info.equipment.id])
  }

  deleteEquipment(info){
    this.http.delete('http://localhost:9393/equipments/' + info.equipment.id + '?token' + window.localStorage.token).subscribe(response =>{
      this.equip_info = response.json()
    }, err => {
      if(err.status === 403){
        this.router.navigate(['/login'])
      } else {
        alert("ERROR");
      }
    })
  }
}
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

class User {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	password: string;
	address: string;
	city: string;
	state: string;
	zip: number;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
	user: User = new User();
	newUser: User = new User();

  constructor(private route: ActivatedRoute, private router: Router, private http: Http) { 
  	let id = this.route.snapshot.params.id;
  	this.getUser(id);
  }

  	getUser(id){
  		this.http.get('http://localhost:9393/users/register/' + id + '?token=' + window.localStorage.token).subscribe(response =>
	      this.user = response.json()
	    )
  	}

 	addAddress(){
	    this.http.patch('http://localhost:9393/users/login/' + this.user.id + '?token=' + window.localStorage.token, this.newUser).subscribe(response =>
	      this.router.navigate(['/list'])
	    )
	}


}

import { Component, OnInit } from '@angular/core';
import { TournamentService } from './tournament.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements OnInit{  <-- was originally on line below but module instructions said to delete.
export class AppComponent{
    //declare variable to hold response and make it public to be accessible from components.html
  public tournaments;
  //initialize the call using TournamentsService 
  constructor(private _myService: TournamentService) { }
  
  //was oringinally ngoninit but module instructions said to delete
  ng() {
    this.getTournaments();
  }
  //method called OnInit
  getTournaments() {
   this._myService.getTournaments().subscribe(
      //read data and assign to public variable tournament
      data => { this.tournaments = data},
      err => console.error(err),
      () => console.log('finished loading')
    );
  }
}

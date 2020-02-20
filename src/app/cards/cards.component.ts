import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from '../tournament.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { MatList } from '@angular/material';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
//declare variable to hold response and make it public to be accessible from components.html
public tournaments;
  //initialize the call using TournamentsService 
  constructor(private _myService: TournamentService) { }
  ngOnInit() {
      this.getTournaments();
    }
    //method called OnInit
    getTournaments() {
      this._myService.getTournaments().subscribe(
        //read data and assign to public variable tournaments
        data => { this.tournaments = data},
        err => console.error(err),
        () => console.log('finished loading')
      );
    // ticking seconds clock on date/time card
    this.seconds = setInterval(() => {
      this.currentSeconds = new Date();
    }, 1000);
    }
  
// starting zoom of map
  zoom: number = 12;

// for opening and closing sidenav columns
  // opened = false;
  
// inputs for the user name join/leave form
@Input() userNameUpdate: string;

  // ticking seconds clock
  today: number = Date.now();
  currentSeconds = new Date();
  seconds;
  
  addSubmit(){
// triggers when the '+' button is clicked. this._id is defined in the onClickMe() function below. This.userNameUpdate is submit form entry
    console.log("You submitted: " + this.userNameUpdate + "" + this._id);
    this._myService.addTournaments(this.userNameUpdate ,this._id);}
//triggers when the 'X' button is clicked. this._id is defined in the onClickMe() function below. This.name is the clicked name on players list 
  deleteSubmit(){
    console.log("You submitted: " + this.name + "" + this._id);
    this._myService.deleteTournaments(this.name ,this._id);}
  updateSubmit(){
    // triggers when the 'update' button is clicked. this._id is defined in the onClickMe() function below. this.name is clicked players name. This.userNameUpdate is submit form entry
        console.log("You submitted: " + this.userNameUpdate + "" + this._id + "" + this.name);
        this._myService.updateTournaments(this.userNameUpdate ,this._id, this.name);}


   // create variables for the onClickMe() function
  userName0 = '';
  _id: string;
  gameLocation='';
  gameCity='';
  gameState='';
  gameZipCode='';
  //the sidenav will start closed
  opened = false;
  // longitude and latitude of the google map
  lat = 33.744854; 
  lng = -84.390180;
// this will appear on the game address card until a game card is clicked 
  testCode='Select game to receive address';
    // the tournament.id (which is the object id for the json array) is passed to onClickMe(id) when a card is clicked 
    onClickMe(id) {
      // Every card stores the object id for the json array. When card is clicked the object id is used to search for the matching array
      let clickedid = this.tournaments.find(tournament => tournament._id == id);
      // set databinding for key:values in json object based on id #
      // other variables are for the Game Adress card
      this.userName0 = clickedid.userNameUpdate; // this.userName0 holds an array of all players for an tournament
      // variables for the Game Adress card
      this.gameLocation = clickedid.location;
      this.gameCity = clickedid.city;
      this.gameState = clickedid.state;
      this.gameZipCode = clickedid.zipCode;
      // test code is defined above is placed holder text on the game address card and will disappear when clicked
      this.testCode='';
      this._id = id; 
      // This is the longitude and latitude for the google map. 
      // long and lat are stored as type string in mongodb so it must 
      // be converted to Number. We could also save lat and long as type 
      // double in mongodb and not have to convert to Number.
      this.lng = Number(clickedid.lng);
      this.lat = Number(clickedid.lat);
      //When a new event card is clicked, the hint and name below the form is cleared
      this.name = ''
      this.hint = 'Click existing name to Update or Delete'
      //opening sidenav
      this.opened = true;
 
    }
    // displays a hint('Selected User Name: name') below form when a name in the players list is clicked. 
    hint='Click existing name to Update or Delete'
    name=''
    submitName(name){
      this.hint = "Delete '" + name + "' or enter User Name to Update"
      this.name = name
    }
  }

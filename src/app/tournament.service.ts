import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class TournamentService {
 
    constructor(private http:HttpClient) {}

///////////Events/////////////   
    // Uses http.get() to load data 
    getTournaments() {
        return this.http.get('/tournaments');
    }

//POST
//This adds a name to the players list
    addTournaments(userNameUpdate: string, _id: string) {
        this.http.post('/tournaments',{userNameUpdate, _id})
            .subscribe((responseData) => {
                console.log(responseData);
        }); 
        location.reload();
    }
//PUT
//This removes a name from the players name list 
    deleteTournaments(userNameUpdate: string, _id: string) {
        this.http.put('/tournaments',{userNameUpdate, _id})
            .subscribe((responseData) => {
                console.log(responseData);
        }); 
        location.reload();
    }
//PATCH
//This updates a name on the players list
 updateTournaments(userNameUpdate: string, _id: string, name: string) {
     this.http.patch('/tournaments',{userNameUpdate, _id, name})
        .subscribe((responseData) => {
             console.log(responseData);
     }); 
     location.reload();
     
}
}
///////////Events/////////////  

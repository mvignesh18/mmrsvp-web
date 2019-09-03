import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { faThumbsUp as fasThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as fasThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle as fasQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { faThumbsUp as farThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown as farThumbsDown } from '@fortawesome/free-regular-svg-icons'
import { faQuestionCircle as farQuestionCircle } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   * AVAILABILITY CHART
   * 
   * 0 - Not selected
   * 1 - Yes
   * 2 - No
   * 3- Tentative
   * 
   */
  matchDate : string = '07 September 2019';
  opponent : string = 'Boston Rangers'
  players = []
  playerCount : number = 0

  // font awesome variables
  fasThumbsUp = fasThumbsUp
  farThumbsUp = farThumbsUp
  fasThumbsDown = fasThumbsDown
  farThumbsDown = farThumbsDown
  fasQuestionCircle = fasQuestionCircle
  farQuestionCircle = farQuestionCircle

  readonly host = 'https://mmrsvp.azurewebsites.net'
  readonly url = '/api/players'
  constructor(private http: HttpClient){
    
  }

  ngOnInit(){
    this.http.get<any>(`${this.host}${this.url}`)
            .subscribe(players => {
              this.players = players
              this.playerCount = players.filter(player=>player.availability == 1).length
            }, err=>{
              alert('An error occured while getting player list')
            })
  }

  onReset(){
    this.http.put(`${this.host}${this.url}`, { })
        .subscribe((players: any) => {
          this.players = players
          this.playerCount = this.players.filter(player=>player.availability == 1).length
        }, err=>{
          alert('An error occured while resetting availability')
        })
  }

  onOptionSelect(player,option : number){
  
    player.availability = player.availability == option ? 0 : option
    this.http.put(`${this.host}${this.url}/${player.id}`,{
      availability : player.availability
    }).subscribe(()=>{
      this.playerCount = this.players.filter(player=>player.availability == 1).length
    },err =>{
      alert('An error occured while saving your availability')
    })
  }

}

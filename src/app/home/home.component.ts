import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void { }

  name = ''

  onNameChange(event: any) {
    this.name = event.target.value
  }

  async joinGame() {
    if (this.name !== '') {
      this.gameService.joinGame(this.name);
      this.router.navigate([`game`], {state: {hostUser: {name: this.name, isHost: false}}})
    }
  }

  clearUsers() {
    this.gameService.clearUsers();
  }

}

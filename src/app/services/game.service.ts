import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import Answer from '../interfaces/answer.model';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private socket: Socket) { };

  joinGame(name: string) {
    return this.socket.emit('joinGame', { username: name});
  }

  onNewPlayer() {
    return this.socket.fromEvent('newPlayer');
  }

  getPlayersForRoom() {
    return this.socket.emit('players');
  }

  startGame() {
    return this.socket.emit('startGame');
  }

  onStartGame() {
    return this.socket.fromEvent('gameStarted');
  }

  clearUsers() {
    return this.socket.emit('clearUsers');
  }

  submitAnswer(answer: Answer) {
    return this.socket.emit('submitAnswer', answer);
  }

  nextQuestion() {
    return this.socket.emit('nextQuestion');
  }

  onSendNextQuestion() {
    return this.socket.fromEvent('sendNextQuestion');
  }
}
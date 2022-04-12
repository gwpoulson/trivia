import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import User from '../interfaces/user.model';
import Question from '../interfaces/question.model';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  id: string | null = '';
  players: User[] = [this.router.getCurrentNavigation()?.extras?.state?.['hostUser']];
  user: User | null = this.router.getCurrentNavigation()?.extras?.state?.['hostUser'] || null;
  questions: Question[] = [];
  currentAnswer: string = '';
  config: CountdownConfig = {
    leftTime: 15,
    formatDate: ({ date }) => `${date / 1000}`,
  };
  notify: string = '';
  betweenQuestions: boolean = false;
  gameOver: boolean = false;
  winners: User[] = [];

  constructor(private route: ActivatedRoute, private gameService: GameService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.gameService.onNewPlayer().subscribe((data: any) => {
      this.players = data.sort((a: User, b: User) => b.score - a.score);
      this.user = this.players.find(x => x.name === this.user?.name) || null;
    });

    this.gameService.onStartGame().subscribe((data: any) => {
      this.questions = data;
    });

    this.gameService.onSendNextQuestion().subscribe(() => {
      this.questions.shift();
      this.betweenQuestions = false;
      this.players.forEach(player => {
        player.currentAnswer = '';
      });
      if (this.questions.length === 0) {
        this.endGame()
      }
    });
  }

  startGame(): void {
    this.gameService.startGame();
  }

  onCurrentAnswerChange(event: any): void {
    this.currentAnswer = event.target.value;
  }

  submitAnswer(): void {
    const answer = {
      answer: this.currentAnswer.toLowerCase(),
      user: this.user || undefined,
      isCorrect: this.currentAnswer === this.questions[0].answer ? true : false
    };

    this.gameService.submitAnswer(answer);
    this.currentAnswer = '';
    this.betweenQuestions = true;
  }

  endQuestion(): void {
    this.betweenQuestions = true
  }

  handleEvent(e: CountdownEvent): void {
    this.notify = e.action.toUpperCase();
    if (this.notify === 'DONE') {
      this.endQuestion()
    }
  }

  nextQuestion(): void {
    this.gameService.nextQuestion();
  }

  endGame(): void {
    this.winners = this.players.sort((a, b) => b.score - a.score).slice(0, 3);
    this.gameOver = true
    this.gameService.clearUsers();
  }

  home(): void {
    this.id = null;
    this.players = [];
    this.user = null;
    this.questions = [];
    this.currentAnswer = '';
    this.betweenQuestions = false;
    this.gameOver = false;
    this.winners = [];
    this.gameService.clearUsers();

    this.router.navigate(['/']);
  }
}

import { TestBed } from '@angular/core/testing';
import { SocketIoModule } from 'ngx-socket-io';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocketIoModule.forRoot({ url: 'http://localhost:3000', options: {} })],
      providers: [GameService]
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

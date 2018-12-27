import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import openSocket from 'socket.io-client';
import { Product } from 'src/models/Product';
const socket = openSocket('http://localhost:3008');

const socketUrl = 'http://localhost:3008';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  constructor() {
    this.socket = openSocket(socketUrl);
   }

}

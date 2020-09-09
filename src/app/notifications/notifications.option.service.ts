import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs'; 
import { scan } from 'rxjs/operators';

interface Command{
  id:number;
  type: 'success' | 'error' | 'clear';
  text?: string; //optional ?
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  messages: ReplaySubject<Command>;

  constructor() {
    this.messages= new ReplaySubject<Command>();
  }

  getMessages(){
    return this.messages.pipe(
      scan((acc: Command[], command: Command)=> {
        if(command.type === 'clear'){
          return acc.filter(message => message.id !== command.id);
        }
        else{
          return [...acc,command]
        }
      }, [])
    );
  }

  addSuccess(message: string){
    this.messages.next({
      id: this.randomID(),
      type: 'success',
      text: message
    });
  }

  addError(message: string){
    this.messages.next({
      id: this.randomID(),
      text: message,
      type: 'error'
    });
  }

  clearMessage(id: number){
    this.messages.next({
      id,
      type:'clear'
    });
  }

  private randomID(){
    return Math.round(Math.random() * 10000);
  }

   }

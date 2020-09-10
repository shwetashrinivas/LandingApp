import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs'; 
import { scan } from 'rxjs/operators';

export interface Command{
  id:number;
  type: 'success' | 'error' | 'clear';
  text?: string; //optional ?
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;


  constructor() {
    this.messagesInput = new Subject<Command>();
    this.messagesOutput = this.messagesInput.pipe(
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

    const id = this.randomID();

    this.messagesInput.next({
      id,
      type: 'success',
      text: message
    });

    this.clearMessage(id);


    // setTimeout(() => {
    //     this.clearMessage(id);
    // },5000);
  }

  addError(message: string){

    const id = this.randomID();

    this.messagesInput.next({
      id,
      text: message,
      type: 'error'
    });

    this.clearMessage(id);
    
    // setTimeout(() => {
    //     this.clearMessage(id);
    // },5000);
  }

  clearMessage(id: number){
    this.messagesInput.next({
      id,
      type:'clear'
    });
  }

  private randomID(){
    return Math.round(Math.random() * 10000);
  }

   }

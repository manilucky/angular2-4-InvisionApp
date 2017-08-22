import { Component,OnInit,OnDestroy } from '@angular/core';
import { NgxLoremIpsumService } from 'ngx-lorem-ipsum';
import {DragulaModule} from 'ng2-dragula';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'Invision Light Weight Course';
  timeout = new Date().getMinutes()+5-new Date().getMinutes();
  text:string;
  questions:string;
  answerText:any;
  randomText:string;
  count:number=0;
  private subscription: Subscription;
  private seconds:number=0;
  private minutes:number=4;
  private mincount:number=5;
  current:number=1;

  constructor(private service: NgxLoremIpsumService){
     this.text=this.service.get(2,1); 
     this.answerText = [
        {id: 1, name: "Lorum Ipsum dolar.. It goes here"}, 
        {id: 2, name: "Squid Migas.. Another Answer" },
        {id: 3, name: "Cliche Narwal.." },
        {id: 4, name: "Humble Brag..." }
    ];
    this.questions = this.answerText.length + "/" + this.answerText.length;
  }

    ngOnInit() {
    let timer = TimerObservable.create(2000, 1000);
    this.subscription = timer.subscribe(t => {
      this.seconds= 60-t;
      if(this.seconds==0){
        this.minutes= this.minutes-1;
        this.subscription.unsubscribe();
        this.subscription.add(this.subscription); 
        alert ("Timer Expires!!!!");
      } 
             
    });
    console.log(this.seconds);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  submitted(elem){
    elem.preventDefault();
    console.log(this.answerText);
  }

}

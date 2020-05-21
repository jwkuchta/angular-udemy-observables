import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false
  private subjectActivated: Subscription
  
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subjectActivated = this.userService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate
    })
  }

  ngOnDestroy() {
    this.subjectActivated.unsubscribe()
  }
}

// OBSERVABLE CREATED WITH INTERVAL

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { interval, Subscription } from 'rxjs'

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit, OnDestroy {

//   private firstObsSubscr: Subscription

//   constructor() { }

//   ngOnInit() {
//     // a bit like setInterval() 
//     this.firstObsSubscr = interval(1000).subscribe(count => {
//       console.log(count)
//     })
//   }

//   ngOnDestroy() {
//     this.firstObsSubscr.unsubscribe()
//   }

// }

// CUSTOM OBSERVABLE - SANE AS ABOVE, BUT THIS TIME FROM SCRATCH

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscr: Subscription

  constructor() { }

  ngOnInit() {
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0
      setInterval(() => {
        observer.next(count)
        if (count === 3) {
          observer.complete()
        }
        if (count > 4) {
          // it dies at 4, no need to unsubscribe
          observer.error(new Error('count is bigger than 4!'))
        }
        count++
        // observer.error()
        // observer.complete()
      }, 1000)
    })

    this.firstObsSubscr = customIntervalObservable.subscribe(
      data => console.log(data), 
      error => alert(error.message),
      () => console.log('completed')
    )
  }

  ngOnDestroy() {
    this.firstObsSubscr.unsubscribe()
  }

}

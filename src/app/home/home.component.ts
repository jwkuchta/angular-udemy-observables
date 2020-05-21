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

// CUSTOM OBSERVABLE - SAME AS ABOVE, BUT THIS TIME FROM SCRATCH

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs'
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscr: Subscription

  constructor() { }

  ngOnInit() {
    const customInterval = Observable.create( observer => {
      let count = 0
      setInterval(() => {
        observer.next(count)
        if (count === 3) {
          observer.complete()
        }
        if (count > 4) {
          observer.error(new Error('count is bigger than 4!'))
        }
        count++
      }, 1000)
    })
    
    // to use operators we need .pipe does not change
    // customInterval.pipe(map((data: number) => {
    //   return 'Round' + (data + 1)
    // }))

    // transform data before you use it and subscribe to the transformed data
    this.firstObsSubscr = customInterval.pipe(map((data: number) => {
        return 'Round: ' + (data + 1)
      })).subscribe(
      data => console.log(data), 
      error => alert(error.message),
      // completion handler function
      () => console.log('completed')
    )
  }

  ngOnDestroy() {
    this.firstObsSubscr.unsubscribe()
  }

}

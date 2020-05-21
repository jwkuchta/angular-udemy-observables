import { Injectable, EventEmitter } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({providedIn: 'root'}) // modern syntax, no need to add to providers

// this is not wrong, but it's better to use Subject than an EventEmitter
// export class UserService {
//     activatedEmitter = new EventEmitter<boolean>()
// }

export class UserService {
    activatedEmitter = new Subject<boolean>()
}

// Subjects are not suitable to be used with @Output, only through components via services
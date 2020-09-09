## Modules:

1. Declarations : List of components, directives and pipes that are created by this module. (**No Services!**)

2. Imports: List of other modules that this module needs to work correctly.

3. Exports: List of components, directives and pipes that this module wants to make available to others.(**No Services!**)

4. Providers: Pre-angular way of wiring up services.

5. Bootstrap: Only present in the app-module. Designates the first components to be created when app starts up.

## RxJS: 

1. **...of**

```
const {observable,timer,of} =Rx;
const {mergeMap, tap, switchMap } = RxOperators;

new Observables ((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
})
```
or
```
of(1,2,3,)
```
or 
```
const number=[1,2,3]
of(...number) 
```


2. **switchMap**

const {observable,timer,of} =Rx;
const {mergeMap, tap, switchMap } = RxOperators;

new Observables ((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
}).pipe(
    switchMap((value) => timer (value *100)).
    tap(value => console.log(value))
);

3. **mergeMap**

## Components :

### Forecast :

1. Observable {latitude:0, longitude:0} ----PIPE---> Series of operators to take the lat/long and transform it into a forecast ---> forecast component


## Services :
1. Add the services to a module's "providers" array
2. Use the @injectable decorator.

## Subject: 

1. Observer: Use this to **throw in** the values.

2. Observable: Use this to **watch for** values.

* **Hot** by default- it will emit values even if nobody is listening!

* **Subject is multicast** by default - multiple subscribers always get the same value.

* GOTCHA!! Calling 'pipe' returns a new **Observable** that is *cold* and *unicast*.

```
const {Subject} = Rx;
const {tap} = RxOperators;

const subject = new Subject();

subject.subscribe((value) => {
    console.log(value);
});

subject.next(10);
subject;
```

### Async Subject:
1. Same as subject,but also doesnt emit any values until is marked as complete. 
2. Only last value is emitted.

```
const { Subject, AsyncSubject } = Rx;
const {tap} = RxOperators;

const subject = new AsyncSubject();

subject.subscribe((value) => {
    console.log(value);
});

subject.next(10);
subject.next(20);
subject.next(30);
subject.complete();    //Ouput: 30

subject;
```

### Behavior Subject:
1. Same as subject,but also takes an initial seed value.
2. New subscribers instantly get the most recent value.

```
const { Subject, BehaviorSubject } = Rx;
const {tap} = RxOperators;

const subject = new BehaviorSubject(10);

subject.next(20); //Output: 20

subject.subscribe((value) => {
    console.log(value);
});


subject;
```

### Replay Subject:
1. Same as subject, but also new subscribers instantly get sent all previously emitted values.

```
const { Subject, ReplaySubject } = Rx;
const {tap} = RxOperators;

const subject = new ReplaySubject();

subject.next(10); 
subject.next(20); 
subject.next(30);  //Output: 10,20,30

subject.subscribe((value) => {
    console.log(value);
});


subject;
```
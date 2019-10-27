# Ionic4 Star Rating

You can give your custom icons, custom color, custom font-size and also make it read-only.  

You can specify the total number of icons to be displayed, default is set to 5. You may change this to 10 star rating component or 7 star rating component depending on your requirement.  

**Supports Half Star Rating.**    
Single tap on default-star-icon changes it to half-star-icon, tap on half-star-icon changes it to full-star-icon and tap on full-star-icon changes it to half-star-icon. The rating value then steps by 0.5 instead of 1.  

You can use it multiple times in a single page/multiple pages and get the changed rating value in the parent component.  

You can also use it inside the `<form>` component (multiple use inside `<form>` is also supported).  

Easy to integrate with your ionic-4 projects. 

For ionic-3 projects please check this package : https://www.npmjs.com/package/ionic3-star-rating

# How to use

## Step-1

### Install it
```npm i ionic4-star-rating```

### add the ionic4-star-rating component in your page.html (parent component) as follows

```
    <ionic4-star-rating #rating
        activeIcon = "ios-star"
        defaultIcon = "ios-star-outline"
        activeColor = "#488aff" 
        defaultColor = "#f4f4f4"
        readonly="false"
        rating="3"
        fontSize = "32px"
        (ratingChanged)="logRatingChange($event)">
    </ionic4-star-rating>
```

### to use inside the `<form>` component

```
    <form [formGroup]="customForm">

        <ionic4-star-rating #rating 
            activeIcon = "ios-star"
            defaultIcon = "ios-star-outline"
            activeColor = "#d1301a"
            defaultColor = "#aaaaaa"
            readonly = "false"
            fontSize = "32px"
            (ratingChanged)="logRatingChange($event)"
            formControlName="starRating">
        </ionic4-star-rating>

    </form>
```
## Options (all are optional, default values are set in the component itself)

* activeIcon (string) : can specify the icon name for active rating (icon name should be from the https://ionicframework.com/docs/ionicons/  ,  default is set to 'ios-star');
* defaultIcon (string): can specify the default icon name (icon name should be from the https://ionicframework.com/docs/ionicons/  , default is set to 'ios-star-outline');
* halfIcon (string) : can specify the icon name for active half rating (icon name should be from the https://ionicframework.com/docs/ionicons/  ,  default is set to 'ios-star-half');
* halfStar (string) : to support half star rating set this to 'true', default is set to 'false'. The rating value then steps by 0.5 instead of 1. Single tap on defaultIcon changes it to halfIcon , tap on halfIcon changes it to activeIcon and tap on activeIcon changes it to halfIcon again.
* maxRating (number) : can specify the total number of icons to be displayed, default is set to 5. You may change this to 10 star rating component or 7 star rating component depending on your requirement.
* activeColor (string): can specify the active color for the active rating icon (should be a valid color code, default is set to '#488aff')
* defaultColor (string): can specify the default color for the rating icon (should be a valid color code, default is set to '#f4f4f4')
* readonly (string): default is set to "false", change to "true" and make it read only. End user won't be able to change the rating then.
* rating (string or number): default is set to 3. input can be of type **number** or **string** (*assign any number from 1 to 5, floating numbers are also accepted, Math.round(parseFloat(rating) is done for all inputs*). 
* fontSize (string) : can specify the font-size for the icon ( should be a valid string as used in css, a number followed by letters 'px', default is set to '28px'). 
* ratingChanged (funtion) : used to handle the rating change in the parent component and do your stuff
* formControlName : only if you are using the ionic4-star-rating component inside the `<form>` component  

## Step-2

### You have to import the StarRatingModule in the module.ts of your parent component as follows and include in imports array 


```

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    RouterModule.forChild([
      {
        path: '',
        component: Tab1Page
      }
    ])
  ],
  declarations: [Tab1Page],
  exports: [ ]
})
export class Tab1PageModule {}

```

## Step-3

## To get the changed rating in the parent component

### method-1 : (recommended method)

```

import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    constructor() {
        // do your stuff
    }

    logRatingChange(rating){
        console.log("changed rating: ",rating);
        // do your stuff
    }
}


```

### method-2 : Using @ViewChild and Events

```

import { Component, ViewChild } from '@angular/core';
import { Events } from '@ionic/angular'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    @ViewChild('rating') rating : any;

    constructor() {
        // do your stuff
    }

    ngOnInit() {
        this.events.subscribe(this.rating.eventInfo.topic, ()=> {
            console.log("changed rating", this.rating._rating);
            // do your stuff
        });
    }
}


```

## To get the changed rating in the parent component if you want to use ionic4-star-rating component inside `<form>` component  

### Step-1 : You have to import ReactiveFormsModule in the module.ts of parent component as shown below

#### sample code in module.ts of parent component

```
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SharedModule } from './../app.shared.module';
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [Tab1Page],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  exports: []
}) 
export class Tab1PageModule {}

```
### Step-2 : Make the following changes in the component.ts of parent component 

```
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

    customForm: FormGroup;
    
    constructor( private formBuilder: FormBuilder ) {
        // do your stuff
    }
    
    ngOnInit() {

        this.customForm = this.formBuilder.group({
            // set default initial value
            starRating: [3]
        });

    }

    logRatingChange(rating){
        console.log("changed rating: ",rating);
        // do your stuff
    }

}

```

## Multiple usage of the component in same parent page

### parent-component.html

```
    <ionic4-star-rating #rating
        activeIcon = "ios-star"
        defaultIcon = "ios-star-outline"
        activeColor = "#ff0000"
        defaultColor = "#aaaaaa"
        readonly = "false"
        rating = "2"
        fontSize = "32px"
        (ratingChanged)="logRatingChange($event)">
    </ionic4-star-rating>

    <ionic4-star-rating #rating2
        activeIcon = "ios-star"
        defaultIcon = "ios-star-outline"
        activeColor = "#d1301a"
        defaultColor = "#aaaaaa"
        readonly = "false"
        rating = "3"
        fontSize = "32px"
        (ratingChanged)="logRatingChange2($event)">
    </ionic4-star-rating>

```
### parent-component.ts

#### method-1

```

import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

    constructor() {
        // do your stuff
    }

    logRatingChange(rating){
        console.log("changed rating: ",rating);
        // do your stuff
    }

    logRatingChange2(rating){
        console.log("changed rating2: ",rating);
        // do your stuff
    }
}

```

#### method-2 : Using @ViewChild and Events

```

import { Component, ViewChild } from '@angular/core';
import { Events } from '@ionic/angular'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    @ViewChild('rating') rating : any;
    @ViewChild('rating2') rating2 : any;

    constructor() {
        // do your stuff
    }

    ngOnInit() {
        this.events.subscribe(this.rating.eventInfo.topic, ()=> {
            console.log("changed rating", this.rating._rating);
            // do your stuff
        });
        this.events.subscribe(this.rating2.eventInfo.topic, ()=> {
            console.log("changed rating2", this.rating2._rating);
            // do your stuff
        });
    }
}

```

## Multiple usage of ionic4-star-rating component in the same `<form>` of the parent page

### parent-component.html
```
    <form [formGroup]="customForm">

      <ionic4-star-rating #rating 
          activeColor = "#ff0000"
          defaultColor = "#aaaaaa"
          readonly = "false"
          (ratingChanged)="logRatingChange($event)"
          formControlName="starRating">
      </ionic4-star-rating>

      <ionic4-star-rating #rating2 
          activeColor = "#ff0000"
          defaultColor = "#aaaaaa"
          readonly = "false"
          (ratingChanged)="logRatingChange2($event)"
          formControlName="starRating2">
      </ionic4-star-rating>

    </form>
```

### parent-component.ts

```

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

    customForm: FormGroup;
    
    constructor( private formBuilder: FormBuilder ) {
        // do your stuff
    }
    
    ngOnInit() {

        this.customForm = this.formBuilder.group({
            // set default initial value
            starRating: [3], 
            starRating2: [4]
        });

    }

    logRatingChange(rating){
        console.log("changed rating: ",rating);
        // do your stuff
    }

    logRatingChange2(rating){
        console.log("changed rating2: ",rating);
        // do your stuff
    }

}

```
### common event for all instances in a page (useful in some specific scenarios)
```
this.events.subscribe('star-rating:changed', (rating) => {
    console.log("changed rating: ",rating);
});
```

## Contact
gmail : melwin.vincent.90@gmail.com

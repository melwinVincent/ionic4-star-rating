# Ionic4 Star Rating

You can give your custom icons, custom color, custom font-size and also make it read only. 
Can use it multiple times in a single page/multiple pages and get the changed rating in the parent component 
Can also be used inside the `<form>` component 

Easy to integrate with your ionic-4 projects. 

For ionic-3 projects please check the below package : 
Package : https://www.npmjs.com/package/ionic3-star-rating
Demo: https://stackblitz.com/edit/ionic3-star-rating

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
* activeColor (string): can specify the active color for the active rating icon (should be a valid color code, default is set to '#488aff')
* defaultColor (string): can specify the default color for the rating icon (should be a valid color code, default is set to '#f4f4f4')
* readonly (string): default is set to "false", change to "true" and make it read only. End user won't be able to change the rating then.
* rating (string or number): default is set to 3. input can be of type **number** or **string** (*assign any number from 1 to 5, floating numbers are also accepted, Math.round(parseFloat(rating) is done for all inputs*). 
* fontSize (string) : can specify the font-size for the icon ( should be a valid string as used in css, a number followed by letters 'px', default is set to '28px'). 
* ratingChanged (funtion) : used to handle the rating change in the parent component and do your stuff
* formControlName : only if you are using the ionic4-star-rating component inside the `<form>` component  

## Step-2

### you have to import the StarRating in the module.ts of your parent component as follows and include in declarations and exports array 


```
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { StarRating } from 'ionic4-star-rating';

@NgModule({
  declarations: [Tab1Page, StarRating],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  exports: [ StarRating ]
}) 
export class Tab1PageModule {}

```

### To use the ionic4-star-rating component in multiple pages

#### Step-2.1 : create a shared module (app.shared.module.ts) in the path src/app/ 

```
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { StarRating } from 'ionic4-star-rating';
@NgModule({
  declarations: [ StarRating ],
  exports: [ StarRating ],
  imports: [
    CommonModule, IonicModule
  ]
})
export class SharedModule {}

```

#### Step-2.2 : importy SharedModule in the module.ts of your parent component

```
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SharedModule } from './../app.shared.module';

@NgModule({
  declarations: [Tab1Page],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  exports: []
}) 
export class Tab1PageModule {}

```


## Step-3

## To get the changed rating in the parent component

### method-1 : using ratingChanged (recommended method)

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

### method-2 using @ViewChild and Events

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

#### sample code in module.ts 

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

## multiple usage of the component in same parent page

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

#### method-2 using @ViewChild and Events

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

## multiple usage of ionic4-star-rating component in the same `<form>` of the parent page

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

## Contact
gmail : melwin.vincent.90@gmail.com

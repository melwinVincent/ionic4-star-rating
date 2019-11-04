import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Events } from '@ionic/angular'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const HTML_TEMPLATE = `
<div class="ionic4-star-rating">
  <button [ngStyle]="{'width' : fontSize, 'height' : fontSize}" *ngFor="let index of iconsArray" id="{{index}}" type="button" ion-button icon-only (click)="changeRating($event)">
    <ion-icon [ngStyle]="{'color':index < this.Math.round(this.parseFloat(rating)) ? activeColor : defaultColor, 'font-size' : fontSize }" name="{{(halfStar ==='true' && (rating - index > 0) && (rating - index <= 0.5)) ? halfIcon : (index < this.Math.round(this.parseFloat(rating))) ? activeIcon : defaultIcon}}"></ion-icon>
  </button>
</div>
`

const CSS_STYLE = `
    .ionic4-star-rating button {
        background: none;
        box-shadow: none;
        -webkit-box-shadow: none;
        padding : 0px;
    }
`

@Component({
  selector: 'ionic4-star-rating',
  template: HTML_TEMPLATE,
  styles: [CSS_STYLE],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: StarRating,
        multi: true
    }
]
})
export class StarRating implements ControlValueAccessor, OnInit{

  ngOnInit(): void {
    this.rating = typeof this.rating !== 'undefined' ? this.rating : 3; //default after input`s initialization
    for(var i=0; i < this.maxRating; i++) {
      this.iconsArray.push(i);
    }
  }

  public readonly eventInfo = (()=>{
    const id =new Date().getTime();
    const topic = `star-rating:${id}:changed`;
    return { 
      topic 
    }
  })();

  private _rating : number;
  private onChange : any;
  private onTouched : any;
  public disabled : boolean;

  writeValue(obj: number): void {
    this.rating = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled ? "true" : "false";
  }

  @Input() public set rating(val : number){
    this._rating = val;
    // for form
    if(this.onChange){
      this.onChange(val);
    }
  }

  public get rating(): number{
    return this._rating;
  }
  
  @Output()
  ratingChanged : EventEmitter<number> = new EventEmitter<number>();

  @Input()
  readonly: string = "false";
  @Input()
  activeColor : string = '#488aff';
  @Input()
  defaultColor : string = '#aaaaaa';
  @Input()
  activeIcon : string = 'ios-star';
  @Input()
  defaultIcon : string = 'ios-star-outline';
  @Input()
  halfIcon : string = 'ios-star-half';
  @Input()
  halfStar : string = "false";
  @Input()
  maxRating : number = 5;
  @Input()
  fontSize : string = '28px';
  Math: any;
  parseFloat : any;
  iconsArray : number[] = [];

  constructor(private events : Events) {
    this.Math = Math;
    this.parseFloat = parseFloat;
  }

  changeRating(event){

    if(this.readonly && this.readonly === "true") return;
    // event is different for firefox and chrome
    let id = event.target.id ? parseInt(event.target.id) : parseInt(event.target.parentElement.id);
    if(this.halfStar && this.halfStar === "true") {
      this.rating = ((this.rating - id > 0) && (this.rating - id <= 0.5)) ? id + 1 : id + .5;
    } else {
      this.rating = id + 1;
    }
    
    // subscribe this event to get the changed value in your parent compoanent 
    this.events.publish(`star-rating:changed`, this.rating); //common event for all instances included for backwards compatibility
    this.events.publish(this.eventInfo.topic, this.rating); //common event for all instances
    // unique event
    this.ratingChanged.emit(this.rating)
  }
}

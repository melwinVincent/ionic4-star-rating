import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Events } from '@ionic/angular'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const HTML_TEMPLATE = `
<div class="ionic4-star-rating">
  <button [ngStyle]="{'width' : fontSize, 'height' : fontSize}" *ngFor="let index of [0,1,2,3,4]" id="{{index}}" type="button" ion-button icon-only (click)="changeRating($event)">
    <ion-icon [ngStyle]="{'color':index < this.Math.round(this.parseFloat(rating)) ? activeColor : defaultColor, 'font-size' : fontSize }" name="{{index < this.Math.round(this.parseFloat(rating)) ? activeIcon : defaultIcon}}"></ion-icon>
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
    this.rating = this.rating || 3; //default after input`s initialization
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
  fontSize : string = '28px';
  Math: any;
  parseFloat : any;

  constructor(private events : Events) {
    this.Math = Math;
    this.parseFloat = parseFloat;
  }

  changeRating(event){

    if(this.readonly && this.readonly === "true") return;
    // event is different for firefox and chrome
    this.rating = event.target.id ? parseInt(event.target.id) + 1 : parseInt(event.target.parentElement.id) + 1;
    // subscribe this event to get the changed value in your parent compoanent 
    this.events.publish(`star-rating:changed`, this.rating); //common event for all instances included for backwards compatibility
    this.events.publish(this.eventInfo.topic, this.rating); //common event for all instances
    // unique event
    this.ratingChanged.emit(this.rating)
  }

}
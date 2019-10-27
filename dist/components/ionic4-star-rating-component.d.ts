import { OnInit, EventEmitter } from '@angular/core';
import { Events } from '@ionic/angular';
import { ControlValueAccessor } from '@angular/forms';
export declare class StarRating implements ControlValueAccessor, OnInit {
    private events;
    ngOnInit(): void;
    readonly eventInfo: {
        topic: string;
    };
    private _rating;
    private onChange;
    private onTouched;
    disabled: boolean;
    writeValue(obj: number): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    rating: number;
    ratingChanged: EventEmitter<number>;
    readonly: string;
    activeColor: string;
    defaultColor: string;
    activeIcon: string;
    defaultIcon: string;
    halfIcon: string;
    halfStar: string;
    maxRating: number;
    fontSize: string;
    Math: any;
    parseFloat: any;
    iconsArray: number[];
    constructor(events: Events);
    changeRating(event: any): void;
}

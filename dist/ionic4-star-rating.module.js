var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { StarRating } from './components/ionic4-star-rating-component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
var StarRatingModule = /** @class */ (function () {
    function StarRatingModule() {
    }
    StarRatingModule_1 = StarRatingModule;
    StarRatingModule.forRoot = function () {
        return {
            ngModule: StarRatingModule_1,
        };
    };
    var StarRatingModule_1;
    StarRatingModule = StarRatingModule_1 = __decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule
            ],
            declarations: [
                StarRating
            ],
            exports: [
                StarRating
            ]
        })
    ], StarRatingModule);
    return StarRatingModule;
}());
export { StarRatingModule };
//# sourceMappingURL=ionic4-star-rating.module.js.map
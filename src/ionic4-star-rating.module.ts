import { NgModule, ModuleWithProviders } from '@angular/core';
import { StarRating } from './components/ionic4-star-rating-component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
 
@NgModule({
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
export class StarRatingModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: StarRatingModule,
        };
    }
}
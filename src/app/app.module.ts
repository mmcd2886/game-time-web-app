import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TournamentService } from './tournament.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardsComponent } from './cards/cards.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpModule } from '@angular/http';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';



// cardsComponent will be the default route
const appRoutes: Routes = [ {
  path: '',         //list events
  component: CardsComponent
},         
{
  path: '**',       //when students listed
  component: NotFoundComponent
},

];
@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatSelectModule,
    MatDividerModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    MatBadgeModule,
    MatTooltipModule,
    MatButtonToggleModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [TournamentService],
  bootstrap: [AppComponent]
})
export class AppModule { }


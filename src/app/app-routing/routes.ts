import { Routes } from '@angular/router';


import { AboutComponent } from '../about/about.component';
import { HomeComponent } from '../home/home.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { ContactComponent } from '../contact/contact.component';
import { MenuComponent } from '../menu/menu.component';

export const routes: Routes = [
    { path: 'menu', component: MenuComponent },
    { path: 'home', component: HomeComponent },
    { path: 'dishdetail/:id', component: DishdetailComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }

];
// angular
import { Routes } from '@angular/router';

// libs
import { MetaGuard } from '@ngx-meta/core';

// framework
import { ChangeLanguageComponent } from '~/app/framework/i18n/i18n.module';

// components
import { MainComponent } from './layout/main.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                loadChildren: './+home/home.module#HomeModule'
            },
            {
                path: 'home',
                loadChildren: './+home/home.module#HomeModule'
            },
            {
                path: 'sobre',
                loadChildren: './+sobre/sobre.module#SobreModule'
            },
            {
                path: 'contato',
                loadChildren: './+contato/contato.module#ContatoModule'
            },
        ],
        canActivateChild: [MetaGuard],
        data: {
            i18n: {
                isRoot: true
            }
        }
    },
    {
        path: 'change-language/:languageCode',
        component: ChangeLanguageComponent
    },
    {
        path: '**', component: NotFoundComponent
    },

];
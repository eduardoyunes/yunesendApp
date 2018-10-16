

// angular
import { Injector, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule, makeStateKey } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ServiceWorkerModule } from '@angular/service-worker';

// libs
import { ConfigLoader, ConfigService } from '@ngx-config/core';
// TODO: ngx-i18n-router
// import { I18N_ROUTER_PROVIDERS, I18NRouterLoader, I18NRouterModule, RAW_ROUTES } from '@ngx-i18n-router/core';
import { MetaLoader } from '@ngx-meta/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ANGULARTICS2_TOKEN } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// framework
import { AnalyticsModule } from '~/app/framework/analytics/analytics.module';
import { configFactory, CoreModule, metaFactory } from '~/app/framework/core/core.module';
import { SharedModule } from '~/app/framework/core/shared.module';
import { HttpInterceptorModule } from '~/app/framework/http/http-interceptor.module';
import { ChangeLanguageComponent, I18NModule, translateFactory } from '~/app/framework/i18n/i18n.module';

// module
import { HeaderComponent } from './layout/header.component';
import { MainComponent } from './layout/main.component';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { NotFoundComponent } from './pages/404/not-found.component';

export const REQ_KEY = makeStateKey<string>('req');

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {suppressScrollX: true};

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TransferHttpCacheModule,
    RouterModule.forRoot(routes),
    PerfectScrollbarModule,
    CoreModule.forRoot([
      {
        provide: ConfigLoader,
        useFactory: configFactory,
        deps: [Injector]
      },
      {
        provide: MetaLoader,
        useFactory: metaFactory,
        deps: [
          ConfigService,
          TranslateService
        ]
      }
    ]),
    SharedModule,
    HttpInterceptorModule,
    // MaterialModule, MDB, CUSTOM, SCHEMA etc mapas SW?
    I18NModule.forRoot([
      {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient]
      }
    ]),
    // TODO: ngx-i18n-router
    // I18NRouterModule.forRoot(routes, [
    //   {
    //     provide: I18NRouterLoader,
    //     useFactory: i18nRouterFactory,
    //     deps: [
    //       ConfigService,
    //       RAW_ROUTES
    //     ]
    //   }
    // ]),
    AnalyticsModule.forRoot([
      {
        provide: ANGULARTICS2_TOKEN,
        useValue: {
          providers: [Angulartics2GoogleAnalytics],
          settings: {}
        }
      }
    ])
  ],
  declarations: [
    HeaderComponent,
    MainComponent,
    AppComponent
  ],
  providers: [
    // I18N_ROUTER_PROVIDERS
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [AppComponent],
  entryComponents: [ChangeLanguageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
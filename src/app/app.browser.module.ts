// angular
import { NgModule } from '@angular/core';
import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { REQUEST } from '@nguniversal/express-engine/tokens';

// libs
import { CACHE } from '@ngx-cache/core';
import { BrowserCacheModule, MemoryCacheService } from '@ngx-cache/platform-browser';
import 'hammerjs';

// framework
import { AuthTestingModule } from '~/app/framework/auth/testing/auth-testing.module';
import { ConsoleService, CoreModule, WindowService } from '~/app/framework/core/core.module';

// module
import { AppComponent } from './app.component';
import { AppModule, REQ_KEY } from './app.module';

// for AoT compilation
export function windowFactory(): any {
  return window;
}

export function consoleFactory(): any {
  return console;
}

export function requestFactory(transferState: TransferState): any {
  return transferState.get<any>(REQ_KEY, {});
}

@NgModule({
  imports: [
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: MemoryCacheService
      }
    ]),
    CoreModule.forRoot([
      {
        provide: WindowService,
        useFactory: windowFactory
      },
      {
        provide: ConsoleService,
        useFactory: consoleFactory
      }
    ]),
    AuthModule.forRoot(),
    AuthTestingModule,
    AppModule
  ],
  providers: [
    {
      provide: REQUEST,
      useFactory: requestFactory,
      deps: [TransferState]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}
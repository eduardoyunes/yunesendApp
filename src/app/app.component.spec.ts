// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// testing
import { t } from '~/app/framework/testing';
import { CoreTestingModule } from '~/app/framework/core/testing/core-testing.module';

// module
import { AppComponent } from './app.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      CoreTestingModule
    ],
    declarations: [AppComponent]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('AppComponent', () => {
    t.be(testModuleConfig);

    t.it('should build without a problem', t.async(() => {
      TestBed.compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(AppComponent);
          const instance = fixture.debugElement.componentInstance;
          fixture.detectChanges();
          t.e(instance)
            .toBeTruthy();
        });
    }));
  });
});
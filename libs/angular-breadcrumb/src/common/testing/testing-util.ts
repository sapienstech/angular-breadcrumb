import {ComponentFixture, getTestBed, TestBed} from "@angular/core/testing";

export const configureTestSuite = (configureAction?: () => void) => {
  const testBedApi: any = getTestBed();
  const originReset = TestBed.resetTestingModule;

  beforeAll(() => {
    TestBed.resetTestingModule();
    TestBed.resetTestingModule = () => TestBed;
  });

  if (configureAction) {
    beforeAll((done: DoneFn) => (async () => {
      configureAction();
      await TestBed.compileComponents();
    })().then(done).catch(done.fail));
  }

  afterEach(() => {
    testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) => fixture.destroy());
    testBedApi._instantiated = false;
  });

  afterAll(() => {
    TestBed.resetTestingModule = originReset;
    TestBed.resetTestingModule();
  });
};

export const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;

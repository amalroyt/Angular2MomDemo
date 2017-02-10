import { DomoDSRPage } from './app.po';

describe('domo-dsr App', function() {
  let page: DomoDSRPage;

  beforeEach(() => {
    page = new DomoDSRPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

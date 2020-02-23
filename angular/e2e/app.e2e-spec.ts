import { ManagerCVTemplatePage } from './app.po';

describe('ManagerCV App', function() {
  let page: ManagerCVTemplatePage;

  beforeEach(() => {
    page = new ManagerCVTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

//ng e2e --suite home para rodar o teste apenas de home que está configurado no arquivo protactor.conf.ts
import { browser, logging } from 'protractor';
import { AppHomePage } from './app.home.po';

describe('Teste da página inicial', () => {
    let page: AppHomePage;

    beforeEach(() => {
        page = new AppHomePage();
    })

    it('Deve existir uma mensagem na página inicial', () => {
        page.navegarParaHome()
        expect(page.getTitleText()).toEqual('Desenvolvimento Avançado em Angular');
    })

    afterAll(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry))
    })
})
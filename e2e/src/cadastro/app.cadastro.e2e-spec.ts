//ng e2e --suite cadastro para rodar o teste apenas de cadastro que está configurado no arquivo protactor.conf.ts
import { AppCadastroPage } from './app.cadastro.po'
import { browser, logging } from 'protractor';

describe('Teste do formulário de cadastro', () => {
    let page: AppCadastroPage;

    beforeEach(() => {
        page = new AppCadastroPage();
    })

    it('deve navegar até o formulário de cadastro', () => {
        page.iniciarNavegacao();
        expect(page.obterTituloCadastro()).toEqual('Demo Cadastro');
    })

    //Caminho feliz
    it('deve preencher o formulário de cadastro com sucesso', () => {
        page.campoNome.sendKeys('Rodrigo Lourenço');
        page.campoCPF.sendKeys('69878462005');
        page.campoEmail.sendKeys('teste1@hotmail.com');
        page.campoSenha.sendKeys('teste@123');
        page.campoSenhaConfirmacao.sendKeys('teste@123');

        browser.executeScript('window.scrollTo(0,2000);').then(function () {
            page.botaoRegistrar.click();
            page.esperar(1000);
        })

        expect(page.obterResultadoCadastro()).toContain('"nome":"Rodrigo Lourenço"')
    })

    //Caminho infeliz -- Erro de senhas diferentes
    it('deve validar senhas diferentes', () => {
        page.iniciarNavegacao();
        page.campoNome.sendKeys('Rodrigo Lourenço');
        page.campoCPF.sendKeys('69878462005');
        page.campoEmail.sendKeys('teste1@hotmail.com');
        page.campoSenha.sendKeys('teste@123');
        page.campoSenhaConfirmacao.sendKeys('novasenha@123');

        page.campoSenha.click();

        expect(page.obterErroSenha()).toContain('As senhas não conferem')
    })

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE
        } as logging.Entry));
    })
})
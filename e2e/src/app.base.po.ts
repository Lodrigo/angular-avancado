//Classe base para execução de métodos genéricos
import { browser, by, element, ExpectedConditions } from 'protractor';

export abstract class AppBasePage {

    constructor() {
        //Abre o browser em janela maximizada
        browser.driver.manage().window().maximize();
    }

    navegarParaHome() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    navegarViaUrl(url: string) {
        return browser.get(url) as Promise<any>;
    }

    //Função de verificar a navegação quando um elemento for clicado
    navegarPorLink(link: string) {
        browser.wait(ExpectedConditions.elementToBeClickable(element(by.linkText(link)))).then(() => {
            return element(by.linkText(link)).click();
        });
    }

    obterElementoXpath(xpath: string) {
        return element(by.xpath(xpath));
    }

    esperar = (milisegundos: number) => {
        browser.sleep(milisegundos);
    }
}
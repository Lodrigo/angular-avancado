import { FormGroup } from "@angular/forms";

export class GenericValidatior {
    //Recebo as mensagens de validação conforme o formulário
    constructor(private validationMessages: ValidationMessages){}

    processarMensagens(container: FormGroup): {[key: string]: string } {
        let messages = {}
        for(let controlKey in container.controls){
            if (container.controls.hasOwnProperty(controlKey)){
                let c = container.controls[controlKey]

                if(c instanceof FormGroup){
                    let childMessages = this.processarMensagens(c)
                    Object.assign(messages, childMessages)
                } else {
                    if(this.validationMessages[controlKey]){
                        messages[controlKey] = '';

                        //Verifico se o formulário está sujo, se foi tocado ou se possui erros
                        if((c.dirty || c.touched) && c.errors){
                            //Pego as mensagens e atribuo para cada erro do formulário
                            Object.keys(c.errors).map(messageKey => {
                                if(this.validationMessages[controlKey][messageKey]) {
                                    messages[controlKey] += this.validationMessages[controlKey][messageKey]
                                }
                            })
                        }
                    }
                }
            }
        }
        return messages;
    }
}

export interface DisplayMessage {
    [key: string]: string
}

export interface ValidationMessages {
    [key: string]: { [key: string]: string}
}
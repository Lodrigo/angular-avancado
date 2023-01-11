import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { fromEvent, merge, Observable } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { DisplayMessage, GenericValidatior, ValidationMessages } from './generic-form-validation';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  usuario: Usuario
  formResult: string = ''
  MASKS = MASKS

  genericValidator: GenericValidatior;
  validationMessages: ValidationMessages;
  displayMessage: DisplayMessage = {};  

  constructor(
    private fb: FormBuilder
    ) {
    this.validationMessages = {
      nome: {
        required: 'O nome é requerido.',
        minLength: 'O nome precisa ter no mínimo 2 caracteres.',
        maxLength: 'O nome precisa ter no máximo 150 caracteres.',
        rangeLength: 'O nome deve possuir entre 2 e 15 caracteres'
      },
      cpf: {
        required: 'Informe o CPF',
        cpf: 'CPF em formato inválido'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      senha: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      senhaConfirmacao: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    }

    //Crio uma instancia de generic validations e passo as validationsMessages
    this.genericValidator = new GenericValidatior(this.validationMessages);
  }

  ngOnInit() {
    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])])
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)])

    this.cadastroForm = this.fb.group({
      nome: ['',[ Validators.required, CustomValidators.rangeLength([2, 15])]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirm,
      data_inicio: ['']
    })
  }

  ngAfterViewInit(): void {
    //Verifico evento blur de acordo com ação no formulário pego em formInputElements
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'))
    //merge para executar todos os blurs de acordo com o input
    merge(...controlBlurs).subscribe(() => {
      //Envio do formulário para verificar mensagens
      console.log(this.cadastroForm, 'cadastro')
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm)
    })
  }

  adicionarUsuario(){
  if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
    }
    this.formResult = JSON.stringify(this.cadastroForm.value)
  }
}

import { HttpClient } from "@angular/common/http";
import { Component, Inject, Injector, NgZone, OnInit } from "@angular/core";
import { BarUnidadeConfig, BAR_UNIDADE_CONFIG } from "./bar.config";
import { BarFactory, BarServices, BarServicesMock, BebidaService } from "./bar.service";

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    providers: [
        // { provide: BarService, useClass: BarServiceMock },
        { 
            provide: BarServices, useFactory: BarFactory,
            deps: [
                HttpClient,
                Injector
            ]
        },
        { provide: BebidaService, useExisting: BarServices },
    ]
})

export class BarComponent implements OnInit{
    configManual: BarUnidadeConfig;
    Config: BarUnidadeConfig;
    barBebida1: string;
    dadosUnidade: string;
    barBebida2: string;

    progress: number = 0;
    label: string;

    constructor(
        private BarServices: BarServices,
        @Inject('ConfigManualUnidade') private ApiConfigManual: BarUnidadeConfig,
        @Inject(BAR_UNIDADE_CONFIG) private ApiConfig: BarUnidadeConfig,
        private bebidaService: BebidaService,
        private _ngZone: NgZone
    ) { }

    ngOnInit(): void {
        this.barBebida1 = this.BarServices.obterBebidas();
        this.configManual = this.ApiConfigManual;
        this.Config = this.ApiConfig;
        this.dadosUnidade = this.BarServices.obterUnidade();
        this.barBebida2 = this.bebidaService.obterBebidas();
    }

    // Loop inside the Angular zone
    // so the UI DOES refresh after each setTimeout cycle
    processWithinAngularZone() {
        this.label = 'dentro';
        this.progress = 0;
        this._increaseProgress(() => console.log('Finalizado por dentro do Angular!'));
    }

    // Loop outside of the Angular zone
    // so the UI DOES NOT refresh after each setTimeout cycle
    processOutsideOfAngularZone() {
        this.label = 'fora';
        this.progress = 0;
        this._ngZone.runOutsideAngular(() => {
            this._increaseProgress(() => {
                // reenter the Angular zone and display done
                this._ngZone.run(() => { console.log('Finalizado Fora!'); });
            });
        });
    }

    _increaseProgress(doneCallback: () => void) {
        this.progress += 1;
        console.log(`Current progress: ${this.progress}%`);

        if (this.progress < 100) {
            window.setTimeout(() => this._increaseProgress(doneCallback), 10);
        } else {
            doneCallback();
        }
    }
}
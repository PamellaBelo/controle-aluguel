import { Injectable } from "@angular/core";

export interface Imovel{
    id: number;
    nome: string;
   endereco: string;
   tipoImovel: string;
   dataAquisicao: string;
   grupoId?: number;
}

@Injectable({
    providedIn: 'root' 
})

export class ImovelService{
    private readonly STORAGE_KEY = 'imoveis';

    constructor(){}

    getImoveis(): Imovel[]{
       if(typeof window === 'undefined') return [];

        const dados = localStorage.getItem(this.STORAGE_KEY);
        return dados ? JSON.parse(dados) : [];
    }

    salvarImovel(imovel: Imovel): void{
        if(typeof window === 'undefined') return;
        
        const imoveis = this.getImoveis();
        const novoId = imoveis.length > 0 ? Math.max(...imoveis.map(i => i.id)) + 1 : 1;
        imoveis.push({ ...imovel, id: novoId});
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(imoveis));
    }

    limparImoveis(): void{
        localStorage.removeItem(this.STORAGE_KEY);
    }
}
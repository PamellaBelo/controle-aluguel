import { Injectable } from "@angular/core";

export interface GrupoImovel{
    id: number;
    nome: string;
}

@Injectable({providedIn: 'root'})
export class GrupoImovelService{
    private readonly STORAGE_KEY = 'grupos-imoveis';

    constructor(){}

    getGrupos(): GrupoImovel[]{
        if(typeof window === 'undefined') return [];

        const dados = localStorage.getItem(this.STORAGE_KEY);
        return dados ? JSON.parse(dados) : [];
    }

    adicionarGrupo(nome: string): GrupoImovel{
        const grupos = this.getGrupos();
        const novoId = grupos.length > 0 ? Math.max(...grupos.map(g => g.id)) + 1 : 1;

        const novoGrupo: GrupoImovel = {
            id: novoId, nome: nome
        };

        grupos.push(novoGrupo);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(grupos));

        return novoGrupo;
    }

    limparGrupos(): void{
        if(typeof window !== 'undefined'){
            localStorage.removeItem(this.STORAGE_KEY);
        }
    }
}
import { Score } from "../valuesObjects/Score";
import { JoueurDeTennis } from "./JoueurDeTennis";

export class PartieDeTennis {
    [x: string]: JoueurDeTennis;    
    private _scoreDuPremierJoueur:Score = new Score();
    private _scoreDuSceondJoueur:Score = new Score();
    constructor(private _premierJoueur:JoueurDeTennis, private _secondJoueur:JoueurDeTennis){
    }

    get premierJoueur(){
        return this._premierJoueur;
    }

    get secondJoueur(){
        return this._secondJoueur;
    }

    get scoreDuPremierJoueur() {
        return this._scoreDuPremierJoueur;
    }

    set scoreDuPremierJoueur(score: Score){
        this._scoreDuPremierJoueur = score;
    }

    get scoreDuSecondJoueur() {
        return this._scoreDuSceondJoueur;
    }
    
    set scoreDuSecondJoueur(score: Score){
        this._scoreDuSceondJoueur = score;
    }


}
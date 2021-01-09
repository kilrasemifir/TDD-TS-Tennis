import { JoueurDeTennis } from "../entities/JoueurDeTennis";
import { PartieDeTennis } from "../entities/PartieDeTennis";
import { Score } from "../valuesObjects/Score";

export class TennisCompteurDeScore {

    public creerUneNouvellePartie(premierJoueur:JoueurDeTennis, secondJoueur:JoueurDeTennis){
        return new PartieDeTennis(premierJoueur, secondJoueur);
    }

    public joueurGagneLePoint(partie:PartieDeTennis, joueur:JoueurDeTennis){
        let {scoreGagnant, scorePerdant} = this.scoreDuGagnantEtDuPerdant(partie, joueur);
        
        if (this.estAEgalite(scoreGagnant, scorePerdant))
            this.gagneAvantageOuJeu(scoreGagnant, scorePerdant);
        else if (scoreGagnant.points === 40){
            this.joueurGagneLeJeu(scoreGagnant, scorePerdant);
        }
        else {
            scoreGagnant.gagneUnPoint();
        }
    }

    private joueurGagneLeJeu(scoreGagnant:Score, scorePerdant:Score){
        scoreGagnant.gagneLeJeu();
        scoreGagnant.reinitialiseLeJeu();
        scorePerdant.reinitialiseLeJeu();
    }

    private gagneAvantageOuJeu(scoreGagnant:Score, scorePerdant:Score){
        if (scorePerdant.avantage)
            scorePerdant.perdSonAvantage(); 
            else if(scoreGagnant.avantage)
                this.joueurGagneLeJeu(scoreGagnant, scorePerdant);
            else 
                scoreGagnant.gagneUnAvantage();
    }

    private scoreDuGagnantEtDuPerdant(partie:PartieDeTennis, gagnant:JoueurDeTennis){
        let scoreGagnant = partie.scoreDuPremierJoueur;
        let scorePerdant = partie.scoreDuSecondJoueur;
        if (gagnant === partie.secondJoueur){
            scoreGagnant = partie.scoreDuSecondJoueur;
            scorePerdant = partie.scoreDuPremierJoueur;
        }
        return {scoreGagnant, scorePerdant};
    }

    private estAEgalite(scoreGagnant:Score, scorePerdant:Score): boolean{
        return scoreGagnant.points === 40 && scorePerdant.points === 40;
    }

    public definitionDesScores(partie:PartieDeTennis, scorePremierJoueur:Score, scoreSecondJoueur: Score){
        partie.scoreDuPremierJoueur = scorePremierJoueur;
        partie.scoreDuSecondJoueur = scoreSecondJoueur;
    }
}
export class Score {

    constructor(private _points = 0,
        private _jeuGagne = 0,
        private _avantage = false){
    }

    get points(){ return this._points}

    get jeuGagne(){ return this._jeuGagne}

    get avantage(){ return this._avantage; }

    gagneUnPoint() {
        if(this._points === 0) this._points = 15;
        else if(this._points === 15) this._points = 30; 
        else if(this._points === 30) this._points = 40;
    }

    gagneUnAvantage(){
        this._avantage = true;
    }

    perdSonAvantage() {
        this._avantage = false;
    }

    gagneLeJeu(){
        this._jeuGagne+=1;
    }

    reinitialiseLeJeu() {
        this._avantage = false;
        this._points = 0;
    }

}
/**
 *
 * Vector
 *
 *  */
class Vector {
    constructor(x,y) {
        this.x=x;
        this.y=y;
    }

    static setRandInt(v1,v2){
        var x = randInt(v1.x, v2.x);
        var y = randInt(v1.y, v2.y);
        return new Vector(x, y);
    }

    setXY(x, y){
        this.x = x;
        this.y = y;
    }

    distance(m) {
        return Math.sqrt(Math.pow(this.y - m.y,2) + Math.pow(this.x - m.x,2));
    }

    produitScalaire(m) {
        return (this.x*m.x) + (this.y*m.y);
    }

    getUnitaire() {
        var longueur = Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
        return new Vector(this.x/longueur, this.y/longueur);
    }

    soustraction(v) {
        return new Vector(this.x-v.x, this.y-v.y);
    }

    addition(v) {
        return new Vector(this.x+v.x, this.y+v.y);
    }


    multiplication(value) {
        return new Vector(this.x*value, this.y*value);
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    getNormal() {
        return new Vector(-this.y, this.x);
    }

    division(v) {
        return new Vector(this.x/v, this.y/v);
    }

    opp() {
        return new Vector(-this.x, -this.y);
    }

    isNull() {
        return (this.x == 0) && (this.y == 0);
    }

    equal(v) {
        return (this.x == v.x) && (this.y == v.y);
    }

    

};

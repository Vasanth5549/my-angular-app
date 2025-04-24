export class Random {
    //full stub implemented
    constructor(){

    }
    public Next(): number{
        return Math.round(Math.random() * 100000000)
    }
    public NextBytes(buffer: number[]): void{

    }
    public NextDouble(): number{
        return 0
    }
    protected Sample(): number{
        return 0;
    }
}
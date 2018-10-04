class Site {

    constructor(){
        this.init();
        this.initButton();
    }

    init() {
        console.log("Init class");
    }

    initButton(){

        console.log("Init button");

        $('#btnClick').click(function(event){
            console.log("click button");
        });

    }

}

let mySite = new Site();

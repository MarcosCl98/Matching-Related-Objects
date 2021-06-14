class SceneLevel1 extends Phaser.Scene {

    constructor ()
    {
        super('SceneLevel1');
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
        this.numCorrectsPlayer1 = 0;
        this.freeze = false;
        this.numErrors = 0;
        this.posicionesLevel1 = [new Position(-200,100),new Position(200,100),new Position(-200,-100),new Position(200,-100)];
        this.createBoard();
    }

    preload ()
    {
        this.load.image('background', 'mys/assets/background.jpg');

        //Level1
        this.load.spritesheet('sun', 'mys/assets/sun.png',
        { frameWidth: 150, frameHeight: 150 }  );

        this.load.spritesheet('moon', 'mys/assets/moon.png',
        { frameWidth: 150, frameHeight: 150 }  );
        
        this.load.spritesheet('night', 'mys/assets/night.png',
        { frameWidth: 150, frameHeight: 150 }   );
         
        this.load.spritesheet('sunny', 'mys/assets/sunny.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('sun2', 'mys/assets/sun2.png',
        { frameWidth: 150, frameHeight: 150 }  );

        this.load.spritesheet('beach', 'mys/assets/beach.png',
        { frameWidth: 150, frameHeight: 150 }  );
        
        this.load.spritesheet('raining', 'mys/assets/raining.png',
        { frameWidth: 150, frameHeight: 150 }   );
         
        this.load.spritesheet('umbrella', 'mys/assets/umbrella.png',
        { frameWidth: 150, frameHeight: 150 }   );

        //Emojis
        this.load.image('sad', 'mys/assets/sad.png');
        this.load.image('smile', 'mys/assets/smile.png');

    }

    create ()
    {
        initTracking ('Scene1')
        this.add.image(this.x, this.y,'background');

        this.emojiSad = this.add.image(this.x, this.y-250,'sad');
        this.emojiSmile = this.add.image(this.x, this.y-250,'smile');
        this.emojiSad.setVisible(false);
        this.emojiSmile.setVisible(false);

        var cam  = this.cameras.add(0, 0, this.x*2, this.y*2);    
        cam.setBackgroundColor('0x000000');

        this.checkPreviousGame(this.posicionesLevel1.length);

        this.relatedObjectsLevel1 = [];
        this.createLevel1();

        this.physics.add.overlap(this.relatedObjectsLevel1,this.relatedObjectsLevel1,this.checkCollision,null,this);
        this.createText();
  }

    update()
    {  
        
    }

    //Getters
    getRandomPosition(max,min) {
        return Math.round(Math.random() * (max - min) + min);
    }

    getNumErrors(){
        return this.numErrors;
    }

    //Checkers
    checkRelatedObjects(){
        this.contador = 0;
        this.relatedObjectsLevel1.forEach(element => {
                if(!element.getIsVisible()){
                    this.contador++; 
                }
        });
        if(this.contador == 4){
            this.correctText.setPosition(this.x-100,this.y-270);
            this.nextLevelText.setVisible(true);
            setTimeout(() => {
                finishTracking(window.location.href, 'Scene Level 1', 8,this.numErrors);
                this.scene.start('SceneLevel2');
                
            }, 1500);
                
        }
    }
    

    checkPreviousGame(length){
        if(length == 0){
            this.numErrors = 0;
            this.posicionesLevel1 = [new Position(-200,100),new Position(200,100),new Position(-200,-100),new Position(200,-100)];
            this.numCorrectsPlayer1 = 1;
        }
    }

    checkCollision(related1, related2){
        if(!this.freeze && related1.getIsVisible() && related2.getIsVisible()){
            if(related1.getCouple() == related2.getCouple()){
                this.numCorrectsPlayer1++;
                related1.setVisible(false);
                related2.setVisible(false);
                related1.setIsVisible(false);
                related2.setIsVisible(false);
                this.emojiSmile.setVisible(true);
                this.freeze = true;
                setTimeout(() => {
                    this.freeze = false;
                    this.emojiSmile.setVisible(false);
                }, 1500);
                this.checkRelatedObjects();
            }else{
                this.numErrors++;
                related1.restart();
                related2.restart();
                this.emojiSad.setVisible(true);
                this.freeze = true;
                setTimeout(() => {
                    this.freeze = false;
                    this.emojiSad.setVisible(false);
                }, 1500);
            }
        }
    }

    //Creates
    createLevel1(){
        this.boardLevel1.forEach(element => {
            var posicion = this.getRandomPosition(this.posicionesLevel1.length-1,0)
            var xrelatedObject = this.posicionesLevel1[posicion];
            var relatedObject = new RelatedObject ( this, xrelatedObject.getX()+this.x, xrelatedObject.getY()+this.y, element["sprite"], element["couple"]);
            this.posicionesLevel1.splice(posicion, 1)
            this.relatedObjectsLevel1.push( relatedObject );
        });
    }

    createBoard(){
        var randomNumber = this.getRandomPosition(1,0)
        if(randomNumber == 0){
            this.boardLevel1 = [
                {image:'1',sprite:'sun', couple:1},
                {image:'2',sprite:'moon', couple:2},
                {image:'3',sprite:'night', couple:2},
                {image:'4',sprite:'sunny', couple:1}
            ];  
        }else{
            this.boardLevel1 = [
                {image:'1',sprite:'sun2', couple:1},
                {image:'2',sprite:'beach', couple:1},
                {image:'3',sprite:'raining', couple:2},
                {image:'4',sprite:'umbrella', couple:2}
            ];  
        }
    }

    createText(){
        this.player1text = this.add.text(this.x-350, this.y-270);
        this.player1text.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#FFFFFF'});
        this.player1text.setText('Level: 1');
        this.player1text.visible=true;

        this.nextLevelText = this.add.text(this.x-60, this.y-200);
        this.nextLevelText.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.nextLevelText.setText("Next level!!");
        this.nextLevelText.visible=false;

        this.correctText = this.add.text(this.x-60, this.y-270);
        this.correctText.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.correctText.setText("Correct!!");
        this.correctText.visible=false;

        this.winnerText = this.add.text(this.x-170, this.y-120);
        this.winnerText.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.winnerText.visible=false;

        this.clickButton = new TextButton(this, this.x-220, this.y-50, 'Click here to return to the menu !',
             { fontFamily: 'myFont', fontSize:30, fill: '#ffff00'}, () => this.scene.start('SceneMenu'));
        this.add.existing(this.clickButton);
        this.clickButton.visible=false;
    }
    
}
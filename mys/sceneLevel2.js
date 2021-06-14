class SceneLevel2 extends Phaser.Scene {

    constructor ()
    {
        super('SceneLevel2');
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
        this.numCorrectsPlayer1 = 0;
        this.posicionesLevel2 = [new Position(-300,120),new Position(0,120), new Position(300,120),new Position(-300,-120),new Position(0,-120),new Position(300,-120)];
        this.freeze = false;
        this.createBoard();  
        this.numErrors = 0;
    }

    preload ()
    {
        this.load.image('background', 'mys/assets/background.jpg');

        //Level2
        this.load.spritesheet('cow', 'mys/assets/cow.png',
        { frameWidth: 150, frameHeight: 150 }  );

        this.load.spritesheet('dog', 'mys/assets/dog.png',
        { frameWidth: 150, frameHeight: 150 }  );
        
        this.load.spritesheet('cat', 'mys/assets/cat.png',
        { frameWidth: 150, frameHeight: 150 }   );
            
        this.load.spritesheet('milk', 'mys/assets/milk.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('bone', 'mys/assets/bone.png',
        { frameWidth: 150, frameHeight: 150 }   );
            
        this.load.spritesheet('fish', 'mys/assets/fish.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('baby', 'mys/assets/baby.png',
        { frameWidth: 150, frameHeight: 150 }  );

        this.load.spritesheet('babybottle', 'mys/assets/babybottle.png',
        { frameWidth: 150, frameHeight: 150 }  );
        
        this.load.spritesheet('ball', 'mys/assets/ball.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('kid', 'mys/assets/kid.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('male', 'mys/assets/male.png',
        { frameWidth: 150, frameHeight: 150 }   );
            
        this.load.spritesheet('briefcase', 'mys/assets/briefcase.png',
        { frameWidth: 150, frameHeight: 150 }   );
        
        //Emojis
        this.load.image('sad', 'mys/assets/sad.png');
        this.load.image('smile', 'mys/assets/smile.png');
    }

    create ()
    {
        initTracking ('Scene2')
        this.add.image(this.x, this.y,'background');

        this.emojiSad = this.add.image(this.x, this.y-250,'sad');
        this.emojiSmile = this.add.image(this.x, this.y-250,'smile');
        this.emojiSad.setVisible(false);
        this.emojiSmile.setVisible(false);

        var cam  = this.cameras.add(0, 0, this.x*2, this.y*2);    
        cam.setBackgroundColor('0x000000');

        this.checkPreviousGame(this.posicionesLevel2.length);

        this.relatedObjectsLevel2 = [];
        this.createLevel2();

        this.physics.add.overlap(this.relatedObjectsLevel2,this.relatedObjectsLevel2,this.checkCollision,null,this);
        this.createText();
  }

    update()
    {   
        
    }

    //Getters
    getRandomPosition(max,min) {
        return Math.round(Math.random() * (max - min) + min);
    }

    //Checkers
    checkRelatedObjects(){
        this.contador = 0;
        this.relatedObjectsLevel2.forEach(element => {
                if(!element.getIsVisible()){
                    this.contador++; 
                }
        });
        if(this.contador == 6){
            this.correctText.setPosition(this.x-100,this.y-270);
            this.nextLevelText.setVisible(true);
            setTimeout(() => {
                finishTracking(window.location.href, 'Scene Level 2', 8,this.numErrors);
                this.scene.start('SceneLevel3');
                
            }, 1500);
                
        }
    }

    checkPreviousGame(length){
        if(length == 0){
            this.numErrors = 0;
            this.posicionesLevel2 = [new Position(-300,120),new Position(0,120), new Position(300,120),new Position(-300,-120),new Position(0,-120),new Position(300,-120)];
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

    createLevel2(){
        this.boardLevel2.forEach(element => {
            var posicion = this.getRandomPosition(this.posicionesLevel2.length-1,0)
            var xrelatedObject = this.posicionesLevel2[posicion];
            var relatedObject = new RelatedObject ( this, xrelatedObject.getX()+this.x, xrelatedObject.getY()+this.y, element["sprite"], element["couple"] );
            this.posicionesLevel2.splice(posicion, 1)
            this.relatedObjectsLevel2.push( relatedObject );
        });
    }

    createBoard(){
        var randomNumber = this.getRandomPosition(1,0)
        if(randomNumber == 0){
            this.boardLevel2 = [
                {image:'1',sprite:'cow', couple:1},
                {image:'2',sprite:'cat', couple:2},
                {image:'3',sprite:'dog', couple:3},
                {image:'4',sprite:'milk', couple:1},
                {image:'5',sprite:'bone', couple:3},
                {image:'6',sprite:'fish', couple:2}
            ];  
        }else{
            this.boardLevel2 = [
                {image:'1',sprite:'baby', couple:1},
                {image:'2',sprite:'kid', couple:2},
                {image:'3',sprite:'man', couple:3},
                {image:'4',sprite:'babybottle', couple:1},
                {image:'5',sprite:'ball', couple:2},
                {image:'6',sprite:'briefcase', couple:3}
            ];  
        }
    }

    createText(){
        this.player1text = this.add.text(this.x-350, this.y-270);
        this.player1text.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#FFFFFF'});
        this.player1text.setText('Level: 2');
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
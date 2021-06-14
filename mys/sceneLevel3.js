class SceneLevel3 extends Phaser.Scene {

    constructor ()
    {
        super('SceneLevel3');
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
        this.freeze = false;
        this.numCorrectsPlayer1 = 0;
        this.posicionesLevel3 = [new Position(-300,120),new Position(0,120), new Position(300,120),new Position(-300,-120),new Position(0,-120),new Position(300,-120)];
        this.createBoard();
        this.numErrors = 0;
    }

    preload ()
    {
        this.load.image('background', 'mys/assets/background.jpg');

        //Level3
        this.load.spritesheet('basket-ball', 'mys/assets/basket-ball.png',
        { frameWidth: 150, frameHeight: 150 }  );

        this.load.spritesheet('tennis-ball', 'mys/assets/tennis-ball.png',
        { frameWidth: 150, frameHeight: 150 }  );
        
        this.load.spritesheet('football-ball', 'mys/assets/football-ball.png',
        { frameWidth: 150, frameHeight: 150 }   );
         
        this.load.spritesheet('basket-field', 'mys/assets/basket-field.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('tennis-field', 'mys/assets/tennis-field.png',
        { frameWidth: 150, frameHeight: 150 }   );
         
        this.load.spritesheet('fotball-field', 'mys/assets/fotball-field.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('fork', 'mys/assets/fork.png',
        { frameWidth: 150, frameHeight: 150 }  );

        this.load.spritesheet('shirt', 'mys/assets/shirt.png',
        { frameWidth: 150, frameHeight: 150 }  );
        
        this.load.spritesheet('meat', 'mys/assets/meat.png',
        { frameWidth: 150, frameHeight: 150 }   );
         
        this.load.spritesheet('wrench', 'mys/assets/wrench.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('sewing', 'mys/assets/sewing.png',
        { frameWidth: 150, frameHeight: 150 }   );
         
        this.load.spritesheet('car', 'mys/assets/car.png',
        { frameWidth: 150, frameHeight: 150 }   );

        //Emojis
        this.load.image('sad', 'mys/assets/sad.png');
        this.load.image('smile', 'mys/assets/smile.png');
    }

    create ()
    {
        initTracking ('Scene3')
        this.add.image(this.x, this.y,'background');

        this.emojiSad = this.add.image(this.x, this.y-250,'sad');
        this.emojiSmile = this.add.image(this.x, this.y-250,'smile');
        this.emojiSad.setVisible(false);
        this.emojiSmile.setVisible(false);

        var cam  = this.cameras.add(0, 0, this.x*2, this.y*2);    
        cam.setBackgroundColor('0x000000');

        this.checkPreviousGame(this.posicionesLevel3.length);

        this.relatedObjectsLevel3 = [];
        this.createLevel3();

        this.physics.add.overlap(this.relatedObjectsLevel3,this.relatedObjectsLevel3,this.checkCollision,null,this);
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
        this.relatedObjectsLevel3.forEach(element => {
                if(!element.getIsVisible()){
                    this.contador++; 
                }
        });
        if(this.contador == 6){
            this.emojiSad.setVisible(false);
            this.emojiSmile.setVisible(false);
            setTimeout(() => {
                finishTracking(window.location.href, 'Scene Level 3', 8,this.numErrors);
                this.winnerText.setText("Congratulations!!" );
                this.winnerText.visible=true;
                this.clickButton.visible=true;
                this.player1text.visible = false;
                
            }, 1500);
                
        }
    }
    checkPreviousGame(length){
        if(length == 0){
            this.numErrors = 0;
            this.posicionesLevel3 = [new Position(-300,120),new Position(0,120), new Position(300,120),new Position(-300,-120),new Position(0,-120),new Position(300,-120)];
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
                    this.emojiSad.setVisible(true);
                }, 1500);
            }
        }
    }

    //Creates
    createLevel3(){
        this.boardLevel3.forEach(element => {
            var posicion = this.getRandomPosition(this.posicionesLevel3.length-1,0)
            var xrelatedObject = this.posicionesLevel3[posicion];
            var relatedObject = new RelatedObject ( this, xrelatedObject.getX()+this.x, xrelatedObject.getY()+this.y, element["sprite"], element["couple"] );
            this.posicionesLevel3.splice(posicion, 1)
            this.relatedObjectsLevel3.push( relatedObject );
        });
    }

    createBoard(){
        var randomNumber = this.getRandomPosition(1,0)
        if(randomNumber == 0){
            this.boardLevel3 = [
                {image:'1',sprite:'basket-ball', couple:1},
                {image:'2',sprite:'tennis-ball', couple:2},
                {image:'3',sprite:'football-ball', couple:3},
                {image:'4',sprite:'basket-field', couple:1},
                {image:'5',sprite:'tennis-field', couple:2},
                {image:'6',sprite:'fotball-field', couple:3}
            ];   
        }else{
            this.boardLevel3 = [
                {image:'1',sprite:'fork', couple:1},
                {image:'2',sprite:'shirt', couple:2},
                {image:'3',sprite:'car', couple:3},
                {image:'4',sprite:'meat', couple:1},
                {image:'5',sprite:'sewing', couple:2},
                {image:'6',sprite:'wrench', couple:3}
            ];  
        }
    }

    createText(){
        this.player1text = this.add.text(this.x-350, this.y-270);
        this.player1text.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#FFFFFF'});
        this.player1text.setText('Level: 3');
        this.player1text.visible=true;

        this.correctText = this.add.text(this.x-60, this.y-270);
        this.correctText.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.correctText.setText("Correct!!");
        this.correctText.visible=false;

        this.winnerText = this.add.text(this.x-120, this.y-120);
        this.winnerText.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.winnerText.visible=false;

        this.clickButton = new TextButton(this, this.x-220, this.y-50, 'Click here to return to the menu !',
             { fontFamily: 'myFont', fontSize:30, fill: '#ffff00'}, () => this.scene.start('SceneMenu'));
        this.add.existing(this.clickButton);
        this.clickButton.visible=false;
    }
    
}
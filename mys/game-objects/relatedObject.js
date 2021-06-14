class RelatedObject extends Phaser.GameObjects.Sprite{

    constructor (scene, x, y, texture, couple)
      {

        super(scene, x, y, texture);
        this.scene = scene;
        this.initialx = this.x;
        this.initialy = this.y;
        this.isVisible = true;
        this.couple = couple;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive();
        scene.input.setDraggable(this);
        scene.input.dragDistanceThreshold = 16;
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

          gameObject.x = dragX;
          gameObject.y = dragY;
  
      });
        scene.input.on('dragend', function (pointer, gameObject) {
          gameObject.x = gameObject.initialx;
          gameObject.y = gameObject.initialy;
       });
      }
  
      getCouple(){
        return this.couple;
      }

      restart(){
        this.x=this.initialx;
        this.y=this.initialy;
      }

      getIsVisible(){
        return this.isVisible;
      }
      setIsVisible(param){
          this.isVisible = false;
      }
      

    
}
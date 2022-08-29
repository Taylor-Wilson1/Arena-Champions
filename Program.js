var game_started=false;

var frame_time=60 //updateWindow should loop every 60ms
var image_count=10; //10 images total inside of each fighter's folders 
var animation_loop_time=frame_time*image_count; //total time for fighter animation to finish
var animation_loops=3; //number of loops an animation should do
var animation_time=function(override_loops){ 
    if(override_loops != undefined)
        return override_loops*animation_loop_time;
    return animation_loops*animation_loop_time; 
} //total time for a turn's animation to complete
var interim_stage_wait=3000; //pause used for after fighter has completed his stages.
var game_starting_pause=6000; //a pause right before the fight begins, to let the fighters sit on screen


function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

//solely responsible for updating window to represent current status of the fighter passed to it. stops once fighter is deleted.
async function updateWindow(fighter){
    //called here so we only call document.getElementById once, and not every time we loop.
    var img=document.getElementById(fighter.elementID+"_img");
    var name=document.getElementById(fighter.elementID+"_name");
    var health=document.getElementById(fighter.elementID+"_health");
    name.innerHTML=fighter.name; //Most logic is in the while loop, but as I'm not expecting this name to change, I'll put it here.
    // originally, wanted to just check for fighter != null, but apparently objects have weird behavior when it comes to 
    // erasing them. So we're just gonna check for the elementID to be erased.
    while(fighter.alive){
        //update the fighter's element to display it's status
        img.src=fighter.getImage();
        health.innerHTML=fighter.health;
        await sleep(frame_time); //pauses updateWindow for a set time, so that it doesn't just loop at hyperspeed.
    }
}
function deleteFighter(fighter){
    document.getElementById(fighter.elementID+"_img").src="";
    document.getElementById(fighter.elementID+"_name").innerHTML="";
    document.getElementById(fighter.elementID+"_health").innerHTML="";
    fighter.elementID=null; //so updateWindow will know to stop updating fighter
    fighter.alive=false; //this is set when the fighter dies, but setting it here as well so the alive fighter's updateWindow stops too.
}
function Fighter(name, health){
    this.elementID=null;
    this.name=name;
    this.alive=true;
    this.health=health;
    this.attack_power=5;
    this.status_img="idle";
    this.img_num=0;
    this.getImage=function(){
        this.img_num=(this.img_num%10)+1; //should effectively loop between 1 and 9, should probably rename images to be 0-9, then change this to follow suit
        this.currentimg=this.elementID+"/"+this.status_img+"/"+this.status_img+"_"+this.img_num+".png";
        return this.currentimg;
    }
    this.attackFighter=function(target){
        this.changeStatus("attack");
        updateStatusBox(this.name+" is attacking "+target.name+"!!!");
        target.health-=this.attack_power;
        target.isDead();
    }
    this.changeStatus=function(status_img){
        this.status_img=status_img;
        this.img_num=0;
    }
    this.isDead=async function(){
        if(this.health <= 0){
            this.changeStatus("dead");
            await sleep(animation_time(1)); //override animation loops to 1 loop. Don't need the guy falling over and over
            this.alive=false;
            return true;
        }
        return false;
    }
}
//this is where you'll send text to update the status box with, to show the current gameplay.
function updateStatusBox(text){
    document.getElementById("status_box").innerHTML=text;
}
function fighterDied(fighter){
    if(!fighter.alive){
        updateStatusBox("fighter "+fighter.name+" has perished!!!!");
        return true;
    }
    return false;

}
async function core_loop(){
    document.getElementById("start_button").style.display="none";
    console.log("core loop started");
    let fighter_1;
    let fighter_2;
    //Pre-Game setup
    if(!game_started){

        fighter_1=new Fighter("Bob", 20);
        fighter_1.elementID="fighter_1";
        fighter_2=new Fighter("Joe", 20);
        fighter_2.elementID="fighter_2";
        //these two should run as effectively background processes
        updateWindow(fighter_1); 
        updateWindow(fighter_2);

        updateStatusBox("LETS GET READY TO RUUUUUMMBBLEE!!!");
        await sleep(game_starting_pause); //wait before actually starting the match, to let the characters sit on screen.
        game_started=true;
    }
    //Actual Game Loop
    while(true){
        //Fighter 1's attack sequence
        fighter_1.attackFighter(fighter_2);
        await sleep(animation_time()); //Allow the current fighter animation to loop for a time, make it feel like a fighting sequence is occurring
        fighter_1.changeStatus("idle"); //if not dead, he'll change to idle
        if(fighterDied(fighter_2)){
            await sleep(animation_time());
            break;
        }
            
        
        await sleep(interim_stage_wait); //breather before fight continues

        //Fighter 2's attack sequence
        fighter_2.attackFighter(fighter_1);
        await sleep(animation_time()); //Allow the current fighter animation to loop for a time, make it feel like a fighting sequence is occurring
        fighter_2.changeStatus("idle"); //if not dead, he'll change to idle
        if(fighterDied(fighter_1)){
            await sleep(animation_time());
            break;
        }

        await sleep(interim_stage_wait); //breather before fight continues
    }
    //Post-Game Cleanup
    console.log("game's over.");
    game_started=false;
    //Current implementation of deleting fighters is a bit rough, but fortunately, that lets us get away with this.
    deleteFighter(fighter_1);
    deleteFighter(fighter_2);
    updateStatusBox("");
    
}
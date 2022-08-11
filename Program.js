// Title: ArenaChampion.App
// Name: Taylor Wilson
// City: West Monroe
// State: Louisiana

class Fighter
    {
        /// <summary>
        /// Constructor for Fighter Objects
        /// <parem name="name"> The Fighter's Name</parem>
        /// <parem name="healthPoints"> The Fighter's HealthPoints</parem>
        /// </summary>
        constructor (Name, HealthPoints)
        {
            this.Name = Name;
            this.HealthPoints = HealthPoints;
        }
    }

// Instantiates two Fighters
let fighter1 = new Fighter(GetRandomFighterName(), RandomHealth());
let fighter2 = new Fighter(GetRandomFighterName(), RandomHealth());

//Variables 
let clearMove;
let clearContent;

const start_button = document.querySelector('button');
// ----------------------------------------------------- RUN GAME -----------------------------------------------------
// The program runs when the btn is clicked
start_button.addEventListener('click', run);
function run ()
{   
    setTimeout(toggleStartMatchDisplay, 3000);
    clearMove = setInterval(MakeAMove, 3000);
    clearContent = setInterval(eraseContent, 2999);
}


// ----------------------------------------------------- CHAMPION ANIMATIONS -----------------------------------------------------

// Champion One's attack animation
// Switches to the Attack animation from the Idle Animation
const character_One = document.querySelector('.Character_One_Idle');
function cOneAttackAnimation() {
    character_One.classList.remove("Character_One_Idle");
    character_One.classList.add("Character_One_Attack");
}

// Champion One's Idle animation
// Switches back to the Idle animation from the Attack Animation
function cOneIdleAnimation() {
    character_One.classList.remove("Character_One_Attack");
    character_One.classList.add("Character_One_Idle");
}

// Champion One's Death animation
// Switches to the Death animation from the Idle Animation
function cOneDeathAnimation() {
    character_One.classList.remove("Character_One_Idle");
    character_One.classList.add("Character_One_Dead");
}


// Champion Two's attack animation
// Switches to the Attack animation from the Idle Animation
const character_Two = document.querySelector('.Character_Two_Idle');
function cTwoAttackAnimation() {
    character_Two.classList.remove("Character_Two_Idle");
    character_Two.classList.add("Character_Two_Attack");
}

// Champion Two's Idle animation
// Switches back to the Idle animation from the Attack Animation
function cTwoIdleAnimation() {
    character_Two.classList.remove("Character_Two_Attack");
    character_Two.classList.add("Character_Two_Idle");
}

// Champion Two's Death animation
// Switches to the Death animation from the Idle Animation
function cTwoDeathAnimation() {
    character_Two.classList.remove("Character_Two_Idle");
    character_Two.classList.add("Character_Two_Dead");
}


// ----------------------------------------------------- DISPLAYS CHAMPIONS INFO ON CLICk -----------------------------------------------------
start_button.addEventListener('click', displayChampionsInfo);
function displayChampionsInfo() {
    document.getElementById("Character_One_Name").classList.remove("hide");
    document.getElementById("Character_One_HealthPoints").classList.remove("hide");

    document.getElementById("Character_Two_Name").classList.remove("hide");
    document.getElementById("Character_Two_HealthPoints").classList.remove("hide");
}


// ----------------------------------------------------- CHAMPION 1 NAME & HEALTH -----------------------------------------------------
// Displays Character One's Name and Health under the FIGHTER 1 SPRITE
const display_Character_One_Name = document.createElement('h2');
display_Character_One_Name.textContent = fighter1.Name;
document.getElementById('Character_One_Name').appendChild(display_Character_One_Name);


const display_Character_One_HealthPoints = document.createElement('h2');
function c_one_hp ()
{
    display_Character_One_HealthPoints.textContent = fighter1.HealthPoints;
}
c_one_hp();
document.getElementById('Character_One_HealthPoints').appendChild(display_Character_One_HealthPoints);


// ----------------------------------------------------- CHAMPION 2 NAME & HEALTH -----------------------------------------------------
// Displays Character Two's Name and Health under the FIGHTER 2 SPRITE
const display_Character_Two_Name = document.createElement('h2');
display_Character_Two_Name.textContent = fighter2.Name;
document.getElementById('Character_Two_Name').appendChild(display_Character_Two_Name);


const display_Character_Two_HealthPoints = document.createElement('h2');
function c_two_hp ()
{
    display_Character_Two_HealthPoints.textContent = fighter2.HealthPoints;
}
c_two_hp();
document.getElementById('Character_Two_HealthPoints').appendChild(display_Character_Two_HealthPoints);



// ----------------------------------------------------- INTRODUCTORY DIV -----------------------------------------------------
// When the "Start Match" button is clicked, the Introductory Div is shown
start_button.addEventListener('click', toggleIntroDisplay);
function toggleIntroDisplay() {
    document.getElementById("Introductory").classList.remove("hide");
}

// Creates a new Paragraph to Displays Character Ones's Name once the button has been clicked.
// const newFighter1 = document.createElement('p');
// newFighter1.textContent = fighter1.Name;
// document.getElementById('fighter1-name').appendChild(newFighter1);


// // Creates a new Paragraph to Displays Character Ones's Name once the button has been clicked.
// const newFighter2 = document.createElement('p');
// newFighter2.textContent = fighter2.Name;
// document.getElementById('fighter2-name').appendChild(newFighter2);


// Creates a new Paragraph to Displays Character Ones's Name again in the introductory Div
const fighter1_Name = document.createElement('p');
fighter1_Name.textContent = fighter1.Name;
document.getElementById('fighter1-name2').appendChild(fighter1_Name);


// Creates a new Paragraph to Displays Character Ones's Health in the introductory Div
const fighter1_HealthPoints = document.createElement('p');
fighter1_HealthPoints.textContent = fighter1.HealthPoints;
document.getElementById('fighter1-healthPoints').appendChild(fighter1_HealthPoints);

// Creates a new Paragraph to Displays Character Two's Name again in the introductory Div
const fighter2_Name = document.createElement('p');
fighter2_Name.textContent = fighter2.Name;
document.getElementById('fighter2-name2').appendChild(fighter2_Name);

// Creates a new Paragraph to Displays Character Two's Health in the introductory Div
const fighter2_HealthPoints = document.createElement('p');
fighter2_HealthPoints.textContent = fighter2.HealthPoints;
document.getElementById('fighter2-healthPoints').appendChild(fighter2_HealthPoints);


// ----------------------------------------------------- START_MATCH DIV -----------------------------------------------------
// Toggles between the Introductory div and the Start_Match Div.
// Adds and removes the hide class to certain elements 
function toggleStartMatchDisplay() {
    document.getElementById("Introductory").classList.add("hide");
    document.getElementById("Start_Match").classList.remove("hide");
    document.getElementById("btn").classList.add("hide");
}



// ----------------------------------------------------- FUNCTIONS -----------------------------------------------------
// Champion's Name is randomly generated
function GetRandomFighterName()
{
    let fighterNames = [ "Chuck", "Cynthia", "Josh", "Lindsey", "Baxter", "Laurel", "Arnie", "Jolie", "Tyler", "Myra", "Matty","Neil", "Isabell", "Catherine", "Joe Bob", "Ivan", "Damon", "Norma", "Pete" ];
    
    return fighterNames[Math.floor(Math.random() * fighterNames.length)];
}


// Generates Random Healthpoints for Champions: Ranges from 5 - 25
function RandomHealth(){
    let randomHealth = Math.floor(Math.random() * 25) + 5;
    return randomHealth;
}

// Randomly determines which Champion attacks first
function MakeAMove()
{
    let randomFighter = Math.floor(Math.random() * 2) + 1;


    if (randomFighter == 1)
    {
        cOneAttackAnimation();
        setTimeout(cOneIdleAnimation, 1000);
        DealDamage(fighter1, fighter2);
    }
                
    else
    {
        cTwoAttackAnimation();
        setTimeout(cTwoIdleAnimation, 1000);
        DealDamage(fighter2, fighter1);
        
    }
}

// Randomly generates damage 
function DealDamage(attacker, target)
{
    if (target.HealthPoints > 0 || attacker.HealthPoints > 0)
    {
        let damageTaken = Math.floor(Math.random() * 6) + 1;

        target.HealthPoints -= damageTaken;

        c_one_hp();
        c_two_hp();
        
        showInfo(attacker, target, damageTaken);
    }
}

// Displays information regarding the Attacker and the Target such as: 
// Who is the Attacker and their target: Attacker attacked Target.
// How much damage the Target was dealt: Target was dealt __ damage. 
// Displays Target's remaining heath: Target's health is __
// Displays who has been defeated
function showInfo (attacker, target, damageTaken) {
    const attack_name = document.createElement('p');
    attack_name.textContent = attacker.Name;


    const target_name = document.createElement('p');
    target_name.textContent = target.Name;

    const target_name_two = document.createElement('p');
    target_name_two.textContent = target.Name;

    const target_name_three = document.createElement('p');
    target_name_three.textContent = target.Name;


    const target_HealthPoints = document.createElement('p');
    target_HealthPoints.textContent = target.HealthPoints;

    const damage_taken = document.createElement('p');
    damage_taken.textContent = damageTaken;


    if (target.HealthPoints > 0){
        document.getElementById('attacker_name_1').appendChild(attack_name);
        document.getElementById('target_name_1').appendChild(target_name);

        document.getElementById('target_name_2').appendChild(target_name_two);
        document.getElementById('damage').appendChild(damage_taken);

        document.getElementById('target_name_3').appendChild(target_name_three);
        document.getElementById('target_HealthPoints').appendChild(target_HealthPoints);

    }
    else{
        document.getElementById('attacker_name_1').appendChild(attack_name);
        document.getElementById('target_name_1').appendChild(target_name);

        document.getElementById('target_name_2').appendChild(target_name_two);
        document.getElementById('damage').appendChild(damage_taken);

        document.getElementById('target_name_3').appendChild(target_name_three);


        switchOut();
        stop();

        defeated(target);
    }
}

// Switches out which elements to display when called by the showInfo function.
// Adds and removes the hide class to certain elements 
function switchOut (){
    document.getElementById("target_HealthPoints").classList.add("hide");
    document.getElementById("switchOut1").classList.add("hide");
    document.getElementById("switchOut2").classList.add("hide");
    // document.getElementsByClassName("switchOut").classList.add("hide");
    document.getElementById("switchIn").classList.remove("hide");
    // document.getElementById("switchIn").classList.remove("show");
}

// Clears Intervals
function stop () {
    clearInterval(clearMove);
    clearInterval(clearContent);
}

// Plays defeated Champion's dead animation
function defeated (target){
    if(target.Name === fighter1.Name){
        cOneDeathAnimation();   
    }
    else{
        cTwoDeathAnimation();
    }
}

// Function erases previous content in "Start Match" div
function eraseContent ()
{
    const eraseAttacker = document.getElementById('attacker_name_1');
    eraseAttacker.textContent = '';

    const eraseTargetOne = document.getElementById('target_name_1');
    eraseTargetOne.textContent = '';

    const eraseTargetTwo = document.getElementById('target_name_2');
    eraseTargetTwo.textContent = '';

    const eraseTargetThree = document.getElementById('target_name_3');
    eraseTargetThree.textContent = '';

    const eraseHealthPoints = document.getElementById('target_HealthPoints');
    eraseHealthPoints.textContent = '';

    const eraseDamage = document.getElementById('damage');
    eraseDamage.textContent = '';
}








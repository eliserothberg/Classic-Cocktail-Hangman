      var names; 
      var choices;
      var drink;
      var letters;
      var displayWord = [];
      var letterGuess; 
      var inWord = [];
      var spacedWord = "";
      var imageGlass = ['martini0.png', 'martini1.png', 'martini2.png', 'martini3.png', 'martini4.png', 'martini5.png', 'martini6.png', 'martini7.png', 'martini8.png', 'martini9.png'];
      glassCounter = -1;
      var win = 0;
      var loss = 0;
      var guessesRemaining
       // = 15;
      var userInput;
      var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      var keepPlaying = true;

    //Choose word

    function newGame() {

      displayWord = [];
      names = ['bijou', 'bellini', 'negroni', 'sidecar', 'martini', 'aviation', 'daiquiri', 'dubonnet', 'manhattan', 'sazerac', 'southside', 'vesper'];

      //randomized word chosen from name list, split into an array
      choices = Math.floor(Math.random() * names.length);
      drink = names[choices];
      letters = Array.from(drink);
      letterGuess = [];
      guessesRemaining = 15;

        for(var i = 0; i < letters.length; i++) {
          displayWord[i] = "_";
        }
          document.onkeypress=function(e){
          document.getElementById('press').innerHTML = '';
          }

          document.querySelector("#display").innerHTML = display(displayWord);
          console.log(drink);
         
          document.getElementById('guessesRemaining').innerHTML = ': ';
          document.getElementById('theDrink').src = "assets/images/martiniStart.png";
          document.getElementById('letterGuess').innerHTML = 'Letters Guessed: ';
          document.getElementById('over').innerHTML = " ";
          glassCounter = -1;

          keepPlaying = true;
    }

    // add spaces to word

      var display = function(addSpace) { 
        var spaces = "";
        
        for(var i = 0; i < letters.length; i++) {
          spaces += addSpace[i] + " "; 
        } 

        return spaces.trim();
      }

      //Start game

        document.onkeyup = function(event){ //OPEN 

        if(!keepPlaying) { 
          return;
        }

        //Proccess user choices, change to capitals, check for dupes, non-letter entries
        var userInput = String.fromCharCode(event.keyCode).toLowerCase();
       
        document.getElementById('guessesRemaining').innerHTML = ': ' + guessesRemaining;
     
         var processUserChoice = function(guess) { 
            for(var i = 0; i < letters.length; i++) {
                var inWord = letters.indexOf(userInput) != -1;
            }

            userInput = guess.toUpperCase();
              var alreadyGuessed = letterGuess.indexOf(userInput) != -1;

             if (/[a-zA-Z]/.test(userInput) && !alreadyGuessed) {
                letterGuess.push(String.fromCharCode(event.keyCode).toUpperCase());
                  guessesRemaining--;
              }
              
              for(var i = 0; i < letters.length; i++) {
                if (guess === letters[i]) {
                  displayWord[i] = guess;
                }
              }

          //Check choices against the word and display images according to user input
          document.querySelector("#display").innerHTML = display(displayWord);
        
          document.getElementById('letterGuess').innerHTML = ' ' + letterGuess.join(" ");

          var newLetters = letters.join(",");

          if (/[a-zA-Z]/.test(userInput) && !alreadyGuessed && !inWord) {
                glassCounter++;
                document.getElementById("theDrink").src = "assets/images/martini" + glassCounter + ".png";
                keepPlaying = true;
          }
          //   else if (alreadyGuessed) {
          //       document.getElementById('comment').innerHTML = 'You guessed this already';
          //       // document.getElementById('comment').innerHTML = ' ';

          // }
          //   else {
          //       document.getElementById('comment').innerHTML = 'That wasn\'t a letter: try again.';
          //   }

            // document.getElementById('comment').innerHTML = '';

          if (glassCounter < 9 && displayWord == newLetters && guessesRemaining > 0) {
            document.getElementById("theDrink").src = "assets/images/" + drink + ".png"
            document.getElementById('guessesRemaining').innerHTML = ': 0';
            document.getElementById('over').innerHTML = 'Cheers! Well done!';
            win++;
            document.getElementById('win').innerHTML = win;
            keepPlaying = false;
          } 

          if (glassCounter === 9 || guessesRemaining === 0 && displayWord != newLetters) {
            document.getElementById("theDrink").src = "assets/images/martini9.png";
            document.getElementById('guessesRemaining').innerHTML = ': 0';
            document.getElementById('over').innerHTML = 'You lost but at least you got a martini!';
            loss++;
            document.getElementById('loss').innerHTML = loss;
            keepPlaying = false;
          }
        }
        
        

        processUserChoice(userInput);
      }

           

newGame();

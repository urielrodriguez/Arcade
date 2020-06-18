# Arcade
A collection of games written in Javascript

## Available Games
* Hog
* 15 Puzzle
* Pig

## Hog

### Rules & Instructions
The goal of the game is to reach the specified number of points by rolling the dice. 
If no goal score is provided, the default goal score is 100.

#### Rules

##### Rolling Dice
The player can choose to roll from 0 to 5 dice per turn.

The following rules were adapted from UC Berkeley's CS61A course's <em>The Game of Hog</em> project.
https://cs61a.org/proj/hog/

##### Free Bacon
If the player chooses to roll 0 dice, the player scores one more than the absolute alternating difference
of the opposing player's score cubed.

Example 1: The player chooses to role 0 dice and the opposing player's score is 5. 5x5x5 = 125, therefore
the current player gets 1 + |1 - 2 + 5| = 5 points.

Example 2: The player chooses to role 0 dice and the opposing player's score is 1. 1x1x1 = 1, therefore 
the current player gets 1 + |1| = 2 points.

##### Feral Hogs

If the absolute difference between the number of dice the player decides to roll and the points scored on the
player's previous turn is exactly 2, the player gets an extra 3 points. 

Example 1: The player has a score of 0, rolls 3 dice and gets 7 points. The player decides to roll 5 dice and
gets 10 points. Since the absolute difference between 5 and 7 is 2, the player receives an extra 3 points. Now 
the player's score is 20.

Example 2: At the beginning of the game, the player has a score of 0, decides to roll 2 dice and gets a score of 5.
Since the absolute difference between 0 and 2 is 2, the player receives an extra 3 points. Now the player's score
is 8.

##### Swine Swap

At the end of each player's turn, a number x is defined to be three to the power of the sum of both player's scores. 
If the first and last digit of x are equal, the player's scores are swapped. 

Example 1: At the end of the turn, the players have scores of 2 and 4. 3<sup>2+4</sup> = 729 and 7 != 9, therefore the 
scores are not swapped. 

Example 2: At the end of the turn, the players have scores of 1 and 0. 3<sup>1+0</sup> = 3 and 3 == 3, therefore the 
scores are swapped.


# PuckSoccerApp

## Official Link:
https://rawgit.com/w124384389/PuckSoccerApp/master/index.html

## Description

Our "Puck Soccer" app is a web game meant to provide two users to compete against each other. 
Two users will have to use the mouse to control the pucks so they can hit the soccer ball. Whoever scores a certain amount of goals is the winner of the match. 

## Specific operations

This section will describe the specific tasks that users should be able to accomplish.


- The players should be able to click the puck, set the direction and the strength of the kick.  
- The users should be able to see each other's scores.
- The users should be able to identify when they score.
- There will be sound effect to indicate whether it's a good or bad kick. 
- The users can play in a LAN network connection.
- The users can play in the same computer as well.
- There will be a turn cool down: if the player doesn't do anything in a certain amount of time, he(she) loses   his(her) turn to play.



## Necessary Components

### External resources:
- http://createjs.com/#!/Home

### Models

- Player

  - Each player has a name 
  - There will be several formation options for the users to choose form.
  - Each player also has a score
  - Each player can choose a profile picture.

- Puck

  - Sprite(the image of a puck)
  - Original position of the puck
  - Current position of the puck

- Ball

  - Sprite(the image of a soccer ball)
  - Original position of the ball
  - position of the ball

- Timer

  - methods and properties related to a common timer


### Views/Controls
- Ingame View:
  - image of a soccer field as background.
  - The Pucks will be positioned over the soccer field.  
  - Top:
    - Names, scores and player profile pictures
    - Times underneath the profile pictures on both sides indicating the time have left
- Main Menu:
  - Play button which leads to add players view
  - Credit button which leads to the credit view
- Add Players view:
  - It identifies each player where the users can:
    - type the names
    - choose the profile pictures
    - choose the formation
  - Go BACK button
  - START button
  


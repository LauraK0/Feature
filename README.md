# Feature - Connect Four

## Planning
Create a two-player game in which players alternately place pieces on a vertical board 7 columns across and 6 rows high.

### Pieces required:
- Board with 7x6 grid
- player one tokens
- player two tokens

### How to start the game:
press a button to start

### How the game is played:
- pieces are drop in from the top
- falls vertically to the lowest available space
- each player takes turns
- The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own tokens. 

## Building 
### building the grid
- can either hard code grid in html or build it with javascript
- html would require at least 42 grid elements - could become messy
- to build in javascript create a nested array - runthrough for 7 columns (would need to create CSS style to create columns) and then 6 times for rows (css style with 6 holes/slots)

### building the player interaction
- changing between the two players

### building the winner
- need to check for horizontal, vertical, or diagonal line of four of one's own tokens and compare against all possible winning arrays 
- can either create an array that lists every possible winning combination. Or run through function which tests directionally along matrix relative to current location
- will need to also check if draw once all items are filled 

## Debugging




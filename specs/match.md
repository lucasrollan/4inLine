User story: play a match
as a player, I want to play a match

Scenario: starting a match
Given no match is in progress
When  I start a match
and   I go first
Then  a match is in progress
and   it is my turn

Scenario: drop a disc and end turn
Given a match starts
and   I go first
When  I drop a disc on column 1
Then  column 1 has 1 disc
and   columns 2, 3, 4, 5, 6, 7 are empty
and   it is my opponent's turn

Scenario: column gets full
Given a match starts
and   I go first
and   I drop a disc on column 4
and   my opponent drops a disc on column 4
and   I drop a disc on column 4
and   my opponent drops a disc on column 4
and   I drop a disc on column 4
When  my opponent drops a disc on column 4
Then  column 4 is full
and   columns 1, 2, 3, 5, 6, 7 are empty
and   it is my turn

Scenario: drop a disc on a full column has no effect
Given a match starts
and   I go first
and   column 1 gets full
When  I drop a disc on column 1
Then  column 1 is full
and   columns 2, 3, 4, 5, 6, 7 are empty
and   it is my turn

Scenario: win the match
Given a match starts
and   I go first
and   I drop a disc on column 4
and   my opponent drops a disc on column 1
and   I drop a disc on column 4
and   my opponent drops a disc on column 7
and   I drop a disc on column 4
and   my opponent drops a disc on column 6
When  I drop a disc on column 4
Then  the match is over
and   I won the match

Scenario: lose the match
Given a match starts
and   my opponent goes first
and   my opponent drops a disc on column 1
and   I drop a disc on column 3
and   my opponent drops a disc on column 1
and   I drop a disc on column 3
and   my opponent drops a disc on column 1
When  I drop a disc on column 7
and   my opponent drops a disc on column 1
Then  the match is over
and   my opponent won the match

Scenario: match is a draw
Given a match starts
When  columns 1, 2, 3, 4, 5, 6, 7 get full
Then  the match is over
and   the match is a draw

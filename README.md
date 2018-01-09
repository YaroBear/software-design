## assign1

Using Test First Development (no code without test first) implement the problem you designed in hw2 (Minesweeper). Feel free to evolve that design and use your judgment to make changes based on the improved understanding and learning.

## assign2

A user has stocks in many companies. Write a program that will find the net asset value of their stocks and display it.

The program will read a file which has details of stock symbols and the number of shares of each stock the user owns.
For example
XYZ1 1000
XYZ2 1500
XYZ3 2312
...
XYZI 1000
XYZJ 1000

Assuming the price for each of those stocks on the top is $1, $2, and $3, and the stocks at the bottom are either invalid or runs into error when fetching.
Then the output would look like:

Symbol  Shares  Net Asset Value
--------------------------------
XYZ1  	1000		$1000.00
XYZ2	1500		$3000.00
XYZ3  	2312  	    $6936.00
...
Total       $.....total of all the net asset values...

Errors:
XYZI  Invalid stock symbol
XYZJ  Error reaching the network

You may obtain the stock price from the URL
http://download.finance.yahoo.com/d/quotes.csv?s=SYMBOL&f=snbaopl1

where SYMBOL should be replaced by a symbol. We can extract the value of the stock price from the numbers returned by this link.

A few suggestions that can help you succeed on this assignment:

Start really early, move forward incrementally with the help of feedback loops.

Don't bring in dependencies until you no longer can avoid them (last responsible moment).

Start with a few tests, minimum code to make those work. 

Bring forward practices and tools you learned from assignment 1. Verify that your build is passing for assignment 2 in continuous integration.

## assign3

Use Test First Development technique to develop this design and code.
Do not include any main (or Main). Only your code and test code is
needed. Follow proper directory structure. This assignment involves
more thinking than typing. You are not going to write a lot of code.
But you have to figure out how to write that little code you will 
write.

There are two kinds of Writers: StringWriter which writes to a String
and FileWriter that writes to a file (these are not related to 
those classes provided in Java/C#, etc.). There can be other types of
Writers (like SocketWriter that writes to a Socket) in the future.

A Writer simply writes to a target (like string or file) until close
is called. Any effort to write after the call to close is simply 
ignored.

You can find out what was written to a StringWriter by calling a
function. You can find out what was written to a file using a 
FileWriter by reading the file written to.

There are several types of operations that can be performed on these
two (or other types added in the future) writers. For example:

lower case: This converts the string being written to all lower case

upper case: This converts the string being written to all upper case

stupid remover: This replaces the word stupid (only in lower case) to s*****

duplicate remover: This removes consecutive duplicated words. For example, 
"This is is it" will replaced by "This is it" when this function is applied.

Design so that other such functions may be added in the future, but 
without changing any existing class.

The user of your design will pick and choose what kinds of operations
they want to use or combine to use. For example, I may be interested
in combining the stupid remover and the lower case operation when
writing to a String. I may also be interested in combining the
duplicate remover and the upper case operation when writing to
a file. I may chose to use any combination of these operations
at will.

You can imagine an operation like this (pseudocode):

writeToWriter(Writer writer) {
  writer.write("This is really really stupid!!!")
  writer.close();
}

If I had combined the operations of duplicate remover, stupid remover,
and if the writer is targeting a file (say myfile.dat), then the file
myfile.dat would contain the content

This is really s*****!!!

Please ask for many reviews. Start small, and early. Write only one
or two tests and ask for review. Make incremental change and learn 
along the way. Don't try to take a long jump.

Please carry forward practices from previous assignments:
automated testing
Continuous integration
Code coverage

## assign4

We'll implement a very small part of a game. Each avatar has different capabilities. There are some strict rules as to how we can transform or change from one avatar to another.

The following is a list of avatars and capabilities of each. The list below
also shows the transformation sequence. You can change from a particular avatar to either the avatar above it or to the avatar below it, but not to any other avatar directly.


Bike   drive through narrow lanes
Car    drive fast
Plane  fly fast
Rocket fly really fast

There are several aspects of the game that we won't focus on. The only thing
we're going to focus on is the activities in each avatar and the transformations.

Write the program in a way that at any given time we can ask the activity
(like drive, fly, etc.) be performed by the players current avatar. Also, at any given time, we can ask the avatar to be changed to one of the two permissible avatars. 

Write the application so that the above sequence may be altered without any code change (for example, if we want to allow going from a Bike to Plane, we should be able to do that without having to change any code). Test drive the code that deals with the central logic and related classes.

Please carry forward practices from previous assignments:
automated testing
Continuous integration
Code coverage
Project: Create a basic calculator web application.

Description:
My goal for this project is to further solidify my understanding of web development. Using only vanilla HTML, CSS, and JavaScript; I will create a functional on-screen calculator.

Current Version: 2.2

Version History:

2.2
    Contains keyboard support: User can press any of the appropriate buttons
    and the program will validate and display it to the screen.
    I also included an information button that gives the user a bit more
    details about which keys are supported. The button can be found to the
    right of the calculator.
    
    While implementing the above, I decided to modify the setDisplay()
    function rather than create a new one that can support keys.
    To aid this change, I created validateKey() which verifys that a key
    is legal before passing it to setDisplay(). I felt that this
    path would be more efficient as each function is now limited to a
    single task.


2.1
    Contains an updated UI with a more complementary color scheme. Also streamlined calcCode.js by removing the memory data structure.
    The program will now get and set values directly to the UI screen instead of storing them to an array. This change allowed me to
    remove a function and several lines of now obsolete code.


2.0 
    Contains a functional calculator with a finished UI. The calulator now looks and performs just like it's real world counterparts.
    The final task will be to implement keyboard functionality. This addition will be a quality of life upgrade to the more tech savvy user.


1.0
    Contains a barebones calculator that allows the user to input a mathematical operation (ex 4+4=); computes the answer; and then displays it to the screen.
    The next task will be to allow the user to string several operations together (ex. 12 + 7 - 5 * 3) and grant the appropriate answer.

// Question Bank - 40 MCQs across 4 sections
const questions = [
  // ==================== APTITUDE SECTION (10 Questions) ====================
  {
    id: 1,
    section: "Aptitude",
    question: "If 30% of a number is 90, what is 50% of that number?",
    options: ["120", "150", "180", "200"],
    correctAnswer: 1 // Index of correct option (0-based)
  },
  {
    id: 2,
    section: "Aptitude",
    question: "The ratio of boys to girls in a class is 3:2. If there are 15 boys, how many girls are there?",
    options: ["8", "10", "12", "15"],
    correctAnswer: 1
  },
  {
    id: 3,
    section: "Aptitude",
    question: "The average of 5 numbers is 40. If one number is excluded, the average becomes 35. What is the excluded number?",
    options: ["50", "55", "60", "65"],
    correctAnswer: 2
  },
  {
    id: 4,
    section: "Aptitude",
    question: "A can complete a work in 12 days and B can complete it in 18 days. How many days will they take to complete the work together?",
    options: ["6 days", "7.2 days", "8 days", "9 days"],
    correctAnswer: 1
  },
  {
    id: 5,
    section: "Aptitude",
    question: "If an article is sold for ₹450 at a profit of 20%, what was its cost price?",
    options: ["₹350", "₹375", "₹400", "₹425"],
    correctAnswer: 1
  },
  {
    id: 6,
    section: "Aptitude",
    question: "A train travels 120 km in 2 hours. What is its speed in meters per second?",
    options: ["16.67 m/s", "20 m/s", "30 m/s", "33.33 m/s"],
    correctAnswer: 0
  },
  {
    id: 7,
    section: "Aptitude",
    question: "If the price of a commodity increases by 25%, by what percentage should consumption be reduced to keep expenditure the same?",
    options: ["15%", "20%", "25%", "30%"],
    correctAnswer: 1
  },
  {
    id: 8,
    section: "Aptitude",
    question: "The simple interest on ₹5000 at 8% per annum for 3 years is:",
    options: ["₹1000", "₹1200", "₹1500", "₹2000"],
    correctAnswer: 1
  },
  {
    id: 9,
    section: "Aptitude",
    question: "If 15 workers can build a wall in 20 days, how many days will 10 workers take to build the same wall?",
    options: ["25 days", "30 days", "35 days", "40 days"],
    correctAnswer: 1
  },
  {
    id: 10,
    section: "Aptitude",
    question: "A shopkeeper marks his goods 40% above cost price but allows a discount of 20%. His profit percentage is:",
    options: ["10%", "12%", "15%", "20%"],
    correctAnswer: 1
  },

  // ==================== PROGRAMMING SECTION (10 Questions) ====================
  {
    id: 11,
    section: "Programming",
    question: "What is the output of the following C code?\n\nint x = 5;\nprintf(\"%d\", x++ + ++x);",
    options: ["11", "12", "13", "Undefined behavior"],
    correctAnswer: 3
  },
  {
    id: 12,
    section: "Programming",
    question: "In Java, which data type is used to create a variable that should store text?",
    options: ["char", "String", "Text", "text"],
    correctAnswer: 1
  },
  {
    id: 13,
    section: "Programming",
    question: "Which OOP concept is demonstrated by function overloading?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    correctAnswer: 2
  },
  {
    id: 14,
    section: "Programming",
    question: "What will be the output of the following code?\n\nfor(int i=0; i<3; i++) {\n  if(i==1) continue;\n  printf(\"%d \", i);\n}",
    options: ["0 1 2", "0 2", "1 2", "0 1"],
    correctAnswer: 1
  },
  {
    id: 15,
    section: "Programming",
    question: "In C, what is the size of 'int' data type on a 32-bit system?",
    options: ["2 bytes", "4 bytes", "8 bytes", "Depends on compiler"],
    correctAnswer: 1
  },
  {
    id: 16,
    section: "Programming",
    question: "Which keyword is used to prevent a method from being overridden in Java?",
    options: ["static", "final", "const", "private"],
    correctAnswer: 1
  },
  {
    id: 17,
    section: "Programming",
    question: "What is the output of: printf(\"%d\", 5 & 3);",
    options: ["0", "1", "3", "5"],
    correctAnswer: 1
  },
  {
    id: 18,
    section: "Programming",
    question: "Which loop is guaranteed to execute at least once?",
    options: ["for loop", "while loop", "do-while loop", "None of the above"],
    correctAnswer: 2
  },
  {
    id: 19,
    section: "Programming",
    question: "In Java, which access modifier makes a member accessible only within the same class?",
    options: ["public", "protected", "private", "default"],
    correctAnswer: 2
  },
  {
    id: 20,
    section: "Programming",
    question: "What is the output of the following?\n\nint arr[] = {1, 2, 3, 4, 5};\nprintf(\"%d\", arr[2]);",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2
  },

  // ==================== PROBLEM SOLVING SECTION (10 Questions) ====================
  {
    id: 21,
    section: "Problem Solving",
    question: "What is the time complexity of binary search algorithm?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
    correctAnswer: 1
  },
  {
    id: 22,
    section: "Problem Solving",
    question: "In a flowchart, which symbol represents a decision?",
    options: ["Rectangle", "Diamond", "Circle", "Parallelogram"],
    correctAnswer: 1
  },
  {
    id: 23,
    section: "Problem Solving",
    question: "What is the next number in the pattern: 2, 6, 12, 20, 30, ?",
    options: ["38", "40", "42", "44"],
    correctAnswer: 2
  },
  {
    id: 24,
    section: "Problem Solving",
    question: "A recursive function must have:",
    options: ["A loop", "A base case", "Multiple parameters", "Return type void"],
    correctAnswer: 1
  },
  {
    id: 25,
    section: "Problem Solving",
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
    correctAnswer: 2
  },
  {
    id: 26,
    section: "Problem Solving",
    question: "In pseudocode, what does 'IF-THEN-ELSE' represent?",
    options: ["Loop structure", "Conditional structure", "Function call", "Variable declaration"],
    correctAnswer: 1
  },
  {
    id: 27,
    section: "Problem Solving",
    question: "What is the output of a function that calculates factorial of 5?",
    options: ["25", "60", "120", "720"],
    correctAnswer: 2
  },
  {
    id: 28,
    section: "Problem Solving",
    question: "Which data structure uses LIFO (Last In First Out) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1
  },
  {
    id: 29,
    section: "Problem Solving",
    question: "What is the minimum number of comparisons needed to find the maximum element in an unsorted array of n elements?",
    options: ["n", "n-1", "n/2", "log n"],
    correctAnswer: 1
  },
  {
    id: 30,
    section: "Problem Solving",
    question: "In a binary tree with n nodes, what is the maximum height?",
    options: ["n", "n-1", "log n", "n/2"],
    correctAnswer: 1
  },

  // ==================== LOGICAL REASONING SECTION (10 Questions) ====================
  {
    id: 31,
    section: "Logical Reasoning",
    question: "Find the next number in the series: 3, 6, 11, 18, 27, ?",
    options: ["36", "38", "40", "42"],
    correctAnswer: 1
  },
  {
    id: 32,
    section: "Logical Reasoning",
    question: "If you are facing North and turn 90° clockwise, then 180° anti-clockwise, which direction are you facing?",
    options: ["North", "South", "East", "West"],
    correctAnswer: 3
  },
  {
    id: 33,
    section: "Logical Reasoning",
    question: "A is the father of B. B is the sister of C. C is the mother of D. How is A related to D?",
    options: ["Father", "Grandfather", "Uncle", "Brother"],
    correctAnswer: 1
  },
  {
    id: 34,
    section: "Logical Reasoning",
    question: "Complete the series: A, C, F, J, O, ?",
    options: ["S", "T", "U", "V"],
    correctAnswer: 2
  },
  {
    id: 35,
    section: "Logical Reasoning",
    question: "If CODING is written as DPEJOH, how is PYTHON written?",
    options: ["QZUIPO", "QZUIPO", "QZUIPM", "QAUIPO"],
    correctAnswer: 0
  },
  {
    id: 36,
    section: "Logical Reasoning",
    question: "Which number should replace the question mark? 8, 15, 28, 53, ?",
    options: ["100", "102", "104", "106"],
    correctAnswer: 1
  },
  {
    id: 37,
    section: "Logical Reasoning",
    question: "If South-East becomes North, what will West become?",
    options: ["North-East", "South-East", "South-West", "North-West"],
    correctAnswer: 1
  },
  {
    id: 38,
    section: "Logical Reasoning",
    question: "P is the brother of Q. Q is the sister of R. R is the father of S. How is P related to S?",
    options: ["Father", "Uncle", "Grandfather", "Brother"],
    correctAnswer: 1
  },
  {
    id: 39,
    section: "Logical Reasoning",
    question: "Find the odd one out: 2, 5, 10, 17, 26, 37, 50",
    options: ["10", "17", "26", "50"],
    correctAnswer: 0
  },
  {
    id: 40,
    section: "Logical Reasoning",
    question: "If in a certain code, TEACHER is written as VGCEJGT, how is STUDENT written?",
    options: ["UVWFGPV", "TUVFGPV", "UVWEGPV", "TUVEGPV"],
    correctAnswer: 0
  }
];

export default questions;

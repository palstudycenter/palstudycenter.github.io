/* ================= PAL STUDY CENTER - SHARED DATA ================= */

// Maps English subject names to their Hindi equivalents
const SUBJECT_NAME_MAP = {
  'Physics': 'भौतिकी',
  'Chemistry': 'रसायन शास्त्र ',
  'Biology': 'जीवविज्ञान',
  'Mathematics': 'गणित',
  'Maths': 'गणित',
  'English': 'अग्रेजी',
  'Hindi': 'हिंदी',
  'Science': 'विज्ञान',
  'Social Science': 'सामाजिक विज्ञान'
};

const PAL_STUDY_DATA = {
  "MP Board (Hindi Medium)": {
    "Class 12th": {
      "भौतिकी": [
        "यूनिट 1 विद्युत आवेश एवं क्षेत्र",
       "यूनिट 1 (B ) विद्युत विभव", "यूनिट 1 (C ) धारिता", 
        "यूनिट 2 विद्युत धारा",
        "यूनिट 3(A ) धारा का चुम्बकीय प्रभाव",
        "यूनिट 3(B ) चुंबकत्व",
        "यूनिट 3(C) चुंबकत्व एवं पदार्थ",
        "यूनिट 6 विद्युत चुंबकीय प्रेरण",
        "यूनिट 7 प्रत्यावर्ती धारा",
        "यूनिट 8 विद्युत चुंबकीय तरंगें",
        "यूनिट 9 प्रकाशिकी",
        "यूनिट 10 तरंग प्रकाशिकी",
        "यूनिट 11 पदार्थ की द्वैत प्रकृति",
        "यूनिट 12 परमाणु",
        "यूनिट 13 नाभिक",
        "यूनिट 14 अर्धचालक इलेक्ट्रॉनिक्स"
      ],
      "रसायन शास्त्र ": [
        "यूनिट 1 विलयन",
        "यूनिट 2 विद्युत रसायन",
        "यूनिट 3 रासायनिक गतिकी",
        "यूनिट 4 d और f ब्लॉक के तत्व",
        "यूनिट 5 समन्वय यौगिक",
        "यूनिट 6 हैलोएल्केन और हैलोएरीन",
        "यूनिट 7(A) अल्कोहल",
        "यूनिट 7(B) फिनोल",
        "यूनिट 7(C) ईथर",
        "यूनिट 8(A) एल्डिहाइड एवं कीटोन",
        "यूनिट 8(B) कार्बोक्सिलिक अम्ल",
        "यूनिट 9 अमीन",
        "यूनिट 10 जैव-अणु"
      ],
      "जीवविज्ञान": [
        "यूनिट 1 (A) पुष्पीय पौधों में लैंगिक जनन",
        "यूनिट 1 (B) मानव जनन",
        "यूनिट 1 (C) जनन स्वास्थ्य",
        "यूनिट 2 (A) वंशागति के सिद्धांत",
        "यूनिट 2 (B) वंशागति का आणविक आधार",
        "यूनिट 2 (C) विकास",
        "यूनिट 3 (A) मानव कल्याण में जीवविज्ञान",
        "यूनिट 3 (B) मानव स्वास्थ्य एवं रोग",
        "यूनिट 3 (C) मानव कल्याण में सूक्ष्मजीव",
        "यूनिट 4 (A) जैव प्रौद्योगिकी: सिद्धांत एवं प्रक्रियाएँ",
        "यूनिट 4 (B) जैव प्रौद्योगिकी एवं उसके उपयोग",
        "यूनिट 5 (A) जीव और समष्टियाँ",
        "यूनिट 5 (B) पारितंत्र",
        "यूनिट 5 (C) जैव विविधता एवं संरक्षण"
      ],
      "गणित": [
        "EX. 1.1",
        "EX. 1.2",
        "EX. 2.1",
        "EX. 2.2",
        "EX. 2.3",
        "EX. 4.1",
        "EX. 4.2",
        "EX. 4.3",
        "EX. 4.4",
        "EX. 10.1",
        "EX. 10.2",
        "EX. 10.3"
      ],
      "अग्रेजी": [
        "Flamingo - Unit 1 The Last Lesson",
        "Flamingo - Unit 2 Lost Spring",
        "Flamingo - Unit 3 Deep Water",
        "Flamingo - Unit 4 The Rattrap",
        "Flamingo - Unit 5 Indigo",
        "Flamingo - Unit 6 Poets and Pancakes",
        "Flamingo - Unit 7 The Interview",
        "Flamingo - Unit 8 Going Places",
        "Vistas - Unit 1 The Third Level",
        "Vistas - Unit 2 The Tiger King",
        "Vistas - Unit 3 Journey to the End of the Earth",
        "Vistas - Unit 4 The Enemy",
        "Vistas - Unit 5 Should Wizard Hit Mommy",
        "Vistas - Unit 6 On the Face of It",
        "Vistas - Unit 7 Evans Tries an O-Level",
        "Vistas - Unit 8 Memories of Childhood",
        "Grammar - Articles",
        "Grammar - Determiners",
        "Grammar - narration",
        "Grammar - preposition",
        "Grammar - voice",
        "letter",
        "poster",
        "Essay"
      ],
      "हिंदी": [
        "यूनिट 1 काव्य खंड (पद्य भाग)",
        "यूनिट 2 गद्य खंड (निबंध एवं कहानी)",
        "यूनिट 3 अपठित गद्यांश एवं पद्यांश",
        "यूनिट 4 व्याकरण भाग",
        "यूनिट 5 लेखन कौशल",
        "यूनिट 6 सृजनात्मक लेखन",
        "यूनिट 7 पाठ्य पुस्तक अध्ययन",
        "यूनिट 8 सप्लीमेंट्री रीडर"
      ]
    },
    "Class 11th": {
      "भौतिकी": ["यूनिट 1 - मापन", "यूनिट 2(A) - गति", "यूनिट 2(B) - सदिश", "यूनिट 3(A) - गति के नियम", "यूनिट 3(B) - वृत्तीय गति", "यूनिट 4 - कार्य ऊर्जा तथा शक्ति", "यूनिट 5 - गुरुत्वाकर्षण"],
      "रसायन शास्त्र ": ["यूनिट 1 - रासायनिक संयोग के नियम", "यूनिट 2 - परमाणु संरचना", "यूनिट 3 - आवर्त नियम", "यूनिट 4 - रासायनिक बंध"],
      "गणित": [],
      "जीवविज्ञान": [
        "यूनिट-1(A) जीव जगत",
        "यूनिट 1(C) - जगत पादप",
        "यूनिट 1(D) - प्राणी जगत",
        "यूनिट 2(A) - पुष्पीय पादपों की आकारिकी",
        "यूनिट 2(B) - पुष्पीय पादपों का शरीर",
        "यूनिट 2(C) - प्राणियों में संरचनात्मक संगठन",
        "यूनिट 3(A) - कोशिका: जीवन की इकाई",
        "यूनिट 3(B) - जैव अणु",
        "यूनिट 3(C) - कोशिका चक्र और कोशिका विभाजन",
        "यूनिट 4(A) - उच्च पादपों में प्रकाश संश्लेषण",
        "यूनिट 4(B) - पादप में श्वसन",
        "यूनिट 4(C) - पादप वृद्धि एवं परिवर्धन",
        "यूनिट 5(A) - श्वसन और गैसों का विनिमय",
        "यूनिट 5(B) - शरीर द्रव तथा परिसंचरण",
        "यूनिट 5(C) - उत्सर्जी उत्पाद एवं उनका निष्कासन",
        "यूनिट 5(D) - गमन एवं संचलन",
        "यूनिट 5(E) - तंत्रिकीय नियंत्रण एवं समन्वय",
        "यूनिट 5(F) - रासायनिक समन्वय तथा integração (एकीकरण / नियमन)",
      ],
      "अग्रेजी": [],
      "हिंदी": []
    },
    "Class 10th": {
      "विज्ञान": ["रासायनिक अभिक्रियाएँ एवं समीकरण", "अम्ल, क्षार एवं लवण", "धातु एवं अधातु", "कार्बन एवं उसके यौगिक", "जीव क्रियाएँ"],
      "गणित": [],
      "सामाजिक विज्ञान": [],
      "अंग्रेजी": [],
      "हिंदी": []
    },
    "Class 9th": {
      "विज्ञान": [],
      "गणित": [],
      "सामाजिक विज्ञान": [],
      "अंग्रेजी": [],
      "हिंदी": []
    }
  },
  "MP Board (English Medium)": {
    "Class 12th": {
      "Physics": ["Unit 1(A) - Electrostatics", "Unit 1(B) - Electric potentials", "Unit 2(C)- Capacity", "Unit 2 - Electric Current"],
      "Chemistry": ["Unit 1 - Solution", "Unit 2 - Electrochemistry", "Unit 3 - Chemical Kinetics", "Unit 4 - d and f Block Elements", "Unit 5 - Coordination Compounds", "Unit 6 - Haloalkanes and Haloarenes", "Unit 7 - Alcohols", "Unit 8 - Phenols", "Unit 9 - Ethers", "Unit 10 - Aldehydes and Ketones", "Unit 11 - Carboxylic Acids", "Unit 12 - Amines", "Unit 13 - Biomolecules"],
      "Mathematics": [],
      "Biology": [],
      "English": [],
      "Hindi": []
    },
    "Class 10th": {
      "Mathematics": ["Real Numbers", "Polynomials", "Quadratic Equations"],
      "Science": ["Chemical Reaction", "Acids and Bases", "Metals and Non-metals", "Carbon and its compounds", "Life Processes", "Light"],
    }
  },
  "CBSE": {
    "Class 12th": {
      "Physics": [],
      "Chemistry": [],
      "Mathematics": [],
      "Biology": [],
      "English": [],
      "Hindi": []
    },
    "Class 10th": {
      "Mathematics": ["Real Numbers", "Polynomials", "Quadratic Equations"],
      "Science": ["Chemical Reaction", "Acids and Bases", "Metals and Non-metals", "Carbon and its compounds", "Life Processes", "Light"],
    },
    "Class 9th": {
      "Science": ["Chapter 1 - Matter in Our Surroundings", "Chapter 2 - Is Matter Around Us Pure?", "Chapter 3 - Atoms and Molecules", "Chapter 4 - Structure of the Atom", "Chapter 5 - The Fundamental Unit of Life", "Chapter 6 - Tissues", "Chapter 7 - Motion", "Chapter 8 - Force and Laws of Motion", "Chapter 9 - Gravitation", "Chapter 10 - Gravitation", "Chapter 11 - Work and Energy", "Chapter 12 - Patterns in Life: Diversity and Classification"],
    }
  }
};

// Maps unit names to their file paths (board -> class -> subject -> unit -> path)
const UNIT_FILE_PATHS = {
  "MP Board (Hindi Medium)": {
    "Class 12th": {
      "भौतिकी": {
        "यूनिट 1 विद्युत आवेश एवं क्षेत्र": "../units/mp_board_hindi/class_12/physics/unit1/MP_Hindi_12th_Physics_unit1.html",
         "यूनिट 1 (B ) विद्युत विभव": "../units/mp_board_hindi/class_12/physics/unit1/mphp-1b.html",
           "यूनिट 1 (C ) धारिता": "../units/mp_board_hindi/class_12/physics/unit1/mphp-1c.html",
        "यूनिट 2 विद्युत धारा": "../units/mp_board_hindi/class_12/physics/unit1/mphp-2.html",
        "यूनिट 3(A ) धारा का चुम्बकीय प्रभाव": "../units/mp_board_hindi/class_12/physics/unit1/mphp3A.html",
        "यूनिट 3(B ) चुंबकत्व": "../units/mp_board_hindi/class_12/physics/unit1/mphp3b.html",
        "यूनिट 5 चुंबकत्व एवं पदार्थ": "../units/mp_board_hindi/class_12/physics/unit5/MP_Hindi_12th_Physics_unit5.html",
        "यूनिट 6 विद्युत चुंबकीय प्रेरण": "../units/mp_board_hindi/class_12/physics/unit6/MP_Hindi_12th_Physics_unit6.html",
        "यूनिट 7 प्रत्यावर्ती धारा": "../units/mp_board_hindi/class_12/physics/unit7/MP_Hindi_12th_Physics_unit7.html",
        "यूनिट 8 विद्युत चुंबकीय तरंगें": "../units/mp_board_hindi/class_12/physics/unit8/MP_Hindi_12th_Physics_unit8.html",
        "यूनिट 9 प्रकाशिकी": "../units/mp_board_hindi/class_12/physics/unit9/MP_Hindi_12th_Physics_unit9.html",
        "यूनिट 10 तरंग प्रकाशिकी": "../units/mp_board_hindi/class_12/physics/unit10/MP_Hindi_12th_Physics_unit10.html",
        "यूनिट 11 पदार्थ की द्वैत प्रकृति": "../units/mp_board_hindi/class_12/physics/unit11/MP_Hindi_12th_Physics_unit11.html",
        "यूनिट 12 परमाणु": "../units/mp_board_hindi/class_12/physics/unit12/MP_Hindi_12th_Physics_unit12.html",
        "यूनिट 13 नाभिक": "../units/mp_board_hindi/class_12/physics/unit13/MP_Hindi_12th_Physics_unit13.html",
        "यूनिट 14 अर्धचालक इलेक्ट्रॉनिक्स": "../units/mp_board_hindi/class_12/physics/unit14/MP_Hindi_12th_Physics_unit14.html"
      },
      "रसायन शास्त्र ":{
          "यूनिट 1 विलयन": "../units/mp_board_hindi/class_12/chemistry/unit1/c1/1_formatted.html",
          "यूनिट 2 विद्युत रसायन": "../units/mp_board_hindi/class_12/chemistry/unit1/c2/2_formatted.html",
          "यूनिट 3 रासायनिक गतिकी": "../units/mp_board_hindi/class_12/chemistry/unit1/c3/mphc3.html",
          "यूनिट 4 d और f ब्लॉक के तत्व": "../units/mp_board_hindi/class_12/chemistry/unit1/c4/4_formatted.html",
          "यूनिट 5 समन्वय यौगिक": "../units/mp_board_hindi/class_12/chemistry/unit1/c5/5_formatted.html",
          "यूनिट 6 हैलोएल्केन और हैलोएरीन": "../units/mp_board_hindi/class_12/chemistry/unit1/6.html",
          "यूनिट 7(A) अल्कोहल": "../units/mp_board_hindi/class_12/chemistry/unit1/c7/7_formatted.html",
          "यूनिट 8(B) फिनोल": "../units/mp_board_hindi/class_12/chemistry/unit1/c8/8_formatted.html",
          "यूनिट 9(C) ईथर": "../units/mp_board_hindi/class_12/chemistry/unit1/c9/9_formatted.html",
          "यूनिट 10(A) एल्डिहाइड एवं कीटोन": "../units/mp_board_hindi/class_12/chemistry/unit1/c10/10_formatted.html",
          "यूनिट 11(B) कार्बोक्सिलिक अम्ल": "../units/mp_board_hindi/class_12/chemistry/unit1/c11/11_formatted.html",
          "यूनिट 9(C) अमीन": "../units/mp_board_hindi/class_12/chemistry/unit1/c12/12_formatted.html",
          "यूनिट 10 जैव-अणु": "../units/mp_board_hindi/class_12/chemistry/unit1/c10/10_formatted.html"
      },
      "जीवविज्ञान": {
        "यूनिट 1 (A) पुष्पीय पौधों में लैंगिक जनन" : "../units/mp_board_hindi/class_12/biology/unit1/b1/1_formatted.html",
        "यूनिट 1 (B) मानव जनन": "../units/mp_board_hindi/class_12/biology/unit1/b2/2_formatted.html",
        "यूनिट 1 (C) जनन स्वास्थ्य" : "../units/mp_board_hindi/class_12/biology/unit1/b3/3_formatted.html",
        "यूनिट 2 (A) वंशागति के सिद्धांत" : "",
        "यूनिट 2 (B) वंशागति का आणविक आधार" : "../units/mp_board_hindi/class_12/biology/unit1/b2/4.html",
        "यूनिट 2 (C) विकास" : "",
        "यूनिट 3 (A) मानव कल्याण में जीवविज्ञान" : "",
        "यूनिट 3 (B) मानव स्वास्थ्य एवं रोग" : "",
        "यूनिट 3 (C) मानव कल्याण में सूक्ष्मजीव" : "",
        "यूनिट 4 (A) जैव प्रौद्योगिकी: सिद्धांत एवं प्रक्रियाएँ" : "",
        "यूनिट 4 (B) जैव प्रौद्योगिकी एवं उसके उपयोग" : "",
        "यूनिट 5 (A) जीव और समष्टियाँ" : "",
        "यूनिट 5 (B) पारितंत्र" : "../units/mp_board_hindi/class_12/biology/unit1/b5/12.html",
        "यूनिट 5 (C) जैव विविधता एवं संरक्षण" : "../units/mp_board_hindi/class_12/biology/unit1/b5/13.html",
      },
      "अग्रेजी": {
        "Flamingo - Unit 1 The Last Lesson": "../units/mp_board_hindi/class_12/english/Flemindo/l1.html",
        "Flamingo - Unit 2 Lost Spring": "../units/mp_board_hindi/class_12/english/Flemindo/l2.html",
        "Flamingo - Unit 3 Deep Water": "../units/mp_board_hindi/class_12/english/Flemindo/l3.html",
        "Flamingo - Unit 4 The Rattrap": "../units/mp_board_hindi/class_12/english/Flemindo/l4.html",
        "Flamingo - Unit 5 Indigo": "../units/mp_board_hindi/class_12/english/Flemindo/l5.html",
        "Flamingo - Unit 6 Poets and Pancakes": "../units/mp_board_hindi/class_12/english/Flemindo/l6.html",
        "Grammar - Articles": "../units/mp_board_hindi/class_12/english/Gramer/article.html",
        "Grammar - Determiners": "../units/mp_board_hindi/class_12/english/Gramer/determinates.html",
        "Grammar - narration": "../units/mp_board_hindi/class_12/english/Gramer/narration.html",
        "Grammar - preposition": "../units/mp_board_hindi/class_12/english/Gramer/preposition.html",
        "Grammar - voice": "../units/mp_board_hindi/class_12/english/Gramer/voice.html",
        "letter": "../units/mp_board_hindi/class_12/english/Gramer/letter.html",
        "poster": "../units/mp_board_hindi/class_12/english/poster.html",
        "Essay": "../units/mp_board_hindi/class_12/english/Essay.html",

      },
      "गणित": {
        "EX. 1.1" : "../units/mp_board_hindi/class_12/mathematics/1.1.html",
        "EX. 1.2" : "../units/mp_board_hindi/class_12/mathematics/1.2.html",
        "EX. 2.1" : "../units/mp_board_hindi/class_12/mathematics/2.1.html",
        "EX. 2.2" : "../units/mp_board_hindi/class_12/mathematics/2.2.html",
        "EX. 2.3" : "",
        "EX. 4.1" : "../units/mp_board_hindi/class_12/mathematics/4.1.html",
        "EX. 4.2" : "../units/mp_board_hindi/class_12/mathematics/4.2.html",
        "EX. 4.3" : "",
        "EX. 4.4" : "../units/mp_board_hindi/class_12/mathematics/4.4.html",
        "EX. 10.1" : "../units/mp_board_hindi/class_12/mathematics/10.1.html",
        "EX. 10.2" : "../units/mp_board_hindi/class_12/mathematics/10.2.html",
        "EX. 10.3" : "../units/mp_board_hindi/class_12/mathematics/10.3.html"
      },
    },
    "Class 11th": {
      "भौतिकी": {
        "यूनिट 1 - मापन": "../units/mp_board_hindi/class_11/Physics/p1.html",
        "यूनिट 2(A) - गति": "../units/mp_board_hindi/class_11/Physics/p2.1.html", 
        "यूनिट 2(B) - सदिश": "../units/mp_board_hindi/class_11/Physics/p2.2.html", 
        "यूनिट 3(A) - गति के नियम": "../units/mp_board_hindi/class_11/Physics/p3A.html", 
        "यूनिट 3(B) - वृत्तीय गति": "../units/mp_board_hindi/class_11/Physics/p3B.html", 
        "यूनिट 4 - कार्य ऊर्जा तथा शक्ति": "../units/mp_board_hindi/class_11/Physics/p4.html", 
        "यूनिट 5 - गुरुत्वाकर्षण" : "../units/mp_board_hindi/class_11/Physics/p5.html",
      },
      "रसायन शास्त्र ":{
        "यूनिट 1 - रासायनिक संयोग के नियम" : "../units/mp_board_hindi/class_11/Chemistry/c1.html",
        "यूनिट 2 - परमाणु संरचना" : "../units/mp_board_hindi/class_11/Chemistry/c2.html",
        "यूनिट 3 - आवर्त नियम" : "../units/mp_board_hindi/class_11/Chemistry/c3.html",
        "यूनिट 4 - रासायनिक बंध" : "../units/mp_board_hindi/class_11/Chemistry/c4.html"
      },
      "जीवविज्ञान": {
        "यूनिट-1(A) जीव जगत" : "../units/mp_board_hindi/class_11/Biology/1a.html",
        "यूनिट 1(C) - जगत पादप" : "../units/mp_board_hindi/class_11/Biology/1c.html",
        "यूनिट 1(D) - प्राणी जगत" : "../units/mp_board_hindi/class_11/Biology/1d.html",
        "यूनिट 2(A) - पुष्पीय पादपों की आकारिकी" : "../units/mp_board_hindi/class_11/Biology/2a.html",
        "यूनिट 2(B) - पुष्पीय पादपों का शरीर" : "../units/mp_board_hindi/class_11/Biology/2b.html",
        "यूनिट 2(C) - प्राणियों में संरचनात्मक संगठन" : "../units/mp_board_hindi/class_11/Biology/2c.html",
        "यूनिट 3(A) - कोशिका: जीवन की इकाई" : "../units/mp_board_hindi/class_11/Biology/3a.html",
        "यूनिट 3(B) - जैव अणु" : "../units/mp_board_hindi/class_11/Biology/3b.html",
        "यूनिट 3(C) - कोशिका चक्र और कोशिका विभाजन" : "../units/mp_board_hindi/class_11/Biology/3c.html",
        "यूनिट 4(A) - उच्च पादपों में प्रकाश संश्लेषण" : "../units/mp_board_hindi/class_11/Biology/4a.html",
        "यूनिट 4(B) - पादप में श्वसन" : "../units/mp_board_hindi/class_11/Biology/4b.html",
        "यूनिट 4(C) - पादप वृद्धि एवं परिवर्धन" : "../units/mp_board_hindi/class_11/Biology/4c.html",
        "यूनिट 5(A) - श्वसन और गैसों का विनिमय" : "../units/mp_board_hindi/class_11/Biology/5a.html",
        "यूनिट 5(B) - शरीर द्रव तथा परिसंचरण" : "../units/mp_board_hindi/class_11/Biology/5b.html",
        "यूनिट 5(C) - उत्सर्जी उत्पाद एवं उनका निष्कासन" : "../units/mp_board_hindi/class_11/Biology/5c.html",
        "यूनिट 5(D) - गमन एवं संचलन" : "../units/mp_board_hindi/class_11/Biology/5d.html",
        "यूनिट 5(E) - तंत्रिकीय नियंत्रण एवं समन्वय" : "../units/mp_board_hindi/class_11/Biology/5e.html",
        "यूनिट 5(F) - रासायनिक समन्वय तथा integração (एकीकरण / नियमन)" : "../units/mp_board_hindi/class_11/Biology/5f.html"
      },
    },
    "Class 10th": {
      "विज्ञान": {
        "रासायनिक अभिक्रियाएँ एवं समीकरण" : "../units/mp_board_hindi/class-10/Scince/s1.html",
        "अम्ल, क्षार एवं लवण" : "../units/mp_board_hindi/class-10/Scince/s2.html",
        "धातु एवं अधातु" : "../units/mp_board_hindi/class-10/Scince/s3.html",
        "कार्बन एवं उसके यौगिक" : "../units/mp_board_hindi/class-10/Scince/s4.html",
        "जीव क्रियाएँ" : "../units/mp_board_hindi/class-10/Scince/s5.html"
      }
    }
  },
  "MP Board (English Medium)": {
    "Class 12th": {
      "भौतिकी": {
        "Unit 1(A) - Electrostatics": "../units/mp_board_hindi/class_12/physics/unit1/1a.html",
        "Unit 1(B) - Electric potentials": "../units/mp_board_hindi/class_12/physics/unit1/1b.html",
        "Unit 2(C)- Capacity": "../units/mp_board_hindi/class_12/physics/unit1/1c.html",
        "Unit 2 - Electric Current": "../units/mp_board_hindi/class_12/physics/unit1/2.html"
      },
      "रसायन शास्त्र ": {
        "Unit 1 - Solution": "../units/mp_board_hindi/class_12/chemistry/unit1/c1/1.html",
        "Unit 2 - Electrochemistry": "../units/mp_board_hindi/class_12/chemistry/unit1/c2/2.html",
        "Unit 3 - Chemical Kinetics": "../units/mp_board_hindi/class_12/chemistry/unit1/c3/3.html",
        "Unit 4 - d and f Block Elements": "../units/mp_board_hindi/class_12/chemistry/unit1/c4/4.html"
      }
    },
    "Class 10th": {
      "Mathematics": {
        "Real Numbers": "../units/cbse/class_10/mathematics/1.html",
        "Polynomials": "../units/cbse/class_10/mathematics/2.html",
        "Quadratic Equations": "../units/cbse/class_10/mathematics/4.1.html"
      },
      "Science": {
        "Chemical Reaction": "../units/cbse/class_10/science/chemical.html",
        "Acids and Bases": "../units/cbse/class_10/science/acids.html",
        "Metals and Non-metals": "../units/cbse/class_10/science/matels.html",
        "Carbon and its compounds": "../units/cbse/class_10/science/carbon.html",
        "Life Processes": "../units/cbse/class_10/science/Life.html",
        "Light": "../units/cbse/class_10/science/light.html",
      }
    }
  },
  "CBSE": {
    "Class 10th": {
      "Mathematics": {
        "Real Numbers": "../units/cbse/class_10/mathematics/1.html",
        "Polynomials": "../units/cbse/class_10/mathematics/2.html",
        "Quadratic Equations": "../units/cbse/class_10/mathematics/4.1.html"
      },
      "Science": {
        "Chemical Reaction": "../units/cbse/class_10/science/chemical.html",
        "Acids and Bases": "../units/cbse/class_10/science/acids.html",
        "Metals and Non-metals": "../units/cbse/class_10/science/matels.html",
        "Carbon and its compounds": "../units/cbse/class_10/science/carbon.html",
        "Life Processes": "../units/cbse/class_10/science/Life.html",
        "Light": "../units/cbse/class_10/science/light.html",
      }
    },
    "Class 9th": {
      "Science": {
      "Chapter 1 - Matter in Our Surroundings" : "../units/cbse/class_9/science/1.html", 
      "Chapter 2 - Is Matter Around Us Pure?" : "../units/cbse/class_9/science/2.html", 
      "Chapter 3 - Atoms and Molecules" : "../units/cbse/class_9/science/3.html", 
      "Chapter 4 - Structure of the Atom" : "../units/cbse/class_9/science/4.html", 
      "Chapter 5 - The Fundamental Unit of Life" : "../units/cbse/class_9/science/5.html", 
      "Chapter 6 - Tissues" : "../units/cbse/class_9/science/6.html", 
      "Chapter 7 - Motion" : "../units/cbse/class_9/science/7.html", 
      "Chapter 8 - Force and Laws of Motion" : "../units/cbse/class_9/science/8.html", 
      "Chapter 9 - Gravitation" : "../units/cbse/class_9/science/9.html", 
      "Chapter 10 - Gravitation" : "../units/cbse/class_9/science/10.html", 
      "Chapter 11 - Work and Energy" : "../units/cbse/class_9/science/11.html", 
      "Chapter 12 - Patterns in Life: Diversity and Classification" : "../units/cbse/class_9/science/12.html"
      },
    }
  }
};

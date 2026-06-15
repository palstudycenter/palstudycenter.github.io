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
        "यूनिट 2 स्थिर विद्युत विभव एवं धारिता",
        "यूनिट 3 विद्युत धारा",
        "यूनिट 4 गतिमान आवेश एवं चुंबकत्व",
        "यूनिट 5 चुंबकत्व एवं पदार्थ",
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
        "यूनिट 7 अल्कोहल",
        "यूनिट 8 फिनोल",
        "यूनिट 9 ईथर",
        "यूनिट 10 एल्डिहाइड एवं कीटोन",
        "यूनिट 11 कार्बोक्सिलिक अम्ल",
        "यूनिट 12 अमीन",
        "यूनिट 13 जैव-अणु"
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
        "यूनिट 5 (A) पारिस्थितिकी",
        "यूनिट 5 (B) जीव और समष्टियाँ",
        "पारितंत्र",
        "यूनिट 5 (C) जैव विविधता एवं संरक्षण"
      ],
      "गणित": [
        "यूनिट 1 संबंध एवं फलन",
        "यूनिट 2 प्रतिलोम त्रिकोणमितीय फलन",
        "यूनिट 3 आव्यूह",
        "यूनिट 4 सारणिक",
        "यूनिट 5 सततता एवं अवकलनीयता",
        "यूनिट 6 अवकलज के अनुप्रयोग",
        "यूनिट 7 समाकलन",
        "यूनिट 8 समाकलन के अनुप्रयोग",
        "यूनिट 9 अवकल समीकरण",
        "यूनिट 10 सदिश बीजगणित",
        "यूनिट 11 त्रिविमीय ज्यामिति",
        "यूनिट 12 रैखिक प्रोग्रामन",
        "यूनिट 13 प्रायिकता"
      ],
      "अग्रेजी": [
        "Flamingo Unit 1 The Last Lesson",
        "Unit 2 Lost Spring",
        "Unit 3 Deep Water",
        "Unit 4 The Rattrap",
        "Unit 5 Indigo",
        "Unit 6 Poets and Pancakes",
        "Unit 7 The Interview",
        "Unit 8 Going Places",
        "Vistas Unit 1 The Third Level",
        "Unit 2 The Tiger King",
        "Unit 3 Journey to the End of the Earth",
        "Unit 4 The Enemy",
        "Unit 5 Should Wizard Hit Mommy",
        "Unit 6 On the Face of It",
        "Unit 7 Evans Tries an O-Level",
        "Unit 8 Memories of Childhood"
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
      "भौतिकी": [],
      "रसायन शास्त्र ": [],
      "गणित": [],
      "जीवविज्ञान": [],
      "अग्रेजी": [],
      "हिंदी": []
    },
    "Class 10th": {
      "विज्ञान": [],
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
      "Physics": ["Unit 1 Electrostatics"],
      "Chemistry": [],
      "Mathematics": [],
      "Biology": [],
      "English": [],
      "Hindi": []
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
        "यूनिट 2 स्थिर विद्युत विभव एवं धारिता": "../units/mp_board_hindi/class_12/physics/unit2/MP_Hindi_12th_Physics_unit2.html",
        "यूनिट 3 विद्युत धारा": "../units/mp_board_hindi/class_12/physics/unit3/MP_Hindi_12th_Physics_unit3.html",
        "यूनिट 4 गतिमान आवेश एवं चुंबकत्व": "../units/mp_board_hindi/class_12/physics/unit4/MP_Hindi_12th_Physics_unit4.html",
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
          "यूनिट 3 रासायनिक गतिकी": "../units/mp_board_hindi/class_12/chemistry/unit1/c3/3_formatted.html",
          "यूनिट 4 d और f ब्लॉक के तत्व": "../units/mp_board_hindi/class_12/chemistry/unit1/c4/4_formatted.html",
          "यूनिट 5 समन्वय यौगिक": "../units/mp_board_hindi/class_12/chemistry/unit1/c5/5_formatted.html",
          "यूनिट 6 हैलोएल्केन और हैलोएरीन": "../units/mp_board_hindi/class_12/chemistry/unit1/c6/6_formatted.html",
          "यूनिट 7 अल्कोहल": "../units/mp_board_hindi/class_12/chemistry/unit1/c7/7_formatted.html",
          "यूनिट 8 फिनोल": "../units/mp_board_hindi/class_12/chemistry/unit1/c8/8_formatted.html",
          "यूनिट 9 ईथर": "../units/mp_board_hindi/class_12/chemistry/unit1/c9/9_formatted.html",
          "यूनिट 10 एल्डिहाइड एवं कीटोन": "../units/mp_board_hindi/class_12/chemistry/unit1/c10/10_formatted.html",
          "यूनिट 11 कार्बोक्सिलिक अम्ल": "../units/mp_board_hindi/class_12/chemistry/unit1/c11/11_formatted.html",
          "यूनिट 12 अमीन": "../units/mp_board_hindi/class_12/chemistry/unit1/c12/12_formatted.html",
          "यूनिट 13 जैव-अणु": "../units/mp_board_hindi/class_12/chemistry/unit1/c13/13_formatted.html"
      },
      "जीवविज्ञान": {
        "यूनिट 1 (A) पुष्पीय पौधों में लैंगिक जनन" : "../units/mp_board_hindi/class_12/biology/unit1/b1/1_formatted.html",
        "यूनिट 1 (B) मानव जनन": "../units/mp_board_hindi/class_12/biology/unit1/b2/2_formatted.html",
        "यूनिट 1 (C) जनन स्वास्थ्य" : "../units/mp_board_hindi/class_12/biology/unit1/b3/3_formatted.html",
        "यूनिट 2 (A) वंशागति के सिद्धांत" : "",
        "यूनिट 2 (B) वंशागति का आणविक आधार" : "",
        "यूनिट 2 (C) विकास" : "",
        "यूनिट 3 (A) मानव कल्याण में जीवविज्ञान" : "",
        "यूनिट 3 (B) मानव स्वास्थ्य एवं रोग" : "",
        "यूनिट 3 (C) मानव कल्याण में सूक्ष्मजीव" : "",
        "यूनिट 4 (A) जैव प्रौद्योगिकी: सिद्धांत एवं प्रक्रियाएँ" : "",
        "यूनिट 4 (B) जैव प्रौद्योगिकी एवं उसके उपयोग" : "",
        "यूनिट 5 (A) पारिस्थितिकी" : "",
        "यूनिट 5 (B) जीव और समष्टियाँ" : "",
        "पारितंत्र" : "",
        "यूनिट 5 (C) जैव विविधता एवं संरक्षण" : ""
      }
    }
  }
};

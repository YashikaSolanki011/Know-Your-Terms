import i18n from "i18next";
import { initReactI18next } from "react-i18next";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: {
            Language: "Language",
            About: "About",
            Solutions: "Solutions",
            Products: "Products",
            "Get Started": "Get Started",
            "Contact Us": "Contact Us",
            Home: "Home",
            English: "English",
            Spanish: "Spanish",
            French: "French"
          }
        },
        hi: {
          translation: {
            Language: "भाषा",
            About: "परिचय",
            Solutions: "समाधान",
            Products: "उत्पाद",
            "Get Started": "शुरू करें",
            "Contact Us": "संपर्क करें",
            Home: "होम",
            English: "अंग्रेज़ी",
            Hindi: "हिन्दी"
          }
        },
        bn: { translation: { Language: "ভাষা", About: "পরিচিতি", Solutions: "সমাধান", Products: "পণ্য", "Get Started": "শুরু করুন", "Contact Us": "যোগাযোগ করুন", Home: "হোম", English: "ইংরেজি", Bengali: "বাংলা" } },
        ta: { translation: { Language: "மொழி", About: "பற்றி", Solutions: "தீர்வுகள்", Products: "தயாரிப்புகள்", "Get Started": "தொடங்கவும்", "Contact Us": "தொடர்பு கொள்ளவும்", Home: "முகப்பு", English: "ஆங்கிலம்", Tamil: "தமிழ்" } },
        te: { translation: { Language: "భాష", About: "గురించి", Solutions: "పరిష్కారాలు", Products: "ఉత్పత్తులు", "Get Started": "ప్రారంభించండి", "Contact Us": "సంప్రదించండి", Home: "హోమ్", English: "ఆంగ్లం", Telugu: "తెలుగు" } },
        mr: { translation: { Language: "भाषा", About: "परिचय", Solutions: "उपाय", Products: "उत्पादने", "Get Started": "सुरू करा", "Contact Us": "संपर्क करा", Home: "मुख्यपृष्ठ", English: "इंग्रजी", Marathi: "मराठी" } },
        gu: { translation: { Language: "ભાષા", About: "પરિચય", Solutions: "ઉકેલો", Products: "ઉત્પાદનો", "Get Started": "શરૂ કરો", "Contact Us": "સંપર્ક કરો", Home: "મુખ્ય પૃષ્ઠ", English: "અંગ્રેજી", Gujarati: "ગુજરાતી" } },
        kn: { translation: { Language: "ಭಾಷೆ", About: "ಪರಿಚಯ", Solutions: "ಪರಿಹಾರಗಳು", Products: "ಉತ್ಪನ್ನಗಳು", "Get Started": "ಪ್ರಾರಂಭಿಸಿ", "Contact Us": "ಸಂಪರ್ಕಿಸಿ", Home: "ಮುಖಪುಟ", English: "ಇಂಗ್ಲಿಷ್", Kannada: "ಕನ್ನಡ" } },
        ml: { translation: { Language: "ഭാഷ", About: "പരിചയം", Solutions: "പരിഹാരങ്ങൾ", Products: "ഉൽപ്പന്നങ്ങൾ", "Get Started": "തുടങ്ങുക", "Contact Us": "ബന്ധപ്പെടുക", Home: "ഹോം", English: "ഇംഗ്ലീഷ്", Malayalam: "മലയാളം" } },
        pa: { translation: { Language: "ਭਾਸ਼ਾ", About: "ਬਾਰੇ", Solutions: "ਹੱਲ", Products: "ਉਤਪਾਦ", "Get Started": "ਸ਼ੁਰੂ ਕਰੋ", "Contact Us": "ਸੰਪਰਕ ਕਰੋ", Home: "ਮੁੱਖ ਪੰਨਾ", English: "ਅੰਗਰੇਜ਼ੀ", Punjabi: "ਪੰਜਾਬੀ" } },
        or: { translation: { Language: "ଭାଷା", About: "ପରିଚୟ", Solutions: "ସମାଧାନ", Products: "ଉତ୍ପାଦ", "Get Started": "ଆରମ୍ଭ କରନ୍ତୁ", "Contact Us": "ଯୋଗାଯୋଗ କରନ୍ତୁ", Home: "ମୂଳ ପୃଷ୍ଠା", English: "ଇଂରାଜୀ", Odia: "ଓଡ଼ିଆ" } },
        ur: { translation: { Language: "زبان", About: "تعارف", Solutions: "حلول", Products: "مصنوعات", "Get Started": "شروع کریں", "Contact Us": "رابطہ کریں", Home: "ہوم", English: "انگریزی", Urdu: "اردو" } },
        as: { translation: { Language: "ভাষা", About: "পৰিচয়", Solutions: "সমাধান", Products: "উৎপাদ", "Get Started": "আৰম্ভ কৰক", "Contact Us": "যোগাযোগ কৰক", Home: "হোম", English: "ইংৰাজী", Assamese: "অসমীয়া" } },
        mai: { translation: { Language: "भाषा", About: "परिचय", Solutions: "समाधान", Products: "उत्पाद", "Get Started": "शुरू करू", "Contact Us": "संपर्क करू", Home: "मुख्य पृष्ठ", English: "अंग्रेज़ी", Maithili: "मैथिली" } },
        sat: { translation: { Language: "ᱵᱟᱹᱜᱤ", About: "ᱯᱟᱹᱨᱤᱪᱤᱭ", Solutions: "ᱥᱟᱢᱟᱫᱟᱱ", Products: "ᱩᱛᱯᱟᱲ", "Get Started": "ᱥᱩᱨᱩ ᱠᱚᱨᱩ", "Contact Us": "ᱥᱟᱢᱯᱚᱨᱠ ᱠᱚᱨᱩ", Home: "ᱢᱩᱠᱷᱤ ᱯᱨᱤᱥᱛᱤ", English: "ᱟᱝᱜᱽᱨᱮᱡᱤ", Santali: "ᱥᱟᱱᱛᱟᱞᱤ" } },
        ks: { translation: { Language: "زبان", About: "تعارف", Solutions: "حل", Products: "مصنوعات", "Get Started": "شروع کریں", "Contact Us": "رابطہ کریں", Home: "گھر", English: "انگریزی", Kashmiri: "کٲشُر" } },
        ne: { translation: { Language: "भाषा", About: "परिचय", Solutions: "समाधान", Products: "उत्पादनहरू", "Get Started": "सुरु गर्नुहोस्", "Contact Us": "सम्पर्क गर्नुहोस्", Home: "गृहपृष्ठ", English: "अंग्रेजी", Nepali: "नेपाली" } },
        kok: { translation: { Language: "भाषा", About: "परिचय", Solutions: "उपाय", Products: "उत्पादन", "Get Started": "सुरू करा", "Contact Us": "संपर्क करा", Home: "मुख्यपृष्ठ", English: "इंग्रजी", Konkani: "कोंकणी" } },
        sd: { translation: { Language: "ٻولي", About: "تعارف", Solutions: "حل", Products: "مصنوعات", "Get Started": "شروع ڪريو", "Contact Us": "رابطو ڪريو", Home: "گهر", English: "انگريزي", Sindhi: "سنڌي" } },
        doi: { translation: { Language: "भाषा", About: "परिचय", Solutions: "समाधान", Products: "उत्पाद", "Get Started": "शुरू करो", "Contact Us": "संपर्क करो", Home: "मुख्य पृष्ठ", English: "अंग्रेज़ी", Dogri: "डोगरी" } },
        mni: { translation: { Language: "ꯂꯣꯟꯒꯤ", About: "ꯄꯥꯔꯤꯆꯥꯏ", Solutions: "ꯁꯦꯝꯗꯣꯟ", Products: "ꯎꯠꯄꯥꯗ", "Get Started": "ꯁꯨꯔꯨ ꯀꯣꯔꯨ", "Contact Us": "ꯁꯦꯝꯄꯣꯔꯀ ꯀꯣꯔꯨ", Home: "ꯃꯨꯛꯄꯤꯇ", English: "ইংলিশ", Manipuri: "মৈতৈলোন্" } },
        brx: { translation: { Language: "बर'", About: "परिचय", Solutions: "समाधान", Products: "उत्पाद", "Get Started": "सुरु करो", "Contact Us": "संपर्क करो", Home: "मुख्य पृष्ठ", English: "अंग्रेज़ी", Bodo: "बड़ो" } },
        sa: { translation: { Language: "भाषा", About: "परिचय", Solutions: "समाधान", Products: "उत्पाद", "Get Started": "आरंभ करें", "Contact Us": "संपर्क करें", Home: "मुख्य पृष्ठ", English: "अंग्रेज़ी", Sanskrit: "संस्कृतम्" } },
      },
      lng: "en",
      fallbackLng: "en",
      interpolation: { escapeValue: false }
    });
}

export default i18n;

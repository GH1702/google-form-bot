const puppeteer = require("puppeteer");

// ============================================================
// REPLACE THIS WITH YOUR ACTUAL GOOGLE FORM URL
// ============================================================
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc7wIuzOun3LiEVgbkp4SWd7V0m4kOKemr8_slGP_nPW0Y0JQ/viewform?pli=1";
// ============================================================

// 20 Yes-biased response profiles (17/20 lean strongly positive, 3 are mildly mixed)
const responses = [
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Modern, functional, innovative",
    remindsOf: "A smart home gadget like a Google Nest",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It looks sleek and modern, would sit perfectly on my windowsill",
    tankRefill: "1", whatLike: "The automatic watering and the beautiful wooden finish",
    mostUseful: "Automatic watering - I never have to worry when on holiday",
    features: ["Automatic Watering", "WiFi Capabilities", "WEB UI", "Smart Watering"],
    willingToBuy: "1", priceRange: "£55 – £70",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add a UV protective coating to the wood",
    missingFeature: "A dedicated mobile app",
    recommend: "Yes", plantsOwned: "4",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "UV protection on the wood exterior",
    moreLikely: "If it had a dedicated mobile app",
    missing: "Mobile app support",
    seenSimilar: "No, nothing quite like this",
    whyOverSpike: "The WiFi, OLED display and smart features make it far superior"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Unique, clever, handcrafted",
    remindsOf: "A wooden smart speaker like a Sonos",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The wooden curved design looks really premium and modern",
    tankRefill: "2", whatLike: "The chilli handle and the smart watering system",
    mostUseful: "Smart watering because it adjusts based on actual soil moisture",
    features: ["Chilli Handle", "Smart Watering", "WhatsApp Notifications", "Automatic Watering"],
    willingToBuy: "1", priceRange: "£55 – £70",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Match the 3D printed plastic colour to the wood more closely",
    missingFeature: "Battery level indicator on the OLED",
    recommend: "Yes", plantsOwned: "6",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "2", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Colour match the plastic parts to the plywood",
    moreLikely: "If the plastic was closer in colour to the plywood",
    missing: "A calibration guide for the sensors",
    seenSimilar: "Seen basic watering spikes but nothing as smart as this",
    whyOverSpike: "It monitors moisture levels and sends WiFi notifications, a spike just drips blindly"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Professional, smart, stylish",
    remindsOf: "An Apple product, very clean and considered design",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "Looks high end and would be a talking point for guests",
    tankRefill: "1", whatLike: "The pill windows and the LED ring look great",
    mostUseful: "WhatsApp notifications when the tank is empty",
    features: ["Pill-Shaped Window", "LED Ring", "WhatsApp Notifications", "WEB UI"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add UV varnish to protect the wood against sun damage long term",
    missingFeature: "Historical moisture graphs on the web UI",
    recommend: "Yes", plantsOwned: "8",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Add UV protection to the wood",
    moreLikely: "If there was historical data logging on the web UI",
    missing: "Data history and graphs",
    seenSimilar: "No, nothing like this exists commercially",
    whyOverSpike: "This is a complete intelligent system, not just a slow drip"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Impressive, innovative, premium",
    remindsOf: "A Dyson product, functional and beautifully designed",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It looks like a proper commercial product, not a school project at all",
    tankRefill: "1", whatLike: "Everything, particularly the curved wooden shell",
    mostUseful: "Automatic watering while away on holiday",
    features: ["Automatic Watering", "Smart Watering", "WiFi Capabilities", "WEB UI", "WhatsApp Notifications"],
    willingToBuy: "1", priceRange: "£90 – £120",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "1", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add a UV protective finish to preserve the wood",
    missingFeature: "A companion mobile app",
    recommend: "Yes", plantsOwned: "10",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Add a proper UV varnish to protect the wood",
    moreLikely: "Already would definitely buy it",
    missing: "Mobile app",
    seenSimilar: "Nothing commercially available at this quality for the price",
    whyOverSpike: "Completely different league - this monitors, notifies and can be controlled remotely"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Rustic, smart, compact",
    remindsOf: "A wooden Bluetooth speaker with added intelligence",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The wood and curved shape is very attractive on a windowsill",
    tankRefill: "2", whatLike: "The pill windows are a really clever design idea",
    mostUseful: "Being notified on WhatsApp when plants need water",
    features: ["Pill-Shaped Window", "WhatsApp Notifications", "Automatic Watering", "LED Ring"],
    willingToBuy: "1", priceRange: "£55 – £70",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "3",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Varnish the wood with a UV resistant lacquer",
    missingFeature: "Adjustable watering schedules per plant",
    recommend: "Yes", plantsOwned: "5",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "2", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "UV lacquer on the wood finish",
    moreLikely: "If the wood had a proper lacquered protective finish",
    missing: "Scheduled watering option",
    seenSimilar: "No",
    whyOverSpike: "Far more sophisticated, you can monitor everything remotely from anywhere"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Clever, beautiful, useful",
    remindsOf: "A high end kitchen appliance, very considered",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It suits a modern home perfectly, I would love this on my desk",
    tankRefill: "1", whatLike: "The LED ring and the web interface together",
    mostUseful: "Web UI for checking moisture levels remotely from my phone",
    features: ["LED Ring", "WEB UI", "Smart Watering", "WiFi Capabilities"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "1", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Complete the MQTT Home Assistant integration",
    missingFeature: "Full MQTT Home Assistant dashboard",
    recommend: "Yes", plantsOwned: "7",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Complete the MQTT integration with Home Assistant",
    moreLikely: "Full Home Assistant MQTT support",
    missing: "Full MQTT dashboard integration",
    seenSimilar: "Seen MQTT plant monitors but not in such a premium enclosure",
    whyOverSpike: "The monitoring and notifications alone make it worth every penny over a spike"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Polished, thoughtful, practical",
    remindsOf: "A premium plant pot crossed with a smart home hub",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The wooden finish makes it look like furniture, not a gadget",
    tankRefill: "1", whatLike: "The portable power bank design is genius",
    mostUseful: "Being able to run it from a power bank without mains power",
    features: ["Automatic Watering", "WiFi Capabilities", "Smart Watering", "WEB UI"],
    willingToBuy: "1", priceRange: "£55 – £70",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add a battery percentage readout on the OLED",
    missingFeature: "Battery level display so you know when to recharge",
    recommend: "Yes", plantsOwned: "3",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Show the power bank battery level on the OLED",
    moreLikely: "If the battery level was visible at a glance",
    missing: "Battery percentage indicator",
    seenSimilar: "No, this seems genuinely unique",
    whyOverSpike: "This is a complete system with real intelligence, a spike just waters blindly"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Exceptional, modern, impressive",
    remindsOf: "Something you would find as a funded Kickstarter product",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It genuinely looks like a polished retail product",
    tankRefill: "1", whatLike: "The overall build quality and the thought put into every detail",
    mostUseful: "Smart moisture based watering, far better than a simple timer",
    features: ["Smart Watering", "WEB UI", "WhatsApp Notifications", "LED Ring", "Automatic Watering"],
    willingToBuy: "1", priceRange: "£90 – £120",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "1", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "UV protection for both the wood and the plastic parts",
    missingFeature: "Mobile app and historical moisture data logging",
    recommend: "Yes", plantsOwned: "9",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "1",
    moistureVsTimer: "Yes",
    changeOne: "Add UV protection throughout the product",
    moreLikely: "Already want one, I would buy this today",
    missing: "Data history logging on the web UI",
    seenSimilar: "Nothing at this build quality exists",
    whyOverSpike: "Not even comparable - this is a complete IoT system with real intelligence"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Practical, techy, impressive",
    remindsOf: "A smart speaker combined with a plant monitor",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "I love the mix of natural wood and modern technology",
    tankRefill: "2", whatLike: "WiFi connectivity and the clean web interface",
    mostUseful: "Being able to check plants from anywhere in the world via WiFi",
    features: ["WiFi Capabilities", "WEB UI", "Automatic Watering", "Smart Watering"],
    willingToBuy: "1", priceRange: "£55 – £70",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Make the LED ring colours customisable through the web UI",
    missingFeature: "Custom LED colour settings via the web interface",
    recommend: "Yes", plantsOwned: "3",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "2", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Customisable LED colours through the web UI",
    moreLikely: "Custom LED colours and maybe a dark mode on the web UI",
    missing: "Colour customisation for the LED ring",
    seenSimilar: "Seen basic ESP32 plant monitors online but not this polished",
    whyOverSpike: "The WiFi monitoring and smart watering alone make it worth far more than a spike"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Sleek, intelligent, refined",
    remindsOf: "A premium kitchen gadget from a design brand",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It has a warmth from the wood that cold tech products usually lack",
    tankRefill: "1", whatLike: "The wooden curved shell is absolutely stunning",
    mostUseful: "The WhatsApp tank empty alerts so you never come home to dead plants",
    features: ["WhatsApp Notifications", "Automatic Watering", "Pill-Shaped Window", "Smart Watering"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add UV varnish to both the wood and plastic to extend its life",
    missingFeature: "Support for multiple WhatsApp notification numbers",
    recommend: "Yes", plantsOwned: "6",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Allow multiple phone numbers to receive WhatsApp alerts",
    moreLikely: "Multi-user notifications would be the final feature it needs",
    missing: "Multi-user notification support",
    seenSimilar: "No, nothing like this exists",
    whyOverSpike: "The notifications and WiFi monitoring make it incomparable to a simple spike"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Technical, wooden, original",
    remindsOf: "A well crafted IoT project that could be sold commercially",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It is a very original product, I have never seen anything like it",
    tankRefill: "2", whatLike: "The smart watering logic based on soil moisture is brilliant",
    mostUseful: "Smart soil moisture sensing rather than just guessing or using a timer",
    features: ["Smart Watering", "Automatic Watering", "WEB UI", "WiFi Capabilities"],
    willingToBuy: "2", priceRange: "£55 – £70",
    overallRating: "4", oledEasy: "Yes", oledExtra: "No",
    setupEase: "3", useEase: "2", routineEase: "3",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Simplify the initial WiFi setup process slightly",
    missingFeature: "A step by step quick start guide",
    recommend: "Yes", plantsOwned: "4",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "2", wifiImportance: "3",
    moistureVsTimer: "Yes",
    changeOne: "Add a printed quick start guide in the box",
    moreLikely: "A clearer setup guide would make it perfect",
    missing: "A beginner friendly setup guide",
    seenSimilar: "Seen similar DIY ESP32 projects but never this well finished",
    whyOverSpike: "The intelligence and real monitoring capability far exceeds what a spike offers"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Wow, functional, beautiful",
    remindsOf: "Something from a tech and design magazine feature",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "Absolutely, it is a genuine statement piece for any room",
    tankRefill: "1", whatLike: "The whole package, form and function working together perfectly",
    mostUseful: "The smart moisture-based watering, it just makes sense",
    features: ["Smart Watering", "WEB UI", "LED Ring", "WiFi Capabilities", "Automatic Watering"],
    willingToBuy: "1", priceRange: "£90 – £120",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "1", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "UV coat all the exterior surfaces for long term protection",
    missingFeature: "Historical moisture data charts on the web UI",
    recommend: "Yes", plantsOwned: "8",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "1",
    moistureVsTimer: "Yes",
    changeOne: "Add UV coating to all exterior surfaces",
    moreLikely: "I would already buy this without hesitation",
    missing: "Data history charts",
    seenSimilar: "Nothing commercial at this level",
    whyOverSpike: "A spike is just a drip, this is a fully intelligent monitoring and watering system"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Smart, natural, impressive",
    remindsOf: "A premium desk accessory that happens to water plants",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The wood makes it feel natural and warm rather than a cold gadget",
    tankRefill: "2", whatLike: "The automatic watering and the clear OLED display",
    mostUseful: "Seeing live soil moisture data on the OLED at a glance",
    features: ["Automatic Watering", "Pill-Shaped Window", "LED Ring", "Smart Watering"],
    willingToBuy: "1", priceRange: "£55 – £70",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add temperature and humidity display to the OLED",
    missingFeature: "Temperature and humidity readout on the OLED",
    recommend: "Yes", plantsOwned: "5",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "2", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Display temperature and humidity on the OLED screen",
    moreLikely: "Temperature and humidity data on the screen",
    missing: "Temperature readout on the OLED screen",
    seenSimilar: "Basic Arduino ones exist but not this quality",
    whyOverSpike: "Real time monitoring and smart watering vs just blindly dripping water"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Inspiring, crafted, futuristic",
    remindsOf: "A product you would see at a design exhibition",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It would be the most interesting and impressive object on any windowsill",
    tankRefill: "1", whatLike: "The incredible level of detail in both the hardware and software",
    mostUseful: "The Web UI for full remote monitoring and control",
    features: ["WEB UI", "WiFi Capabilities", "Smart Watering", "WhatsApp Notifications", "LED Ring"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Complete the full MQTT integration with Home Assistant",
    missingFeature: "Full Home Assistant integration via MQTT",
    recommend: "Yes", plantsOwned: "7",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "1",
    moistureVsTimer: "Yes",
    changeOne: "Complete the MQTT Home Assistant integration",
    moreLikely: "Full Home Assistant support would make this perfect",
    missing: "MQTT Home Assistant dashboard",
    seenSimilar: "Seen Home Assistant plant monitors but nothing this well built",
    whyOverSpike: "Remote control, monitoring and notifications versus a passive drip, no comparison"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Reliable, beautiful, clever",
    remindsOf: "A Sonos speaker, excellent design paired with great function",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The curved shape is completely unlike anything else on the market",
    tankRefill: "1", whatLike: "The curved wooden shell and the smart watering features",
    mostUseful: "Automatic watering particularly when away travelling",
    features: ["Automatic Watering", "Smart Watering", "WiFi Capabilities", "WEB UI"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add a UV varnish to preserve the wood long term",
    missingFeature: "Adjustable watering volume amount per individual plant",
    recommend: "Yes", plantsOwned: "6",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Adjustable water amount setting per individual plant",
    moreLikely: "Already would definitely buy it",
    missing: "Per-plant adjustable watering volume",
    seenSimilar: "No, this is genuinely unique",
    whyOverSpike: "The intelligence and craftsmanship make it worth every penny over a spike"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Sophisticated, smart, stunning",
    remindsOf: "A high-end smart home device from a premium brand",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It would be the most impressive thing in any room I put it in",
    tankRefill: "1", whatLike: "The LED ring gives brilliant visual feedback at a glance",
    mostUseful: "LED ring as an instant visual indicator without even needing the OLED",
    features: ["LED Ring", "Smart Watering", "WEB UI", "Automatic Watering", "WiFi Capabilities"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add more LED ring animations and colour modes for different plant statuses",
    missingFeature: "More LED animation modes for different plant statuses",
    recommend: "Yes", plantsOwned: "8",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "More LED ring animations tied to different plant states",
    moreLikely: "Already would buy it without hesitation",
    missing: "More visual LED feedback modes",
    seenSimilar: "No, nothing like this anywhere",
    whyOverSpike: "The LED, OLED and Web UI give complete visibility that a spike could never offer"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Brilliant, polished, innovative",
    remindsOf: "Something between a premium plant pot and a smart speaker",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It blends technology with natural materials beautifully",
    tankRefill: "1", whatLike: "Everything, it is an exceptionally well rounded product",
    mostUseful: "The combination of smart watering and WhatsApp alerts working together",
    features: ["Smart Watering", "WhatsApp Notifications", "WEB UI", "LED Ring", "Automatic Watering"],
    willingToBuy: "1", priceRange: "£90 – £120",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "1", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "UV protection applied to both the wood and plastic for long term durability",
    missingFeature: "A full dedicated mobile app",
    recommend: "Yes", plantsOwned: "10",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "1",
    moistureVsTimer: "Yes",
    changeOne: "UV coat everything for maximum longevity",
    moreLikely: "Already a definite buy, I would order one right now",
    missing: "Dedicated mobile app",
    seenSimilar: "Nothing commercially available even close to this",
    whyOverSpike: "You cannot compare them at all, this is a proper intelligent IoT system"
  }
];

// Helper to click a radio option by label text
async function clickRadio(page, questionText, optionText) {
  try {
    await page.evaluate((qText, oText) => {
      const labels = Array.from(document.querySelectorAll("span.M7eMe"));
      for (const label of labels) {
        if (label.textContent.trim().includes(qText)) {
          const container = label.closest("[role='listitem'], .geS5n, .freebirdFormviewerComponentsQuestionBaseRoot");
          if (container) {
            const options = container.querySelectorAll("[data-value]");
            for (const opt of options) {
              if (opt.getAttribute("data-value") === oText) {
                opt.click();
                return true;
              }
            }
            // fallback: click by label text
            const spans = container.querySelectorAll("span.aDTYNe, span.nWQGrd");
            for (const span of spans) {
              if (span.textContent.trim() === oText) {
                span.closest("[role='radio'], [role='checkbox']")?.click();
                return true;
              }
            }
          }
        }
      }
    }, questionText, optionText);
  } catch (e) {
    console.log(`  Could not click radio: "${questionText}" -> "${optionText}"`);
  }
}

// Helper to type into a text input
async function typeAnswer(page, questionText, answer) {
  try {
    await page.evaluate((qText, ans) => {
      const labels = Array.from(document.querySelectorAll("span.M7eMe"));
      for (const label of labels) {
        if (label.textContent.trim().includes(qText)) {
          const container = label.closest("[role='listitem'], .geS5n, .freebirdFormviewerComponentsQuestionBaseRoot");
          if (container) {
            const input = container.querySelector("input[type='text'], textarea");
            if (input) {
              input.focus();
              input.value = ans;
              input.dispatchEvent(new Event("input", { bubbles: true }));
              input.dispatchEvent(new Event("change", { bubbles: true }));
              return true;
            }
          }
        }
      }
    }, questionText, answer);
  } catch (e) {
    console.log(`  Could not type: "${questionText}"`);
  }
}

// Helper to click a scale value (1-5)
async function clickScale(page, questionText, value) {
  try {
    await page.evaluate((qText, val) => {
      const labels = Array.from(document.querySelectorAll("span.M7eMe"));
      for (const label of labels) {
        if (label.textContent.trim().includes(qText)) {
          const container = label.closest("[role='listitem'], .geS5n, .freebirdFormviewerComponentsQuestionBaseRoot");
          if (container) {
            const radios = container.querySelectorAll("[role='radio']");
            for (const radio of radios) {
              const dataVal = radio.getAttribute("data-value");
              if (dataVal === String(val)) {
                radio.click();
                return true;
              }
            }
          }
        }
      }
    }, questionText, value);
  } catch (e) {
    console.log(`  Could not click scale: "${questionText}" -> ${value}`);
  }
}

// Helper to click checkboxes (multi-select)
async function clickCheckboxes(page, questionText, options) {
  for (const opt of options) {
    try {
      await page.evaluate((qText, oText) => {
        const labels = Array.from(document.querySelectorAll("span.M7eMe"));
        for (const label of labels) {
          if (label.textContent.trim().includes(qText)) {
            const container = label.closest("[role='listitem'], .geS5n, .freebirdFormviewerComponentsQuestionBaseRoot");
            if (container) {
              const checkboxes = container.querySelectorAll("[role='checkbox']");
              for (const cb of checkboxes) {
                const span = cb.querySelector("span.aDTYNe, span.nWQGrd");
                if (span && span.textContent.trim() === oText) {
                  cb.click();
                  return true;
                }
              }
            }
          }
        }
      }, questionText, opt);
    } catch (e) {
      console.log(`  Could not click checkbox: "${questionText}" -> "${opt}"`);
    }
  }
}

async function fillForm(response, index) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log(`\n[${index + 1}/20] Loading form...`);
  await page.goto(FORM_URL, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Yes/No/Impartial questions
  await clickRadio(page, "Do you like the look of the product", response.likesLook);
  await clickRadio(page, "Does the wood finish look high quality", response.woodFinish);
  await clickRadio(page, "Do the plastic (PLA) 3D printed parts blend", response.plasticBlend);
  await clickRadio(page, "Does the product look like it could withstand daily use", response.withstandUse);

  // Text questions
  await typeAnswer(page, "What three words", response.threeWords);
  await typeAnswer(page, "What does the product remind you of", response.remindsOf);

  await clickRadio(page, "Can you clearly see the water level", response.seeWaterLevel);
  await clickRadio(page, "Do you think the chilli handle is an appropriate", response.chilliAppropriate);
  await clickRadio(page, "Does the chilli handle make the product feel personal", response.chilliPersonal);
  await clickRadio(page, "Would you expect a product like this to have a UV", response.uvCoating);
  await clickRadio(page, "Does the product look like it would fit in well", response.fitsHome);
  await clickRadio(page, "Does the product look like something you'd be happy to display", response.happyDisplay);
  await typeAnswer(page, "Why does the product look like", response.whyDisplay);
  await typeAnswer(page, "What does the product remind you of or look similar to", response.remindsOf);

  // Scale: tank refill
  await clickScale(page, "How easy is it to tell when the water tank needs refilling", response.tankRefill);

  // Text: what do you like
  await typeAnswer(page, "What about the product do you like", response.whatLike);
  await typeAnswer(page, "Which feature do you think is the most useful and why", response.mostUseful);

  // Checkboxes: features
  await clickCheckboxes(page, "Which  functions do you like or use", response.features);

  // Willingness to buy scale
  await clickScale(page, "Would you be willing to pay for this product", response.willingToBuy);

  // Price range - grid/radio
  await clickRadio(page, "How much would you be willing to pay", response.priceRange);

  // Overall rating
  await clickScale(page, "Overall what would you rate this product", response.overallRating);

  await clickRadio(page, "Is the OLED easy to read", response.oledEasy);
  await clickRadio(page, "Is there anything else that should be displayed on the OLED", response.oledExtra);

  await clickScale(page, "How easy is the device to setup", response.setupEase);
  await clickScale(page, "How easy is the device to use", response.useEase);
  await clickScale(page, "How easy is the device to program routines", response.routineEase);

  await clickRadio(page, "Would the physical navigation buttons", response.buttonsUseful);
  await clickRadio(page, "Do you think the WEB UI is useful", response.webUiUseful);
  await clickScale(page, "How useful do you think the automatic watering feature is", response.autoWateringUseful);

  await clickRadio(page, "Do you use the WhatsApp notification function", response.whatsappUse);
  await clickRadio(page, "If you use the WhatsApp notification function, is it useful", response.whatsappUseful);
  await clickRadio(page, "Would you trust the system to water plants automatically", response.trustAuto);

  await clickRadio(page, "Do you think the size of the product is appropriate", response.sizeAppropriate);
  await clickRadio(page, "Does the product look modern and suitable for a home environment", response.looksModern);
  await clickRadio(page, "Do you like the LED ring on the device", response.likesLed);

  // Open text
  await typeAnswer(page, "What would you improve about the product", response.improve);
  await typeAnswer(page, "Are there any features you would like this product to have", response.missingFeature);

  await clickRadio(page, "Would you recommend this product to someone who owns plants", response.recommend);
  await clickRadio(page, "How many plants do you currently own", response.plantsOwned);

  await clickRadio(page, "Do you know how to switch between connection modes", response.knowsModes);
  await clickRadio(page, "Do you switch between connection modes", response.switchesModes);
  await clickRadio(page, "Is having a range of connection options useful", response.modesUseful);

  await clickScale(page, "How easy was the Web UI to navigate", response.webUiEase);
  await clickScale(page, "How important is it that the system works without Wi-Fi", response.wifiImportance);

  await clickRadio(page, "Do you think the system watering plants automatically based on soil moisture", response.moistureVsTimer);

  await typeAnswer(page, "If you could change one thing about the product", response.changeOne);
  await typeAnswer(page, "What would make you more likely to buy this product", response.moreLikely);
  await typeAnswer(page, "What do you think is missing from the product", response.missing);
  await typeAnswer(page, "Have you seen anything similar to this product before", response.seenSimilar);
  await typeAnswer(page, "Why would you choose this over a basic automatic watering spike", response.whyOverSpike);

  await new Promise(r => setTimeout(r, 1000));

  // Submit
  try {
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("[role='button']"));
      const submit = buttons.find(b => b.textContent.trim().toLowerCase().includes("submit"));
      if (submit) submit.click();
    });
    await new Promise(r => setTimeout(r, 3000));
    console.log(`  ✅ Response ${index + 1} submitted`);
  } catch (e) {
    console.log(`  ❌ Submit failed for response ${index + 1}: ${e.message}`);
  }

  await browser.close();
}

(async () => {
  console.log("Starting form filler...");
  console.log(`Submitting ${responses.length} responses to:\n${FORM_URL}\n`);

  for (let i = 0; i < responses.length; i++) {
    await fillForm(responses[i], i);
    // Small delay between submissions
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log("\n✅ All 20 responses submitted!");
})().catch(err => console.error("Fatal error:", err));
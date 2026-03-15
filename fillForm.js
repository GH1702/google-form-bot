const puppeteer = require("puppeteer");

// ============================================================
// REPLACE THIS WITH YOUR ACTUAL GOOGLE FORM URL
// ============================================================
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc7wIuzOun3LiEVgbkp4SWd7V0m4kOKemr8_slGP_nPW0Y0JQ/viewform?pli=1";
// ============================================================

// 20 varied, realistic response profiles
const responses = [
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Modern, functional, innovative",
    remindsOf: "A smart home gadget like a Google Nest",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It looks sleek and modern, would fit on my windowsill easily",
    tankRefill: "1", whatLike: "The automatic watering and the wooden finish",
    mostUseful: "Automatic watering - means I don't have to worry when on holiday",
    features: ["Automatic Watering", "WiFi Capabilities", "WEB UI"],
    willingToBuy: "1", priceRange: "£40 – £55",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "3",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add a UV protective coating to the wood",
    missingFeature: "A mobile app would be nice",
    recommend: "Yes", plantsOwned: "4",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "3",
    moistureVsTimer: "Yes",
    changeOne: "UV protection on the wood exterior",
    moreLikely: "If it had a dedicated mobile app",
    missing: "Mobile app support",
    seenSimilar: "No, nothing quite like this",
    whyOverSpike: "The WiFi, OLED display and smart features make it far superior"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Unsure", withstandUse: "Yes",
    threeWords: "Unique, clever, handcrafted",
    remindsOf: "A wooden speaker or smart home device",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Unsure", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The wooden curved design looks really premium",
    tankRefill: "2", whatLike: "The chilli handle and the smart watering",
    mostUseful: "Smart watering because it adjusts based on actual soil moisture",
    features: ["Chilli Handle", "Smart Watering", "WhatsApp Notifications"],
    willingToBuy: "2", priceRange: "£55 – £70",
    overallRating: "4", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "2", routineEase: "3",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "2",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Make the 3D printed plastic match the wood colour better",
    missingFeature: "Battery level indicator",
    recommend: "Yes", plantsOwned: "6",
    knowsModes: "No", switchesModes: "No", modesUseful: "Yes",
    webUiEase: "2", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Colour match the plastic parts to the wood",
    moreLikely: "If the plastic was closer in colour to the plywood",
    missing: "A calibration guide for the sensors",
    seenSimilar: "I've seen basic watering spikes but nothing like this",
    whyOverSpike: "It monitors moisture and has WiFi notifications, a spike just drips water slowly"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Professional, smart, stylish",
    remindsOf: "An Apple product, very clean design",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "Looks high end and would be a talking point for guests",
    tankRefill: "1", whatLike: "The pill windows and the LED ring",
    mostUseful: "WhatsApp notifications when the tank is empty",
    features: ["Pill-Shaped Window", "LED Ring", "WhatsApp Notifications", "WEB UI"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add UV varnish to protect against sun damage",
    missingFeature: "Historical moisture graphs on the web UI",
    recommend: "Yes", plantsOwned: "8",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Add UV protection to the wood",
    moreLikely: "If there was historical data logging",
    missing: "Data history and graphs",
    seenSimilar: "No",
    whyOverSpike: "This is a complete system, not just a slow drip. It's intelligent"
  },
  {
    likesLook: "Impartial", woodFinish: "Yes", plasticBlend: "No", withstandUse: "Unsure",
    threeWords: "Interesting, technical, niche",
    remindsOf: "A DIY project but more polished",
    seeWaterLevel: "Yes", chilliAppropriate: "Unsure", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Unsure", happyDisplay: "Unsure",
    whyDisplay: "It depends on the room decor, might not match everywhere",
    tankRefill: "3", whatLike: "The automatic watering feature",
    mostUseful: "Automatic watering saves time",
    features: ["Automatic Watering", "WiFi Capabilities"],
    willingToBuy: "3", priceRange: "£30 – £40",
    overallRating: "3", oledEasy: "Yes", oledExtra: "No",
    setupEase: "3", useEase: "3", routineEase: "4",
    buttonsUseful: "Unsure", webUiUseful: "Yes", autoWateringUseful: "2",
    whatsappUse: "No", whatsappUseful: "I don't use it", trustAuto: "Unsure",
    sizeAppropriate: "Yes", looksModern: "Unsure", likesLed: "Unsure",
    improve: "Make the plastic parts blend in better with the wood",
    missingFeature: "A simpler setup process",
    recommend: "Unsure", plantsOwned: "2",
    knowsModes: "No", switchesModes: "No", modesUseful: "Unsure",
    webUiEase: "3", wifiImportance: "4",
    moistureVsTimer: "Yes",
    changeOne: "Simplify the setup process",
    moreLikely: "If it was easier to set up out of the box",
    missing: "A simpler first-time setup wizard",
    seenSimilar: "Seen basic Arduino plant waterers online",
    whyOverSpike: "The smart features are useful but the spike is simpler to set up"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Impressive, innovative, premium",
    remindsOf: "A Dyson product, functional and good looking",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It looks like a proper commercial product not a school project",
    tankRefill: "1", whatLike: "Everything, particularly the curved wooden shell",
    mostUseful: "Automatic watering while away on holiday",
    features: ["Automatic Watering", "Smart Watering", "WiFi Capabilities", "WEB UI", "WhatsApp Notifications"],
    willingToBuy: "1", priceRange: "£90 – £120",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add a UV protective finish to the wood",
    missingFeature: "A companion mobile app",
    recommend: "Yes", plantsOwned: "10",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Add a proper UV varnish",
    moreLikely: "Already would buy it",
    missing: "Mobile app",
    seenSimilar: "Nothing commercially available at this quality for the price",
    whyOverSpike: "Completely different league - this monitors, notifies and can be controlled remotely"
  },
  {
    likesLook: "Yes", woodFinish: "Unsure", plasticBlend: "Unsure", withstandUse: "Yes",
    threeWords: "Rustic, smart, compact",
    remindsOf: "A wooden bluetooth speaker",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The wood and curved shape is very attractive",
    tankRefill: "2", whatLike: "The pill windows are a great design idea",
    mostUseful: "Being notified on WhatsApp when plants need water",
    features: ["Pill-Shaped Window", "WhatsApp Notifications", "Automatic Watering"],
    willingToBuy: "2", priceRange: "£55 – £70",
    overallRating: "4", oledEasy: "Yes", oledExtra: "No",
    setupEase: "3", useEase: "2", routineEase: "3",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Sand and varnish the wood to a higher standard",
    missingFeature: "Adjustable watering schedules",
    recommend: "Yes", plantsOwned: "5",
    knowsModes: "No", switchesModes: "No", modesUseful: "Yes",
    webUiEase: "2", wifiImportance: "3",
    moistureVsTimer: "Yes",
    changeOne: "Improve the wood finish with varnish",
    moreLikely: "If the wood had a lacquered finish",
    missing: "Scheduled watering option",
    seenSimilar: "No",
    whyOverSpike: "Far more sophisticated, you can monitor everything remotely"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Clever, beautiful, useful",
    remindsOf: "A high end kitchen appliance",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Unsure", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It suits a modern home perfectly",
    tankRefill: "1", whatLike: "The LED ring and the web interface",
    mostUseful: "Web UI for checking moisture levels remotely",
    features: ["LED Ring", "WEB UI", "Smart Watering", "WiFi Capabilities"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "1", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "I didn't know about it", whatsappUseful: "I don't use it", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Make the WhatsApp setup more prominent in the instructions",
    missingFeature: "MQTT home assistant integration fully completed",
    recommend: "Yes", plantsOwned: "7",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "3",
    moistureVsTimer: "Yes",
    changeOne: "Complete the MQTT integration",
    moreLikely: "Full Home Assistant MQTT support",
    missing: "Full MQTT dashboard",
    seenSimilar: "Seen MQTT plant monitors but not in such a nice enclosure",
    whyOverSpike: "The monitoring and notifications alone make it worth it"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Polished, thoughtful, practical",
    remindsOf: "A premium plant pot or smart home hub",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "Wooden finish makes it look like a piece of furniture not a gadget",
    tankRefill: "1", whatLike: "The portable power bank design",
    mostUseful: "Being able to use it without mains power",
    features: ["Automatic Watering", "WiFi Capabilities", "Smart Watering"],
    willingToBuy: "2", priceRange: "£40 – £55",
    overallRating: "4", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "2", routineEase: "3",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add a battery percentage readout on the OLED",
    missingFeature: "Battery level display",
    recommend: "Yes", plantsOwned: "3",
    knowsModes: "Unsure", switchesModes: "No", modesUseful: "Yes",
    webUiEase: "2", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Show power bank battery level on the OLED",
    moreLikely: "If the battery level was visible",
    missing: "Battery percentage indicator",
    seenSimilar: "No, this seems unique",
    whyOverSpike: "This is a complete system, a spike just waters blindly"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Unsure", withstandUse: "Unsure",
    threeWords: "Quirky, functional, artistic",
    remindsOf: "A handmade craft item but with technology inside",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The chilli handle makes it look really fun and personalised",
    tankRefill: "2", whatLike: "The chilli handle and the pill windows",
    mostUseful: "The automatic watering while on holiday",
    features: ["Chilli Handle", "Pill-Shaped Window", "Automatic Watering"],
    willingToBuy: "2", priceRange: "£40 – £55",
    overallRating: "4", oledEasy: "Unsure", oledExtra: "No",
    setupEase: "3", useEase: "2", routineEase: "4",
    buttonsUseful: "Unsure", webUiUseful: "Unsure", autoWateringUseful: "2",
    whatsappUse: "No", whatsappUseful: "I don't use it", trustAuto: "Unsure",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Make the programming side simpler for non-tech users",
    missingFeature: "A simpler app based setup",
    recommend: "Yes", plantsOwned: "4",
    knowsModes: "No", switchesModes: "No", modesUseful: "Unsure",
    webUiEase: "3", wifiImportance: "4",
    moistureVsTimer: "Yes",
    changeOne: "Simplify the configuration for non-technical users",
    moreLikely: "If it had a simple setup app",
    missing: "Beginner friendly setup guide",
    seenSimilar: "No",
    whyOverSpike: "The smart watering and notifications justify the extra cost"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Exceptional, modern, impressive",
    remindsOf: "Something you'd find on Kickstarter",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It genuinely looks like a retail product",
    tankRefill: "1", whatLike: "The overall build quality and thought put into it",
    mostUseful: "Smart moisture based watering, much better than a timer",
    features: ["Smart Watering", "WEB UI", "WhatsApp Notifications", "LED Ring"],
    willingToBuy: "1", priceRange: "£90 – £120",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "1", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "UV protection for wood and plastic",
    missingFeature: "Mobile app and data logging",
    recommend: "Yes", plantsOwned: "9",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "1",
    moistureVsTimer: "Yes",
    changeOne: "Add UV protection throughout",
    moreLikely: "Already want one",
    missing: "Data history logging",
    seenSimilar: "Nothing at this build quality",
    whyOverSpike: "Not even comparable - this is a complete IoT system"
  },
  {
    likesLook: "Yes", woodFinish: "Unsure", plasticBlend: "Unsure", withstandUse: "Yes",
    threeWords: "Practical, techy, interesting",
    remindsOf: "A smart speaker with a plant twist",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Unsure", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "I like the mix of wood and tech",
    tankRefill: "2", whatLike: "WiFi and web interface",
    mostUseful: "Being able to check plants from anywhere via WiFi",
    features: ["WiFi Capabilities", "WEB UI", "Automatic Watering"],
    willingToBuy: "2", priceRange: "£55 – £70",
    overallRating: "4", oledEasy: "Yes", oledExtra: "No",
    setupEase: "3", useEase: "2", routineEase: "3",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "2",
    whatsappUse: "I didn't know about it", whatsappUseful: "I don't use it", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Unsure",
    improve: "Make the LED ring customisable in colour",
    missingFeature: "Custom LED colour settings",
    recommend: "Yes", plantsOwned: "3",
    knowsModes: "No", switchesModes: "No", modesUseful: "Yes",
    webUiEase: "2", wifiImportance: "3",
    moistureVsTimer: "Yes",
    changeOne: "Customisable LED colours",
    moreLikely: "Custom LED colours and a better plastic finish",
    missing: "Colour customisation for the LED ring",
    seenSimilar: "Seen basic ESP32 plant monitors but not this polished",
    whyOverSpike: "The WiFi monitoring alone makes it worth it over a spike"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Sleek, intelligent, refined",
    remindsOf: "A premium kitchen gadget",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It has a warmth to it from the wood that tech products usually lack",
    tankRefill: "1", whatLike: "The wooden curved shell is stunning",
    mostUseful: "The WhatsApp tank alerts",
    features: ["WhatsApp Notifications", "Automatic Watering", "Pill-Shaped Window"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add UV varnish to both wood and plastic",
    missingFeature: "Multiple user WhatsApp notifications",
    recommend: "Yes", plantsOwned: "6",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Allow multiple numbers for WhatsApp alerts",
    moreLikely: "Multi-user notifications",
    missing: "Multi-user notification support",
    seenSimilar: "No",
    whyOverSpike: "The notifications and WiFi monitoring make it incomparable to a spike"
  },
  {
    likesLook: "Impartial", woodFinish: "Yes", plasticBlend: "No", withstandUse: "Unsure",
    threeWords: "Technical, wooden, original",
    remindsOf: "A homemade gadget, but impressive for what it is",
    seeWaterLevel: "Unsure", chilliAppropriate: "Unsure", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Unsure", happyDisplay: "Unsure",
    whyDisplay: "Might be too large for some windowsills",
    tankRefill: "3", whatLike: "The smart watering logic",
    mostUseful: "Smart soil moisture sensing rather than guessing",
    features: ["Smart Watering", "Automatic Watering"],
    willingToBuy: "3", priceRange: "£30 – £40",
    overallRating: "3", oledEasy: "Unsure", oledExtra: "No",
    setupEase: "4", useEase: "3", routineEase: "5",
    buttonsUseful: "Unsure", webUiUseful: "Unsure", autoWateringUseful: "2",
    whatsappUse: "No", whatsappUseful: "I don't use it", trustAuto: "Unsure",
    sizeAppropriate: "Unsure", looksModern: "Unsure", likesLed: "Yes",
    improve: "Reduce the overall size for smaller windowsills",
    missingFeature: "A smaller version",
    recommend: "Unsure", plantsOwned: "2",
    knowsModes: "No", switchesModes: "No", modesUseful: "Unsure",
    webUiEase: "4", wifiImportance: "5",
    moistureVsTimer: "Yes",
    changeOne: "Make it smaller and more compact",
    moreLikely: "A more compact version",
    missing: "A mini version for smaller spaces",
    seenSimilar: "Seen similar DIY projects on YouTube",
    whyOverSpike: "Smarter but also more complex, a spike is simpler for a non-tech person"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Wow, functional, beautiful",
    remindsOf: "Something from a tech design magazine",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "Absolutely, it is a statement piece",
    tankRefill: "1", whatLike: "The whole package, form and function together",
    mostUseful: "The smart moisture-based watering system",
    features: ["Smart Watering", "WEB UI", "LED Ring", "WiFi Capabilities", "Automatic Watering"],
    willingToBuy: "1", priceRange: "£90 – £120",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "1", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "UV coat the wood",
    missingFeature: "Historical moisture data charts",
    recommend: "Yes", plantsOwned: "8",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "1",
    moistureVsTimer: "Yes",
    changeOne: "Add UV coating",
    moreLikely: "Already would buy",
    missing: "Data history",
    seenSimilar: "Nothing commercial at this level",
    whyOverSpike: "A spike is a drip, this is an intelligent system"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Unsure", withstandUse: "Yes",
    threeWords: "Smart, natural, impressive",
    remindsOf: "A premium desk accessory",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The wood makes it feel natural and not like a cold gadget",
    tankRefill: "2", whatLike: "Automatic watering and OLED display",
    mostUseful: "Seeing live data on the OLED at a glance",
    features: ["Automatic Watering", "Pill-Shaped Window", "LED Ring"],
    willingToBuy: "2", priceRange: "£55 – £70",
    overallRating: "4", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "2", routineEase: "3",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "I didn't know about it", whatsappUseful: "I don't use it", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Make the plastic match the wood more closely",
    missingFeature: "Temperature display on OLED",
    recommend: "Yes", plantsOwned: "5",
    knowsModes: "No", switchesModes: "No", modesUseful: "Yes",
    webUiEase: "2", wifiImportance: "3",
    moistureVsTimer: "Yes",
    changeOne: "Display temperature on the OLED",
    moreLikely: "Temperature readout and better matching plastic",
    missing: "Temperature on the OLED screen",
    seenSimilar: "Basic Arduino ones but not this quality",
    whyOverSpike: "Real-time monitoring and smart watering vs just dripping water"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Inspiring, crafted, futuristic",
    remindsOf: "A product from a design exhibition",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It would be the most interesting object on my windowsill",
    tankRefill: "1", whatLike: "The level of detail in both hardware and software",
    mostUseful: "The Web UI for full remote control",
    features: ["WEB UI", "WiFi Capabilities", "Smart Watering", "WhatsApp Notifications"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Full MQTT integration for Home Assistant",
    missingFeature: "Home Assistant integration",
    recommend: "Yes", plantsOwned: "7",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "1",
    moistureVsTimer: "Yes",
    changeOne: "Complete the MQTT Home Assistant integration",
    moreLikely: "Full Home Assistant support",
    missing: "MQTT Home Assistant dashboard",
    seenSimilar: "Seen Home Assistant plant monitors but not like this",
    whyOverSpike: "Remote control and monitoring vs a passive drip, no comparison"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Reliable, beautiful, clever",
    remindsOf: "A Sonos speaker, great design and function",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Unsure", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The curved shape is unlike anything else on the market",
    tankRefill: "1", whatLike: "The curved wooden shell and smart features",
    mostUseful: "Automatic watering particularly when travelling",
    features: ["Automatic Watering", "Smart Watering", "WiFi Capabilities"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add a UV varnish to preserve the wood",
    missingFeature: "Adjustable watering amount per plant",
    recommend: "Yes", plantsOwned: "6",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "Adjustable water amount per individual plant",
    moreLikely: "Already would buy it",
    missing: "Per-plant adjustable watering volume",
    seenSimilar: "No, this is genuinely unique",
    whyOverSpike: "The intelligence and craftsmanship make it worth the premium"
  },
  {
    likesLook: "Impartial", woodFinish: "Unsure", plasticBlend: "No", withstandUse: "Unsure",
    threeWords: "Interesting, complex, homemade",
    remindsOf: "A school or university project",
    seeWaterLevel: "Yes", chilliAppropriate: "Unsure", chilliPersonal: "Unsure",
    uvCoating: "Yes", fitsHome: "Unsure", happyDisplay: "Unsure",
    whyDisplay: "I would need to see it in person to decide",
    tankRefill: "4", whatLike: "The concept and the smart watering idea",
    mostUseful: "Automatic watering to keep plants alive while away",
    features: ["Automatic Watering"],
    willingToBuy: "4", priceRange: "£20 – £30",
    overallRating: "3", oledEasy: "Unsure", oledExtra: "No",
    setupEase: "4", useEase: "3", routineEase: "5",
    buttonsUseful: "Unsure", webUiUseful: "Yes", autoWateringUseful: "2",
    whatsappUse: "No", whatsappUseful: "I don't use it", trustAuto: "Unsure",
    sizeAppropriate: "Unsure", looksModern: "No", likesLed: "Unsure",
    improve: "Make it look more professional and less like a DIY build",
    missingFeature: "A cleaner finish on all plastic parts",
    recommend: "Unsure", plantsOwned: "1",
    knowsModes: "No", switchesModes: "No", modesUseful: "Unsure",
    webUiEase: "4", wifiImportance: "5",
    moistureVsTimer: "Unsure",
    changeOne: "Injection mould the plastic parts for a cleaner finish",
    moreLikely: "More professional looking finish on the plastic",
    missing: "Better surface finish on 3D printed parts",
    seenSimilar: "Yes, similar DIY projects on Instructables",
    whyOverSpike: "A spike is simpler and cheaper, this needs more setup"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Sophisticated, smart, stunning",
    remindsOf: "A high-end smart home device",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It would be the most impressive thing in any room",
    tankRefill: "1", whatLike: "The LED ring gives great visual feedback",
    mostUseful: "LED ring as a quick visual indicator without needing the OLED",
    features: ["LED Ring", "Smart Watering", "WEB UI", "Automatic Watering"],
    willingToBuy: "1", priceRange: "£70 – £90",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "2", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "Add more LED ring animations for different states",
    missingFeature: "More LED animation modes",
    recommend: "Yes", plantsOwned: "8",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "2",
    moistureVsTimer: "Yes",
    changeOne: "More LED ring animations",
    moreLikely: "Already would buy it",
    missing: "More visual LED feedback modes",
    seenSimilar: "No",
    whyOverSpike: "The LED, OLED and Web UI give you complete visibility that a spike never could"
  },
  {
    likesLook: "Yes", woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    threeWords: "Brilliant, polished, innovative",
    remindsOf: "Something between a plant pot and a smart speaker",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It blends technology with nature beautifully",
    tankRefill: "1", whatLike: "Everything, it is a very well rounded product",
    mostUseful: "The combination of smart watering and WhatsApp alerts",
    features: ["Smart Watering", "WhatsApp Notifications", "WEB UI", "LED Ring", "Automatic Watering"],
    willingToBuy: "1", priceRange: "£90 – £120",
    overallRating: "5", oledEasy: "Yes", oledExtra: "No",
    setupEase: "1", useEase: "1", routineEase: "2",
    buttonsUseful: "Yes", webUiUseful: "Yes", autoWateringUseful: "1",
    whatsappUse: "Yes", whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    improve: "UV protection for long term durability",
    missingFeature: "Full mobile app",
    recommend: "Yes", plantsOwned: "10",
    knowsModes: "Yes", switchesModes: "Yes", modesUseful: "Yes",
    webUiEase: "1", wifiImportance: "1",
    moistureVsTimer: "Yes",
    changeOne: "UV coat everything for longevity",
    moreLikely: "Already a definite buy",
    missing: "Dedicated mobile app",
    seenSimilar: "Nothing commercially available like this",
    whyOverSpike: "You cannot compare them, this is a proper intelligent IoT system"
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
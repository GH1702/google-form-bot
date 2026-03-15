const puppeteer = require("puppeteer");

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc7wIuzOun3LiEVgbkp4SWd7V0m4kOKemr8_slGP_nPW0Y0JQ/viewform";

// 20 responses filling ONLY the questions that were left blank in the CSV.
// Blank columns identified from the CSV:
//   - Does the wood finish look high quality
//   - Do the plastic (PLA) 3D printed parts blend
//   - Does the product look like it could withstand daily use
//   - Can you clearly see the water level through the pill-shaped windows
//   - Do you think the chilli handle is an appropriate design choice
//   - Does the chilli handle make the product feel personal and unique
//   - Would you expect a product like this to have a UV-protective coating
//   - Does the product look like it would fit in well in a home dining room
//   - Does the product look like something you'd be happy to display
//   - Why does the product look like something you'd be happy to display (2nd text box)
//   - Which functions do you like or use (checkboxes)
//   - Is the OLED easy to read
//   - Is there anything else that should be displayed on the OLED
//   - 3x duplicate "Which feature do you think is the most useful" text boxes
//   - If you use the WhatsApp notification function, is it useful
//   - Would you trust the system to water plants automatically
//   - Do you think the size of the product is appropriate
//   - Does the product look modern and suitable for a home environment
//   - Do you like the LED ring on the device
//   - How many plants do you currently own
//   - Do you switch between connection modes AP/Wi-Fi/MQTT
//   - How easy was the Web UI to navigate
//   - How important is it that the system works without Wi-Fi
//   - Do you think the system watering plants automatically based on soil moisture is more useful than a simple timer

const responses = [
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It looks sleek and modern, would sit perfectly on my windowsill",
    features: ["Automatic Watering", "WiFi Capabilities", "WEB UI", "Smart Watering"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "Automatic watering - I never have to worry when on holiday",
    mostUseful2: "Smart watering adjusts based on real soil moisture levels",
    mostUseful3: "WhatsApp notifications keep me informed from anywhere",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "4", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The wooden curved design looks really premium and modern",
    features: ["Chilli Handle", "Smart Watering", "WhatsApp Notifications", "Automatic Watering"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "Smart watering because it adjusts based on actual soil moisture",
    mostUseful2: "The WhatsApp alerts are incredibly useful when away",
    mostUseful3: "WiFi connectivity allows remote monitoring from anywhere",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "6", switchesModes: "Yes",
    webUiEase: "2", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "Looks high end and would be a talking point for guests",
    features: ["Pill-Shaped Window", "LED Ring", "WhatsApp Notifications", "WEB UI"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "WhatsApp notifications when the tank is empty",
    mostUseful2: "LED ring gives instant visual status at a glance",
    mostUseful3: "Web UI allows full control from any device",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "8", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It looks like a proper commercial product, not a school project at all",
    features: ["Automatic Watering", "Smart Watering", "WiFi Capabilities", "WEB UI", "WhatsApp Notifications"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "Automatic watering while away on holiday",
    mostUseful2: "Smart moisture sensing is far better than a timer",
    mostUseful3: "Web UI lets you check and control everything remotely",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "10", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The wood and curved shape is very attractive on a windowsill",
    features: ["Pill-Shaped Window", "WhatsApp Notifications", "Automatic Watering", "LED Ring"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "Being notified on WhatsApp when plants need water",
    mostUseful2: "Pill windows give a clear view of water level at all times",
    mostUseful3: "Automatic watering keeps plants alive without any effort",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "5", switchesModes: "Yes",
    webUiEase: "2", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It suits a modern home perfectly, I would love this on my desk",
    features: ["LED Ring", "WEB UI", "Smart Watering", "WiFi Capabilities"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "Web UI for checking moisture levels remotely from my phone",
    mostUseful2: "LED ring is an instant visual indicator of plant health",
    mostUseful3: "Smart watering logic based on real soil data is excellent",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "7", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The wooden finish makes it look like furniture, not a gadget",
    features: ["Automatic Watering", "WiFi Capabilities", "Smart Watering", "WEB UI"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "Being able to run it from a power bank without mains power",
    mostUseful2: "Smart watering ensures plants get exactly the right amount of water",
    mostUseful3: "WiFi monitoring means you can check in from anywhere",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "3", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It genuinely looks like a polished retail product",
    features: ["Smart Watering", "WEB UI", "WhatsApp Notifications", "LED Ring", "Automatic Watering"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "Smart moisture based watering, far better than a simple timer",
    mostUseful2: "WhatsApp notifications give instant alerts when action is needed",
    mostUseful3: "Web UI provides a full dashboard of plant health data",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "9", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "1", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "I love the mix of natural wood and modern technology",
    features: ["WiFi Capabilities", "WEB UI", "Automatic Watering", "Smart Watering"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "Being able to check plants from anywhere in the world via WiFi",
    mostUseful2: "Automatic watering is the core feature and it works brilliantly",
    mostUseful3: "Web UI gives a clear overview of all plant statuses",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "3", switchesModes: "Yes",
    webUiEase: "2", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It has a warmth from the wood that cold tech products usually lack",
    features: ["WhatsApp Notifications", "Automatic Watering", "Pill-Shaped Window", "Smart Watering"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "The WhatsApp tank empty alerts so you never come home to dead plants",
    mostUseful2: "Automatic watering is essential for when you are away on holiday",
    mostUseful3: "Pill windows make it effortless to check water levels at a glance",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "6", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It is a very original product, I have never seen anything like it",
    features: ["Smart Watering", "Automatic Watering", "WEB UI", "WiFi Capabilities"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "Smart soil moisture sensing rather than just guessing or using a timer",
    mostUseful2: "Web UI gives full remote control and monitoring capability",
    mostUseful3: "WiFi connectivity is essential for a modern smart home device",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "4", switchesModes: "Yes",
    webUiEase: "2", wifiImportance: "3", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "Absolutely, it is a genuine statement piece for any room",
    features: ["Smart Watering", "WEB UI", "LED Ring", "WiFi Capabilities", "Automatic Watering"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "The smart moisture-based watering, it just makes complete sense",
    mostUseful2: "LED ring gives instant status feedback without any interaction",
    mostUseful3: "Web UI is a polished interface that makes control very intuitive",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "8", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "1", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The wood makes it feel natural and warm rather than a cold gadget",
    features: ["Automatic Watering", "Pill-Shaped Window", "LED Ring", "Smart Watering"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "Seeing live soil moisture data on the OLED at a glance",
    mostUseful2: "Automatic watering removes any concern about overwatering",
    mostUseful3: "LED ring provides clear colour coded plant status information",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "5", switchesModes: "Yes",
    webUiEase: "2", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It would be the most interesting and impressive object on any windowsill",
    features: ["WEB UI", "WiFi Capabilities", "Smart Watering", "WhatsApp Notifications", "LED Ring"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "The Web UI for full remote monitoring and control",
    mostUseful2: "Smart watering means plants always get water at the right time",
    mostUseful3: "WhatsApp notifications mean you are always informed even when away",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "7", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "1", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The curved shape is completely unlike anything else on the market",
    features: ["Automatic Watering", "Smart Watering", "WiFi Capabilities", "WEB UI"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "Automatic watering particularly when away travelling",
    mostUseful2: "Smart moisture sensing ensures plants are never over or under watered",
    mostUseful3: "WiFi and web UI combination is incredibly powerful",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "6", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It would be the most impressive thing in any room I put it in",
    features: ["LED Ring", "Smart Watering", "WEB UI", "Automatic Watering", "WiFi Capabilities"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "LED ring as an instant visual indicator without even needing the OLED",
    mostUseful2: "Smart watering logic is far superior to any simple timer solution",
    mostUseful3: "Web UI dashboard gives a complete overview of all plants",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "8", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It blends technology with natural materials beautifully",
    features: ["Smart Watering", "WhatsApp Notifications", "WEB UI", "LED Ring", "Automatic Watering"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "The combination of smart watering and WhatsApp alerts working together",
    mostUseful2: "Web UI provides full visibility and control of every plant",
    mostUseful3: "LED ring makes it immediately obvious if any plant needs attention",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "10", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "1", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The chilli handle makes it look really fun and personal to the owner",
    features: ["Chilli Handle", "Pill-Shaped Window", "Automatic Watering", "Smart Watering"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "The automatic watering while on holiday is the standout feature",
    mostUseful2: "Chilli handle adds real personality and makes it identifiable",
    mostUseful3: "Smart watering is intelligent and prevents over or under watering",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "4", switchesModes: "Yes",
    webUiEase: "2", wifiImportance: "2", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "The whole package of form and function working together perfectly",
    features: ["Smart Watering", "WEB UI", "LED Ring", "WiFi Capabilities", "Automatic Watering"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "The smart moisture-based watering system is the core value",
    mostUseful2: "Web UI is exceptionally well designed and very easy to navigate",
    mostUseful3: "LED ring provides effortless at-a-glance plant status updates",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "8", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "1", moistureVsTimer: "Yes"
  },
  {
    woodFinish: "Yes", plasticBlend: "Yes", withstandUse: "Yes",
    seeWaterLevel: "Yes", chilliAppropriate: "Yes", chilliPersonal: "Yes",
    uvCoating: "Yes", fitsHome: "Yes", happyDisplay: "Yes",
    whyDisplay: "It blends technology with nature in a way I have never seen before",
    features: ["Smart Watering", "WhatsApp Notifications", "WEB UI", "LED Ring", "Automatic Watering"],
    oledEasy: "Yes", oledExtra: "No",
    mostUseful1: "The combination of smart watering and instant WhatsApp alerts",
    mostUseful2: "Automatic watering removes all worry about plants when travelling",
    mostUseful3: "Web UI and LED ring together give complete visibility of plant health",
    whatsappUseful: "Yes", trustAuto: "Yes",
    sizeAppropriate: "Yes", looksModern: "Yes", likesLed: "Yes",
    plantsOwned: "10", switchesModes: "Yes",
    webUiEase: "1", wifiImportance: "1", moistureVsTimer: "Yes"
  }
];

// ─── Helpers ────────────────────────────────────────────────────────────────

async function clickRadio(page, questionText, optionText) {
  try {
    await page.evaluate((qText, oText) => {
      const allSpans = Array.from(document.querySelectorAll("span.M7eMe"));
      for (const span of allSpans) {
        if (span.textContent.trim().includes(qText)) {
          const container = span.closest("[role='listitem'], .geS5n, .freebirdFormviewerComponentsQuestionBaseRoot");
          if (!container) continue;
          // Try data-value match first
          const opts = container.querySelectorAll("[data-value]");
          for (const opt of opts) {
            if (opt.getAttribute("data-value") === oText) { opt.click(); return true; }
          }
          // Fallback: match label text
          const labels = container.querySelectorAll("span.aDTYNe, span.nWQGrd");
          for (const lbl of labels) {
            if (lbl.textContent.trim() === oText) {
              lbl.closest("[role='radio'], [role='checkbox']")?.click();
              return true;
            }
          }
        }
      }
    }, questionText, optionText);
  } catch (e) {
    console.log(`  ⚠ radio failed: "${questionText}" → "${optionText}"`);
  }
}

async function typeAnswer(page, questionText, answer) {
  try {
    await page.evaluate((qText, ans) => {
      const allSpans = Array.from(document.querySelectorAll("span.M7eMe"));
      for (const span of allSpans) {
        if (span.textContent.trim().includes(qText)) {
          const container = span.closest("[role='listitem'], .geS5n, .freebirdFormviewerComponentsQuestionBaseRoot");
          if (!container) continue;
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
    }, questionText, answer);
  } catch (e) {
    console.log(`  ⚠ type failed: "${questionText}"`);
  }
}

async function clickScale(page, questionText, value) {
  try {
    await page.evaluate((qText, val) => {
      const allSpans = Array.from(document.querySelectorAll("span.M7eMe"));
      for (const span of allSpans) {
        if (span.textContent.trim().includes(qText)) {
          const container = span.closest("[role='listitem'], .geS5n, .freebirdFormviewerComponentsQuestionBaseRoot");
          if (!container) continue;
          const radios = container.querySelectorAll("[role='radio']");
          for (const r of radios) {
            if (r.getAttribute("data-value") === String(val)) { r.click(); return true; }
          }
        }
      }
    }, questionText, value);
  } catch (e) {
    console.log(`  ⚠ scale failed: "${questionText}" → ${value}`);
  }
}

async function clickCheckboxes(page, questionText, options) {
  for (const opt of options) {
    try {
      await page.evaluate((qText, oText) => {
        const allSpans = Array.from(document.querySelectorAll("span.M7eMe"));
        for (const span of allSpans) {
          if (span.textContent.trim().includes(qText)) {
            const container = span.closest("[role='listitem'], .geS5n, .freebirdFormviewerComponentsQuestionBaseRoot");
            if (!container) continue;
            const boxes = container.querySelectorAll("[role='checkbox']");
            for (const box of boxes) {
              const lbl = box.querySelector("span.aDTYNe, span.nWQGrd");
              if (lbl && lbl.textContent.trim() === oText) { box.click(); return true; }
            }
          }
        }
      }, questionText, opt);
    } catch (e) {
      console.log(`  ⚠ checkbox failed: "${opt}"`);
    }
  }
}

// ─── Fill one form submission ────────────────────────────────────────────────

async function fillForm(r, index) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log(`\n[${index + 1}/20] Loading form...`);
  await page.goto(FORM_URL, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise(res => setTimeout(res, 2000));

  // --- Yes/No/Unsure radio questions ---
  await clickRadio(page, "Does the wood finish look high quality", r.woodFinish);
  await clickRadio(page, "Do the plastic (PLA) 3D printed parts blend", r.plasticBlend);
  await clickRadio(page, "Does the product look like it could withstand daily use", r.withstandUse);
  await clickRadio(page, "Can you clearly see the water level through the pill-shaped windows", r.seeWaterLevel);
  await clickRadio(page, "Do you think the chilli handle is an appropriate", r.chilliAppropriate);
  await clickRadio(page, "Does the chilli handle make the product feel personal", r.chilliPersonal);
  await clickRadio(page, "Would you expect a product like this to have a UV", r.uvCoating);
  await clickRadio(page, "Does the product look like it would fit in well", r.fitsHome);
  await clickRadio(page, "Does the product look like something you'd be happy to display", r.happyDisplay);

  // --- Why display text box (2nd occurrence) ---
  await typeAnswer(page, "Why does the product look like something you'd be happy to display", r.whyDisplay);

  // --- Checkboxes ---
  await clickCheckboxes(page, "Which  functions do you like or use", r.features);

  // --- OLED questions ---
  await clickRadio(page, "Is the OLED easy to read", r.oledEasy);
  await clickRadio(page, "Is there anything else that should be displayed on the OLED", r.oledExtra);

  // --- 3 duplicate "most useful" text boxes ---
  await typeAnswer(page, "Which feature do you think is the most useful and why? ", r.mostUseful1);
  await typeAnswer(page, "Which feature do you think is the most useful and why?", r.mostUseful2);
  await typeAnswer(page, "Which feature do you think is the most useful", r.mostUseful3);

  // --- WhatsApp useful ---
  await clickRadio(page, "If you use the WhatsApp notification function, is it useful", r.whatsappUseful);

  // --- Trust auto ---
  await clickRadio(page, "Would you trust the system to water plants automatically", r.trustAuto);

  // --- Size / modern / LED ---
  await clickRadio(page, "Do you think the size of the product is appropriate", r.sizeAppropriate);
  await clickRadio(page, "Does the product look modern and suitable for a home environment", r.looksModern);
  await clickRadio(page, "Do you like the LED ring on the device", r.likesLed);

  // --- Plants owned ---
  await clickRadio(page, "How many plants do you currently own", r.plantsOwned);

  // --- Switch modes ---
  await clickRadio(page, "Do you switch between connection modes", r.switchesModes);

  // --- Scale questions ---
  await clickScale(page, "How easy was the Web UI to navigate", r.webUiEase);
  await clickScale(page, "How important is it that the system works without Wi-Fi", r.wifiImportance);

  // --- Moisture vs timer ---
  await clickRadio(page, "Do you think the system watering plants automatically based on soil moisture", r.moistureVsTimer);

  await new Promise(res => setTimeout(res, 1000));

  // --- Submit ---
  try {
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("[role='button']"));
      const submit = btns.find(b => b.textContent.trim().toLowerCase().includes("submit"));
      if (submit) submit.click();
    });
    await new Promise(res => setTimeout(res, 3000));
    console.log(`  ✅ Response ${index + 1} submitted`);
  } catch (e) {
    console.log(`  ❌ Submit failed: ${e.message}`);
  }

  await browser.close();
}

// ─── Run all 20 ─────────────────────────────────────────────────────────────

(async () => {
  console.log("Starting missing-fields filler...");
  console.log(`Submitting ${responses.length} responses\n`);
  for (let i = 0; i < responses.length; i++) {
    await fillForm(responses[i], i);
    await new Promise(res => setTimeout(res, 2000));
  }
  console.log("\n✅ All 20 responses submitted!");
})().catch(err => console.error("Fatal error:", err));
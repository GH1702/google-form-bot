const puppeteer = require("puppeteer");

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc7wIuzOun3LiEVgbkp4SWd7V0m4kOKemr8_slGP_nPW0Y0JQ/viewform";

// 20 NEGATIVE bias responses - leans toward No/Unsure with critical feedback
// ~15 strongly negative, ~5 mildly negative/mixed to keep it realistic

const responses = [
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "The plastic parts look cheap and don't match the wood at all",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Automatic watering is the only feature I would actually use",
    mostUseful2: "Nothing else stands out as particularly useful or necessary",
    mostUseful3: "Most of the features feel overcomplicated for a plant waterer",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "5", wifiImportance: "5", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "Unsure", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "It looks unfinished and the 3D printed parts feel very low quality",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Basic automatic watering is the only thing that works reliably",
    mostUseful2: "The WiFi setup is too complicated for the average person",
    mostUseful3: "The web UI feels cluttered and hard to understand",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "5", wifiImportance: "5", moistureVsTimer: "No"
  },
  {
    woodFinish: "Unsure", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "Unsure",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "Far too bulky for a windowsill, it would get in the way",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Automatic watering saves the plants but everything else is unnecessary",
    mostUseful2: "The OLED is too small and hard to read from a normal distance",
    mostUseful3: "The chilli handle looks out of place and unprofessional",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "2", switchesModes: "No",
    webUiEase: "4", wifiImportance: "5", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "Unsure",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "It looks like a school project, not something I would display proudly",
    features: ["Automatic Watering"],
    oledEasy: "Unsure", oledExtra: "No",
    mostUseful1: "Automatic watering is useful but a cheap spike does the same thing",
    mostUseful2: "I would never use the WhatsApp feature, it seems over the top",
    mostUseful3: "The LED ring is a gimmick that adds no real value",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "5", wifiImportance: "4", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "The wood and plastic clash badly, it does not look cohesive at all",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Only the automatic watering justifies the size and complexity",
    mostUseful2: "The connection modes are confusing and unnecessary for most users",
    mostUseful3: "Setting it up requires too much technical knowledge",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "5", wifiImportance: "5", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "Unsure", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "The overall finish is rough and clearly needs more work before selling",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Automatic watering is genuinely useful but the rest is bloated",
    mostUseful2: "WhatsApp notifications are unreliable and feel like an afterthought",
    mostUseful3: "The web UI is overly complex for what is essentially a plant waterer",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "2", switchesModes: "No",
    webUiEase: "5", wifiImportance: "4", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "No", chilliAppropriate: "Unsure", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "I would not want this on display, it looks far too messy and DIY",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Nothing beyond automatic watering feels worth the extra complexity",
    mostUseful2: "The product is too large and heavy for most windowsills",
    mostUseful3: "I would prefer a much simpler and cheaper solution",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "5", wifiImportance: "5", moistureVsTimer: "No"
  },
  {
    woodFinish: "Unsure", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "Unsure", happyDisplay: "No",
    whyDisplay: "It might work in some rooms but feels out of place in a modern home",
    features: ["Automatic Watering", "WiFi Capabilities"],
    oledEasy: "Unsure", oledExtra: "No",
    mostUseful1: "WiFi is useful in theory but the setup process is far too difficult",
    mostUseful2: "Automatic watering works but a basic spike is far cheaper",
    mostUseful3: "The OLED display is too small to read easily from any distance",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "2", switchesModes: "No",
    webUiEase: "4", wifiImportance: "4", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "The plastic looks cheap and badly finished, it lets the whole product down",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Automatic watering is the only feature with real everyday value",
    mostUseful2: "Most features are unnecessarily technical for a home user",
    mostUseful3: "The product tries to do too much and ends up doing nothing perfectly",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "5", wifiImportance: "5", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "Unsure",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "Too large and the colours do not complement each other well at all",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Automatic watering is useful but you can buy a spike for a few pounds",
    mostUseful2: "The chilli handle is a strange design choice that I strongly dislike",
    mostUseful3: "There are far cheaper and simpler alternatives available online",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "5", wifiImportance: "5", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "The product looks unfinished and I would not want it in my home",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Only automatic watering has any practical value to me",
    mostUseful2: "The WiFi features are unnecessary and make the product overcomplicated",
    mostUseful3: "I would never pay this price when a spike does the same basic job",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "5", wifiImportance: "5", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "Unsure", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "I would be embarrassed to have this on my windowsill in its current state",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Automatic watering is the one saving grace of this product",
    mostUseful2: "Everything else feels like unnecessary padding and feature bloat",
    mostUseful3: "The product needs a complete redesign before it would appeal to me",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "5", wifiImportance: "4", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "No", chilliAppropriate: "Unsure", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "The design feels very amateur, it does not look like a finished product",
    features: ["Automatic Watering"],
    oledEasy: "Unsure", oledExtra: "No",
    mostUseful1: "Automatic watering is practical but not worth the complexity here",
    mostUseful2: "The LED ring is a pointless addition that wastes power",
    mostUseful3: "I would want a much smaller and simpler product for the same purpose",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "2", switchesModes: "No",
    webUiEase: "5", wifiImportance: "5", moistureVsTimer: "No"
  },
  {
    woodFinish: "Unsure", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "Unsure", happyDisplay: "No",
    whyDisplay: "It might work in the right room but looks very unpolished overall",
    features: ["Automatic Watering", "WiFi Capabilities"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Automatic watering is fine but needs to be more reliable",
    mostUseful2: "WiFi only works well if you enjoy configuring network settings",
    mostUseful3: "For most people a simple timer would be far more practical",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "2", switchesModes: "No",
    webUiEase: "4", wifiImportance: "4", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "The product looks very rough around the edges and needs significant work",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Only basic automatic watering provides any real everyday value",
    mostUseful2: "The connection mode switching is baffling and needs simplifying",
    mostUseful3: "Most users will never use half the features this product has",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "5", wifiImportance: "5", moistureVsTimer: "No"
  },
  // 5 mildly negative / mixed responses below
  {
    woodFinish: "Unsure", plasticBlend: "No", withstandUse: "Unsure",
    seeWaterLevel: "Unsure", chilliAppropriate: "Unsure", chilliPersonal: "No",
    uvCoating: "Unsure", fitsHome: "Unsure", happyDisplay: "No",
    whyDisplay: "I am not sure it would fit the aesthetic of my home in its current form",
    features: ["Automatic Watering", "WiFi Capabilities"],
    oledEasy: "Unsure", oledExtra: "No",
    mostUseful1: "Automatic watering has potential but needs to be more reliable",
    mostUseful2: "WiFi is useful but only if the setup process is simplified significantly",
    mostUseful3: "The smart watering concept is good but the execution needs improvement",
    whatsappUseful: "No", trustAuto: "Unsure",
    sizeAppropriate: "Unsure", looksModern: "Unsure", likesLed: "Unsure",
    plantsOwned: "2", switchesModes: "No",
    webUiEase: "4", wifiImportance: "4", moistureVsTimer: "Unsure"
  },
  {
    woodFinish: "Unsure", plasticBlend: "No", withstandUse: "Unsure",
    seeWaterLevel: "Unsure", chilliAppropriate: "Unsure", chilliPersonal: "Unsure",
    uvCoating: "No", fitsHome: "Unsure", happyDisplay: "No",
    whyDisplay: "I would need to see a much more polished version before considering it",
    features: ["Automatic Watering"],
    oledEasy: "Unsure", oledExtra: "No",
    mostUseful1: "The automatic watering concept is sound but unreliable in practice",
    mostUseful2: "I am not convinced the smart features justify the added complexity",
    mostUseful3: "A simpler and cheaper version would be far more appealing to me",
    whatsappUseful: "No", trustAuto: "Unsure",
    sizeAppropriate: "Unsure", looksModern: "No", likesLed: "Unsure",
    plantsOwned: "2", switchesModes: "No",
    webUiEase: "4", wifiImportance: "4", moistureVsTimer: "Unsure"
  },
  {
    woodFinish: "Unsure", plasticBlend: "No", withstandUse: "No",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "Unsure",
    uvCoating: "No", fitsHome: "No", happyDisplay: "Unsure",
    whyDisplay: "Maybe in the right context but currently it looks too DIY for my taste",
    features: ["Automatic Watering", "WiFi Capabilities"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Automatic watering is the only feature I would rely on day to day",
    mostUseful2: "WiFi is too unreliable when the device reboots unexpectedly",
    mostUseful3: "The overall size puts me off, it takes up far too much space",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "Unsure", likesLed: "No",
    plantsOwned: "2", switchesModes: "No",
    webUiEase: "4", wifiImportance: "4", moistureVsTimer: "No"
  },
  {
    woodFinish: "No", plasticBlend: "No", withstandUse: "Unsure",
    seeWaterLevel: "Unsure", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "Unsure", happyDisplay: "No",
    whyDisplay: "The product needs a much cleaner finish before it would appeal to me",
    features: ["Automatic Watering"],
    oledEasy: "No", oledExtra: "No",
    mostUseful1: "Automatic watering is practical but not worth the price premium",
    mostUseful2: "The OLED display is not clear or informative enough to be useful",
    mostUseful3: "I do not see the value in most of the smart connectivity features",
    whatsappUseful: "No", trustAuto: "Unsure",
    sizeAppropriate: "Unsure", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "4", wifiImportance: "5", moistureVsTimer: "No"
  },
  {
    woodFinish: "Unsure", plasticBlend: "No", withstandUse: "Unsure",
    seeWaterLevel: "No", chilliAppropriate: "No", chilliPersonal: "No",
    uvCoating: "No", fitsHome: "No", happyDisplay: "No",
    whyDisplay: "The product has potential but is nowhere near ready for a home display",
    features: ["Automatic Watering"],
    oledEasy: "Unsure", oledExtra: "No",
    mostUseful1: "Automatic watering is the core concept but needs more work",
    mostUseful2: "Most of the extra features feel unnecessary and overcomplicated",
    mostUseful3: "I would need to see a much more refined version to consider buying it",
    whatsappUseful: "No", trustAuto: "No",
    sizeAppropriate: "No", looksModern: "No", likesLed: "No",
    plantsOwned: "1", switchesModes: "No",
    webUiEase: "5", wifiImportance: "5", moistureVsTimer: "No"
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
          const opts = container.querySelectorAll("[data-value]");
          for (const opt of opts) {
            if (opt.getAttribute("data-value") === oText) { opt.click(); return true; }
          }
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

  await clickRadio(page, "Does the wood finish look high quality", r.woodFinish);
  await clickRadio(page, "Do the plastic (PLA) 3D printed parts blend", r.plasticBlend);
  await clickRadio(page, "Does the product look like it could withstand daily use", r.withstandUse);
  await clickRadio(page, "Can you clearly see the water level through the pill-shaped windows", r.seeWaterLevel);
  await clickRadio(page, "Do you think the chilli handle is an appropriate", r.chilliAppropriate);
  await clickRadio(page, "Does the chilli handle make the product feel personal", r.chilliPersonal);
  await clickRadio(page, "Would you expect a product like this to have a UV", r.uvCoating);
  await clickRadio(page, "Does the product look like it would fit in well", r.fitsHome);
  await clickRadio(page, "Does the product look like something you'd be happy to display", r.happyDisplay);

  await typeAnswer(page, "Why does the product look like something you'd be happy to display", r.whyDisplay);

  await clickCheckboxes(page, "Which  functions do you like or use", r.features);

  await clickRadio(page, "Is the OLED easy to read", r.oledEasy);
  await clickRadio(page, "Is there anything else that should be displayed on the OLED", r.oledExtra);

  await typeAnswer(page, "Which feature do you think is the most useful and why? ", r.mostUseful1);
  await typeAnswer(page, "Which feature do you think is the most useful and why?", r.mostUseful2);
  await typeAnswer(page, "Which feature do you think is the most useful", r.mostUseful3);

  await clickRadio(page, "If you use the WhatsApp notification function, is it useful", r.whatsappUseful);
  await clickRadio(page, "Would you trust the system to water plants automatically", r.trustAuto);

  await clickRadio(page, "Do you think the size of the product is appropriate", r.sizeAppropriate);
  await clickRadio(page, "Does the product look modern and suitable for a home environment", r.looksModern);
  await clickRadio(page, "Do you like the LED ring on the device", r.likesLed);

  await clickRadio(page, "How many plants do you currently own", r.plantsOwned);
  await clickRadio(page, "Do you switch between connection modes", r.switchesModes);

  await clickScale(page, "How easy was the Web UI to navigate", r.webUiEase);
  await clickScale(page, "How important is it that the system works without Wi-Fi", r.wifiImportance);

  await clickRadio(page, "Do you think the system watering plants automatically based on soil moisture", r.moistureVsTimer);

  await new Promise(res => setTimeout(res, 1000));

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
  console.log("Starting NEGATIVE bias filler...");
  console.log(`Submitting ${responses.length} responses\n`);
  for (let i = 0; i < responses.length; i++) {
    await fillForm(responses[i], i);
    await new Promise(res => setTimeout(res, 2000));
  }
  console.log("\n✅ All 20 negative responses submitted!");
})().catch(err => console.error("Fatal error:", err));
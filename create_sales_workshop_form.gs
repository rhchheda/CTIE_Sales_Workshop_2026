/**
 * KLE-CTIE Sales Workshop 2026 — Startup Needs Assessment
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com/ and click "New Project".
 * 2. Delete any placeholder code and paste this entire file in.
 * 3. Click Run (▶) with the function "createSalesWorkshopForm" selected.
 * 4. Authorize the script when Google prompts you (first run only).
 * 5. Open View > Logs (or Executions) to get the Edit URL and Live URL
 *    for the form that was just created in your Google Drive.
 * 6. Open the Edit URL, review, then click "Send" to get the shareable
 *    link to distribute to startups.
 */

function createSalesWorkshopForm() {
  var form = FormApp.create('KLE-CTIE Sales Workshop 2026 — Startup Needs Assessment');

  form.setDescription(
    'KLE-CTIE is organizing a Sales Workshop for startups. To help us tailor the ' +
    'session content to your specific needs, please take a few minutes to complete ' +
    'this short questionnaire.\n\nAll responses will be used solely for workshop planning.'
  );
  form.setCollectEmail(false);
  form.setRequireLogin(false);
  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(true);
  form.setShuffleQuestions(false);

  // ---------- Section 1: Startup & Respondent Details ----------
  form.addPageBreakItem()
      .setTitle('Section 1: Startup & Respondent Details');

  form.addTextItem()
      .setTitle('Startup Name')
      .setHelpText('As registered, or the name you commonly go by.')
      .setRequired(true);

  form.addTextItem()
      .setTitle('Founder / Representative Name')
      .setHelpText('The person completing this form on behalf of the startup.')
      .setRequired(true);

  var emailItem = form.addTextItem();
  emailItem.setTitle('Email Address')
      .setHelpText('We will use this to share workshop details and joining instructions.')
      .setRequired(true)
      .setValidation(FormApp.createTextValidation()
          .setHelpText('Enter a valid email address.')
          .requireTextIsEmail()
          .build());

  form.addTextItem()
      .setTitle('Phone Number')
      .setHelpText('Include country code if outside India, e.g. +91XXXXXXXXXX.')
      .setRequired(true);

  form.addListItem()
      .setTitle('Industry / Sector')
      .setHelpText('Choose the option that best matches your primary business area.')
      .setChoiceValues([
        'SaaS / Technology',
        'D2C / E-commerce',
        'Deep Tech / Hardware',
        'FinTech',
        'HealthTech',
        'AgriTech',
        'EdTech',
        'Manufacturing',
        'Professional Services',
        'Other'
      ])
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle('Current Stage of Startup')
      .setHelpText('Select the stage that best reflects your startup today.')
      .setChoiceValues([
        'Idea / Pre-revenue',
        'Early Revenue',
        'Growth Stage',
        'Scaling'
      ])
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle('Team Size')
      .setHelpText('Total people currently working in your startup, including founders.')
      .setChoiceValues(['1–5', '6–15', '16–50', '50+'])
      .setRequired(true);

  // ---------- Section 2: Current Sales Context ----------
  form.addPageBreakItem()
      .setTitle('Section 2: Current Sales Context');

  form.addMultipleChoiceItem()
      .setTitle('What is your current primary sales model?')
      .setHelpText('Select the model that best describes how you currently sell your product/service.')
      .setChoiceValues([
        'B2B',
        'B2C',
        'B2B2C',
        'D2C',
        'Marketplace',
        'Not yet selling'
      ])
      .setRequired(true);

  form.addCheckboxItem()
      .setTitle('Which sales channels do you currently use?')
      .setHelpText('Select all that apply to how you sell today.')
      .setChoiceValues([
        'Direct sales',
        'Digital / social selling',
        'Cold outreach (email/calls)',
        'Channel / reseller partners',
        'Referrals & word-of-mouth',
        'Online marketplaces',
        'None yet'
      ])
      .setRequired(true);

  form.addMultipleChoiceItem()
      .setTitle('Do you currently have a dedicated sales function?')
      .setHelpText('Select the option that best describes your current sales setup.')
      .setChoiceValues([
        'Founder-led (no dedicated team)',
        'Small team (1–3 people)',
        'Dedicated sales team',
        'No sales function yet'
      ])
      .setRequired(true);

  // ---------- Section 3: Workshop Focus Areas ----------
  form.addPageBreakItem()
      .setTitle('Section 3: Workshop Focus Areas')
      .setHelpText('This section helps us tailor session content to your priorities.');

  var focusItem = form.addCheckboxItem();
  focusItem.setTitle('Which sales topics would you like this workshop to emphasize? (Select up to 3)')
      .setHelpText('These choices will directly shape the workshop agenda — pick the topics most valuable to your startup right now.')
      .setChoiceValues([
        'Lead generation & prospecting',
        'Crafting an effective sales pitch',
        'Negotiation & closing techniques',
        'Pricing strategy',
        'B2B / enterprise sales',
        'D2C / B2C sales strategies',
        'Channel & partner sales',
        'Digital & social selling',
        'CRM & sales tools/automation',
        'Building & scaling a sales team',
        'Customer retention & upselling',
        'International / export sales'
      ])
      .setRequired(true)
      .setValidation(FormApp.createCheckboxValidation()
          .setHelpText('Please select at most 3 options.')
          .requireSelectAtMost(3)
          .build());

  form.addParagraphTextItem()
      .setTitle('What is the single biggest sales challenge your startup is currently facing?')
      .setHelpText('Briefly describe it in your own words — this helps us bring relevant examples and case studies.')
      .setRequired(true);

  form.addCheckboxItem()
      .setTitle('Preferred session format')
      .setHelpText('Optional — helps us plan the right mix of activities.')
      .setChoiceValues([
        'Real-world case studies',
        'Hands-on exercises/activities',
        'One-on-one mentor interactions',
        'Panel discussion with industry experts',
        'Role-play / simulation exercises'
      ])
      .setRequired(false);

  // ---------- Section 4: Additional Input ----------
  form.addPageBreakItem()
      .setTitle('Section 4: Additional Input');

  form.addParagraphTextItem()
      .setTitle('Is there a specific problem statement you\'d like the workshop to address?')
      .setHelpText('Optional — e.g. a real deal, pitch, or negotiation you\'re currently working through.')
      .setRequired(false);

  form.addParagraphTextItem()
      .setTitle('Any additional comments or expectations from this workshop?')
      .setHelpText('Optional — anything else you\'d like the organizers to know.')
      .setRequired(false);

  // ---------- Footer ----------
  // Google Forms renders section help text in a muted gray, smaller font,
  // which is the closest native approximation to a "dimmed footer".
  // Note: Google Forms does not support custom CSS/animation, so the heart
  // cannot actually throb/pulse for respondents — it's a static glyph.
  form.addSectionHeaderItem()
      .setHelpText('Made with ♥ ~rhc · EE Lab, KLE-CTIE');

  form.setConfirmationMessage('Thank you for your response!\n\nMade with ♥ ~rhc · EE Lab, KLE-CTIE');

  Logger.log('Form created successfully.');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Live (shareable) URL: ' + form.getPublishedUrl());

  return {
    editUrl: form.getEditUrl(),
    publishedUrl: form.getPublishedUrl()
  };
}

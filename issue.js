const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');
const { mustBeSignedIn } = require('./auth.js');

async function getContact(_, { id }) {
  const db = getDb();
  
  const contact = await db.collection('contacts').findOne({ id });
  return contact;
}

const PAGE_SIZE = 10;

async function listContact(_, {
  activeStatus, contactFrequency, priority, familiarity, search, page
}) {
  // it accepts activeStatus as an optional filter param
  const db = getDb();
  const filter = {};
  // if activeStatus is passed in as query param, add it to the list of filters
  // Passed more possible filters
  if (activeStatus!==undefined) filter.activeStatus = activeStatus;
  if (contactFrequency!==undefined) filter.contactFrequency = contactFrequency;
  if (priority!==undefined) filter.priority = priority;
  if (familiarity!==undefined) filter.familiarity = familiarity;
  //console.log("filter: " + filter);

  if (search) filter.$text = { $search: search };

  const cursor = db.collection('contacts').find(filter)
  .sort({ name: 1})
  .skip(PAGE_SIZE * (page - 1))
  .limit(PAGE_SIZE);
  const totalCount = await cursor.count(false);
  const contacts = cursor.toArray();
  const pages = Math.ceil(totalCount / PAGE_SIZE);
  return { contacts, pages };
}

// Included phone validation
function validateContact(contact) {
  const errors = [];
  if (contact.name.length < 3) {
    errors.push('Field "name" must be at least 3 characters long.');
  }
  if (contact.email.length === 0 && contact.phone.length === 0
    && contact.LinkedIn.length === 0) {
    errors.push('At least one contact mean should be provided.');
  }
  if(contact.email.length > 0) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!contact.email.match(mailformat)) {
      errors.push('You have entered an invalid email address!');
    }
  }
  /*
  * TODO: I temporarily commented the phone number validation out as it introduced some error,
  * 1. Variable "$changes" got invalid value 1212341234 at "changes.phone"; Expected type String. String cannot represent a non string value: 1212341234
  * 2. Wouldn't let us edit the phone number in the database that's already in the format of 000-000-0000
  */
  // if(contact.phone.length > 0) {
  //   let phoneformat = /^\d{10}$/;
  //   if(!contact.phone.match(phoneformat)) {
  //     errors.push('Phone number should be 10 digits!');
  //   }
  // }
  if(contact.LinkedIn.length > 0) {
    if(!contact.LinkedIn.includes("linkedin.com/")) {
      errors.push('You have entered an invalid linkedin adress!');
    }
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

/* Helper function to generate all dates required
 * @param frequency : contactFrequency
 * @param baseDate: a Date object used as base to generate new date
 * @return : New Date() object
 */
function generateDates(frequency, baseDate) {
  let nextDate;
  switch(frequency) {
    case "Weekly":
      nextDate = new Date(baseDate.getTime() + 1000 * 60 * 60 * 24 * 7);
      break;
    case "Biweekly":
      nextDate = new Date(baseDate.getTime() + 1000 * 60 * 60 * 24 * 14);
      break;
    case "Monthly":
      nextDate = new Date(baseDate.getTime() + 1000 * 60 * 60 * 24 * 30);
      break;
    case "Quarterly":
      nextDate = new Date(baseDate.getTime() + 1000 * 60 * 60 * 24 * 91);
      break;
    case "Biannual":
      nextDate = new Date(baseDate.getTime() + 1000 * 60 * 60 * 24 * 182);
      break;
    case "Yearly":
      nextDate = new Date(baseDate.getTime() + 1000 * 60 * 60 * 24 * 365);
      break;
  }
  return nextDate;
}

/*
* DONE: Implmented a function to set the nextContactDate as a function of
* the activeStatus, contactFrequency, and the lastContactDate but it's more complicated that I thought.
* 1. If there's no change in the already active status, set next date based on the last date. DONE
* 2. If there's no change in the inactive status, don't do anything.
* 3. If the active status goes from inactive to active, set next date based on today's date. DONE
* 4. If the active status goes from active to inactive, don't do anything.
*/
function setNextContactDate(contact, turnedActive, manualDateChange, newActiveStatus) {
  // if there is no change in active status, set next date based on the last date.
  // DONE: Initialized lastDate variable as the lastContactDate.
  
  /* TODO: weird behaviors found.
  * ***FIXED: 1. when setting the contact "inactive" on the "edit" page, 
  * it sets the nextContactDate to null but the active status turns Inactive to Active again
  * ***FIXED: 2. when manually setting the nextContactDate, it doesn't take it and set it to a date
  * based on the contactFrequency and the lastContactDate. e.g. Agnesse Caigg, it sets to Fri Dec 20 2019
  * *** FIXED: 3. if there's a change in the contactFreq already in the active status, since it only sets it based on the last date,
  * it can set it on the past. e.g. Agnesse Caigg, it sets to Fri Mar 13 2020 if change the contactFreq to Quarterly.
  * *** FIXED: 4. PEDRO! ugh so I think you fixed the behavior where we had to submit "twice" to fully update a field,
  * it's happening again in a case where the user sets the date manually with a custom date, and change the contactFrequency
  * back to one of the weekly/monthly/etc options, it doesn't change the date automatically. dm me if you see this comment.
  */

  let nextDate;
  if (manualDateChange === false) { // DONE: needs a condition to check if the user's trying to set the nextContactDate manually.
    console.log("turnedActive: " + turnedActive);
    // already active contact, setting the next date based on the last date.
    if (contact.activeStatus === true && !turnedActive) {
      let lastDate = new Date(contact.lastContactDate);
      if (!contact.lastContactDate) { lastDate = new Date(); }
      // Generate the date using last contac Date
      nextDate = generateDates(contact.contactFrequency, lastDate);
      // If the new Date is in the past, set the base date as today and recalculate
      if(nextDate < new Date()) {
        nextDate = generateDates(contact.contactFrequency, new Date());
      }
      // switch(contact.contactFrequency) {
      //   case "Weekly":
      //     nextDate = new Date(lastDate.getTime() + 1000 * 60 * 60 * 24 * 7);
      //     break;
      //   case "Biweekly":
      //     nextDate = new Date(lastDate.getTime() + 1000 * 60 * 60 * 24 * 14);
      //     break;
      //   case "Monthly":
      //     nextDate = new Date(lastDate.getTime() + 1000 * 60 * 60 * 24 * 30);
      //     break;
      //   case "Quarterly":
      //     nextDate = new Date(lastDate.getTime() + 1000 * 60 * 60 * 24 * 91);
      //     break;
      //   case "Biannual":
      //     nextDate = new Date(lastDate.getTime() + 1000 * 60 * 60 * 24 * 182);
      //     break;
      //   case "Yearly":
      //     nextDate = new Date(lastDate.getTime() + 1000 * 60 * 60 * 24 * 365);
      //     break;
      //   case "None":
      //     // TODO: This doesn't allow a toggle button activation, a reverse of the noted weird behavior 1. above.
      //     newActiveStatus= false;
      //     break;
      // }
    } else if (turnedActive === true) {
    // when the user now turns on the active status, set the next date from today's date.
      console.log("now turned active, setting the next contact date based on today's date");
      // Call generate date using today as the base
      nextDate = generateDates(contact.contactFrequency, new Date());
      // switch(contact.contactFrequency) {
      //   case "Weekly":
      //     nextDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);
      //     break;
      //   case "Biweekly":
      //     nextDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 14);
      //     break;
      //   case "Monthly":
      //     nextDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30);
      //     break;
      //   case "Quarterly":
      //     nextDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 91);
      //     break;
      //   case "Biannual":
      //     nextDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 182);
      //     break;
      //   case "Yearly":
      //     nextDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);
      //     break;
      //   case "None":
      //     newActiveStatus= false;
      //     break;
      // }
    }
  } else {  // if manualDateChange is true, don't modify the contactNextDate
    nextDate = contact.nextContactDate;
  }
  console.log(nextDate);
  // newActiveStatus changes only if user selects "None" on contact frequency, otherwise
  // active status remains the same as what was passed in via turnedActive.
  // newActiveStatus = (newActiveStatus === false ? false: true)
  return {nextDate, newActiveStatus};
}

async function addContact(_, { contact }) {
  const db = getDb();
  // Added validation method for name and contact info (validate email)
  validateContact(contact);

  const newContact = Object.assign({}, contact);
  // Object.assign creates a copy to the source from the target
  newContact.id = await getNextSequence('contacts');

  const result = await db.collection('contacts').insertOne(newContact);
  const savedContact = await db.collection('contacts')
    .findOne({ _id: result.insertedId });
  return savedContact;
}

async function updateContact(_, { id, changes }) {
  const db = getDb();
  if (changes.contactFrequency || changes.email
      || changes.notes || changes.activeStatus || changes.name
      || changes.name || changes.company || changes.title ||changes.phone
      || changes.Linkedin || changes.priority || changes.familiarity
      || changes.contextSpace) {
    const contact = await db.collection('contacts').findOne({ id });
    /* DONE: checked if the active status changed from inactive to active,
     * then pass a boolean to setNextContactDate.
    */
    let current = contact.activeStatus;  // old status
    let news = changes.activeStatus;   // new status
    let activated = false;  // Bool variable to hold whether status activated
    if(current === false && news === true) {
      activated = true;
    }
    let manualDateChange = false;
    if (contact.nextContactDate !== null) {
      if (contact.nextContactDate.getTime() !== changes.nextContactDate.getTime()) {
        manualDateChange = true;
      }
    }
    if (contact.contactFrequency === "Custom" && changes.contactFrequency === "Custom") {
      // DONE: I need to make the custom date persist, cos it sets the custom date but goes away on a second submit.
      manualDateChange = true;
    }
    console.log("contact.nextContactDate: " + contact.nextContactDate);
    console.log("changes.nextContactDate: " + changes.nextContactDate);
    console.log("manualDateChange is: " + manualDateChange);
    Object.assign(contact, changes);

    const { nextDate, newActiveStatus } = setNextContactDate(contact, activated, manualDateChange, news);
    changes.nextContactDate = nextDate;
    changes.activeStatus = newActiveStatus;
    validateContact(contact);
  }
  await db.collection('contacts').updateOne({ id }, { $set: changes });
  const savedContact = await db.collection('contacts').findOne({ id });
  return savedContact;
}

async function removeContact(_, { id }) {
  const db = getDb();
  const issue = await db.collection('contacts').findOne({ id });
  if (!issue) return false;
  issue.deleted = new Date();

  let result = await db.collection('deleted_contacts').insertOne(issue);
  if (result.insertedId) {
    result = await db.collection('contacts').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

async function restoreContact(_, { id }) {
  const db = getDb();
  const issue = await db.collection('deleted_contacts').findOne({ id });
  if (!issue) return false;
  issue.deleted = new Date();

  let result = await db.collection('contacts').insertOne(issue);
  if (result.insertedId) {
    result = await db.collection('deleted_contacts').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

async function counts(_, { status, effortMin, effortMax }) {
  const db = getDb();
  const filter = {};

  if (status) filter.status = status;

  if (effortMin !== undefined || effortMax !== undefined) {
    filter.effort = {};
    if (effortMin !== undefined) filter.effort.$gte = effortMin;
    if (effortMax !== undefined) filter.effort.$lte = effortMax;
  }

  const results = await db.collection('issues').aggregate([
    { $match: filter },
    {
      $group: {
        _id: { owner: '$owner', status: '$status' },
        count: { $sum: 1 },
      },
    },
  ]).toArray();

  const stats = {};
  results.forEach((result) => {
    // eslint-disable-next-line no-underscore-dangle
    const { owner, status: statusKey } = result._id;
    if (!stats[owner]) stats[owner] = { owner };
    stats[owner][statusKey] = result.count;
  });
  return Object.values(stats);
}

module.exports = {
  // list,
  // add: mustBeSignedIn(add),
  // get,
  // update: mustBeSignedIn(update),
  // delete: mustBeSignedIn(remove),
  // restore: mustBeSignedIn(restore),
  // counts,

  listContact,
  addContact,
  getContact,
  updateContact,
  removeContact,
  restoreContact,
};

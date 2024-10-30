import {SQLiteDatabase} from "expo-sqlite";
import {PhoneContact} from "../../types/PhoneContact";
import {EmailContact} from "../../types/EmailContact";

export const findAllContacts = async (db: SQLiteDatabase) => {
    const findAllContactsRequest = "SELECT * FROM contacts";
    try {
        return await db.getAllAsync(findAllContactsRequest);
    } catch (e) {
        console.error(e);
    }
}

export const findContactById = async (db: SQLiteDatabase, contactId: number) => {
    const findContactByIdRequest = `SELECT * FROM contacts WHERE id = ${contactId}`;
    try {
        return await db.getAllAsync(findContactByIdRequest);
    } catch (e) {
        console.error(e);
    }
}

export const createContact = async (
    db: SQLiteDatabase,
    contact: any
) => {
    const { name } = contact;
    const phone = (contact as PhoneContact).phone !== undefined ? (contact as PhoneContact).phone : null;
    const email = (contact as EmailContact).email !== undefined ? (contact as EmailContact).email : null;
    const image = "https://via.placeholder.com/40";

    const escapedName = name ? `'${name.replace(/'/g, "''")}'` : "NULL";
    const escapedPhone = phone ? `'${phone.replace(/'/g, "''")}'` : "NULL";
    const escapedEmail = email ? `'${email.replace(/'/g, "''")}'` : "NULL";
    const escapedImage = `'${image}'`;

    console.log(`${escapedName}, ${escapedPhone}, ${escapedEmail}, ${escapedImage}`)

    const insertContactRequest =
        `INSERT INTO contacts (name, phone, email, image) VALUES (${escapedName}, ${escapedPhone}, ${escapedEmail}, ${escapedImage})`;
    try {
        await db.execAsync(insertContactRequest);
    } catch (e) {
        console.error('Error adding contact:', e);
    }
}

export const saveAllContacts = async (
    db: SQLiteDatabase,
    contacts: any[],
) => {
    await Promise.all(contacts.map(contact => createContact(db, contact)));
}

export const updateContact = async (
    db: SQLiteDatabase,
    contactId: number,
    contactData: { name?: string; phone?: string; email?: string; image?: string }
) => {
    const { name, phone, email, image } = contactData;

    const escapedName = name ? `'${name.replace(/'/g, "''")}'` : "NULL";
    const escapedPhone = phone ? `'${phone.replace(/'/g, "''")}'` : "NULL";
    const escapedEmail = email ? `'${email.replace(/'/g, "''")}'` : "NULL";
    const escapedImage = image ? `'${image.replace(/'/g, "''")}'` : "NULL";

    const updateFields = [];
    if (name !== undefined) updateFields.push(`name = ${escapedName}`);
    if (phone !== undefined) updateFields.push(`phone = ${escapedPhone}`);
    if (email !== undefined) updateFields.push(`email = ${escapedEmail}`);
    if (image !== undefined) updateFields.push(`image = ${escapedImage}`);

    const updateContactRequest = `UPDATE contacts SET ${updateFields.join(", ")} WHERE id = ${contactId}`;

    console.log(updateContactRequest)

    try {
        await db.execAsync(updateContactRequest);
        console.log(`Contact with id ${contactId} updated successfully`);
    } catch (e) {
        console.error('Error updating contact:', e);
    }
};

export const deleteContactById = async (db: SQLiteDatabase, contactId: number) => {
    try {
        await db.runAsync('DELETE FROM contacts WHERE id = ?', contactId);
        console.log(`Contact with id ${contactId} deleted successfully`);
    } catch (e) {
        console.error('Error deleting contact:', e);
    }
};

export const tryToCreateTables = async (db: SQLiteDatabase) => {
    await db.execAsync(
        "CREATE TABLE IF NOT EXISTS contacts (" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "name VARCHAR(100) NOT NULL, " +
            "phone VARCHAR(100), " +
            "email VARCHAR(100), " +
            "image VARCHAR(100) NOT NULL" +
        ")"
    );
}

export const dropTables = async (db: SQLiteDatabase) => {
    const dropTableQuery = `DROP TABLE IF EXISTS contacts;`;
    await db.execAsync(dropTableQuery);
};
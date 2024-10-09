"use server";

import getAuth from "@/auth";
import { sql } from "@vercel/postgres";
import { Resend } from "resend";

const auth = getAuth();

export async function SendEmail(email: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data } = await resend.emails.send({
    from: "Budget Me+ <info@budgetme.co.za>",
    to: ["valdez.pretorius@gmail.com"],
    subject: "Hello World",
    html: `<strong>Email: ${email}</strong>`,
  });

  return data;
}

export async function CreateAccount(
  accountName: string,
  accountType: string,
  startingBalance: number
) {
  const user = await auth.user();
  const now = new Date().toLocaleString();

  await sql`
        INSERT INTO accounts (name, email, dateCreated, balance, type)
        VALUES (${accountName}, ${user?.email}, ${now}, ${startingBalance}, ${accountType});
      `;
}

export async function GetAccounts() {
  const user = await auth.user();

  const { rows } = await sql`
        SELECT * FROM accounts WHERE email = ${user?.email};
      `;

  return rows;
}

export async function DeleteAccount(id: number) {
  await sql`
        DELETE FROM accounts WHERE id = ${id};
      `;
}

export async function CreateSetting(currency: string) {
  const user = await auth.user();

  const settings = await GetSettings();
  if (settings.length > 0) {
    await sql`
        UPDATE settings
        SET currency = ${currency}
        WHERE email = ${user?.email};
      `;
  } else {
    await sql`
        INSERT INTO settings (email, currency)
        VALUES (${user?.email}, ${currency});
      `;
  }
}

export async function GetSettings() {
  const user = await auth.user();

  const { rows } = await sql`
        SELECT * FROM settings WHERE email = ${user?.email} LIMIT 1;
      `;

  return rows;
}

export async function GetCategories() {
  const user = await auth.user();

  const { rows } = await sql`
        SELECT * FROM categories;
      `;

  return rows;
}

export async function CreateCustomCategory(customCategory: string) {
  const user = await auth.user();

  await sql`
        INSERT INTO customCategories (name, email)
        VALUES (${customCategory}, ${user?.email});
      `;
}

export async function GetCustomCategories() {
  const user = await auth.user();

  const { rows } = await sql`
        SELECT * FROM customCategories WHERE email = ${user?.email};
      `;

  return rows;
}

export async function DeleteCustomCategory(id: number) {
  await sql`
        DELETE FROM customCategories WHERE id = ${id};
      `;
}

export async function CreateIncomeSource(
  accountId: number,
  incomeSource: string,
  description: string,
  amount: number
) {
  const user = await auth.user();

  await sql`
        INSERT INTO income (accountid, incomeSource, description, amount, email)
        VALUES (${accountId}, ${incomeSource}, ${description}, ${amount}, ${user?.email});
      `;
}

export async function GetIncomeSources() {
  const user = await auth.user();

  const { rows } = await sql`
        SELECT * FROM income WHERE email = ${user?.email};
      `;

  return rows;
}

export async function DeleteIncomeSource(id: number) {
  await sql`
        DELETE FROM income WHERE id = ${id};
      `;
}

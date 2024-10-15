"use server";

import getAuth from "@/auth";
import { sql } from "@vercel/postgres";
import { Resend } from "resend";
import { InviteEmailTemplate } from "./emails/invite";

const auth = getAuth();

export async function SendEmail(email: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data } = await resend.emails.send({
    from: "Budget Me+ <info@budgetme.co.za>",
    to: [email],
    subject: "Your Account is Waiting",
    react: InviteEmailTemplate(email),
  });

  return data;
}

export async function GetSubscriptionPlans() {
  const apiURL = process.env.REFLOW_TEST_MODE
    ? "https://test-api.reflowhq.com/v2"
    : "https://api.reflowhq.com/v2";

  const requestUrl = `${apiURL}/projects/${process.env.REFLOW_PROJECT_ID}/plans/`;

  const response = await fetch(requestUrl, {
    cache: "reload",
  });

  return await (
    await response.json()
  ).data;
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

export async function GetCategories() {
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

  await sql`
        UPDATE accounts
        SET balance = balance + ${amount}
        WHERE id = ${accountId};
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

export async function CreateFamilyUser(email: string) {
  const user = await auth.user();

  await sql`
        INSERT INTO familyUsers (invitedEmail, primaryUserEmail)
        VALUES (${email}, ${user?.email});
      `;
}

export async function GetFamilyUsers() {
  const user = await auth.user();

  const { rows } = await sql`
        SELECT * FROM familyUsers WHERE primaryUserEmail = ${user?.email};
      `;

  return rows;
}

export async function ActivateFamilyUser() {
  const user = await auth.user();

  await sql`
        UPDATE familyUsers
        SET active = TRUE, pending = FALSE
        WHERE invitedEmail = ${user?.email}
        AND active = FALSE
        AND pending = TRUE;
      `;
}

export async function DeactivateFamilyUser(id: number) {
  await sql`
        UPDATE familyUsers
        SET active = FALSE, pending = FALSE
        WHERE id = ${id};
      `;
}

export async function IsFamilyUser() {
  const user = await auth.user();

  const { rows } = await sql`
        SELECT *
        FROM familyUsers
        WHERE invitedEmail = ${user?.email}
        AND active = TRUE
        AND pending = FALSE;
      `;

  return rows;
}

export async function CreateBudgetSource(
  accountId: number,
  incomeSource: string,
  description: string,
  amount: number,
  date: Date
) {
  const user = await auth.user();

  await sql`
        INSERT INTO budget (accountid, incomeSource, description, amount, email, date)
        VALUES (${accountId}, ${incomeSource}, ${description}, ${amount}, ${
    user?.email
  }, ${(date as Date).toLocaleString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
        );
      `;

  await sql`
        UPDATE accounts
        SET balance = balance - ${amount}
        WHERE id = ${accountId};
      `;
}

export async function GetBudgetSources() {
  const user = await auth.user();

  const { rows } = await sql`
        SELECT * FROM budget WHERE email = ${user?.email};
      `;

  return rows;
}

export async function DeleteBudgetSource(
  id: number,
  amount: number,
  accountId: number
) {
  console.log(id, amount, accountId);

  await sql`DELETE FROM budget WHERE id = ${id};`;

  await sql`
        UPDATE accounts
        SET balance = balance + ${amount}
        WHERE id = ${accountId};
      `;
}

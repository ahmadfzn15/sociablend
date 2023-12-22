import admin from "firebase-admin";
import { applicationDefault, initializeApp } from "firebase-admin/app";

export async function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }
  return initializeApp({
    credential: applicationDefault(),
    databaseURL: "https://socia-blend.firebaseio.com",
  });
}

export async function app() {
  return admin.auth();
}

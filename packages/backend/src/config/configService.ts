import * as dotenv from "dotenv";

dotenv.config();

export enum ConfigKeys {
  PORT = "PORT",
  NODE_ENV = "NODE_ENV",
  FIREBASE_SERVICE_ACCOUNT = "FIREBASE_SERVICE_ACCOUNT",
  FIREBASE_DATABASE_URL = "FIREBASE_DATABASE_URL",
}

class ConfigService {
  private getEnvVar(key: ConfigKeys, required: boolean = true): string {
    const value = process.env[key];
    if (required && !value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return value || "";
  }

  get nodeEnv(): string {
    return this.getEnvVar(ConfigKeys.NODE_ENV, false);
  }

  get port(): number {
    return parseInt(this.getEnvVar(ConfigKeys.PORT, false)) || 3000;
  }

  get firebaseConfig() {
    const serviceAccount = this.getEnvVar(ConfigKeys.FIREBASE_SERVICE_ACCOUNT);
    const databaseUrl = this.getEnvVar(ConfigKeys.FIREBASE_DATABASE_URL, false);

    if (!serviceAccount) {
      throw new Error("Firebase service account is required");
    }

    try {
      return {
        credential: JSON.parse(serviceAccount),
        databaseUrl,
      };
    } catch (error) {
      throw new Error("Invalid Firebase service account JSON");
    }
  }
}

export const configService = new ConfigService();

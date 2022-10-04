import * as bcrypt from 'bcryptjs';

export default class BcryptHelper {
  private static saltRounds = 10;

  public static encrypt(text: string): string {
    return bcrypt.hashSync(text, this.saltRounds);
  }

  public static compare(planText: string, encryptText: string): boolean {
    return bcrypt.compareSync(planText, encryptText);
  }
}

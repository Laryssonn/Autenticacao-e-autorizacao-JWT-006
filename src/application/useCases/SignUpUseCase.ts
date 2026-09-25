import { hash } from 'bcryptjs';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { prismaClient } from '../libs/prismaClient';

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpCase {
  async execute({ email, name, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: {
        email: email,
      },
    });

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, 10);

    await prismaClient.account.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}

import { z, ZodError } from 'zod';
import { IController, IRequest, IResponse } from '../interfaces/IController';
import { SignUpCase } from '../useCases/SignUpUseCase';

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

export class SignUpController implements IController {
  constructor(private readonly signupUseCase: SignUpCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, email, password } = schema.parse(body);
      await this.signupUseCase.execute({ name, email, password });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      throw error;
    }
  }
}

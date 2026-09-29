import { SignUpController } from '../application/controllers/SignUpController';
import { makeSignUpUseCase } from './makeSignUpUsecase';

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase();

  return new SignUpController(signUpUseCase);
}

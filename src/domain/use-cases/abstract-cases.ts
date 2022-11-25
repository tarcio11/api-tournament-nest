export abstract class ListUserAccountUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class AddUserAccountUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class CreateChallengeUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class UserAuthenticationUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class ListUserAccountUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class AddUserAccountUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class CreateChallengeUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class UpdateChallengeUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class UserAuthenticationUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class ShowProfileUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class CreateMatchUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class FindOneChallengeUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class CreateRankingUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class ShowRankingUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class RegisterUserOnRankingUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class FindByIdUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

export abstract class UploadUserAvatarUseCaseAbstract<Input = any, Output = any> {
  abstract handle: (input: Input) => Promise<Output>;
}

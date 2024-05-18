export class EntityNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EntityNotFound";
  }
}

export class EntityAlreadyExists extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EntityAlreadyExists";
  }
}

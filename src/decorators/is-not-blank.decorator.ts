import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotBlank(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: "This field can't be an empty string",
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          if(typeof value !== 'string') return false;
          const valueTrim = value.replace(/ /g, '');
          if(valueTrim === '') return false;
          return true;
        },
      },
    });
  };
}
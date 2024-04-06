import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
  beforeEach(async () => {});

  it('should be defined', () => {
    const calculator = {
      add: (a, b) => a + b,
    };

    const spyFn = jest.spyOn(calculator, 'add');

    const result = calculator.add(2, 3);

    expect(spyFn).toHaveBeenCalledTimes(1);
    expect(spyFn).toHaveBeenCalledWith(2, 3);
    expect(result).toBe(5);
  });
});

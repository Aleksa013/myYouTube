import { LenghtLessPipe } from './lenght-less.pipe';

describe('LenghtLess50Pipe', () => {
  it('create an instance', () => {
    const pipe = new LenghtLessPipe();
    expect(pipe).toBeTruthy();
  });
});

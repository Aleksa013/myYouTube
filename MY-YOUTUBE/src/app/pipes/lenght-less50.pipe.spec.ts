import { LenghtLess50Pipe } from './lenght-less50.pipe';

describe('LenghtLess50Pipe', () => {
  it('create an instance', () => {
    const pipe = new LenghtLess50Pipe();
    expect(pipe).toBeTruthy();
  });
});

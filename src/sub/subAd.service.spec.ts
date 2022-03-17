import { LocalDate } from 'js-joda';

describe('js-joda', () => {
  it('js-joda', () => {
    const now = LocalDate.now();
    const after = now.plusDays(1);
    const before = now.minusDays(1);

    console.log(`now=${now}, after=${after}, before=${before}`);
    expect(now.isBefore(after)).toBeTruthy();
    expect(now.isEqual(after)).toBeFalsy();
    expect(now.isAfter(before)).toBeTruthy();
  });
});

describe('time', () => {
  it('timem', () => {
    const date_now = Date.now();
    const date_after = date_now + 1;
    const date_before = date_now - 1;

    const nn = new Date(date_now);

    console.log(
      `date_now=${date_now}, date_after=${date_after}, date+_before${date_before}, nn=${nn}`,
    );
    expect(date_now);
  });
});

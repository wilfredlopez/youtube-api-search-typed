import { config } from 'dotenv';
import youtubeSearch from './index';

config();

const { API_KEY } = process.env;

describe('YoutubeSearchTyped', () => {
  it('Returns error if required parameters are not passed in', () => youtubeSearch({
    key: API_KEY,
    term: 'Carne',
    part: 'snippet',
  } as any).catch((error) => {
    expect(error).toEqual(new Error('Please make sure that the required fields are inserted'));
  }));

  it('Return correct data when arguments are correct', () => youtubeSearch({
    key: API_KEY,
    term: 'Carne',
    part: 'snippet',
    type: 'video',
  })
    .then((data) => {
      console.log(data, 'receiped Data');
      // expect(data).toEqual(expect.anything());
      if (data === null) {
        expect(data).toBeNull();
      } else {
        expect(data).toEqual(expect.anything());
        expect(data).toBeInstanceOf(Array);
      }
    })
    .catch((error) => {
      console.log(error);
      expect(error).toBeNull();
    }));
});

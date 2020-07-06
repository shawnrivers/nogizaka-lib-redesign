import { Members } from 'server/actors/Members';
import { membersRawArray } from 'server/actors/Members/raw';
import { Songs } from 'server/actors/Songs';
import { SongTitle } from 'server/actors/Songs/constants/songTitle';
import { SongType } from 'server/actors/Songs/constants/songType';
import { songsRawArray } from 'server/actors/Songs/raw';
import {
  convertCdArtwork,
  convertCdSongType,
  convertCdSongFocusPerformers,
} from 'server/actors/Discography/converters';

const songsRawObject = new Songs(songsRawArray).rawObject;
const membersRawObject = new Members(membersRawArray).rawObject;

describe('convertCdArtwork', () => {
  test('should return correspond image path when image exists in the file system', () => {
    expect(
      convertCdArtwork({
        cdHasArtworks: true,
        cdNumber: '25',
        cdArtworkType: 'A',
        cdKind: 'single',
      })
    ).toEqual('artworks/singles/25/A.jpg');
    expect(
      convertCdArtwork({
        cdHasArtworks: true,
        cdNumber: '4',
        cdArtworkType: 'A',
        cdKind: 'album',
      })
    ).toEqual('artworks/albums/4/A.jpg');
    expect(
      convertCdArtwork({
        cdHasArtworks: true,
        cdNumber: '1',
        cdArtworkType: 'T',
        cdKind: 'other',
      })
    ).toEqual('artworks/others/1/T.jpg');
  });

  test('should return no artwork image path when cdHasArtworks flag is false', () => {
    expect(
      convertCdArtwork({
        cdHasArtworks: false,
        cdNumber: '100',
        cdArtworkType: 'A',
        cdKind: 'single',
      })
    ).toEqual('artworks/artwork_no_image.png');
    expect(
      convertCdArtwork({
        cdHasArtworks: false,
        cdNumber: '25',
        cdArtworkType: 'A',
        cdKind: 'single',
      })
    ).toEqual('artworks/artwork_no_image.png');
  });

  test("should return no artwork image path when image doesn't exist in the file system", () => {
    expect(
      convertCdArtwork({
        cdHasArtworks: true,
        cdNumber: '100',
        cdArtworkType: 'A',
        cdKind: 'single',
      })
    ).toEqual('artworks/artwork_no_image.png');
  });
});

describe('convertCdSongType', () => {
  test("should return 'coupling' when cd song title is 'OVERTURE'", () => {
    expect(
      convertCdSongType({
        cdSongTitle: SongTitle.Overture,
        songsRawObject,
      })
    ).toEqual(SongType.Coupling);
  });

  test("should return 'coupling' when cd song type is 'selected'", () => {
    expect(
      convertCdSongType({
        cdSongTitle: songsRawObject['月の大きさ'].title,
        songsRawObject,
      })
    ).toEqual(SongType.Coupling);
  });

  test('except for the above cases, should return the exact cd song type', () => {
    expect(
      convertCdSongType({
        cdSongTitle: songsRawObject['ありがちな恋愛'].title,
        songsRawObject,
      })
    ).toEqual(songsRawObject['ありがちな恋愛'].type);

    expect(
      convertCdSongType({
        cdSongTitle: songsRawObject['しあわせの保護色'].title,
        songsRawObject,
      })
    ).toEqual(songsRawObject['しあわせの保護色'].type);
  });
});

describe('convertCdSongFocusPerformers', () => {
  test("should return empty when the song title is 'OVERTURE'", () => {
    expect(
      convertCdSongFocusPerformers({
        cdSongTitle: SongTitle.Overture,
        songsRawObject,
        membersRawObject,
      })
    ).toEqual({
      type: '',
      name: [],
    });
  });

  test('should return member name when it is a solo song', () => {
    expect(
      convertCdSongFocusPerformers({
        cdSongTitle: songsRawObject['じゃあね。'].title,
        songsRawObject,
        membersRawObject,
      })
    ).toEqual({
      type: 'solo',
      name: ['白石麻衣'],
    });
  });

  test('should return unit name when it is a unit song and the unit has a name', () => {
    expect(
      convertCdSongFocusPerformers({
        cdSongTitle: songsRawObject['白米様'].title,
        songsRawObject,
        membersRawObject,
      })
    ).toEqual({
      type: 'unit',
      name: ['さゆりんご軍団'],
    });
  });

  test("should return all centers' names or performers' names when it is a unit song and the unit doesn't have a name", () => {
    expect(
      convertCdSongFocusPerformers({
        cdSongTitle: songsRawObject['ここじゃないどこか'].title,
        songsRawObject,
        membersRawObject,
      })
    ).toEqual({
      type: 'unit',
      name: ['生田絵梨花', '生駒里奈', '星野みなみ'],
    });

    expect(
      convertCdSongFocusPerformers({
        cdSongTitle: songsRawObject['せっかちなかたつむり'].title,
        songsRawObject,
        membersRawObject,
      })
    ).toEqual({
      type: 'center',
      name: ['松村沙友理'],
    });
  });

  test("should return centers' names when it has centers", () => {
    expect(
      convertCdSongFocusPerformers({
        cdSongTitle: songsRawObject['インフルエンサー'].title,
        songsRawObject,
        membersRawObject,
      })
    ).toEqual({
      type: 'center',
      name: ['西野七瀬', '白石麻衣'],
    });

    expect(
      convertCdSongFocusPerformers({
        cdSongTitle: songsRawObject['裸足でSummer'].title,
        songsRawObject,
        membersRawObject,
      })
    ).toEqual({
      type: 'center',
      name: ['齋藤飛鳥'],
    });

    expect(
      convertCdSongFocusPerformers({
        cdSongTitle: songsRawObject['三番目の風'].title,
        songsRawObject,
        membersRawObject,
      })
    ).toEqual({
      type: 'center',
      name: ['大園桃子'],
    });
  });
});

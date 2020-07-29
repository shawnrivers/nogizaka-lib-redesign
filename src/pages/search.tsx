import * as React from 'react';
import { injectIntl } from 'react-intl';
import { Search, SearchResult } from 'client/features/Search/template';
import { useScrollRestoration } from 'client/hooks/useScrollRestoration';
import { toCdNumber } from 'utils/strings';
import { getAlbumUrl, getMemberUrl, getSongUrl } from 'client/utils/urls';
import { MemberResult } from 'server/actors/Members/models';
import { DiscographyResult } from 'server/actors/Discography/models';
import { SongResult } from 'server/actors/Songs/models';

export type MemberDoc = {
  key: MemberResult['name'];
  nameNotations: MemberResult['nameNotations'];
  profileImage: MemberResult['profileImage'];
};

export type CdDoc = {
  title: DiscographyResult['title'];
  key: DiscographyResult['key'];
  number: DiscographyResult['number'];
  artwork: DiscographyResult['artworks'][0];
  cdType: DiscographyResult['type'];
};

export type SongDoc = {
  title: SongResult['title'];
  key: SongResult['key'];
  artwork: SongResult['artwork'];
  songType: SongResult['type'];
  single: SongResult['single'];
  album: SongResult['albums'][0] | undefined;
};

export type SearchDoc = (
  | (CdDoc & {
      type: 'cds';
    })
  | (SongDoc & {
      type: 'songs';
    })
  | (MemberDoc & {
      type: 'members';
    })
) & {
  id: string;
  name: string;
};

let timeout: NodeJS.Timeout;

export const SearchPageContainer = injectIntl(({ intl }: { intl: any }) => {
  useScrollRestoration();

  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchDoc[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const lunr = React.useMemo(
    () => (typeof window !== 'undefined' ? (window as any).__LUNR__.ja : null),
    []
  );

  const search = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const inputQuery = event.currentTarget.value;
      setQuery(inputQuery);

      setIsSearching(true);

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const searchResult =
          inputQuery !== ''
            ? lunr.index
                .search(`name:*${inputQuery}*`, { extend: true })
                .map(({ ref }: any) => lunr.store[ref])
            : [];

        setResults(searchResult);

        setIsSearching(false);
      }, 300);
    },
    [lunr]
  );

  const convertedResults = React.useMemo(() => {
    let members: SearchResult[] = [];
    let cds: SearchResult[] = [];
    let albums: SearchResult[] = [];
    let songs: SearchResult[] = [];

    for (const result of results) {
      if (result.type === 'members') {
        members.push({
          to: getMemberUrl(result.key),
          imgSrc: result.profileImage,
          heading: `${result.nameNotations.lastName} ${result.nameNotations.firstName}`,
          caption: `${result.nameNotations.lastNameEn} ${result.nameNotations.firstNameEn}`,
        });
      }

      if (result.type === 'cds') {
        cds.push({
          to: getAlbumUrl(result.key),
          imgSrc: result.artwork.url,
          heading: result.title,
          caption: `${toCdNumber(result.number)} ${result.cdType}`,
        });
      }

      if (result.type === 'songs') {
        let secondCaption = '';

        if (result.single.number !== '') {
          secondCaption = `#${toCdNumber(result.single.number)} single`;
        } else {
          if (result.album !== undefined) {
            secondCaption = `#${toCdNumber(result.album.number)} album`;
          }
        }

        songs.push({
          to: getSongUrl(result.key),
          imgSrc: result.artwork,
          heading: result.title,
          caption: `#${intl.formatMessage({
            id: result.songType,
          })}`,
          secondCaption,
        });
      }
    }

    return { members, cds, albums, songs };
  }, [results, intl]);

  return (
    <Search
      query={query}
      search={search}
      results={convertedResults}
      isSearching={isSearching}
    />
  );
});

export default SearchPageContainer;

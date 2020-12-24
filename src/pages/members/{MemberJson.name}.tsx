import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import * as React from 'react';
import { MemberPage } from 'client/features/Member';
import { MemberPageData } from 'server/pages/member';

export const query = graphql`
  query($name: String!) {
    memberJson(name: { eq: $name }) {
      nameNotations {
        firstName
        firstNameEn
        firstNameFurigana
        lastName
        lastNameEn
        lastNameFurigana
      }
      profileImages {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      join
      graduation {
        isGraduated
      }
      birthday
      height
      bloodType
      origin
      units
      corps
      glowStickColor {
        left
        right
      }
      sites {
        title
        url
      }
      photoAlbums {
        cover {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        release
        sites {
          title
          url
        }
        title
        type
      }
      positionsHistory {
        position
        singleNumber
      }
      positionsCounter {
        center
        fukujin
        selected
        under
      }
    }
  }
`;

type MemberPageDataNode = {
  nameNotations: MemberPageData[0]['nameNotations'];
  profileImages: {
    childImageSharp: {
      fluid: FluidObject;
    };
  }[];
  join: MemberPageData[0]['join'];
  graduation: {
    isGraduated: MemberPageData[0]['graduation']['isGraduated'];
  };
  birthday: MemberPageData[0]['birthday'];
  height: MemberPageData[0]['height'];
  bloodType: MemberPageData[0]['bloodType'];
  origin: MemberPageData[0]['origin'];
  units: MemberPageData[0]['units'];
  corps: MemberPageData[0]['corps'];
  glowStickColor: MemberPageData[0]['glowStickColor'];
  sites: MemberPageData[0]['sites'];
  photoAlbums: (Omit<MemberPageData[0]['photoAlbums'][0], 'cover'> & {
    cover: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  })[];
  positionsHistory: MemberPageData[0]['positionsHistory'];
  positionsCounter: MemberPageData[0]['positionsCounter'];
};

export type MemberPageProps = Omit<
  MemberPageDataNode,
  'profileImages' | 'photoAlbums'
> & {
  profileImageFluid: FluidObject;
  galleryFluids: FluidObject[];
  photoAlbums: (Omit<MemberPageDataNode['photoAlbums'][0], 'cover'> & {
    coverFluid: FluidObject;
  })[];
  shouldShowPositionCounter: boolean;
};

const MemberPageContainer: React.FC<{
  data: {
    memberJson: MemberPageDataNode;
  };
}> = props => {
  const memberData = props.data.memberJson;

  const photoBooks = React.useMemo(
    () =>
      memberData.photoAlbums.map(photoAlbum => ({
        ...photoAlbum,
        coverFluid: photoAlbum.cover.childImageSharp.fluid,
      })),
    [memberData.photoAlbums]
  );

  const positionsHistory = React.useMemo(
    () =>
      memberData.positionsHistory
        .slice()
        .reverse()
        .filter(history => history.position !== 'none'),
    [memberData.positionsHistory]
  );

  const shouldShowPositionCounter = React.useMemo(
    () =>
      memberData.positionsCounter.center +
        memberData.positionsCounter.fukujin +
        memberData.positionsCounter.selected +
        memberData.positionsCounter.under >
      0,
    [memberData.positionsCounter]
  );

  const gallery = React.useMemo(() => {
    return memberData.profileImages.map(photo => photo.childImageSharp.fluid);
  }, [memberData.profileImages]);

  return memberData ? (
    <MemberPage
      nameNotations={memberData.nameNotations}
      galleryFluids={gallery}
      profileImageFluid={gallery[0]}
      glowStickColor={memberData.glowStickColor}
      sites={memberData.sites}
      join={memberData.join}
      graduation={memberData.graduation}
      birthday={memberData.birthday}
      height={memberData.height}
      bloodType={memberData.bloodType}
      origin={memberData.origin}
      units={memberData.units}
      corps={memberData.corps}
      photoAlbums={photoBooks}
      shouldShowPositionCounter={shouldShowPositionCounter}
      positionsHistory={positionsHistory}
      positionsCounter={memberData.positionsCounter}
    />
  ) : null;
};

export default MemberPageContainer;
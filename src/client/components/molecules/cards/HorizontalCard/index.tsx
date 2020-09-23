/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import * as React from 'react';
import { Card, CardProps } from 'client/components/atoms/Card';
import { commonStyles } from 'client/styles/tokens';
import { GridImage } from 'client/components/atoms/images/GirdImage';
import { Hashtag } from 'client/components/atoms/Hashtag';
import {
  Typography,
  TypographyProps,
} from 'client/components/atoms/Typography';

type HorizontalCardProps = Omit<CardProps, 'children'> & {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  titleElement?: TypographyProps['element'];
  tags: string[];
  capitalizeTitle?: boolean;
};

export const HorizontalCard: React.FC<HorizontalCardProps> = props => {
  const {
    capitalizeTitle = false,
    image,
    title,
    titleElement = 'p',
    tags,
    ...cardProps
  } = props;

  return (
    <Card borderRadius="s" padding="xxs" to={props.to} {...cardProps}>
      <article
        css={css`
          display: grid;
          grid-template-columns: 90px auto;
          grid-template-rows: auto;
          grid-gap: ${commonStyles.spacing.m};
          padding: ${commonStyles.spacing.xs};
          overflow: hidden;
        `}
      >
        <GridImage src={image.src} alt={image.alt} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            flex-wrap: nowrap;
            overflow: hidden;
          `}
        >
          <Typography
            variant="body2"
            element={titleElement}
            bold
            ellipsis
            css={css`
              text-transform: ${capitalizeTitle ? 'capitalize' : 'initial'};
            `}
          >
            {title}
          </Typography>
          {tags.length > 0 && (
            <div
              css={css`
                display: flex;
                flex-wrap: nowrap;
                overflow-x: auto;

                &::-webkit-scrollbar {
                  display: none;
                }
              `}
            >
              {tags.map(tag => (
                <Hashtag
                  key={tag}
                  textColor={{
                    on: 'onSurface',
                    variant: 'variant0',
                  }}
                  css={css`
                    margin-right: 0.3em;
                  `}
                >
                  {tag}
                </Hashtag>
              ))}
            </div>
          )}
        </div>
      </article>
    </Card>
  );
};

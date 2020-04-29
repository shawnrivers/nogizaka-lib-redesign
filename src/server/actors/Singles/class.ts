import {
  SinglesRawArray,
  SinglesRawObj,
  SinglesResultArray,
  SingleResult,
  SingleRaw,
} from "server/actors/Singles/models";
import { arrayToObject } from "client/utils/arrays";
import { rawSingles } from "server/editor/singles";
import * as CdConverters from "server/actors/Cds/converters";

export class Singles {
  private rawDataArray: SinglesRawArray;
  private rawDataObj: SinglesRawObj;
  private resultData: SinglesResultArray;

  public constructor() {
    this.rawDataArray = rawSingles;
    this.rawDataObj = arrayToObject(rawSingles, "title");
    this.resultData = [];
  }

  public get rawArray(): SinglesRawArray {
    return this.rawDataArray;
  }

  public get rawObject(): SinglesRawObj {
    return this.rawDataObj;
  }

  public get result(): SinglesResultArray {
    return this.resultData;
  }

  public convertSingles({
    songsRawObj,
    membersRawObj,
  }: {
    songsRawObj: { [key: string]: any };
    membersRawObj: { [key: string]: any };
  }): SinglesResultArray {
    let singlesResult: SinglesResultArray = [];

    for (const singleRaw of this.rawDataArray) {
      singlesResult.push(
        this.convertSingle({ singleRaw, songsRawObj, membersRawObj })
      );
    }

    this.resultData = singlesResult;
    return singlesResult;
  }

  private convertSingle({
    singleRaw,
    songsRawObj,
    membersRawObj,
  }: {
    singleRaw: SingleRaw;
    songsRawObj: { [key: string]: any };
    membersRawObj: { [key: string]: any };
  }): SingleResult {
    return {
      title: singleRaw.title,
      number: singleRaw.number,
      release: singleRaw.release,
      shopping: singleRaw.shopping,
      artworks: CdConverters.convertCdArtworks({
        cdArtworkTypes: singleRaw.artworkTypes,
        cdHasArtworks: singleRaw.hasArtworks,
        cdNumber: singleRaw.number,
        cdKind: "single",
      }),
      songs: CdConverters.convertCdSongs({
        cdSongsRaw: singleRaw.songs,
        songsRawObj,
        membersRawObj,
      }),
      underMembers: singleRaw.underMembers,
      behindPerformers: singleRaw.behindPerformers,
    };
  }
}

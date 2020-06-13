import { MemberNameKey } from "server/actors/Members/constants/memberNames";
import { SongRaw } from "server/actors/Songs/models";
import { createSongRaw } from "server/actors/Songs/raw/creator";
import { FukujinType, SongType } from "server/constants/commons";
import { SONGS } from "server/actors/Songs/constants/songTitles";

export const FIRST_SINGLE_SONGS: SongRaw[] = [
  createSongRaw({
    title: SONGS["ぐるぐるカーテン"].title,
    type: SongType.Title,
    creators: {
      lyrics: ["秋元康"],
      compose: ["黒須克彦"],
      arrange: ["湯浅篤"],
      direct: ["操上和美"],
    },
    center: [MemberNameKey.IkomaRina],
    fukujin: FukujinType.RowOneTwo,
    formations: {
      firstRow: [
        MemberNameKey.IkutaErika,
        MemberNameKey.IkomaRina,
        MemberNameKey.HoshinoMinami,
      ],
      secondRow: [
        MemberNameKey.HashimotoNanami,
        MemberNameKey.MatsumuraSayuri,
        MemberNameKey.ShiraishiMai,
        MemberNameKey.TakayamaKazumi,
      ],
      thirdRow: [
        MemberNameKey.KawamuraMahiro,
        MemberNameKey.NoujouAmi,
        MemberNameKey.NishinoNanase,
        MemberNameKey.SaitouAsuka,
        MemberNameKey.SaitouYuuri,
        MemberNameKey.SakuraiReika,
        MemberNameKey.InoueSayuri,
        MemberNameKey.NakadaKana,
        MemberNameKey.IchikiRena,
      ],
    },
  }),
  createSongRaw({
    title: SONGS["左胸の勇気"].title,
    type: SongType.Under,
    creators: {
      lyrics: ["秋元康"],
      compose: ["小内喜文"],
      arrange: ["佐々木裕"],
    },
    center: [MemberNameKey.HatanakaSeira],
    formations: {
      firstRow: [
        MemberNameKey.AndouMikumo,
        MemberNameKey.IwaseYumiko,
        MemberNameKey.ItouNene,
        MemberNameKey.HatanakaSeira,
        MemberNameKey.ItouMarika,
        MemberNameKey.WadaMaaya,
        MemberNameKey.NakamotoHimeka,
      ],
      secondRow: [
        MemberNameKey.SaitouChiharu,
        MemberNameKey.YamatoRina,
        MemberNameKey.NagashimaSeira,
        MemberNameKey.HiguchiHina,
        MemberNameKey.KawagoHina,
        MemberNameKey.WakatsukiYumi,
        MemberNameKey.KashiwaYukina,
        MemberNameKey.EtouMisa,
        MemberNameKey.FukagawaMai,
        MemberNameKey.MiyazawaSeira,
      ],
    },
  }),
  createSongRaw({
    title: SONGS["乃木坂の詩"].title,
    type: SongType.Coupling,
    creators: {
      lyrics: ["秋元康"],
      compose: ["井手コウジ"],
      arrange: ["井手コウジ"],
      direct: ["南流石"],
    },
    center: [MemberNameKey.IkomaRina],
    formations: {
      firstRow: [
        MemberNameKey.AndouMikumo,
        MemberNameKey.IkutaErika,
        MemberNameKey.IkomaRina,
        MemberNameKey.IchikiRena,
        MemberNameKey.ItouNene,
        MemberNameKey.ItouMarika,
        MemberNameKey.InoueSayuri,
        MemberNameKey.IwaseYumiko,
        MemberNameKey.EtouMisa,
        MemberNameKey.KashiwaYukina,
        MemberNameKey.KawagoHina,
        MemberNameKey.KawamuraMahiro,
        MemberNameKey.SaitouAsuka,
        MemberNameKey.SaitouChiharu,
        MemberNameKey.SaitouYuuri,
        MemberNameKey.SakuraiReika,
        MemberNameKey.ShiraishiMai,
        MemberNameKey.TakayamaKazumi,
        MemberNameKey.NagashimaSeira,
        MemberNameKey.NakadaKana,
        MemberNameKey.NakamotoHimeka,
        MemberNameKey.NishinoNanase,
        MemberNameKey.NoujouAmi,
        MemberNameKey.HashimotoNanami,
        MemberNameKey.HatanakaSeira,
        MemberNameKey.HiguchiHina,
        MemberNameKey.FukagawaMai,
        MemberNameKey.HoshinoMinami,
        MemberNameKey.MatsumuraSayuri,
        MemberNameKey.MiyazawaSeira,
        MemberNameKey.YamatoRina,
        MemberNameKey.WakatsukiYumi,
        MemberNameKey.WadaMaaya,
      ],
    },
  }),
  createSongRaw({
    title: SONGS["会いたかったかもしれない"].title,
    type: SongType.Coupling,
    creators: {
      lyrics: ["秋元康"],
      compose: ["BOUNCEBACK", "MIKOTO"],
      arrange: ["野中雄一"],
      direct: ["久保茂昭"],
    },
    center: [MemberNameKey.IkomaRina],
    formations: {
      firstRow: [
        MemberNameKey.IkutaErika,
        MemberNameKey.IkomaRina,
        MemberNameKey.IchikiRena,
        MemberNameKey.ItouNene,
        MemberNameKey.ItouMarika,
        MemberNameKey.InoueSayuri,
        MemberNameKey.EtouMisa,
        MemberNameKey.KawamuraMahiro,
        MemberNameKey.SaitouAsuka,
        MemberNameKey.SaitouYuuri,
        MemberNameKey.SakuraiReika,
        MemberNameKey.ShiraishiMai,
        MemberNameKey.TakayamaKazumi,
        MemberNameKey.NakadaKana,
        MemberNameKey.NishinoNanase,
        MemberNameKey.NoujouAmi,
        MemberNameKey.HashimotoNanami,
        MemberNameKey.HoshinoMinami,
        MemberNameKey.MatsumuraSayuri,
        MemberNameKey.MiyazawaSeira,
      ],
    },
  }),
  createSongRaw({
    title: SONGS["失いたくないから"].title,
    type: SongType.Coupling,
    creators: {
      lyrics: ["秋元康"],
      compose: ["蛯原ランス"],
      arrange: ["塩川満己"],
      direct: ["丸山健志"],
    },
    center: [MemberNameKey.IkomaRina, MemberNameKey.IkutaErika],
    formations: {
      firstRow: [
        MemberNameKey.IkutaErika,
        MemberNameKey.IkomaRina,
        MemberNameKey.IchikiRena,
        MemberNameKey.InoueSayuri,
        MemberNameKey.KawamuraMahiro,
        MemberNameKey.SaitouAsuka,
        MemberNameKey.SaitouYuuri,
        MemberNameKey.SakuraiReika,
        MemberNameKey.ShiraishiMai,
        MemberNameKey.TakayamaKazumi,
        MemberNameKey.NakadaKana,
        MemberNameKey.NagashimaSeira,
        MemberNameKey.NakamotoHimeka,
        MemberNameKey.NishinoNanase,
        MemberNameKey.NoujouAmi,
        MemberNameKey.HashimotoNanami,
        MemberNameKey.HatanakaSeira,
        MemberNameKey.FukagawaMai,
        MemberNameKey.HoshinoMinami,
        MemberNameKey.MatsumuraSayuri,
      ],
    },
  }),
  createSongRaw({
    title: SONGS["白い雲にのって"].title,
    type: SongType.Coupling,
    creators: {
      lyrics: ["秋元康"],
      compose: ["太田美知彦"],
      arrange: ["太田美知彦"],
    },
    center: [MemberNameKey.IkomaRina],
    formations: {
      firstRow: [
        MemberNameKey.AndouMikumo,
        MemberNameKey.IkutaErika,
        MemberNameKey.IkomaRina,
        MemberNameKey.IchikiRena,
        MemberNameKey.InoueSayuri,
        MemberNameKey.IwaseYumiko,
        MemberNameKey.KawagoHina,
        MemberNameKey.KawamuraMahiro,
        MemberNameKey.SaitouAsuka,
        MemberNameKey.SaitouChiharu,
        MemberNameKey.SaitouYuuri,
        MemberNameKey.SakuraiReika,
        MemberNameKey.ShiraishiMai,
        MemberNameKey.TakayamaKazumi,
        MemberNameKey.NakadaKana,
        MemberNameKey.NishinoNanase,
        MemberNameKey.NoujouAmi,
        MemberNameKey.HashimotoNanami,
        MemberNameKey.HoshinoMinami,
        MemberNameKey.MatsumuraSayuri,
      ],
    },
  }),
];

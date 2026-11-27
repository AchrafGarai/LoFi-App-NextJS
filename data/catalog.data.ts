// Recovered from the 2022 deployment after its Heroku backend was shut down.
// Media is hosted on Cloudinary.

import type { CatalogArtist, CatalogPlaylist } from './types'

export const playlists: CatalogPlaylist[] = [
  {
    slug: "popular-lofi-mix",
    legacyId: "d5484bc3-f498-457f-9281-003f03e1fff9",
    title: "Popular songs - lofi hip hop mix 🔥",
    imageUrl: "https://res.cloudinary.com/dehs50yqa/image/upload/v1650561583/2_tmgz9r.jpg",
    tracks: [
      { id: "763c9ece-cd7d-478d-97d6-6960bd351729", title: "Rumors🔥", artist: "NEFFEX", url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561996/Songs/NEFFEX_-_Rumors_l49wis.mp3" },
      { id: "6d4e0411-bef7-44a5-b6c4-4e6602a76609", title: "Gangsta's Paradise - Lofi Fruits Music", artist: "Lofi Fruits", url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650735677/Songs/Gangsta_s_Paradise_-_Lofi_Fruits_Music_hhhxzf.mp3" },
      { id: "5227663d-9493-4b52-ac57-03747e4b9290", title: "Mood (Lofi)", artist: "Salem ilese", url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561933/Songs/Mood_Lofi_cirjjc.mp3" },
    ],
  },
  {
    slug: "feel-you-in-osaka",
    legacyId: "8a38c7b7-5509-4cc9-ae91-42989e748b81",
    title: "Feel you in Osaka ⛩️ Asian Lofi hip hop",
    imageUrl: "https://res.cloudinary.com/dehs50yqa/image/upload/v1650561572/1_qsy54h.jpg",
    tracks: [
      { id: "ae4172a1-a82d-47aa-b90f-e47b0d865149", title: "Tenno - Journey", artist: "Tenno", url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561908/Songs/Tenno_-_Journey_v4pnok.mp3" },
      { id: "471d5b2f-acc0-45c5-91bf-f5d8fda4da8f", title: "Enoshy - Solitude Chill Alone - lofi hip hop", artist: "Enoshy", url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561711/Songs/Enoshy_-_Solitude_Chill_Alone_-_lofi_hip_hop_afsn5a.mp3" },
      { id: "fa6a9325-4bda-448e-b96f-dca8959c984f", title: "Huey daze Amore Lofi hiphop", artist: "Huey Daze", url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561815/Songs/Huey_daze_Amore_Lofi_hiphop_msoh0s.mp3" },
    ],
  },
  {
    slug: "beats-to-relax-study-to",
    legacyId: "8661c1d6-aa08-4764-a0e2-287265294c7f",
    title: "lofi hip hop radio - beats to relax/study to",
    imageUrl: "https://res.cloudinary.com/dehs50yqa/image/upload/v1650561564/3_qcxsdz.jpg",
    tracks: [
      { id: "60bba2c6-c566-4c23-b1be-57c6e274fc7e", title: "Fırat Durak - Glances", artist: "Fırat Durak", url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561945/Songs/F%C4%B1rat_Durak_-_Glances_mantrt.mp3" },
      { id: "1b98298e-81c8-4308-8cf2-7d3d4bf2da4e", title: "Hold Back The River [Lofi Fruits Release]", artist: "Lofi Fruits", url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561710/Songs/Hold_Back_The_River_Lofi_Fruits_Release_lhfzmo.mp3" },
      { id: "76eee8ab-9a72-46c3-9471-a5b6c503116e", title: "Yoann Garel - Early Train (Lofi chill)", artist: "Yoann Garel", url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561950/Songs/Yoann_Garel_-_Early_Train_Lofi_chill_rnpyra.mp3" },
      { id: "50ac0e55-e31b-44ec-b122-657ae3f66056", title: "Purrple Cat - City Nights", artist: "Purple Cat", url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561855/Songs/Purrple_Cat_-_City_Nights_heqvrq.mp3" },
      { id: "3bed833b-8796-441e-b902-60647da37f72", title: "DaniSogen - Voices of the Forest", artist: "Dani Sogen", url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561746/Songs/DaniSogen_-_Voices_of_the_Forest_bfkxai.mp3" },
    ],
  },
]

export const featuredArtists: CatalogArtist[] = [
  { id: "09978d6d-795a-45d0-a6a9-dcaa284ae4ef", name: "Purple Cat", imageUrl: "https://res.cloudinary.com/dehs50yqa/image/upload/v1650798278/Artists/channels4_profile_xfun2q.jpg" },
  { id: "0e79ddd1-03da-40af-86f1-2eada9a621d1", name: "NEFFEX", imageUrl: "https://res.cloudinary.com/dehs50yqa/image/upload/v1650725818/Artists/Neffex_es4jyl.jpg" },
  { id: "4031025f-b9f4-40fb-a621-e020b13297c5", name: "Salem ilese", imageUrl: "https://res.cloudinary.com/dehs50yqa/image/upload/v1650727176/Artists/Salem_ilese_i3gn0g.jpg" },
]

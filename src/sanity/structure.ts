import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('HC Wroclaw CMS')
    .items([
      S.listItem()
        .title('Main content')
        .child(
          S.list()
            .title('Pages list')
            .items([
              S.listItem()
                .title('Home Page')
                .child(S.documentTypeList('homePage')),
              S.listItem()
                .title('News Page')
                .child(S.documentTypeList('newsSinglePage')),
              S.listItem()
                .title('Team Page')
                .child(S.documentTypeList('teamPage')),
              S.listItem()
                .title('Club Page')
                .child(S.documentTypeList('clubPage')),
              S.listItem()
                .title('Trainings Page')
                .child(S.documentTypeList('trainingsPage')),
              S.listItem()
                .title('Gallery Page')
                .child(S.documentTypeList('galleryPage')),
              S.listItem()
                .title('Contact Page')
                .child(S.documentTypeList('contactPage')),
              S.listItem()
                .title('Info Page')
                .child(S.documentTypeList('infoPage')),
              S.listItem()
                .title('Support Page')
                .child(S.documentTypeList('supportPage')),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Modules')
        .child(
          S.list()
            .title('Modules')
            .items([
              S.listItem().title('Team').child(S.documentTypeList('team')),
              S.listItem()
                .title('Game Type')
                .child(S.documentTypeList('gameType')),
              S.listItem()
                .title('Game Calendar')
                .child(S.documentTypeList('gameCalendar')),
              S.listItem()
                .title('League Tables')
                .child(S.documentTypeList('leagueTables')),
              S.listItem()
                .title('League Tables Order')
                .child(S.documentTypeList('leagueTablesOrder')),
              S.listItem()
                .title('Partners')
                .child(S.documentTypeList('partnersLogo')),
              S.listItem()
                .title('Tax Transfer Modal Image')
                .child(S.documentTypeList('taxTransferModalImg')),
            ])
        ),
    ]);

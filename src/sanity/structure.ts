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
            .title('Main content')
            .items([
              S.listItem()
                .title('Pages')
                .child(
                  S.list()
                    .title('Pages list')
                    .items([
                      S.listItem()
                        .title('Home Page')
                        .child(S.documentTypeList('homePage')),
                    ])
                ),
              S.divider(),
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
            ])
        ),
    ]);

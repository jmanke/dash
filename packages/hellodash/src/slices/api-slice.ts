// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { CONSTANTS } from '../constants';
import { Note } from '../models/note';
import { Label } from '../models/label';
import { dashRootService } from '../components/dash-root/dash-root-service';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const baseApiUrl = (): string => (CONSTANTS.LIVE_SERVER ? 'https://hellodash-server-2x.herokuapp.com/api' : 'http://localhost:5000/api');

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl(),
    prepareHeaders: async headers => {
      const token = await dashRootService.authClient.getTokenSilently();

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    //#region Notes
    getNotePreviews: builder.query<Note[], void>({
      query: () => ({ url: '/notes', params: { IncludeArchived: true, ExcludeContent: true } }),
    }),
    getNote: builder.query<Note, number>({
      query: (id: number) => ({ url: `/notes/${id}`, params: { IncludeArchived: true } }),
    }),
    createNote: builder.mutation<number, Note>({
      query: (note: Note) => ({ url: '/notes', method: 'POST', body: note }),
    }),
    duplicateNote: builder.mutation<Note, Note>({
      async queryFn(arg, _api, _extraOptions, baseQuery) {
        const noteResult = (await baseQuery({ url: `/notes/${arg.id}`, params: { IncludeArchived: true } })) as QueryReturnValue<Note, FetchBaseQueryError, FetchBaseQueryMeta>;
        if (noteResult.error) {
          return noteResult;
        }

        const note = noteResult.data as Note;
        note.title += ' (copy)';
        const newNoteIdResult = (await baseQuery({ url: '/notes', method: 'POST', body: note })) as QueryReturnValue<Note, FetchBaseQueryError, FetchBaseQueryMeta>;
        if (newNoteIdResult.error) {
          return newNoteIdResult;
        }

        const newNoteId = (newNoteIdResult as { data: number }).data;
        const newNoteResult = (await baseQuery({ url: `/notes/${newNoteId}`, params: { IncludeArchived: true } })) as QueryReturnValue<
          Note,
          FetchBaseQueryError,
          FetchBaseQueryMeta
        >;

        return newNoteResult;
      },
    }),
    //#endregion

    //#region Labels
    getLabels: builder.query<Label[], void>({
      query: () => '/labels',
    }),
    //#endregion
  }),
});

export const { getNotePreviews, getNote, createNote, duplicateNote, getLabels } = apiSlice.endpoints;
